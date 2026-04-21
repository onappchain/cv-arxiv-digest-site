#!/usr/bin/env python3
import json
import subprocess
import sys
import time
import urllib.error
import urllib.request
from pathlib import Path

ROOT = Path('/home/nebula/projects/cv-arxiv-digest-site')
PUBLISHER = ROOT / 'publish_digest.py'
DATA_PATH = ROOT / 'data' / 'digests.json'
LIVE_JSON_URL = 'https://arxiv.best/data/digests.json'
LIVE_HTML_URL = 'https://arxiv.best/'
PUSH_FILES = ['data/digests.json', 'publish_digest.py', 'daily_publish_and_verify.py']


def fail(msg: str, code: int = 1) -> None:
    print(msg, file=sys.stderr)
    raise SystemExit(code)


def run(cmd: list[str], capture: bool = True) -> str:
    proc = subprocess.run(cmd, cwd=ROOT, text=True, capture_output=capture)
    if proc.returncode != 0:
        detail = proc.stderr.strip() or proc.stdout.strip() or f'command failed: {cmd}'
        fail(detail)
    return proc.stdout.strip() if capture else ''


def read_payload() -> dict:
    if len(sys.argv) > 2:
        fail('usage: daily_publish_and_verify.py [payload.json]')
    if len(sys.argv) == 2:
        return json.loads(Path(sys.argv[1]).read_text())
    raw = sys.stdin.read().strip()
    if not raw:
        fail('expected JSON payload on stdin or as a file path argument')
    return json.loads(raw)


def fetch(url: str) -> str:
    req = urllib.request.Request(url, headers={'Cache-Control': 'no-cache', 'Pragma': 'no-cache'})
    with urllib.request.urlopen(req, timeout=20) as resp:
        return resp.read().decode('utf-8')


def verify_live(expected_date: str, retries: int = 24, delay: int = 10) -> dict:
    last_error = ''
    for attempt in range(1, retries + 1):
        try:
            live_json = json.loads(fetch(LIVE_JSON_URL))
            updated_at = live_json.get('site', {}).get('updated_at')
            dates = [entry.get('date') for entry in live_json.get('entries', [])]
            html = fetch(LIVE_HTML_URL)
            homepage_ok = 'arxiv.best' in html.lower()
            if updated_at == expected_date and expected_date in dates and homepage_ok:
                return {
                    'attempt': attempt,
                    'updated_at': updated_at,
                    'dates_checked': dates[:5],
                    'homepage_reachable': True,
                }
            last_error = f'live site still stale on attempt {attempt}: updated_at={updated_at}, has_date={expected_date in dates}, homepage_ok={homepage_ok}'
        except (urllib.error.URLError, TimeoutError, json.JSONDecodeError) as exc:
            last_error = f'live verification attempt {attempt} failed: {exc}'
        if attempt < retries:
            time.sleep(delay)
    fail(last_error)


def maybe_commit(expected_date: str) -> tuple[bool, str]:
    changed_files = run(['git', 'diff', '--name-only']).splitlines()
    wanted = [f for f in PUSH_FILES if f in changed_files]
    if not wanted:
        return False, ''
    run(['git', 'add', *wanted], capture=False)
    message = f'Publish CV arXiv digest for {expected_date}'
    run(['git', 'commit', '-m', message], capture=False)
    commit_sha = run(['git', 'rev-parse', 'HEAD'])
    run(['git', 'push', 'origin', 'main'], capture=False)
    return True, commit_sha


def main() -> None:
    payload = read_payload()
    expected_date = payload.get('date')
    if not isinstance(expected_date, str) or len(expected_date) != 10:
        fail('payload.date must be YYYY-MM-DD')

    proc = subprocess.run(
        ['python', str(PUBLISHER)],
        cwd=ROOT,
        input=json.dumps(payload),
        text=True,
        capture_output=True,
    )
    if proc.returncode != 0:
        fail(proc.stderr.strip() or proc.stdout.strip() or 'publisher failed')
    publish_result = json.loads(proc.stdout.strip())

    local_doc = json.loads(DATA_PATH.read_text())
    local_updated_at = local_doc.get('site', {}).get('updated_at')
    if local_updated_at != expected_date:
        fail(f'local publish verification failed: updated_at={local_updated_at}')
    if not any(entry.get('date') == expected_date for entry in local_doc.get('entries', [])):
        fail(f'local publish verification failed: missing entry {expected_date}')

    committed, commit_sha = maybe_commit(expected_date)
    if not committed:
        commit_sha = run(['git', 'rev-parse', 'HEAD'])

    live_result = verify_live(expected_date)
    print(json.dumps({
        'date': expected_date,
        'publish_result': publish_result,
        'committed': committed,
        'commit': commit_sha,
        'live_verification': live_result,
    }))


if __name__ == '__main__':
    main()

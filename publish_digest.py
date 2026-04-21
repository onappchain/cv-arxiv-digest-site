#!/usr/bin/env python3
import json
import sys
from pathlib import Path

ROOT = Path('/home/nebula/projects/cv-arxiv-digest-site')
DATA_PATH = ROOT / 'data' / 'digests.json'


def fail(msg: str) -> None:
    print(msg, file=sys.stderr)
    raise SystemExit(1)


def validate(payload: dict) -> dict:
    if not isinstance(payload, dict):
        fail('payload must be a JSON object')
    date = payload.get('date')
    top5 = payload.get('top5')
    papers = payload.get('papers')
    if not isinstance(date, str) or len(date) != 10:
        fail('payload.date must be YYYY-MM-DD')
    if not isinstance(top5, list):
        fail('payload.top5 must be a list')
    if not isinstance(papers, list):
        fail('payload.papers must be a list')
    if len(top5) >= 5 and len(top5) != 5:
        fail('payload.top5 must contain exactly 5 items when at least 5 papers exist')
    for i, item in enumerate(top5, start=1):
        if not isinstance(item, dict):
            fail(f'top5[{i-1}] must be an object')
        if item.get('rank') != i:
            fail(f'top5[{i-1}].rank must be {i}')
        for key in ('title', 'url', 'summary'):
            if not isinstance(item.get(key), str) or not item.get(key).strip():
                fail(f'top5[{i-1}].{key} must be a non-empty string')
    for i, item in enumerate(papers):
        if not isinstance(item, dict):
            fail(f'papers[{i}] must be an object')
        for key in ('title', 'url'):
            if not isinstance(item.get(key), str) or not item.get(key).strip():
                fail(f'papers[{i}].{key} must be a non-empty string')
    return {'date': date, 'top5': top5, 'papers': papers}


def main() -> None:
    if len(sys.argv) > 2:
        fail('usage: publish_digest.py [payload.json]')
    if len(sys.argv) == 2:
        payload = json.loads(Path(sys.argv[1]).read_text())
    else:
        raw = sys.stdin.read().strip()
        if not raw:
            fail('expected JSON payload on stdin or as a file path argument')
        payload = json.loads(raw)
    digest = validate(payload)

    doc = json.loads(DATA_PATH.read_text())
    entries = doc.setdefault('entries', [])
    replaced = False
    for idx, entry in enumerate(entries):
        if entry.get('date') == digest['date']:
            entries[idx] = digest
            replaced = True
            break
    if not replaced:
        entries.append(digest)
    entries.sort(key=lambda x: x['date'], reverse=True)

    site = doc.setdefault('site', {})
    site['updated_at'] = digest['date']

    before = json.dumps(json.loads(DATA_PATH.read_text()), sort_keys=True)
    after = json.dumps(doc, sort_keys=True)
    changed = before != after

    DATA_PATH.write_text(json.dumps(doc, indent=2) + '\n')
    print(json.dumps({
        'date': digest['date'],
        'replaced': replaced,
        'changed': changed,
        'entries_count': len(entries),
        'data_path': str(DATA_PATH)
    }))


if __name__ == '__main__':
    main()

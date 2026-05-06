#!/usr/bin/env python3
"""Parse arXiv cs.CV scraped content and produce a structured paper list.

Reads one or more raw scraped pages (Markdown format) from positional file args,
extracts paper metadata, and prints a JSON array to stdout.

Usage: python build_digest.py [--date YYYY-MM-DD] scraped1.md scraped2.md ...
       echo "$SCRAPE_CONTENT" | python build_digest.py --stdin [--date YYYY-MM-DD]

Output: JSON array of {"title", "url", "arxiv_id", "index"} entries sorted by index.
"""

import argparse
import json
import re
import sys
from pathlib import Path


def extract_papers_from_text(text: str, section_date: str | None = None) -> list[dict]:
    """Extract paper entries from arXiv listing page markdown."""
    papers = []
    # Match: [N] [arXiv:ID](https://arxiv.org/abs/ID)
    entry_pattern = re.compile(
        r'\\\[(\d+)\\\]\s+\\\[(?:arXiv:|arxiv\.org/abs/)?([\d.]+)\]\(https://arxiv\.org/abs/([\d.]+)'
    )
    # Match: Title: <text>
    title_pattern = re.compile(r'Title:\s*(.+?)$', re.MULTILINE)
    # Match: Subject: cs.CV
    subject_pattern = re.compile(r'(?i)Subject:\s*cs\.CV')
    # Cross-list marker
    cross_list_pattern = re.compile(r'\(cross-list from')

    # If section_date given, isolate that section
    if section_date:
        sections = text.split('### ')
        for section in sections:
            if section_date in section[:30]:
                text = section
                break

    lines = text.split('\n')
    current = None

    for i, line in enumerate(lines):
        m = entry_pattern.search(line)
        if m:
            if current:
                papers.append(current)
            current = {
                'index': int(m.group(1)),
                'arxiv_id': m.group(2),
                'url': f'https://arxiv.org/abs/{m.group(3)}',
                'title': '',
                'cross_list': cross_list_pattern.search(line) is not None,
            }
        if current:
            tm = title_pattern.search(line)
            if tm and not current['title']:
                current['title'] = tm.group(1).strip()
            if subject_pattern.search(line) and not current.get('is_primary') and not current['cross_list']:
                current['is_primary'] = True

    if current:
        papers.append(current)

    # Return only primary cs.CV papers (skip cross-lists unless all are cross-lists)
    primary = [p for p in papers if not p['cross_list']]
    return primary if primary else papers


def main():
    parser = argparse.ArgumentParser(description='Parse arXiv cs.CV scrape into structured JSON.')
    parser.add_argument('--date', default=None, help='Target date string (e.g., "Mon, 4 May 2026").')
    parser.add_argument('--stdin', action='store_true', help='Read scrape content from stdin.')
    parser.add_argument('files', nargs='*', help='Scraped markdown files to parse.')
    args = parser.parse_args()

    texts = []
    if args.stdin:
        texts.append(sys.stdin.read())
    for fp in args.files:
        texts.append(Path(fp).read_text())

    if not texts:
        print('[]')
        return

    all_papers = []
    for text in texts:
        papers = extract_papers_from_text(text, section_date=args.date)
        all_papers.extend(papers)

    # Deduplicate by arxiv_id, keep earliest index
    seen = {}
    for p in all_papers:
        pid = p['arxiv_id']
        if pid not in seen or p['index'] < seen[pid]['index']:
            seen[pid] = p

    result = list(seen.values())
    result.sort(key=lambda p: p['index'])

    # Strip internal flags for clean output
    clean = []
    for p in result:
        clean.append({
            'index': p['index'],
            'title': p['title'],
            'url': p['url'],
            'arxiv_id': p['arxiv_id'],
        })

    print(json.dumps(clean, indent=2))


if __name__ == '__main__':
    main()

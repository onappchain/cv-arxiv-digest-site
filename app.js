const app = document.getElementById('app');
const dayFilter = document.getElementById('day-filter');
const searchInput = document.getElementById('search-input');

let digestData = { site: { updated_at: '' }, entries: [] };

function formatDate(dateString) {
  const date = new Date(`${dateString}T12:00:00Z`);
  return date.toLocaleDateString('en-US', {
    weekday: 'long',
    month: 'long',
    day: 'numeric',
    year: 'numeric'
  });
}

function escapeHtml(value) {
  return String(value)
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#39;');
}

function normalizePapers(entry) {
  return (entry.papers || []).map((paper) => {
    if (Array.isArray(paper)) {
      return { title: paper[0], url: paper[1] };
    }
    return paper;
  });
}

function paperCard(paper) {
  return `
    <article class="paper-card">
      <div class="rank">${paper.rank}</div>
      <h3><a href="${escapeHtml(paper.url)}" target="_blank" rel="noreferrer">${escapeHtml(paper.title)}</a></h3>
      <p>${escapeHtml(paper.summary)}</p>
    </article>
  `;
}

function daySection(day) {
  const papers = normalizePapers(day);
  const top5Urls = new Set(day.top5.map((paper) => paper.url));
  const extraPapers = papers.filter((paper) => !top5Urls.has(paper.url));
  const extraLabel = `${extraPapers.length} other paper${extraPapers.length === 1 ? '' : 's'}`;

  return `
    <section class="day-card">
      <div class="day-header">
        <div>
          <h2 class="day-title">${formatDate(day.date)}</h2>
          <div class="day-subtitle">${day.top5.length} ranked picks, ${papers.length} total papers</div>
        </div>
      </div>
      <div class="top5">
        ${day.top5.map(paperCard).join('')}
      </div>
      <details class="all-list" ${extraPapers.length ? '' : 'disabled'}>
        <summary class="all-list-summary">Show ${escapeHtml(extraLabel)}</summary>
        <div class="all-list-body">
          <h3 class="list-title">All other papers</h3>
          <ul>
            ${extraPapers.map((paper) => `<li><a href="${escapeHtml(paper.url)}" target="_blank" rel="noreferrer">${escapeHtml(paper.title)}</a></li>`).join('')}
          </ul>
        </div>
      </details>
    </section>
  `;
}

function getFilteredEntries() {
  const selectedDay = dayFilter.value;
  const query = searchInput.value.trim().toLowerCase();

  return digestData.entries.filter((entry) => {
    const matchesDay = selectedDay === 'all' || entry.date === selectedDay;
    if (!matchesDay) return false;
    if (!query) return true;

    const papers = normalizePapers(entry);
    const haystack = [
      ...entry.top5.flatMap((paper) => [paper.title, paper.summary]),
      ...papers.flatMap((paper) => [paper.title, paper.url])
    ].join(' ').toLowerCase();

    return haystack.includes(query);
  });
}

function render() {
  const entries = getFilteredEntries();

  if (!entries.length) {
    app.innerHTML = `
      <div class="results-meta">0 days matched.</div>
      <div class="empty-state">Try another date or a broader search.</div>
    `;
    return;
  }

  app.innerHTML = `
    <div class="results-meta">${entries.length} day${entries.length === 1 ? '' : 's'} shown. Updated ${escapeHtml(digestData.site.updated_at || '')}.</div>
    ${entries.map(daySection).join('')}
  `;
}

function initFilters() {
  const options = [
    '<option value="all">All dates</option>',
    ...digestData.entries.map((entry) => `<option value="${entry.date}">${formatDate(entry.date)}</option>`)
  ];
  dayFilter.innerHTML = options.join('');
  dayFilter.addEventListener('change', render);
  searchInput.addEventListener('input', render);
}

async function init() {
  try {
    const response = await fetch('data/digests.json', { cache: 'no-store' });
    if (!response.ok) {
      throw new Error(`Failed to load digest data: ${response.status}`);
    }
    digestData = await response.json();
    initFilters();
    render();
  } catch (error) {
    app.innerHTML = `
      <div class="empty-state">Could not load digest data.</div>
    `;
    console.error(error);
  }
}

init();

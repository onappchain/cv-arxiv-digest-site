const digestData = {
  site: {
    title: 'CV ArXiv Digest',
    description: 'A refined daily selection of new computer vision papers from arXiv cs.CV.',
    updated_at: '2026-04-14'
  },
  entries: [
    {
      date: '2026-04-14',
      top5: [
        { rank: 1, title: 'Any 3D Scene is Worth 1K Tokens: 3D-Grounded Representation for Scene Generation at Scale', url: 'https://arxiv.org/abs/2604.11331', summary: 'Moves scene generation into an implicit 3D latent space with a dedicated 3D diffusion transformer, directly targeting spatial consistency at scale.' },
        { rank: 2, title: 'Online Reasoning Video Object Segmentation', url: 'https://arxiv.org/abs/2604.11411', summary: 'Reframes reasoning VOS under strict causality and introduces a benchmark plus causal baseline closer to deployment.' },
        { rank: 3, title: 'LottieGPT: Tokenizing Vector Animation for Autoregressive Generation', url: 'https://arxiv.org/abs/2604.11792', summary: 'Native generation of editable vector animation is unusually fresh, backed by a tokenizer and a 660K-animation dataset.' },
        { rank: 4, title: 'POINTS-Long: Adaptive Dual-Mode Visual Reasoning in MLLMs', url: 'https://arxiv.org/abs/2604.11627', summary: 'Targets long-form and streaming visual understanding with an explicit efficiency-accuracy tradeoff.' },
        { rank: 5, title: "TAPNext++: What's Next for Tracking Any Point (TAP)?", url: 'https://arxiv.org/abs/2604.10582', summary: 'Pushes online point tracking with stronger long-horizon tracking, re-detection after occlusion, and a new evaluation metric.' }
      ],
      papers: [
        ['Who Handles Orientation? Investigating Invariance in Feature Matching','https://arxiv.org/abs/2604.11809'],
        ['Pair2Scene: Learning Local Object Relations for Procedural Scene Generation','https://arxiv.org/abs/2604.11808'],
        ['OmniShow: Unifying Multimodal Conditions for Human-Object Interaction Video Generation','https://arxiv.org/abs/2604.11804'],
        ['LottieGPT: Tokenizing Vector Animation for Autoregressive Generation','https://arxiv.org/abs/2604.11792'],
        ['POINTS-Long: Adaptive Dual-Mode Visual Reasoning in MLLMs','https://arxiv.org/abs/2604.11627'],
        ['Online Reasoning Video Object Segmentation','https://arxiv.org/abs/2604.11411'],
        ['Any 3D Scene is Worth 1K Tokens: 3D-Grounded Representation for Scene Generation at Scale','https://arxiv.org/abs/2604.11331'],
        ['TraversalBench: Challenging Paths to Follow for Vision Language Models','https://arxiv.org/abs/2604.10999'],
        ["TAPNext++: What's Next for Tracking Any Point (TAP)?",'https://arxiv.org/abs/2604.10582']
      ]
    },
    {
      date: '2026-04-13',
      top5: [
        { rank: 1, title: 'VisionFoundry: Teaching VLMs Visual Perception with Synthetic Images', url: 'https://arxiv.org/abs/2604.09531', summary: 'A scalable, annotation-light synthetic data pipeline aimed at a central weakness in current VLMs: visual perception.' },
        { rank: 2, title: 'PhysInOne: Visual Physics Learning and Reasoning in One Suite', url: 'https://arxiv.org/abs/2604.09415', summary: 'Introduces a very large physical video suite with rich annotations, useful for world models and embodied AI.' },
        { rank: 3, title: 'Tango: Taming Visual Signals for Efficient Video Large Language Models', url: 'https://arxiv.org/abs/2604.09547', summary: 'Reports near-original performance while keeping only a fraction of video tokens, making it highly practical.' },
        { rank: 4, title: 'Envisioning the Future, One Step at a Time', url: 'https://arxiv.org/abs/2604.09527', summary: 'Reframes future prediction around sparse point-trajectory dynamics for longer-horizon forecasting.' },
        { rank: 5, title: 'MAG-3D: Multi-Agent Grounded Reasoning for 3D Understanding', url: 'https://arxiv.org/abs/2604.09167', summary: 'A training-free multi-agent setup for grounded 3D reasoning with planning and geometric verification.' }
      ],
      papers: [
        ['Tango: Taming Visual Signals for Efficient Video Large Language Models','https://arxiv.org/abs/2604.09547'],
        ['VisionFoundry: Teaching VLMs Visual Perception with Synthetic Images','https://arxiv.org/abs/2604.09531'],
        ['Envisioning the Future, One Step at a Time','https://arxiv.org/abs/2604.09527'],
        ['VISOR: Agentic Visual Retrieval-Augmented Generation via Iterative Search and Over-horizon Reasoning','https://arxiv.org/abs/2604.09508'],
        ['PhysInOne: Visual Physics Learning and Reasoning in One Suite','https://arxiv.org/abs/2604.09415'],
        ['Do Vision Language Models Need to Process Image Tokens?','https://arxiv.org/abs/2604.09425'],
        ['MAG-3D: Multi-Agent Grounded Reasoning for 3D Understanding','https://arxiv.org/abs/2604.09167'],
        ['Learning Vision-Language-Action World Models for Autonomous Driving','https://arxiv.org/abs/2604.09059'],
        ['WildDet3D: Scaling Promptable 3D Detection in the Wild','https://arxiv.org/abs/2604.08626']
      ]
    },
    {
      date: '2026-04-12',
      top5: [
        { rank: 1, title: 'MolmoWeb: Open Visual Web Agent and Open Data for the Open Web', url: 'https://arxiv.org/abs/2604.08516', summary: 'Pairs an open multimodal web agent family with a large open training mixture and strong benchmark results.' },
        { rank: 2, title: 'UniversalVTG: A Universal and Lightweight Foundation Model for Video Temporal Grounding', url: 'https://arxiv.org/abs/2604.08522', summary: 'A single lightweight model that outperforms specialized VTG systems across diverse benchmarks.' },
        { rank: 3, title: 'Visually-grounded Humanoid Agents', url: 'https://arxiv.org/abs/2604.08509', summary: 'Unifies 3D reconstruction, human avatars, first-person perception, and planning into a humanoid-agent framework.' },
        { rank: 4, title: 'PokeGym: A Visually-Driven Long-Horizon Benchmark for Vision-Language Models', url: 'https://arxiv.org/abs/2604.08340', summary: 'A strong long-horizon benchmark that isolates pure vision-based decision-making and diagnoses deadlock failure.' },
        { rank: 5, title: 'Novel View Synthesis as Video Completion', url: 'https://arxiv.org/abs/2604.08500', summary: 'Reframes sparse novel view synthesis as video completion, leveraging video diffusion multi-view priors.' }
      ],
      papers: [
        ['ETCH-X: Robustify Expressive Body Fitting to Clothed Humans with Composable Datasets','https://arxiv.org/abs/2604.08548'],
        ['GaussiAnimate: Reconstruct and Rig Animatable Categories with Level of Dynamics','https://arxiv.org/abs/2604.08547'],
        ['Scal3R: Scalable Test-Time Training for Large-Scale 3D Reconstruction','https://arxiv.org/abs/2604.08542'],
        ['FIT: A Large-Scale Dataset for Fit-Aware Virtual Try-On','https://arxiv.org/abs/2604.08526'],
        ['UniversalVTG: A Universal and Lightweight Foundation Model for Video Temporal Grounding','https://arxiv.org/abs/2604.08522'],
        ['MolmoWeb: Open Visual Web Agent and Open Data for the Open Web','https://arxiv.org/abs/2604.08516'],
        ['Visually-grounded Humanoid Agents','https://arxiv.org/abs/2604.08509'],
        ['Novel View Synthesis as Video Completion','https://arxiv.org/abs/2604.08500'],
        ['PokeGym: A Visually-Driven Long-Horizon Benchmark for Vision-Language Models','https://arxiv.org/abs/2604.08340']
      ]
    }
  ]
};

const app = document.getElementById('app');
const dayFilter = document.getElementById('day-filter');
const searchInput = document.getElementById('search-input');

function formatDate(dateString) {
  const date = new Date(`${dateString}T12:00:00Z`);
  return date.toLocaleDateString('en-US', {
    weekday: 'long',
    month: 'long',
    day: 'numeric',
    year: 'numeric'
  });
}

function paperCard(paper) {
  return `
    <article class="paper-card">
      <div class="rank">${paper.rank}</div>
      <h3><a href="${paper.url}" target="_blank" rel="noreferrer">${paper.title}</a></h3>
      <p>${paper.summary}</p>
      <a class="paper-link" href="${paper.url}" target="_blank" rel="noreferrer">Open paper</a>
    </article>
  `;
}

function daySection(day, index) {
  const hiddenId = `all-${index}`;
  return `
    <section class="day-card">
      <div class="day-header">
        <div>
          <h2 class="day-title">${formatDate(day.date)}</h2>
          <div class="day-subtitle">Top 5 selected papers plus ${day.papers.length} papers in the expandable list</div>
        </div>
      </div>
      <div class="top5">
        ${day.top5.map(paperCard).join('')}
      </div>
      <div class="actions">
        <button class="toggle" data-target="${hiddenId}">See all papers</button>
      </div>
      <div id="${hiddenId}" class="all-list hidden">
        <ul>
          ${day.papers.map(([title, url]) => `<li><a href="${url}" target="_blank" rel="noreferrer">${title}</a></li>`).join('')}
        </ul>
      </div>
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

    const haystack = [
      ...entry.top5.flatMap((paper) => [paper.title, paper.summary]),
      ...entry.papers.flatMap((paper) => paper)
    ].join(' ').toLowerCase();

    return haystack.includes(query);
  });
}

function render() {
  const entries = getFilteredEntries();

  if (!entries.length) {
    app.innerHTML = `
      <div class="results-meta">0 days matched your filters.</div>
      <div class="empty-state">No digest entries matched that filter. Try another day or a broader search.</div>
    `;
    return;
  }

  app.innerHTML = `
    <div class="results-meta">Showing ${entries.length} day${entries.length === 1 ? '' : 's'}. Last updated ${digestData.site.updated_at}.</div>
    ${entries.map(daySection).join('')}
    <p class="footer-note">The site is now structured around daily entries so it can be extended into automatic updates and a fuller archive later.</p>
  `;

  document.querySelectorAll('.toggle').forEach((button) => {
    button.addEventListener('click', () => {
      const target = document.getElementById(button.dataset.target);
      const hidden = target.classList.toggle('hidden');
      button.textContent = hidden ? 'See all papers' : 'Hide full list';
    });
  });
}

function initFilters() {
  const options = [
    '<option value="all">All days</option>',
    ...digestData.entries.map((entry) => `<option value="${entry.date}">${formatDate(entry.date)}</option>`)
  ];
  dayFilter.innerHTML = options.join('');
  dayFilter.addEventListener('change', render);
  searchInput.addEventListener('input', render);
}

initFilters();
render();

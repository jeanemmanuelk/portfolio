/* ============================================
   PORTFOLIO — MAIN JS
   ============================================ */

// ——— Theme ———

const THEME_KEY    = 'portfolio-theme';
const html         = document.documentElement;
const themeToggle  = document.getElementById('themeToggle');

function getSystemTheme() {
  return window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light';
}

function getEffectiveTheme() {
  const saved = localStorage.getItem(THEME_KEY);
  return saved || getSystemTheme();
}

function updateToggleIcon(effective) {
  const icon = themeToggle.querySelector('i');
  if (effective === 'dark') {
    icon.className = 'fas fa-sun';
    themeToggle.setAttribute('aria-label', 'Switch to light mode');
  } else {
    icon.className = 'fas fa-moon';
    themeToggle.setAttribute('aria-label', 'Switch to dark mode');
  }
}

function applyTheme(theme, animate) {
  if (animate) {
    html.classList.add('theme-switching');
    setTimeout(() => html.classList.remove('theme-switching'), 350);
  }
  html.setAttribute('data-theme', theme);
  updateToggleIcon(theme);
}

themeToggle.addEventListener('click', () => {
  const next = getEffectiveTheme() === 'dark' ? 'light' : 'dark';
  localStorage.setItem(THEME_KEY, next);
  applyTheme(next, true);
});

// Sync when system preference changes (only if user hasn't manually picked)
window.matchMedia('(prefers-color-scheme: dark)').addEventListener('change', e => {
  if (!localStorage.getItem(THEME_KEY)) {
    applyTheme(e.matches ? 'dark' : 'light', true);
  }
});

// Init icon to match whatever the inline script already applied
updateToggleIcon(getEffectiveTheme());

// ——— Project Data ———

const projects = [
  {
    id: 1,
    title: 'Bank Credit Risk Modeling',
    category: 'Machine Learning',
    desc: 'Predictive model assessing credit default risk using ensemble methods and class imbalance handling.',
    fullDesc: 'End-to-end credit risk assessment system leveraging Random Forest with SMOTE oversampling to handle class imbalance. Includes comprehensive EDA, feature engineering, and a full model validation pipeline.',
    tech: ['Python', 'Scikit-Learn', 'Pandas', 'SMOTE', 'Random Forest'],
    impact: [
      'ROC-AUC score of ~0.90 with Random Forest classifier',
      'SMOTE technique effectively handled class imbalance',
      'Comprehensive EDA and feature importance analysis',
    ],
    image: 'images/credit_risk.png',
    github: 'https://github.com/jeanemmanuelk/Credit_Risk_modeling',
  },
  {
    id: 2,
    title: 'Azure Data Engineering Pipeline',
    category: 'Data Engineering',
    desc: 'End-to-end ETL pipeline on Azure with PySpark processing and interactive Power BI dashboard.',
    fullDesc: 'Architected a complete cloud data pipeline on Microsoft Azure, processing large-scale datasets with PySpark transformations and delivering insights through an interactive Power BI dashboard.',
    tech: ['Azure', 'PySpark', 'Power BI', 'ETL', 'Data Factory'],
    impact: [
      'End-to-end ETL workflow orchestrated on Microsoft Azure',
      '50% reduction in analysis time through automation',
      'Interactive Power BI dashboard for real-time stakeholder insights',
    ],
    image: 'images/Olympic flowchart.png',
    github: 'https://github.com/jeanemmanuelk/Olympic-azure-databricks-project',
  },
  {
    id: 3,
    title: 'Fake News Detector (LSTM)',
    category: 'NLP / Deep Learning',
    desc: 'LSTM-based classifier achieving 92% accuracy for fake news detection, deployed as a Flask API.',
    fullDesc: 'Deep learning NLP pipeline using LSTM networks for fake news classification. Includes text preprocessing with NLTK, word embeddings, and a deployed Flask REST API for real-time inference.',
    tech: ['TensorFlow', 'NLTK', 'Flask', 'LSTM', 'NLP'],
    impact: [
      '92% classification accuracy on test set',
      'Real-time Flask API for text classification',
      'Advanced text preprocessing with word embeddings',
    ],
    image: 'images/fake_news_detector.png',
    github: 'https://github.com/jeanemmanuelk/Fake_news_Detector_LSTM',
  },
  {
    id: 4,
    title: 'Landing Page A/B Testing',
    category: 'Statistical Analysis',
    desc: 'Rigorous A/B test identifying a 27% conversion improvement via power analysis and bootstrapping.',
    fullDesc: 'Comprehensive A/B testing analysis on landing page variants using statistical hypothesis testing, power analysis, and bootstrap resampling to ensure statistically valid and actionable conclusions.',
    tech: ['Python', 'SciPy', 'Matplotlib', 'Statsmodels', 'Bootstrap'],
    impact: [
      '27% improvement in conversion rate identified',
      'Power analysis ensured statistical validity before launch',
      'Bootstrap resampling for robust confidence intervals',
    ],
    image: 'images/ab_testing.png',
    github: 'https://github.com/jeanemmanuelk/page-engagement-ab-testing',
  },
  {
    id: 5,
    title: 'RegressLy',
    category: 'Data Tool',
    desc: 'Interactive multi-algorithm regression analysis tool reducing analyst time by 75%.',
    fullDesc: 'A user-friendly Streamlit web application enabling analysts to run, compare, and visualize 8 regression algorithms without writing code. Features automated preprocessing, model selection, and interactive Plotly visualizations.',
    tech: ['Streamlit', 'Scikit-learn', 'Plotly', 'Pandas', 'Python'],
    impact: [
      '8 regression algorithms accessible in one unified interface',
      '75% reduction in analyst time per regression task',
      'Automated preprocessing and model comparison built-in',
    ],
    image: 'images/regressly.png',
    github: 'https://github.com/jeanemmanuelk/RegressLy',
  },
  {
    id: 6,
    title: 'Resume MatchMate',
    category: 'NLP',
    desc: 'NLP-powered resume-to-job matching system with 89% accuracy and PDF parsing.',
    fullDesc: 'Intelligent resume screening tool using NLP to match resumes against job descriptions. Features PDF parsing, TF-IDF vectorization, cosine similarity scoring, and a JavaScript-powered front end for instant results.',
    tech: ['NLP', 'Flask', 'JavaScript', 'TF-IDF', 'PDF Parsing'],
    impact: [
      '89% resume-to-job matching accuracy',
      'Automated PDF parsing and text extraction',
      'Significantly reduced manual screening time for HR teams',
    ],
    image: 'images/resume_matchmate.webp',
    github: 'https://github.com/jeanemmanuelk/Resume-MatchMate',
  },
  {
    id: 7,
    title: 'SMS Spam Detector',
    category: 'Machine Learning',
    desc: 'Real-time SMS spam classifier achieving 98% accuracy, deployed as a Flask REST API.',
    fullDesc: 'SMS spam detection system using classical ML with NLTK text preprocessing and feature engineering. Achieves 98% classification accuracy and is deployed as a real-time Flask REST API for integration.',
    tech: ['NLTK', 'Scikit-learn', 'Flask', 'Python', 'NLP'],
    impact: [
      '98% classification accuracy on held-out test set',
      'Real-time filtering via REST API deployment',
      'Efficient text preprocessing and bag-of-words pipeline',
    ],
    image: 'images/smsspamdet.jpeg',
    github: 'https://github.com/jeanemmanuelk/Advanced-SMS-Spam-Filter',
  },
  {
    id: 8,
    title: 'Facial Emotion Detector',
    category: 'Computer Vision',
    desc: 'CNN-based real-time facial emotion recognition using TensorFlow and OpenCV on FER-2013.',
    fullDesc: 'Convolutional neural network for real-time facial emotion recognition trained on the FER-2013 dataset. Integrates with OpenCV for live video processing and 7-class emotion classification in real time.',
    tech: ['TensorFlow', 'OpenCV', 'CNN', 'Python', 'FER-2013'],
    impact: [
      '75% accuracy on FER-2013 benchmark dataset',
      'Real-time video processing with OpenCV integration',
      '7-class emotion classification (happy, sad, angry, etc.)',
    ],
    image: 'images/facial_det_proj.png',
    github: 'https://github.com/jeanemmanuelk/Facial-Emotion-Detection',
  },
];

// ——— Navigation ———

const nav       = document.getElementById('nav');
const hamburger = document.getElementById('hamburger');
const navLinks  = document.getElementById('navLinks');

window.addEventListener('scroll', () => {
  nav.classList.toggle('scrolled', window.scrollY > 20);
}, { passive: true });

hamburger.addEventListener('click', () => {
  navLinks.classList.toggle('open');
  hamburger.classList.toggle('active');
});

navLinks.querySelectorAll('a').forEach(link => {
  link.addEventListener('click', () => {
    navLinks.classList.remove('open');
    hamburger.classList.remove('active');
  });
});

// ——— Typing Animation ———

const roles = [
  'machine learning models',
  'data pipelines',
  'NLP systems',
  'predictive analytics',
  'intelligent solutions',
];

let roleIndex  = 0;
let charIndex  = 0;
let isDeleting = false;
const roleEl   = document.getElementById('roleText');
const SPEED    = { type: 65, delete: 38, pause: 2000, gap: 380 };

function typeRole() {
  const current = roles[roleIndex];
  if (isDeleting) {
    roleEl.textContent = current.slice(0, charIndex - 1);
    charIndex--;
  } else {
    roleEl.textContent = current.slice(0, charIndex + 1);
    charIndex++;
  }

  let delay = isDeleting ? SPEED.delete : SPEED.type;
  if (!isDeleting && charIndex === current.length) {
    delay = SPEED.pause;
    isDeleting = true;
  } else if (isDeleting && charIndex === 0) {
    isDeleting = false;
    roleIndex  = (roleIndex + 1) % roles.length;
    delay = SPEED.gap;
  }

  setTimeout(typeRole, delay);
}

typeRole();

// ——— Render Projects ———

const grid = document.getElementById('projectsGrid');

projects.forEach(p => {
  const card = document.createElement('div');
  card.className = 'project-card fade-up';
  card.dataset.id = p.id;
  card.innerHTML = `
    <div class="project-card__header">
      <span class="project-card__category">${p.category}</span>
      <i class="fas fa-arrow-up-right-from-square project-card__arrow"></i>
    </div>
    <img src="${p.image}" alt="${p.title}" class="project-card__img" loading="lazy">
    <h3 class="project-card__title">${p.title}</h3>
    <p class="project-card__desc">${p.desc}</p>
    <div class="project-card__tags">
      ${p.tech.slice(0, 4).map(t => `<span class="tag">${t}</span>`).join('')}
    </div>
  `;
  card.addEventListener('click', () => openModal(p));
  grid.appendChild(card);
});

// ——— Modal ———

const modal        = document.getElementById('projectModal');
const modalBody    = document.getElementById('modalBody');
const modalClose   = document.getElementById('modalClose');
const modalBackdrop = document.getElementById('modalBackdrop');

function openModal(p) {
  modalBody.innerHTML = `
    <img src="${p.image}" alt="${p.title}" class="modal__img">
    <div class="modal__category">${p.category}</div>
    <h2 class="modal__title">${p.title}</h2>
    <p class="modal__desc">${p.fullDesc}</p>
    <div class="modal__impact-label">Key Results</div>
    <div class="modal__impact">
      ${p.impact.map(i => `<div class="modal__impact-item">${i}</div>`).join('')}
    </div>
    <div class="modal__tags">
      ${p.tech.map(t => `<span class="tag tag--accent">${t}</span>`).join('')}
    </div>
    <a href="${p.github}" target="_blank" rel="noopener" class="modal__link">
      View on GitHub <i class="fas fa-arrow-right"></i>
    </a>
  `;
  modal.classList.add('active');
  document.body.style.overflow = 'hidden';
}

function closeModal() {
  modal.classList.remove('active');
  document.body.style.overflow = '';
}

modalClose.addEventListener('click', closeModal);
modalBackdrop.addEventListener('click', closeModal);
document.addEventListener('keydown', e => { if (e.key === 'Escape') closeModal(); });

// ——— Scroll Animations ———

const observer = new IntersectionObserver(
  entries => entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.classList.add('visible');
      observer.unobserve(entry.target);
    }
  }),
  { threshold: 0.08, rootMargin: '0px 0px -32px 0px' }
);

// Observe all static fade-up elements
document.querySelectorAll('.fade-up').forEach(el => observer.observe(el));

// Observe project cards after they're injected
grid.querySelectorAll('.fade-up').forEach(el => observer.observe(el));

// ——— Contact Form ———

const form = document.getElementById('contactForm');
const submitBtn = document.getElementById('submitBtn');

form.addEventListener('submit', async e => {
  e.preventDefault();
  const original = submitBtn.textContent;
  submitBtn.textContent = 'Sending…';
  submitBtn.disabled = true;

  try {
    const res = await fetch(form.action, {
      method: 'POST',
      body: new FormData(form),
      headers: { Accept: 'application/json' },
    });
    if (res.ok) {
      submitBtn.textContent = 'Message sent!';
      form.reset();
      setTimeout(() => {
        submitBtn.textContent = original;
        submitBtn.disabled = false;
      }, 3500);
    } else {
      throw new Error('Network response not ok');
    }
  } catch {
    submitBtn.textContent = 'Error — try again';
    submitBtn.disabled = false;
  }
});

// ——— Footer Year ———

document.getElementById('year').textContent = new Date().getFullYear();

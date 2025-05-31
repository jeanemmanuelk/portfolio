// --- Magic Button Splash Effect ---
document.querySelectorAll('.magic-btn').forEach(btn => {
    btn.addEventListener('click', function(e) {
        const circle = document.createElement('span');
        circle.classList.add('splash');
        const rect = btn.getBoundingClientRect();
        const size = Math.max(rect.width, rect.height);
        circle.style.width = circle.style.height = size + 'px';
        circle.style.left = (e.clientX - rect.left - size/2) + 'px';
        circle.style.top = (e.clientY - rect.top - size/2) + 'px';
        btn.appendChild(circle);
        circle.addEventListener('animationend', () => circle.remove());
    });
});

// --- Smooth Scroll for Nav Links ---
document.querySelectorAll('.nav-links a[href^="#"]').forEach(link => {
    link.addEventListener('click', function(e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            window.scrollTo({
                top: target.offsetTop - 60,
                behavior: 'smooth'
            });
        }
    });
});

// --- Back to Top Button ---
// document.getElementById('backToTopBtn').onclick = () => {
//     window.scrollTo({ top: 0, behavior: 'smooth' });
// };

// --- Dynamic Projects Gallery ---
const projects = [
    {
        title: "➡️ Fake News Detector(LSTM)",
        desc: "This project develops a machine learning model using a Long Short-Term Memory (LSTM) neural network to classify news articles as real or fake based on their textual content. The goal is to leverage Natural Language Processing (NLP) and deep learning techniques to build a reliable, data-driven fake news detection system.",
        img: "./images/fake_news_detector.png",
        link: "https://github.com/jeanemmanuelk/Fake_news_Detector_LSTM"
    },
    {
        title: "📊 Landing Page Engagement A/B Testing",
        desc: "This project analyzes user engagement across two landing pages (Page A vs. Page B) using time-on-page as a proxy metric for effectiveness. It applies a complete A/B testing workflow, including statistical testing, confidence intervals, bootstrapping, and power analysis. Results are presented in a Jupyter notebook.",
        img: "./images/ab_testing.png",
        link: "https://github.com/jeanemmanuelk/page-engagement-ab-testing"
    },
    {
        title: "RegressLy (Automated regression Analysis tool)",
        desc: "RegressLy is a powerful and user-friendly regression analysis application designed to simplify data-driven decision-making for users of all technical backgrounds. Built with Python and Streamlit, RegressLy allows seamless data upload, model selection, and interactive visualization to generate actionable insights without needing advanced programming skills.",
        img: "./images/regressly.png",
        link: "https://github.com/jeanemmanuelk/RegressLy"
    },
    {
        title: "Resume MatchMate",
        desc: "This is an innovative web application designed to streamline the job application process. It utilizes advanced NLP techniques to match resumes with job descriptions, providing users with a compatibility score.",
        img: "./images/resume_matchmate.webp",
        link: "https://github.com/jeanemmanuelk/Resume-MatchMate"
    },
    {
        title: "SMS Spam Detector",
        desc: "Developed an NLP-based machine learning model to classify text messages into 'spam' or 'ham' (non-spam). I utilized the Naive Bayes classifier and fine-tuned it through hyperparameter optimization, achieving 98% accuracy in spam detection.",
        img: "./images/smsspamdet.jpeg",
        link: "https://github.com/jeanemmanuelk/Advanced-SMS-Spam-Filter"
    },
    {
        title: "Facial Emotion Detector",
        desc: "This project leverages deep learning to analyze and interpret real-time facial emotions from 48x48 pixel grayscale images. It features a custom-built CNN model for emotion detection, catering to dynamic content adaptation based on the user's emotional state.",
        img: "./images/facial_det_proj.png",
        link: "https://github.com/jeanemmanuelk/Facial-Emotion-Detection"
    }
    // Add more projects as needed
];

const gallery = document.getElementById('projectsGallery');
projects.forEach(proj => {
    const card = document.createElement('div');
    card.className = 'project-card';
    card.innerHTML = `
        <img class="project-thumb" src="${proj.img}" alt="${proj.title}">
        <div class="project-content">
            <div class="project-title">${proj.title}</div>
            <div class="project-desc">${proj.desc}</div>
            <a class="magic-btn project-link" href="${proj.link}" target="_blank">View on GitHub</a>
        </div>
    `;
    gallery.appendChild(card);
});

// --- Contact Form ---
document.getElementById('contactForm').onsubmit = function(e) {
    e.preventDefault();
    document.getElementById('contactMsg').textContent = "Thank you for reaching out! I'll get back to you soon.";
    this.reset();
};

// --- Hamburger Menu Toggle ---
const navToggle = document.getElementById('navToggle');
const navLinks = document.getElementById('navLinks');
if (navToggle && navLinks) {
    navToggle.addEventListener('click', () => {
        navLinks.classList.toggle('open');
    });
    // Optional: close menu when a link is clicked (for better UX)
    navLinks.querySelectorAll('a').forEach(link => {
        link.addEventListener('click', () => navLinks.classList.remove('open'));
    });
}
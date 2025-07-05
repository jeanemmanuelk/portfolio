document.addEventListener('DOMContentLoaded', function() {
    // Mobile menu toggle
    const menuToggle = document.querySelector('.menu-toggle');
    const navLinks = document.querySelector('.nav-links');
    
    menuToggle.addEventListener('click', function() {
        navLinks.classList.toggle('active');
        this.classList.toggle('active');
    });
    
    // Close mobile menu when clicking a link
    document.querySelectorAll('.nav-links a').forEach(link => {
        link.addEventListener('click', () => {
            navLinks.classList.remove('active');
            menuToggle.classList.remove('active');
        });
    });
    
    // Dark/light mode toggle
    const themeToggle = document.querySelector('.theme-toggle');
    const html = document.documentElement;
    
    themeToggle.addEventListener('click', function() {
        if (html.getAttribute('data-theme') === 'dark') {
            html.setAttribute('data-theme', 'light');
            localStorage.setItem('theme', 'light');
        } else {
            html.setAttribute('data-theme', 'dark');
            localStorage.setItem('theme', 'dark');
        }
    });
    
    // Check for saved theme preference
    const savedTheme = localStorage.getItem('theme') || 
                      (window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light');
    html.setAttribute('data-theme', savedTheme);
    
    // Project data
    const projects = [
        {
            id: "fake-news",
            title: "Fake News Detector (LSTM)",
            description: "Developed a machine learning model using a Long Short-Term Memory (LSTM) neural network to classify news articles as real or fake based on their textual content. The goal is to leverage Natural Language Processing (NLP) and deep learning techniques to build a reliable, data-driven fake news detection system.",
            technologies: ["Python", "TensorFlow", "LSTM", "NLP", "NLTK"],
            github: "https://github.com/jeanemmanuelk/Fake_news_Detector_LSTM",
            demo: "#",
            image: "./images/fake_news_detector.png",
            impact: [
                "Achieved 92% classification accuracy on test dataset",
                "Implemented custom attention mechanism to improve model interpretability",
                "Processed and cleaned dataset of 50,000+ news articles",
                "Deployed as Flask API for real-time classification"
            ]
        },
        {
            id: "ab-testing",
            title: "Landing Page Engagement A/B Testing",
            description: "Analyzed user engagement across two landing pages (Page A vs. Page B) using time-on-page as a proxy metric for effectiveness. Applied a complete A/B testing workflow, including statistical testing, confidence intervals, bootstrapping, and power analysis.",
            technologies: ["Python", "Pandas", "SciPy", "Matplotlib", "Jupyter"],
            github: "https://github.com/jeanemmanuelk/page-engagement-ab-testing",
            demo: "#",
            image: "./images/ab_testing.png",
            impact: [
                "Identified statistically significant 27% improvement in Page B engagement",
                "Calculated optimal sample size for future tests",
                "Created automated reporting dashboard for stakeholders",
                "Reduced testing cycle time by 40% through process optimization"
            ]
        },
        {
            id: "regressly",
            title: "RegressLy (Automated Regression Analysis Tool)",
            description: "RegressLy is a powerful and user-friendly regression analysis application designed to simplify data-driven decision-making for users of all technical backgrounds. Built with Python and Streamlit, RegressLy allows seamless data upload, model selection, and interactive visualization to generate actionable insights without needing advanced programming skills.",
            technologies: ["Python", "Streamlit", "Scikit-learn", "Pandas", "Plotly"],
            github: "https://github.com/jeanemmanuelk/RegressLy",
            demo: "#",
            image: "./images/regressly.png",
            impact: [
                "Enabled non-technical users to perform complex regression analysis",
                "Reduced model development time by 75% for common use cases",
                "Integrated 8 different regression algorithms with automated selection",
                "Deployed as web app with interactive visualizations"
            ]
        },
        {
            id: "resume-matcher",
            title: "Resume MatchMate",
            description: "An innovative web application designed to streamline the job application process. It utilizes advanced NLP techniques to match resumes with job descriptions, providing users with a compatibility score.",
            technologies: ["Python", "NLTK", "spaCy", "Flask", "JavaScript"],
            github: "https://github.com/jeanemmanuelk/Resume-MatchMate",
            demo: "#",
            image: "./images/resume_matchmate.webp",
            impact: [
                "Developed custom similarity scoring algorithm with 89% accuracy",
                "Processed 1000+ resume/job description pairs",
                "Reduced hiring manager screening time by 60%",
                "Implemented PDF parsing and text extraction"
            ]
        },
        {
            id: "spam-detector",
            title: "SMS Spam Detector",
            description: "Developed an NLP-based machine learning model to classify text messages into 'spam' or 'ham' (non-spam). Utilized the Naive Bayes classifier and fine-tuned it through hyperparameter optimization, achieving 98% accuracy in spam detection.",
            technologies: ["Python", "NLTK", "Scikit-learn", "Pandas", "Flask"],
            github: "https://github.com/jeanemmanuelk/Advanced-SMS-Spam-Filter",
            demo: "#",
            image: "./images/smsspamdet.jpeg",
            impact: [
                "Achieved 98% classification accuracy on test data",
                "Reduced false positives by 40% through feature engineering",
                "Deployed as real-time filtering API",
                "Processed 10,000+ SMS messages for training"
            ]
        },
        {
            id: "emotion-detector",
            title: "Facial Emotion Detector",
            description: "This project leverages deep learning to analyze and interpret real-time facial emotions from 48x48 pixel grayscale images. It features a custom-built CNN model for emotion detection, catering to dynamic content adaptation based on the user's emotional state.",
            technologies: ["Python", "TensorFlow", "OpenCV", "Keras", "CNN"],
            github: "https://github.com/jeanemmanuelk/Facial-Emotion-Detection",
            demo: "#",
            image: "./images/facial_det_proj.png",
            impact: [
                "Built CNN model with 75% accuracy on FER-2013 dataset",
                "Implemented real-time video processing pipeline",
                "Reduced model size by 60% through quantization",
                "Classified 7 distinct emotional states"
            ]
        }
    ];
    
    // Render projects
    const projectsGrid = document.getElementById('projectsGrid');
    
    projects.forEach(project => {
        const card = document.createElement('div');
        card.className = 'project-card';
        card.setAttribute('data-project', project.id);
        
        card.innerHTML = `
            <div class="project-thumbnail">
                <img src="${project.image}" alt="${project.title}" loading="lazy">
            </div>
            <div class="project-info">
                <h3>${project.title}</h3>
                <div class="tech-tags">
                    ${project.technologies.slice(0, 3).map(tech => `<span>${tech}</span>`).join('')}
                    ${project.technologies.length > 3 ? `<span>+${project.technologies.length - 3}</span>` : ''}
                </div>
            </div>
        `;
        
        projectsGrid.appendChild(card);
    });
    
    // Project modal functionality
    const modal = document.getElementById('project-modal');
    
    document.querySelectorAll('.project-card').forEach(card => {
        card.addEventListener('click', function() {
            const projectId = this.dataset.project;
            const project = projects.find(p => p.id === projectId);
            
            if (!project) return;
            
            // Update modal content
            document.getElementById('modal-title').textContent = project.title;
            document.getElementById('modal-description').textContent = project.description;
            document.getElementById('modal-image').src = project.image;
            document.getElementById('modal-image').alt = project.title;
            document.getElementById('github-link').href = project.github;
            
            // Update technologies
            const techContainer = document.getElementById('modal-tech');
            techContainer.innerHTML = '';
            project.technologies.forEach(tech => {
                const tag = document.createElement('span');
                tag.className = 'skill-tag';
                tag.textContent = tech;
                techContainer.appendChild(tag);
            });
            
            // Update impact points
            const impactList = document.getElementById('modal-impact');
            impactList.innerHTML = '';
            project.impact.forEach(point => {
                const li = document.createElement('li');
                li.textContent = point;
                impactList.appendChild(li);
            });
            
            // Show modal
            modal.classList.add('active');
            document.body.style.overflow = 'hidden';
        });
    });
    
    // Close modal
    document.querySelector('.close').addEventListener('click', function() {
        modal.classList.remove('active');
        document.body.style.overflow = 'auto';
    });
    
    window.addEventListener('click', function(event) {
        if (event.target === modal) {
            modal.classList.remove('active');
            document.body.style.overflow = 'auto';
        }
    });
    
    // Animate elements on scroll
    function animateOnScroll() {
        const elements = document.querySelectorAll('.skill-fill, .about-card, .project-card');
        
        elements.forEach(el => {
            const elementPosition = el.getBoundingClientRect().top;
            const screenPosition = window.innerHeight / 1.2;
            
            if (elementPosition < screenPosition) {
                el.classList.add('animate');
            }
        });
    }
    
    window.addEventListener('scroll', animateOnScroll);
    animateOnScroll(); // Run once on load
    
    // Set current year in footer
    document.getElementById('year').textContent = new Date().getFullYear();
    
    // Contact form submission
    const contactForm = document.getElementById('contactForm');
    if (contactForm) {
        contactForm.addEventListener('submit', function(e) {
            e.preventDefault();
            const form = this;
            const msgDiv = document.getElementById('contactMsg');
            msgDiv.textContent = "Sending...";
            
            fetch(form.action, {
                method: "POST",
                body: new FormData(form),
                headers: { 'Accept': 'application/json' }
            })
            .then(response => {
                if (response.ok) {
                    msgDiv.textContent = "Thank you for reaching out! I'll get back to you soon.";
                    form.reset();
                } else {
                    msgDiv.textContent = "Oops! Something went wrong. Please try again later.";
                }
            })
            .catch(() => {
                msgDiv.textContent = "Oops! Something went wrong. Please try again later.";
            });
        });
    }
    
    // Navbar scroll effect
    window.addEventListener('scroll', function() {
        const navbar = document.querySelector('.navbar');
        if (window.scrollY > 50) {
            navbar.classList.add('scrolled');
        } else {
            navbar.classList.remove('scrolled');
        }
    });
    
    // Initialize skill bars animation
    function animateSkillBars() {
        const skillBars = document.querySelectorAll('.skill-fill');
        
        skillBars.forEach(bar => {
            const width = bar.getAttribute('data-width');
            bar.style.width = width;
        });
    }
    
    animateSkillBars();
});

// Resume Preview Functionality
document.addEventListener('DOMContentLoaded', function() {
    const resumeEmbed = document.getElementById('resumeEmbed');
    const downloadBtn = document.getElementById('downloadResume');
    const expandBtn = document.getElementById('expandResume');
    const resumeModal = document.getElementById('resumeModal');
    
    // Embed the PDF preview (using PDF.js or native browser PDF viewer)
    function embedResume() {
        // Replace with your actual resume PDF path
        const resumeUrl = './resume.pdf';
        
        // Modern browsers can display PDFs natively with <embed>
        resumeEmbed.innerHTML = `
            <embed src="${resumeUrl}#toolbar=0&navpanes=0&scrollbar=0" 
                   type="application/pdf" 
                   width="100%" 
                   height="100%">
        `;
        
        // Alternative using PDF.js if you need more control:
        // initPDFJSViewer(resumeUrl);
    }
    
    // Download functionality
    downloadBtn.addEventListener('click', function() {
        const link = document.createElement('a');
        link.href = './resume.pdf';
        link.download = 'Jean-Emmanuel-Kouadio-Resume.pdf';
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
    });
    
    // Fullscreen view
    expandBtn.addEventListener('click', function() {
        const iframe = document.getElementById('fullResume');
        iframe.src = './resume.pdf#toolbar=0&navpanes=0';
        resumeModal.classList.add('active');
        document.body.style.overflow = 'hidden';
    });
    
    // Close modal
    resumeModal.querySelector('.close').addEventListener('click', function() {
        resumeModal.classList.remove('active');
        document.body.style.overflow = 'auto';
    });
    
    // Initialize the preview
    embedResume();
});

/* Optional: If you want to use PDF.js for better rendering control
function initPDFJSViewer(pdfUrl) {
    // Load PDF.js library dynamically
    const script = document.createElement('script');
    script.src = 'https://cdnjs.cloudflare.com/ajax/libs/pdf.js/2.11.338/pdf.min.js';
    script.onload = function() {
        // Set worker path
        pdfjsLib.GlobalWorkerOptions.workerSrc = 
            'https://cdnjs.cloudflare.com/ajax/libs/pdf.js/2.11.338/pdf.worker.min.js';
        
        // Load the PDF
        pdfjsLib.getDocument(pdfUrl).promise.then(function(pdf) {
            pdf.getPage(1).then(function(page) {
                const viewport = page.getViewport({ scale: 1.5 });
                const canvas = document.createElement('canvas');
                const context = canvas.getContext('2d');
                canvas.height = viewport.height;
                canvas.width = viewport.width;
                
                document.getElementById('resumeEmbed').innerHTML = '';
                document.getElementById('resumeEmbed').appendChild(canvas);
                
                page.render({
                    canvasContext: context,
                    viewport: viewport
                });
            });
        });
    };
    document.head.appendChild(script);
}
*/
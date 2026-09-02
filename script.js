/**
 * ALEXIS SERANO - PORTFOLIO INTERACTIVE CORE ENGINE 2026
 * Particle Canvas, Interactive Terminal, 3D Card Tilt, Project Filters, Load More & Dock Navigator
 */

document.addEventListener('DOMContentLoaded', () => {
    initScrollProgress();
    initParticleCanvas();
    initTypewriter();
    initTerminal();
    initTerminalToggle();
    initProjectFiltersAndLoadMore();
    initTiltEffect();
    initMobileNav();
    initToastAndClipboard();
    initBackToTop();
    initFloatingDock();
    // 🚀 New mega features
    initScrollReveal();
    initAnimatedCounters();
    initCardSpotlight();
    initMagneticButtons();
    initSmoothPageTransitions();
});

/* ==========================================================================
   1. SCROLL PROGRESS BAR
   ========================================================================== */
function initScrollProgress() {
    const progressBar = document.getElementById('scroll-progress');
    if (!progressBar) return;

    window.addEventListener('scroll', () => {
        const winScroll = document.documentElement.scrollTop || document.body.scrollTop;
        const height = document.documentElement.scrollHeight - document.documentElement.clientHeight;
        const scrolled = height > 0 ? (winScroll / height) * 100 : 0;
        progressBar.style.width = scrolled + '%';
    });
}

/* ==========================================================================
   2. INTERACTIVE PARTICLE CANVAS (60 FPS, Performance-friendly)
   ========================================================================== */
function initParticleCanvas() {
    const canvas = document.getElementById('bg-canvas');
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    let width, height;
    let particles = [];
    const particleCount = window.innerWidth < 768 ? 35 : 80;
    const maxDistance = 140;

    // Multi-color palette for particles
    const particleColors = [
        { r: 0, g: 242, b: 254 },   // cyan
        { r: 99, g: 102, b: 241 },   // indigo
        { r: 168, g: 85, b: 247 },   // purple
        { r: 79, g: 172, b: 254 },   // blue
        { r: 236, g: 72, b: 153 },   // pink
    ];

    let mouse = {
        x: null,
        y: null,
        radius: 160
    };

    function resize() {
        width = canvas.width = window.innerWidth;
        height = canvas.height = window.innerHeight;
    }
    resize();
    window.addEventListener('resize', resize);

    window.addEventListener('mousemove', (e) => {
        mouse.x = e.clientX;
        mouse.y = e.clientY;
    });

    window.addEventListener('mouseleave', () => {
        mouse.x = null;
        mouse.y = null;
    });

    class Particle {
        constructor() {
            this.x = Math.random() * width;
            this.y = Math.random() * height;
            this.vx = (Math.random() - 0.5) * 0.6;
            this.vy = (Math.random() - 0.5) * 0.6;
            this.radius = Math.random() * 2.2 + 0.8;
            this.baseAlpha = Math.random() * 0.5 + 0.15;
            this.color = particleColors[Math.floor(Math.random() * particleColors.length)];
            this.pulseOffset = Math.random() * Math.PI * 2;
        }

        update(time) {
            this.x += this.vx;
            this.y += this.vy;

            if (this.x < 0 || this.x > width) this.vx = -this.vx;
            if (this.y < 0 || this.y > height) this.vy = -this.vy;

            // Subtle pulse
            this.currentAlpha = this.baseAlpha + Math.sin(time * 0.001 + this.pulseOffset) * 0.08;

            // Mouse interaction — push away
            if (mouse.x !== null && mouse.y !== null) {
                const dx = mouse.x - this.x;
                const dy = mouse.y - this.y;
                const dist = Math.sqrt(dx * dx + dy * dy);
                if (dist < mouse.radius) {
                    const force = (mouse.radius - dist) / mouse.radius;
                    const dirX = (dx / dist) * force * 1.5;
                    const dirY = (dy / dist) * force * 1.5;
                    this.x -= dirX;
                    this.y -= dirY;
                }
            }
        }

        draw() {
            ctx.beginPath();
            ctx.arc(this.x, this.y, this.radius, 0, Math.PI * 2);
            ctx.fillStyle = `rgba(${this.color.r}, ${this.color.g}, ${this.color.b}, ${this.currentAlpha})`;
            ctx.shadowBlur = 8;
            ctx.shadowColor = `rgba(${this.color.r}, ${this.color.g}, ${this.color.b}, 0.5)`;
            ctx.fill();
            ctx.shadowBlur = 0;
        }
    }

    for (let i = 0; i < particleCount; i++) {
        particles.push(new Particle());
    }

    function animate(time) {
        ctx.clearRect(0, 0, width, height);

        for (let i = 0; i < particles.length; i++) {
            particles[i].update(time);
            particles[i].draw();

            // Connect nearby particles with colored lines
            for (let j = i + 1; j < particles.length; j++) {
                const dx = particles[i].x - particles[j].x;
                const dy = particles[i].y - particles[j].y;
                const dist = Math.sqrt(dx * dx + dy * dy);

                if (dist < maxDistance) {
                    const alpha = (1 - dist / maxDistance) * 0.2;
                    // Blend colors between connected particles
                    const avgR = Math.round((particles[i].color.r + particles[j].color.r) / 2);
                    const avgG = Math.round((particles[i].color.g + particles[j].color.g) / 2);
                    const avgB = Math.round((particles[i].color.b + particles[j].color.b) / 2);
                    ctx.beginPath();
                    ctx.moveTo(particles[i].x, particles[i].y);
                    ctx.lineTo(particles[j].x, particles[j].y);
                    ctx.strokeStyle = `rgba(${avgR}, ${avgG}, ${avgB}, ${alpha})`;
                    ctx.lineWidth = 0.7;
                    ctx.stroke();
                }
            }
        }
        requestAnimationFrame(animate);
    }
    animate(0);
}

/* ==========================================================================
   3. TYPEWRITER EFFECT
   ========================================================================== */
function initTypewriter() {
    const target = document.getElementById('typewriter-text');
    if (!target) return;

    const phrases = [
        "Alternant Développeur Embarqué @ Carrier Culoz SA",
        "Étudiant en 3ème année de BUT Informatique (IUT2)",
        "Développeur Full-Stack & Logiciel",
        "Passionné DevOps, Infra & Automatisation",
        "Explorateur IA & Machine Learning",
        "Monteur Vidéo & Créateur Numérique"
    ];

    let phraseIndex = 0;
    let charIndex = 0;
    let isDeleting = false;
    let typeSpeed = 65;

    function typeLoop() {
        const currentPhrase = phrases[phraseIndex];

        if (isDeleting) {
            target.textContent = currentPhrase.substring(0, charIndex - 1);
            charIndex--;
            typeSpeed = 30;
        } else {
            target.textContent = currentPhrase.substring(0, charIndex + 1);
            charIndex++;
            typeSpeed = 65;
        }

        if (!isDeleting && charIndex === currentPhrase.length) {
            typeSpeed = 2200; // Pause at end of phrase
            isDeleting = true;
        } else if (isDeleting && charIndex === 0) {
            isDeleting = false;
            phraseIndex = (phraseIndex + 1) % phrases.length;
            typeSpeed = 500; // Pause before typing new phrase
        }

        setTimeout(typeLoop, typeSpeed);
    }

    typeLoop();
}

/* ==========================================================================
   4. COLLAPSIBLE TERMINAL COMPONENT
   ========================================================================== */
function initTerminal() {
    const body = document.getElementById('terminal-body');
    const input = document.getElementById('terminal-cmd-input') || document.getElementById('terminal-input');
    const quickBadges = document.querySelectorAll('.cmd-badge');

    if (!body || !input) return;

    const commands = {
        help: `Commandes disponibles :
  <span class="t-cyan">about</span>       : Présentation d'Alexis Serano
  <span class="t-cyan">carrier</span>     : Alternance chez Carrier Culoz SA (Systèmes Embarqués)
  <span class="t-cyan">skills</span>      : Stack technologique & compétences
  <span class="t-cyan">projects</span>    : Liste des projets phares
  <span class="t-cyan">algofy</span>      : Détails du projet Algofy (SaaS Trading)
  <span class="t-cyan">lifeos</span>      : Détails du projet LifeOS (Second Brain)
  <span class="t-cyan">contact</span>     : Coordonnées & réseaux
  <span class="t-cyan">clear</span>       : Efface l'écran du terminal`,

        about: `<span class="t-green">Alexis Serano</span>
  - En alternance chez <span class="t-cyan">Carrier Culoz SA</span> (Programmation embarquée CVC / automates)
  - Étudiant en 3ème année de BUT Informatique à l'IUT2 de Grenoble
  - Localisation : Culoz (01) & Grenoble (38) | Permis B
  - Passionné par le dev applicatif, l'embarqué, le DevOps et l'IA
  - Autonome, rigoureux et adepte de défis techniques concrets`,

        carrier: `<span class="t-green">🏭 Carrier Culoz SA — Alternance Développeur Embarqué</span>
  <span class="t-purple">Période :</span> 31/08/2026 → 02/07/2027 (3ème année BUT Info)
  <span class="t-yellow">Missions :</span>
  → Programmation embarquée sur automates de traitement de l'air (HVAC / CVC)
  → Migration du logiciel propriétaire Carrel vers la plateforme STone
  → Développement en langage Structured Text (ST / IEC 61131-3)
  → Environnement industriel haute exigence de régulation
  → <a href="experiences_pro/experience_alternance_carrier.html" class="t-cyan">Voir la fiche complète →</a>`,

        skills: `<span class="t-purple">Stack Technique :</span>
  - Embarqué  : Langage ST (Structured Text), Automates programmables, C/C++
  - Web       : HTML5, CSS3, JavaScript, PHP, Symfony, Node.js, React
  - Logiciel  : Java, JavaFX, C#, .NET, Python, FastAPI, Django
  - Infra/Ops : Docker, Kubernetes, PowerShell, Nginx, Linux, Systemd
  - Données   : MySQL, MariaDB, SQLite, PostgreSQL, Redis
  - Multimédia: Adobe Premiere Pro, After Effects, Photoshop`,

        projects: `<span class="t-yellow">Projets Clés :</span>
  0. <span class="t-cyan">[PRO]</span> <span class="t-green">★</span> Alternance Carrier Culoz SA (Automates industriels, Langage ST)
  1. <span class="t-cyan">[PRO]</span> Stage DSI CHAI (Automatisation PowerShell & Cluster K8s)
  2. <span class="t-cyan">[BUT]</span> Chronia (Plateforme d'aide à la personne)
  3. <span class="t-cyan">[BUT]</span> Agence de Voyages (Logiciel JavaFX)
  4. <span class="t-cyan">[ACAD]</span> Chatenger (Messagerie dynamique PHP/SQL)
  5. <span class="t-cyan">[PERSO]</span> Modèle Neurone (TensorFlow/Python) & Jeu de la Vie
  6. <span class="t-cyan">[PERSO]</span> <span class="t-green">★</span> Algofy (SaaS Trading Algorithmique - Django/React/Docker)
  7. <span class="t-cyan">[PERSO]</span> <span class="t-green">★</span> LifeOS (Second Brain & Algo-Trading - FastAPI/React)
  → Tapez <span class="t-cyan">carrier</span>, <span class="t-cyan">algofy</span> ou <span class="t-cyan">lifeos</span> pour plus de détails.`,

        algofy: `<span class="t-green">🤖 Algofy — Plateforme SaaS de Trading Algorithmique</span>
  <span class="t-purple">Stack :</span> Django REST • React/Vite • Docker • PostgreSQL • Hyperliquid API
  <span class="t-yellow">Highlights :</span>
  → Infrastructure conteneurisée Docker (Backend + Frontend + DB)
  → Bots de trading 24/7 via systemctl (VPS Linux)
  → Chiffrement AES-256/Fernet des clés API
  → Monétisation Stripe + Système d'affiliation Connect
  → Contrôle & alertes temps réel via Bot Telegram
  → Moteur de backtest basé sur les macro-cycles Bitcoin
  <span class="t-cyan">Type :</span> Projet Personnel SaaS / Fintech (Dev Solo)
  → <a href="projets_personnels/projet_algofy.html" class="t-cyan">Voir la fiche complète →</a>`,

        lifeos: `<span class="t-green">🧠 LifeOS — Operating System Personnel & Algo-Trading</span>
  <span class="t-purple">Stack :</span> FastAPI • React/TypeScript • PostgreSQL • Redis • Celery • Docker
  <span class="t-yellow">Highlights :</span>
  → +30 modules applicatifs (Journal, Nutrition, Santé, Finances...)
  → Parseur CSV universel multi-exchanges (Blofin, Binance, Kraken...)
  → Bots de trading autonomes (systemctl + Hyperliquid API)
  → Architecture Microservices (Docker Compose + Celery Workers)
  → Dashboard financier & cartes de chaleur Leaflet
  → Pilotage complet via Bot Telegram
  <span class="t-cyan">Type :</span> Projet d'ingénierie système personnel (Dev Solo)
  → <a href="projets_personnels/projet_lifeos.html" class="t-cyan">Voir la fiche complète →</a>`,

        contact: `<span class="t-green">Contact & Liens :</span>
  - Email    : <a href="mailto:alexis.seranoo@gmail.com" class="t-cyan">alexis.seranoo@gmail.com</a>
  - GitHub   : <a href="https://github.com/AlexisSerano" target="_blank" class="t-cyan">github.com/AlexisSerano</a>
  - Statut   : En alternance chez Carrier Culoz SA`,

        whoami: `alexis@portfolio: visitor_guest [privileges: read-only]`,

        sudo: `<span class="t-yellow">Permission denied: Alexis is the only root administrator here! 😉</span>`
    };

    function executeCommand(cmd) {
        const cleanCmd = cmd.trim().toLowerCase();
        
        const cmdLine = document.createElement('div');
        cmdLine.innerHTML = `<span class="t-prompt">alexis@portfolio:~$</span> <span>${escapeHtml(cmd)}</span>`;
        body.insertBefore(cmdLine, body.lastElementChild);

        if (cleanCmd === 'clear') {
            const lines = body.querySelectorAll('div:not(.terminal-input-row)');
            lines.forEach(l => l.remove());
            return;
        }

        const resLine = document.createElement('div');
        resLine.className = 'terminal-output';

        if (commands[cleanCmd]) {
            resLine.innerHTML = commands[cleanCmd];
        } else if (cleanCmd === '') {
            return;
        } else {
            resLine.innerHTML = `Commande non reconnue : "${escapeHtml(cleanCmd)}". Tapez <span class="t-cyan">help</span> pour la liste.`;
        }

        body.insertBefore(resLine, body.lastElementChild);
        body.scrollTop = body.scrollHeight;
    }

    input.addEventListener('keydown', (e) => {
        if (e.key === 'Enter') {
            const val = input.value;
            executeCommand(val);
            input.value = '';
        }
    });

    quickBadges.forEach(badge => {
        badge.addEventListener('click', () => {
            const cmd = badge.getAttribute('data-cmd') || badge.textContent.trim();
            executeCommand(cmd);
        });
    });

    function escapeHtml(text) {
        return text.replace(/[&<>"']/g, function(m) {
            return { '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[m];
        });
    }
}

function initTerminalToggle() {
    const termWindow = document.querySelector('.terminal-window');
    const toggleBtn = document.getElementById('terminal-toggle-btn');
    const header = document.querySelector('.terminal-header');
    if (!termWindow || !toggleBtn || !header) return;

    function toggle() {
        const isCollapsed = termWindow.classList.toggle('is-collapsed');
        toggleBtn.textContent = isCollapsed ? "Déplier [+]" : "Réduire [-]";
    }

    toggleBtn.addEventListener('click', (e) => {
        e.stopPropagation();
        toggle();
    });

    header.addEventListener('click', toggle);
}

/* ==========================================================================
   5. PROJECT FILTERS & SMART LOAD MORE
   ========================================================================== */
function initProjectFiltersAndLoadMore() {
    const filterBtns = document.querySelectorAll('.filter-btn');
    const projectCards = document.querySelectorAll('.project-card');
    const toggleBtn = document.getElementById('toggle-projects-btn');
    const loadMoreContainer = document.querySelector('.load-more-container');
    if (!filterBtns.length || !projectCards.length) return;

    let isExpanded = false;
    let currentFilter = 'all';

    // Mark extra projects on initial state (show top 5 featured/main projects)
    const initialVisibleCount = 5;
    projectCards.forEach((card, index) => {
        if (index >= initialVisibleCount) {
            card.classList.add('is-extra');
        }
    });

    function applyFilterAndVisibility() {
        let matchingCount = 0;

        projectCards.forEach((card) => {
            const category = card.getAttribute('data-category');
            const matchesFilter = (currentFilter === 'all' || category === currentFilter);

            if (!matchesFilter) {
                card.classList.add('is-hidden');
            } else {
                card.classList.remove('is-hidden');
                matchingCount++;

                // In 'all' view, respect load more state
                if (currentFilter === 'all') {
                    if (card.classList.contains('is-extra') && !isExpanded) {
                        card.classList.remove('is-revealed');
                    } else if (card.classList.contains('is-extra') && isExpanded) {
                        card.classList.add('is-revealed');
                    }
                } else {
                    // In specific filter view, show all matching cards
                    card.classList.add('is-revealed');
                }
            }
        });

        // Hide load more button if not on 'all' tab or if matching cards <= initial count
        if (loadMoreContainer) {
            if (currentFilter !== 'all') {
                loadMoreContainer.style.display = 'none';
            } else {
                loadMoreContainer.style.display = 'block';
            }
        }
    }

    filterBtns.forEach(btn => {
        btn.addEventListener('click', () => {
            filterBtns.forEach(b => b.classList.remove('active'));
            btn.classList.add('active');
            currentFilter = btn.getAttribute('data-filter');
            applyFilterAndVisibility();
        });
    });

    if (toggleBtn) {
        toggleBtn.addEventListener('click', () => {
            isExpanded = !isExpanded;
            toggleBtn.classList.toggle('is-expanded', isExpanded);

            const btnText = toggleBtn.querySelector('.btn-text');
            if (btnText) {
                btnText.textContent = isExpanded ? "Réduire l'affichage" : "Afficher tous les projets (13)";
            }

            applyFilterAndVisibility();

            // Smooth scroll back to projects if collapsing
            if (!isExpanded) {
                const projectsSection = document.getElementById('projets');
                if (projectsSection) {
                    projectsSection.scrollIntoView({ behavior: 'smooth', block: 'start' });
                }
            }
        });
    }

    applyFilterAndVisibility();
}

/* ==========================================================================
   6. 3D CARD TILT & MOUSE SPOTLIGHT (Desktop only)
   ========================================================================== */
function initTiltEffect() {
    if (window.matchMedia('(hover: hover) and (pointer: fine)').matches) {
        const cards = document.querySelectorAll('.project-card, .bento-card');

        cards.forEach(card => {
            card.addEventListener('mousemove', (e) => {
                const rect = card.getBoundingClientRect();
                const x = e.clientX - rect.left;
                const y = e.clientY - rect.top;
                
                const centerX = rect.width / 2;
                const centerY = rect.height / 2;
                const rotateX = ((y - centerY) / centerY) * -4;
                const rotateY = ((x - centerX) / centerX) * 4;

                card.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) translateY(-5px)`;
            });

            card.addEventListener('mouseleave', () => {
                card.style.transform = 'perspective(1000px) rotateX(0deg) rotateY(0deg) translateY(0)';
            });
        });
    }
}

/* ==========================================================================
   7. FLOATING SECTION DOCK NAVIGATOR (Quick TOC Teleportation)
   ========================================================================== */
function initFloatingDock() {
    const dots = document.querySelectorAll('.dock-dot');
    if (!dots.length) return;

    const sections = Array.from(dots).map(dot => {
        const targetId = dot.getAttribute('data-target');
        return document.getElementById(targetId);
    }).filter(Boolean);

    window.addEventListener('scroll', () => {
        const scrollPos = window.scrollY + window.innerHeight / 3;

        sections.forEach((sec, idx) => {
            if (sec) {
                const top = sec.offsetTop;
                const height = sec.offsetHeight;

                if (scrollPos >= top && scrollPos < top + height) {
                    dots.forEach(d => d.classList.remove('active'));
                    if (dots[idx]) dots[idx].classList.add('active');
                }
            }
        });
    });

    dots.forEach(dot => {
        dot.addEventListener('click', () => {
            const targetId = dot.getAttribute('data-target');
            const targetEl = document.getElementById(targetId);
            if (targetEl) {
                targetEl.scrollIntoView({ behavior: 'smooth' });
            }
        });
    });
}

/* ==========================================================================
   8. MOBILE NAVIGATION TOGGLE
   ========================================================================== */
function initMobileNav() {
    const toggleBtn = document.querySelector('.mobile-toggle');
    const mainNav = document.querySelector('.main-nav');
    if (!toggleBtn || !mainNav) return;

    toggleBtn.addEventListener('click', () => {
        mainNav.classList.toggle('mobile-active');
    });

    const navLinks = document.querySelectorAll('.nav-link, .dropdown-link');
    navLinks.forEach(link => {
        link.addEventListener('click', () => {
            if (mainNav.classList.contains('mobile-active')) {
                mainNav.classList.remove('mobile-active');
            }
        });
    });
}

/* ==========================================================================
   9. TOAST NOTIFICATIONS & COPY EMAIL
   ========================================================================== */
function initToastAndClipboard() {
    const copyTriggers = document.querySelectorAll('.copy-email-btn');
    const toast = document.getElementById('toast-notification');
    const toastMessage = document.getElementById('toast-message');

    window.showToast = function(msg) {
        if (!toast) return;
        if (toastMessage) toastMessage.textContent = msg;
        toast.classList.add('show');
        setTimeout(() => {
            toast.classList.remove('show');
        }, 3200);
    };

    copyTriggers.forEach(btn => {
        btn.addEventListener('click', (e) => {
            e.preventDefault();
            const email = "alexis.seranoo@gmail.com";
            navigator.clipboard.writeText(email).then(() => {
                window.showToast("Email alexis.seranoo@gmail.com copié !");
            }).catch(() => {
                window.location.href = `mailto:${email}`;
            });
        });
    });
}

/* ==========================================================================
   10. BACK TO TOP BUTTON
   ========================================================================== */
function initBackToTop() {
    const btn = document.getElementById('back-to-top');
    if (!btn) return;

    window.addEventListener('scroll', () => {
        if (window.scrollY > 400) {
            btn.classList.add('visible');
        } else {
            btn.classList.remove('visible');
        }
    });

    btn.addEventListener('click', () => {
        window.scrollTo({
            top: 0,
            behavior: 'smooth'
        });
    });
}

/* ==========================================================================
   🚀 11. SCROLL REVEAL — IntersectionObserver Animations
   ========================================================================== */
function initScrollReveal() {
    const revealElements = document.querySelectorAll('.reveal, .reveal-left, .reveal-right, .reveal-scale');
    if (!revealElements.length) return;

    const observerOptions = {
        root: null,
        rootMargin: '0px 0px -60px 0px',
        threshold: 0.1
    };

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('is-visible');
                observer.unobserve(entry.target); // Only animate once
            }
        });
    }, observerOptions);

    revealElements.forEach(el => {
        observer.observe(el);
    });

    // Auto-add staggered delays to project cards and bento cards
    const projectCards = document.querySelectorAll('.projects-grid .project-card');
    projectCards.forEach((card, index) => {
        card.classList.add('reveal');
        card.style.setProperty('--delay', `${index * 0.08}s`);
        observer.observe(card);
    });

    const bentoCards = document.querySelectorAll('.about-bento-grid .bento-card');
    bentoCards.forEach((card, index) => {
        card.classList.add('reveal');
        card.style.setProperty('--delay', `${index * 0.1}s`);
        observer.observe(card);
    });
}

/* ==========================================================================
   🚀 12. ANIMATED COUNTERS — Stats Banner
   ========================================================================== */
function initAnimatedCounters() {
    const statNumbers = document.querySelectorAll('.stat-number');
    if (!statNumbers.length) return;

    function animateValue(element, target, suffix = '', duration = 1500) {
        const start = 0;
        const startTime = performance.now();
        const isNumber = !isNaN(target);

        if (!isNumber) {
            // For non-numeric values like "3ème" or "100%", just set immediately
            return;
        }

        function update(currentTime) {
            const elapsed = currentTime - startTime;
            const progress = Math.min(elapsed / duration, 1);
            // Ease out cubic
            const easeOut = 1 - Math.pow(1 - progress, 3);
            const current = Math.round(start + (target - start) * easeOut);
            element.textContent = current + suffix;

            if (progress < 1) {
                requestAnimationFrame(update);
            }
        }

        requestAnimationFrame(update);
    }

    const observerOptions = {
        root: null,
        threshold: 0.3
    };

    const counterObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const el = entry.target;
                const text = el.textContent.trim();

                // Parse the stat value
                if (text.includes('1800')) {
                    animateValue(el, 1800, '+', 2000);
                } else if (text.includes('100')) {
                    animateValue(el, 100, '%', 1500);
                } else if (text.includes('10') || text.includes('13')) {
                    animateValue(el, 13, '+', 1200);
                }
                // "3ème" stays as text

                counterObserver.unobserve(el);
            }
        });
    }, observerOptions);

    statNumbers.forEach(stat => {
        counterObserver.observe(stat);
    });
}

/* ==========================================================================
   🚀 13. CARD SPOTLIGHT — Mouse-Follow Radial Gradient
   ========================================================================== */
function initCardSpotlight() {
    if (!window.matchMedia('(hover: hover) and (pointer: fine)').matches) return;

    const cards = document.querySelectorAll('.project-card, .bento-card, .timeline-card');

    cards.forEach(card => {
        card.addEventListener('mousemove', (e) => {
            const rect = card.getBoundingClientRect();
            const x = e.clientX - rect.left;
            const y = e.clientY - rect.top;

            card.style.setProperty('--spotlight-x', `${x}px`);
            card.style.setProperty('--spotlight-y', `${y}px`);
            card.style.setProperty('--spotlight-opacity', '1');
        });

        card.addEventListener('mouseleave', () => {
            card.style.setProperty('--spotlight-opacity', '0');
        });
    });
}

/* ==========================================================================
   🚀 14. MAGNETIC BUTTONS — Subtle Pull Effect on CTA
   ========================================================================== */
function initMagneticButtons() {
    if (!window.matchMedia('(hover: hover) and (pointer: fine)').matches) return;

    const buttons = document.querySelectorAll('.btn-primary, .btn-secondary, .btn-contact-nav');

    buttons.forEach(btn => {
        btn.classList.add('btn-magnetic');

        btn.addEventListener('mousemove', (e) => {
            const rect = btn.getBoundingClientRect();
            const x = e.clientX - rect.left - rect.width / 2;
            const y = e.clientY - rect.top - rect.height / 2;

            btn.style.transform = `translate(${x * 0.15}px, ${y * 0.15}px)`;
        });

        btn.addEventListener('mouseleave', () => {
            btn.style.transform = 'translate(0, 0)';
        });
    });
}

/* ==========================================================================
   🚀 15. SMOOTH PAGE TRANSITIONS — Fade In/Out Between Pages
   ========================================================================== */
function initSmoothPageTransitions() {
    window.addEventListener('pageshow', () => {
        document.body.style.opacity = '1';
        document.body.style.filter = 'none';
    });

    const allInternalLinks = document.querySelectorAll('a[href]:not([href^="#"]):not([href^="mailto"]):not([href^="http"]):not([target="_blank"])');

    allInternalLinks.forEach(link => {
        link.addEventListener('click', (e) => {
            const href = link.getAttribute('href');
            if (!href || href.startsWith('#') || href.startsWith('mailto') || href.startsWith('http')) return;

            e.preventDefault();
            document.body.style.transition = 'opacity 0.25s ease, filter 0.25s ease';
            document.body.style.opacity = '0';
            document.body.style.filter = 'blur(4px)';

            setTimeout(() => {
                window.location.href = href;
            }, 250);
        });
    });
}

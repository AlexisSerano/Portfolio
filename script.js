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
    const particleCount = window.innerWidth < 768 ? 30 : 65;
    const maxDistance = 130;

    let mouse = {
        x: null,
        y: null,
        radius: 140
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
            this.vx = (Math.random() - 0.5) * 0.7;
            this.vy = (Math.random() - 0.5) * 0.7;
            this.radius = Math.random() * 2 + 1;
            this.baseAlpha = Math.random() * 0.45 + 0.15;
        }

        update() {
            this.x += this.vx;
            this.y += this.vy;

            if (this.x < 0 || this.x > width) this.vx = -this.vx;
            if (this.y < 0 || this.y > height) this.vy = -this.vy;

            // Mouse interaction
            if (mouse.x !== null && mouse.y !== null) {
                const dx = mouse.x - this.x;
                const dy = mouse.y - this.y;
                const dist = Math.sqrt(dx * dx + dy * dy);
                if (dist < mouse.radius) {
                    const force = (mouse.radius - dist) / mouse.radius;
                    const dirX = (dx / dist) * force * 1.2;
                    const dirY = (dy / dist) * force * 1.2;
                    this.x -= dirX;
                    this.y -= dirY;
                }
            }
        }

        draw() {
            ctx.beginPath();
            ctx.arc(this.x, this.y, this.radius, 0, Math.PI * 2);
            ctx.fillStyle = `rgba(0, 242, 254, ${this.baseAlpha})`;
            ctx.shadowBlur = 6;
            ctx.shadowColor = '#00f2fe';
            ctx.fill();
            ctx.shadowBlur = 0;
        }
    }

    for (let i = 0; i < particleCount; i++) {
        particles.push(new Particle());
    }

    function animate() {
        ctx.clearRect(0, 0, width, height);

        for (let i = 0; i < particles.length; i++) {
            particles[i].update();
            particles[i].draw();

            // Connect nearby particles
            for (let j = i + 1; j < particles.length; j++) {
                const dx = particles[i].x - particles[j].x;
                const dy = particles[i].y - particles[j].y;
                const dist = Math.sqrt(dx * dx + dy * dy);

                if (dist < maxDistance) {
                    const alpha = (1 - dist / maxDistance) * 0.22;
                    ctx.beginPath();
                    ctx.moveTo(particles[i].x, particles[i].y);
                    ctx.lineTo(particles[j].x, particles[j].y);
                    ctx.strokeStyle = `rgba(99, 102, 241, ${alpha})`;
                    ctx.lineWidth = 0.75;
                    ctx.stroke();
                }
            }
        }
        requestAnimationFrame(animate);
    }
    animate();
}

/* ==========================================================================
   3. TYPEWRITER EFFECT
   ========================================================================== */
function initTypewriter() {
    const target = document.getElementById('typewriter-text');
    if (!target) return;

    const phrases = [
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
            typeSpeed = 2200; // Pause at full text
            isDeleting = true;
        } else if (isDeleting && charIndex === 0) {
            isDeleting = false;
            phraseIndex = (phraseIndex + 1) % phrases.length;
            typeSpeed = 450;
        }

        setTimeout(typeLoop, typeSpeed);
    }

    typeLoop();
}

/* ==========================================================================
   4. INTERACTIVE DEVELOPER TERMINAL & COLLAPSE TOGGLE
   ========================================================================== */
function initTerminal() {
    const input = document.getElementById('terminal-cmd-input');
    const body = document.getElementById('terminal-body');
    const quickBadges = document.querySelectorAll('.cmd-badge');
    if (!input || !body) return;

    const commands = {
        help: `Commandes disponibles :
  <span class="t-cyan">about</span>       : Présentation d'Alexis Serano
  <span class="t-cyan">skills</span>      : Stack technologique & compétences
  <span class="t-cyan">projects</span>    : Liste des projets phares
  <span class="t-cyan">contact</span>     : Coordonnées & réseaux
  <span class="t-cyan">matrix</span>      : Easter egg Cyber Matrix
  <span class="t-cyan">clear</span>       : Efface l'écran du terminal`,

        about: `<span class="t-green">Alexis Serano</span>
  - Étudiant en 3ème année de BUT Informatique à l'IUT2 de Grenoble
  - Passionné par le dev applicatif, l'architecture logicielle, le DevOps et l'IA
  - Autonome, rigoureux et adepte de défis techniques concrets`,

        skills: `<span class="t-purple">Stack Technique :</span>
  - Web       : HTML5, CSS3, JavaScript, PHP, Symfony, Node.js
  - Logiciel  : Java, JavaFX, C#, .NET, Python, C/C++
  - Infra/Ops : Docker, Kubernetes, PowerShell, Nginx, Linux
  - Données   : MySQL, MariaDB, SQLite, PostgreSQL
  - Multimédia: Adobe Premiere Pro, After Effects, Photoshop`,

        projects: `<span class="t-yellow">Projets Clés :</span>
  1. <span class="t-cyan">[PRO]</span> Stage DSI CHAI (Automatisation PowerShell & Cluster K8s)
  2. <span class="t-cyan">[BUT]</span> Chronia (Plateforme d'aide à la personne)
  3. <span class="t-cyan">[BUT]</span> Agence de Voyages (Logiciel JavaFX)
  4. <span class="t-cyan">[PERSO]</span> Chatenger (Messagerie dynamique PHP/SQL)
  5. <span class="t-cyan">[PERSO]</span> Modèle Neurone (TensorFlow/Python) & Jeu de la Vie`,

        contact: `<span class="t-green">Contact & Liens :</span>
  - Email    : <a href="mailto:alexis.seranoo@gmail.com" class="t-cyan">alexis.seranoo@gmail.com</a>
  - GitHub   : <a href="https://github.com/AlexisSerano" target="_blank" class="t-cyan">github.com/AlexisSerano</a>
  - Statut   : Disponible pour opportunités`,

        matrix: `<span class="t-green">Wake up, Neo... The Matrix has you. Follow the white rabbit. 🐇</span>`,

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
                btnText.textContent = isExpanded ? "Réduire l'affichage" : "Afficher tous les projets (10)";
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

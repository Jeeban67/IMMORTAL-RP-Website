document.addEventListener('DOMContentLoaded', function() {
    // =========================
    // IMMORTAL RP SERVER CONFIG
    // =========================
    const serverIP = "148.113.5.104:30012";
    const discordLink = "https://discord.gg/cZjqhvkGwr";
    const rulesLink = "https://wiki.ls-rp.com/en/server-rules";

    // =========================
    // LIVE PLAYER COUNT
    // =========================
    async function fetchPlayerCount() {
        try {
            const playerCountElement = document.getElementById('playerCount');
            if (!playerCountElement) return;

            const response = await fetch(`https://servers-frontend.fivem.net/api/servers/single/${serverIP}`);
            
            if (!response.ok) {
                throw new Error("Server offline");
            }
            
            const data = await response.json();
            const players = data?.Data?.clients || 0;
            const maxPlayers = data?.Data?.sv_maxclients || 64;
            
            playerCountElement.textContent = `${players}/${maxPlayers}`;
            playerCountElement.className = 'stat-number online';
            
        } catch (error) {
            const playerCountElement = document.getElementById('playerCount');
            if (playerCountElement) {
                playerCountElement.textContent = "Offline";
                playerCountElement.className = 'stat-number offline';
            }
            console.log('Server is offline or not responding');
        }
    }

    // Fetch player count immediately and every 30 seconds
    fetchPlayerCount();
    setInterval(fetchPlayerCount, 30000);

    // =========================
    // MOBILE NAVIGATION
    // =========================
    const hamburger = document.querySelector('.hamburger');
    const navLinks = document.querySelector('.nav-links');
    
    if (hamburger) {
        hamburger.addEventListener('click', () => {
            navLinks.classList.toggle('active');
            hamburger.classList.toggle('active');
        });
    }

    // =========================
    // SMOOTH SCROLLING
    // =========================
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            const target = document.querySelector(this.getAttribute('href'));
            if (target) {
                target.scrollIntoView({
                    behavior: 'smooth'
                });
                // Close mobile menu if open
                if (navLinks.classList.contains('active')) {
                    navLinks.classList.remove('active');
                    hamburger.classList.remove('active');
                }
            }
        });
    });

    // =========================
    // NAVBAR SCROLL EFFECT
    // =========================
    window.addEventListener('scroll', function() {
        const navbar = document.querySelector('.navbar');
        if (window.scrollY > 50) {
            navbar.style.backgroundColor = 'rgba(0, 0, 0, 0.95)';
            navbar.style.padding = '0.5rem 2rem';
        } else {
            navbar.style.backgroundColor = 'var(--secondary-color)';
            navbar.style.padding = '1rem 2rem';
        }
    });

    // =========================
    // ANIMATE FEATURE CARDS
    // =========================
    const animateFeatureCards = () => {
        const cards = document.querySelectorAll('.feature-card');
        
        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.style.opacity = '1';
                    entry.target.style.transform = 'translateY(0)';
                }
            });
        }, {
            threshold: 0.1
        });
        
        cards.forEach(card => {
            card.style.opacity = '0';
            card.style.transform = 'translateY(20px)';
            card.style.transition = 'all 0.5s ease';
            observer.observe(card);
        });
    };

    animateFeatureCards();

    // =========================
    // ACTIVE NAV LINK HIGHLIGHTING
    // =========================
    function highlightActiveNavLink() {
        const sections = document.querySelectorAll('section');
        const navLinks = document.querySelectorAll('.nav-links a');
        
        let currentSection = '';
        
        sections.forEach(section => {
            const sectionTop = section.offsetTop - 100;
            const sectionHeight = section.clientHeight;
            if (window.scrollY >= sectionTop && window.scrollY < sectionTop + sectionHeight) {
                currentSection = section.getAttribute('id');
            }
        });

        navLinks.forEach(link => {
            link.classList.remove('active');
            if (link.getAttribute('href') === `#${currentSection}`) {
                link.classList.add('active');
            }
        });
    }

    window.addEventListener('scroll', highlightActiveNavLink);

    console.log('IMMORTAL RP Website loaded successfully!');
});

// Initialize when page is fully loaded
window.addEventListener('load', function() {
    console.log('IMMORTAL RP - FiveM Roleplay Server');
});
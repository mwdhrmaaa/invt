document.addEventListener('DOMContentLoaded', () => {
    const loader = document.getElementById('loader');
    const openBtn = document.getElementById('open-btn');
    const backBtn = document.getElementById('back-btn');
    const landingSection = document.getElementById('landing-section');
    const invitationSection = document.getElementById('invitation-section');
    const canvas = document.getElementById('confetti-canvas');
    const ctx = canvas.getContext('2d');

    // Hide Loader
    const hideLoader = () => {
        setTimeout(() => {
            if (loader) {
                loader.style.opacity = '0';
                setTimeout(() => loader.style.display = 'none', 500);
            }
        }, 500);
    };

    if (document.readyState === 'complete') {
        hideLoader();
    } else {
        window.addEventListener('load', hideLoader);
    }

    // Open Invitation
    openBtn.addEventListener('click', () => {
        console.log('Open button clicked');
        landingSection.classList.add('fade-out');
        
        setTimeout(() => {
            landingSection.classList.add('hidden');
            invitationSection.classList.remove('hidden');
            console.log('Invitation section revealed');
            startConfetti();
        }, 500);
    });

    // Back to landing
    backBtn.addEventListener('click', () => {
        invitationSection.classList.add('hidden');
        landingSection.classList.remove('hidden');
        landingSection.classList.remove('fade-out');
        stopConfetti();
    });

    // --- Simple Confetti Logic ---
    let particles = [];
    let animationId;
    const colors = ['#1D2636', '#C5A059', '#A68648', '#EADDCA', '#FFFFFF'];

    function resizeCanvas() {
        canvas.width = window.innerWidth;
        canvas.height = window.innerHeight;
    }

    window.addEventListener('resize', resizeCanvas);
    resizeCanvas();

    class Particle {
        constructor() {
            this.x = Math.random() * canvas.width;
            this.y = Math.random() * canvas.height - canvas.height;
            this.size = Math.random() * 7 + 3;
            this.speedX = Math.random() * 3 - 1.5;
            this.speedY = Math.random() * 3 + 2;
            this.color = colors[Math.floor(Math.random() * colors.length)];
            this.rotation = Math.random() * 360;
            this.rotationSpeed = Math.random() * 10 - 5;
        }

        update() {
            this.y += this.speedY;
            this.x += this.speedX;
            this.rotation += this.rotationSpeed;
            if (this.y > canvas.height) {
                this.y = -20;
                this.x = Math.random() * canvas.width;
            }
        }

        draw() {
            ctx.save();
            ctx.translate(this.x, this.y);
            ctx.rotate(this.rotation * Math.PI / 180);
            ctx.fillStyle = this.color;
            ctx.fillRect(-this.size / 2, -this.size / 2, this.size, this.size);
            ctx.restore();
        }
    }

    function initConfetti() {
        particles = [];
        for (let i = 0; i < 150; i++) {
            particles.push(new Particle());
        }
    }

    function animate() {
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        particles.forEach(p => {
            p.update();
            p.draw();
        });
        animationId = requestAnimationFrame(animate);
    }

    function startConfetti() {
        initConfetti();
        animate();
        // Stop after 5 seconds to save performance
        setTimeout(() => {
            stopConfetti();
        }, 5000);
    }

    function stopConfetti() {
        cancelAnimationFrame(animationId);
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        particles = [];
    }
});

/**
 * 1142 LABS - RITUAL EFFECTS SYSTEM
 * Version 6.0 - Cosmic Unity
 * "Channeling chaotic energy into focused digital order"
 */

// ========================================
// MATRIX TEXT FALL EFFECT
// ========================================
function initMatrixEffect() {
    const matrixBg = document.createElement('div');
    matrixBg.className = 'matrix-bg';
    document.body.prepend(matrixBg);

    const characters = '01アイウエオカキクケコサシスセソタチツテトナニヌネノハヒフヘホマミムメモヤユヨラリルレロワヲン';
    const columnCount = Math.floor(window.innerWidth / 20);

    for (let i = 0; i < columnCount; i++) {
        createMatrixColumn(matrixBg, i, characters);
    }
}

function createMatrixColumn(container, index, characters) {
    const column = document.createElement('div');
    column.className = 'matrix-column';
    column.style.left = `${index * 20}px`;
    column.style.animationDuration = `${Math.random() * 10 + 10}s`;
    column.style.animationDelay = `${Math.random() * 5}s`;

    let text = '';
    for (let i = 0; i < 20; i++) {
        text += characters.charAt(Math.floor(Math.random() * characters.length)) + '<br>';
    }
    column.innerHTML = text;

    container.appendChild(column);
}

// ========================================
// SCROLL ANIMATIONS
// ========================================
function initScrollAnimations() {
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('fade-in-up');
                entry.target.style.opacity = '1';
                entry.target.style.transform = 'translateY(0)';
            }
        });
    }, {
        threshold: 0.1
    });

    document.querySelectorAll('.ritual-card, .cosmic-section').forEach(el => {
        el.style.opacity = '0';
        el.style.transform = 'translateY(50px)';
        el.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
        observer.observe(el);
    });
}

// ========================================
// COSMIC RUNE PAGE TRANSITIONS
// ========================================
function initCosmicTransitions() {
    document.querySelectorAll('a[href^="/"], a[href^="./"]').forEach(link => {
        link.addEventListener('click', (e) => {
            if (link.target !== '_blank') {
                e.preventDefault();
                const href = link.href;
                
                // Create transition overlay
                const overlay = document.createElement('div');
                overlay.style.cssText = `
                    position: fixed;
                    top: 0;
                    left: 0;
                    width: 100%;
                    height: 100%;
                    background: var(--near-black);
                    z-index: 9999;
                    display: flex;
                    align-items: center;
                    justify-content: center;
                    opacity: 0;
                    transition: opacity 0.3s ease;
                `;
                
                const rune = document.createElement('div');
                rune.className = 'cosmic-rune';
                rune.textContent = '═══◆═══';
                rune.style.cssText = `
                    font-size: 3rem;
                    color: var(--vortex-cyan);
                    animation: flicker 0.5s infinite;
                `;
                
                overlay.appendChild(rune);
                document.body.appendChild(overlay);
                
                setTimeout(() => {
                    overlay.style.opacity = '1';
                }, 10);
                
                setTimeout(() => {
                    window.location.href = href;
                }, 500);
            }
        });
    });
}

// ========================================
// PARTICLE SYSTEM
// ========================================
class ParticleSystem {
    constructor(canvas) {
        this.canvas = canvas;
        this.ctx = canvas.getContext('2d');
        this.particles = [];
        this.particleCount = 80;
        this.mouse = { x: null, y: null, radius: 150 };
        
        this.resize();
        this.init();
        this.animate();
        
        window.addEventListener('resize', () => this.resize());
        canvas.addEventListener('mousemove', (e) => {
            this.mouse.x = e.x;
            this.mouse.y = e.y;
        });
        canvas.addEventListener('click', () => this.addParticles(10));
    }
    
    resize() {
        this.canvas.width = window.innerWidth;
        this.canvas.height = window.innerHeight;
    }
    
    init() {
        for (let i = 0; i < this.particleCount; i++) {
            this.particles.push(new Particle(this.canvas, this.mouse));
        }
    }
    
    addParticles(count) {
        for (let i = 0; i < count; i++) {
            this.particles.push(new Particle(this.canvas, this.mouse));
        }
    }
    
    animate() {
        this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
        
        this.particles.forEach((particle, index) => {
            particle.update();
            particle.draw(this.ctx);
            
            // Connect particles
            for (let j = index + 1; j < this.particles.length; j++) {
                const dx = particle.x - this.particles[j].x;
                const dy = particle.y - this.particles[j].y;
                const distance = Math.sqrt(dx * dx + dy * dy);
                
                if (distance < 100) {
                    this.ctx.beginPath();
                    this.ctx.strokeStyle = `rgba(0, 240, 255, ${1 - distance / 100})`;
                    this.ctx.lineWidth = 1;
                    this.ctx.moveTo(particle.x, particle.y);
                    this.ctx.lineTo(this.particles[j].x, this.particles[j].y);
                    this.ctx.stroke();
                }
            }
        });
        
        requestAnimationFrame(() => this.animate());
    }
}

class Particle {
    constructor(canvas, mouse) {
        this.canvas = canvas;
        this.mouse = mouse;
        this.x = Math.random() * canvas.width;
        this.y = Math.random() * canvas.height;
        this.vx = (Math.random() - 0.5) * 0.5;
        this.vy = (Math.random() - 0.5) * 0.5;
        this.size = Math.random() * 2 + 1;
    }
    
    update() {
        // Mouse repulsion
        const dx = this.mouse.x - this.x;
        const dy = this.mouse.y - this.y;
        const distance = Math.sqrt(dx * dx + dy * dy);
        
        if (distance < this.mouse.radius) {
            const force = (this.mouse.radius - distance) / this.mouse.radius;
            this.vx -= (dx / distance) * force * 0.5;
            this.vy -= (dy / distance) * force * 0.5;
        }
        
        // Movement
        this.x += this.vx;
        this.y += this.vy;
        
        // Boundaries
        if (this.x < 0 || this.x > this.canvas.width) this.vx *= -1;
        if (this.y < 0 || this.y > this.canvas.height) this.vy *= -1;
        
        // Friction
        this.vx *= 0.99;
        this.vy *= 0.99;
    }
    
    draw(ctx) {
        ctx.beginPath();
        ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
        ctx.fillStyle = '#00F0FF';
        ctx.shadowBlur = 10;
        ctx.shadowColor = '#00F0FF';
        ctx.fill();
        ctx.shadowBlur = 0;
    }
}

// ========================================
// GLITCH TEXT EFFECT
// ========================================
function initGlitchText() {
    document.querySelectorAll('.glitch-text').forEach(el => {
        const text = el.textContent;
        el.setAttribute('data-text', text);
        
        setInterval(() => {
            if (Math.random() > 0.95) {
                el.classList.add('glitching');
                setTimeout(() => el.classList.remove('glitching'), 100);
            }
        }, 100);
    });
}

// ========================================
// COSMIC CURSOR TRAIL
// ========================================
function initCursorTrail() {
    const trail = [];
    const trailLength = 10;
    
    document.addEventListener('mousemove', (e) => {
        trail.push({ x: e.clientX, y: e.clientY, time: Date.now() });
        
        if (trail.length > trailLength) {
            trail.shift();
        }
        
        // Remove old trail elements
        document.querySelectorAll('.cursor-trail').forEach(el => {
            if (Date.now() - parseInt(el.dataset.time) > 1000) {
                el.remove();
            }
        });
        
        // Create new trail element
        if (Math.random() > 0.7) {
            const dot = document.createElement('div');
            dot.className = 'cursor-trail';
            dot.dataset.time = Date.now();
            dot.style.cssText = `
                position: fixed;
                width: 4px;
                height: 4px;
                background: var(--vortex-cyan);
                border-radius: 50%;
                pointer-events: none;
                z-index: 9998;
                left: ${e.clientX}px;
                top: ${e.clientY}px;
                box-shadow: 0 0 10px var(--vortex-cyan);
                animation: fade-out 1s forwards;
            `;
            document.body.appendChild(dot);
        }
    });
}

// Add fade-out animation
const style = document.createElement('style');
style.textContent = `
    @keyframes fade-out {
        to {
            opacity: 0;
            transform: scale(0);
        }
    }
`;
document.head.appendChild(style);

// ========================================
// RITUAL INCANTATIONS (Easter Egg)
// ========================================
const incantations = [
    "Sepia smoke rises, the first glyph carved in memory",
    "Glitching grids collapse, the myth fractures into shards",
    "Neon fire ignites, the relic pulses with vengeance",
    "Shadow inversion, skull cracked, grin reborn",
    "Cosmic synthwave horizon, mirrored cities chant the name",
    "Sigil glows eternal, 11:42 carried forward until the last breath"
];

function initIncantations() {
    let konamiCode = [];
    const konamiSequence = ['ArrowUp', 'ArrowUp', 'ArrowDown', 'ArrowDown', 'ArrowLeft', 'ArrowRight', 'ArrowLeft', 'ArrowRight', 'b', 'a'];
    
    document.addEventListener('keydown', (e) => {
        konamiCode.push(e.key);
        konamiCode = konamiCode.slice(-10);
        
        if (konamiCode.join('') === konamiSequence.join('')) {
            showIncantation();
        }
    });
}

function showIncantation() {
    const incantation = incantations[Math.floor(Math.random() * incantations.length)];
    const overlay = document.createElement('div');
    overlay.style.cssText = `
        position: fixed;
        top: 50%;
        left: 50%;
        transform: translate(-50%, -50%);
        background: rgba(15, 23, 42, 0.95);
        border: 2px solid var(--vortex-cyan);
        border-radius: 12px;
        padding: 2rem;
        z-index: 10000;
        max-width: 600px;
        text-align: center;
        box-shadow: 0 0 40px var(--vortex-cyan);
    `;
    
    const text = document.createElement('p');
    text.className = 'neon-text';
    text.textContent = incantation;
    text.style.cssText = `
        font-size: 1.5rem;
        margin: 0;
        font-family: 'Orbitron', sans-serif;
    `;
    
    overlay.appendChild(text);
    document.body.appendChild(overlay);
    
    setTimeout(() => {
        overlay.style.transition = 'opacity 0.5s ease';
        overlay.style.opacity = '0';
        setTimeout(() => overlay.remove(), 500);
    }, 3000);
}

// ========================================
// INITIALIZATION
// ========================================
document.addEventListener('DOMContentLoaded', () => {
    // Check if user prefers reduced motion
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    
    if (!prefersReducedMotion) {
        initMatrixEffect();
        initCursorTrail();
        
        // Initialize particle system if canvas exists
        const particleCanvas = document.getElementById('particle-canvas');
        if (particleCanvas) {
            new ParticleSystem(particleCanvas);
        }
    }
    
    initScrollAnimations();
    initCosmicTransitions();
    initGlitchText();
    initIncantations();
    
    console.log('%c11:42 LABS - System Online', 'color: #00F0FF; font-size: 20px; font-weight: bold; text-shadow: 0 0 10px #00F0FF;');
    console.log('%cCognitive Liberation Protocol: ACTIVE', 'color: #4ADE80; font-size: 14px;');
});

// ========================================
// PERFORMANCE MONITORING
// ========================================
if (window.performance && window.performance.mark) {
    window.performance.mark('1142-ritual-effects-loaded');
}

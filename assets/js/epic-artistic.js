// ═══════════════════════════════════════════════════════════════
// 1142 LABS - EPIC ARTISTIC JAVASCRIPT
// Advanced interactions and visual effects
// ═══════════════════════════════════════════════════════════════

(function() {
    'use strict';

    // ═══ INITIALIZATION ═══
    document.addEventListener('DOMContentLoaded', initEpicEffects);

    function initEpicEffects() {
        createCosmicDust();
        init3DCardTilt();
        initParallaxMouse();
        initSmoothScroll();
        initTextReveal();
        initCursorTrail();
        initAudioVisualizer();
        initEasterEggs();
    }

    // ═══ COSMIC DUST PARTICLES ═══
    function createCosmicDust() {
        const dustContainer = document.createElement('div');
        dustContainer.className = 'cosmic-dust';
        document.body.appendChild(dustContainer);

        const particleCount = 50;
        
        for (let i = 0; i < particleCount; i++) {
            const particle = document.createElement('div');
            particle.className = 'dust-particle';
            
            // Random positioning
            particle.style.left = Math.random() * 100 + '%';
            particle.style.animationDelay = Math.random() * 20 + 's';
            particle.style.animationDuration = (15 + Math.random() * 10) + 's';
            
            // Random size variation
            const size = 1 + Math.random() * 2;
            particle.style.width = size + 'px';
            particle.style.height = size + 'px';
            
            dustContainer.appendChild(particle);
        }
    }

    // ═══ 3D CARD TILT EFFECT ═══
    function init3DCardTilt() {
        const cards = document.querySelectorAll('.epic-card');
        
        cards.forEach(card => {
            card.addEventListener('mousemove', (e) => {
                const rect = card.getBoundingClientRect();
                const x = e.clientX - rect.left;
                const y = e.clientY - rect.top;
                
                const centerX = rect.width / 2;
                const centerY = rect.height / 2;
                
                const rotateX = (y - centerY) / 10;
                const rotateY = (centerX - x) / 10;
                
                card.style.transform = `
                    perspective(1000px)
                    rotateX(${rotateX}deg)
                    rotateY(${rotateY}deg)
                    translateY(-10px)
                    scale(1.02)
                `;
            });
            
            card.addEventListener('mouseleave', () => {
                card.style.transform = 'perspective(1000px) rotateX(0) rotateY(0) translateY(0) scale(1)';
            });
        });
    }

    // ═══ PARALLAX MOUSE MOVEMENT ═══
    function initParallaxMouse() {
        const parallaxElements = document.querySelectorAll('[data-parallax]');
        
        document.addEventListener('mousemove', (e) => {
            const mouseX = e.clientX / window.innerWidth;
            const mouseY = e.clientY / window.innerHeight;
            
            parallaxElements.forEach(el => {
                const speed = el.dataset.parallax || 5;
                const x = (mouseX - 0.5) * speed;
                const y = (mouseY - 0.5) * speed;
                
                el.style.transform = `translate(${x}px, ${y}px)`;
            });
        });
    }

    // ═══ SMOOTH SCROLL WITH EASING ═══
    function initSmoothScroll() {
        document.querySelectorAll('a[href^="#"]').forEach(anchor => {
            anchor.addEventListener('click', function(e) {
                e.preventDefault();
                const target = document.querySelector(this.getAttribute('href'));
                
                if (target) {
                    target.scrollIntoView({
                        behavior: 'smooth',
                        block: 'start'
                    });
                }
            });
        });
    }

    // ═══ TEXT REVEAL ANIMATION ═══
    function initTextReveal() {
        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    const text = entry.target.textContent;
                    entry.target.textContent = '';
                    entry.target.style.opacity = '1';
                    
                    let i = 0;
                    const interval = setInterval(() => {
                        if (i < text.length) {
                            entry.target.textContent += text[i];
                            i++;
                        } else {
                            clearInterval(interval);
                        }
                    }, 30);
                    
                    observer.unobserve(entry.target);
                }
            });
        }, { threshold: 0.5 });
        
        document.querySelectorAll('.text-reveal').forEach(el => {
            el.style.opacity = '0';
            observer.observe(el);
        });
    }

    // ═══ CUSTOM CURSOR TRAIL ═══
    function initCursorTrail() {
        const trail = [];
        const trailLength = 20;
        
        for (let i = 0; i < trailLength; i++) {
            const dot = document.createElement('div');
            dot.style.position = 'fixed';
            dot.style.width = '4px';
            dot.style.height = '4px';
            dot.style.borderRadius = '50%';
            dot.style.background = `rgba(0, 240, 255, ${1 - i / trailLength})`;
            dot.style.pointerEvents = 'none';
            dot.style.zIndex = '9999';
            dot.style.transition = 'transform 0.1s ease';
            dot.style.boxShadow = '0 0 10px rgba(0, 240, 255, 0.8)';
            document.body.appendChild(dot);
            trail.push(dot);
        }
        
        let mouseX = 0, mouseY = 0;
        
        document.addEventListener('mousemove', (e) => {
            mouseX = e.clientX;
            mouseY = e.clientY;
        });
        
        function animateTrail() {
            let x = mouseX;
            let y = mouseY;
            
            trail.forEach((dot, index) => {
                const nextDot = trail[index + 1] || trail[0];
                
                dot.style.left = x - 2 + 'px';
                dot.style.top = y - 2 + 'px';
                
                x += (nextDot.offsetLeft - x) * 0.3;
                y += (nextDot.offsetTop - y) * 0.3;
            });
            
            requestAnimationFrame(animateTrail);
        }
        
        animateTrail();
    }

    // ═══ AUDIO VISUALIZER (AMBIENT) ═══
    function initAudioVisualizer() {
        const canvas = document.createElement('canvas');
        canvas.id = 'audio-visualizer';
        canvas.style.position = 'fixed';
        canvas.style.bottom = '0';
        canvas.style.left = '0';
        canvas.style.width = '100%';
        canvas.style.height = '100px';
        canvas.style.pointerEvents = 'none';
        canvas.style.zIndex = '1';
        canvas.style.opacity = '0.3';
        document.body.appendChild(canvas);
        
        const ctx = canvas.getContext('2d');
        canvas.width = window.innerWidth;
        canvas.height = 100;
        
        const bars = 50;
        const barWidth = canvas.width / bars;
        
        function drawVisualizer() {
            ctx.clearRect(0, 0, canvas.width, canvas.height);
            
            for (let i = 0; i < bars; i++) {
                const height = Math.random() * 50 + 10;
                const x = i * barWidth;
                const y = canvas.height - height;
                
                const gradient = ctx.createLinearGradient(x, y, x, canvas.height);
                gradient.addColorStop(0, 'rgba(0, 240, 255, 0.8)');
                gradient.addColorStop(1, 'rgba(236, 72, 153, 0.8)');
                
                ctx.fillStyle = gradient;
                ctx.fillRect(x, y, barWidth - 2, height);
            }
            
            requestAnimationFrame(drawVisualizer);
        }
        
        drawVisualizer();
    }

    // ═══ EASTER EGGS ═══
    function initEasterEggs() {
        const konamiCode = ['ArrowUp', 'ArrowUp', 'ArrowDown', 'ArrowDown', 'ArrowLeft', 'ArrowRight', 'ArrowLeft', 'ArrowRight', 'b', 'a'];
        let konamiIndex = 0;
        
        document.addEventListener('keydown', (e) => {
            if (e.key === konamiCode[konamiIndex]) {
                konamiIndex++;
                if (konamiIndex === konamiCode.length) {
                    activateEasterEgg();
                    konamiIndex = 0;
                }
            } else {
                konamiIndex = 0;
            }
        });
    }

    function activateEasterEgg() {
        // Create explosion effect
        const explosion = document.createElement('div');
        explosion.style.position = 'fixed';
        explosion.style.top = '50%';
        explosion.style.left = '50%';
        explosion.style.transform = 'translate(-50%, -50%)';
        explosion.style.width = '0';
        explosion.style.height = '0';
        explosion.style.borderRadius = '50%';
        explosion.style.background = 'radial-gradient(circle, rgba(0, 240, 255, 0.8), transparent)';
        explosion.style.zIndex = '99999';
        explosion.style.pointerEvents = 'none';
        document.body.appendChild(explosion);
        
        // Animate explosion
        explosion.animate([
            { width: '0', height: '0', opacity: 1 },
            { width: '2000px', height: '2000px', opacity: 0 }
        ], {
            duration: 1500,
            easing: 'ease-out'
        }).onfinish = () => explosion.remove();
        
        // Show secret message
        const message = document.createElement('div');
        message.textContent = '🚀 11:42 - COGNITIVE LIBERATION ACTIVATED 🚀';
        message.style.position = 'fixed';
        message.style.top = '50%';
        message.style.left = '50%';
        message.style.transform = 'translate(-50%, -50%)';
        message.style.fontFamily = 'Orbitron, sans-serif';
        message.style.fontSize = '2rem';
        message.style.color = '#00f0ff';
        message.style.textShadow = '0 0 20px #00f0ff';
        message.style.zIndex = '100000';
        message.style.textAlign = 'center';
        message.style.padding = '2rem';
        message.style.background = 'rgba(0, 0, 0, 0.9)';
        message.style.borderRadius = '20px';
        message.style.border = '2px solid #00f0ff';
        document.body.appendChild(message);
        
        setTimeout(() => {
            message.style.transition = 'opacity 1s ease';
            message.style.opacity = '0';
            setTimeout(() => message.remove(), 1000);
        }, 3000);
    }

    // ═══ DYNAMIC BACKGROUND GRADIENT ═══
    function initDynamicGradient() {
        const hero = document.querySelector('.epic-hero');
        if (!hero) return;
        
        let hue = 0;
        
        function updateGradient() {
            hue = (hue + 0.5) % 360;
            hero.style.background = `
                radial-gradient(circle at 30% 50%, hsla(${hue}, 100%, 50%, 0.2) 0%, transparent 50%),
                radial-gradient(circle at 70% 80%, hsla(${(hue + 120) % 360}, 100%, 50%, 0.2) 0%, transparent 50%),
                radial-gradient(circle at 50% 20%, hsla(${(hue + 240) % 360}, 100%, 50%, 0.2) 0%, transparent 50%)
            `;
            requestAnimationFrame(updateGradient);
        }
        
        updateGradient();
    }

    // ═══ SCROLL PROGRESS INDICATOR ═══
    function initScrollProgress() {
        const progressBar = document.createElement('div');
        progressBar.style.position = 'fixed';
        progressBar.style.top = '0';
        progressBar.style.left = '0';
        progressBar.style.width = '0%';
        progressBar.style.height = '4px';
        progressBar.style.background = 'linear-gradient(90deg, #00f0ff, #ec4899)';
        progressBar.style.zIndex = '10000';
        progressBar.style.boxShadow = '0 0 10px rgba(0, 240, 255, 0.8)';
        document.body.appendChild(progressBar);
        
        window.addEventListener('scroll', () => {
            const scrollTop = window.pageYOffset || document.documentElement.scrollTop;
            const scrollHeight = document.documentElement.scrollHeight - document.documentElement.clientHeight;
            const scrollPercent = (scrollTop / scrollHeight) * 100;
            progressBar.style.width = scrollPercent + '%';
        });
    }

    initScrollProgress();

    // ═══ PERFORMANCE MONITORING ═══
    if (window.performance && window.performance.memory) {
        console.log('%c🚀 1142 LABS - EPIC MODE ACTIVATED', 'font-size: 20px; color: #00f0ff; text-shadow: 0 0 10px #00f0ff;');
        console.log('%cMemory Usage:', 'color: #ec4899', Math.round(window.performance.memory.usedJSHeapSize / 1048576) + ' MB');
    }

})();

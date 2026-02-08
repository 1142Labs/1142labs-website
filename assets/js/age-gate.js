// 1142 LABS Age Verification Gate
// Only shows on first visit, uses localStorage to remember verification

(function() {
    'use strict';

    // Check if user has already verified
    const hasVerified = localStorage.getItem('1142_age_verified');
    
    if (hasVerified === 'true') {
        // User already verified, don't show gate
        return;
    }

    // Create age gate overlay
    const ageGate = document.createElement('div');
    ageGate.id = 'age-gate-overlay';
    ageGate.innerHTML = `
        <style>
            #age-gate-overlay {
                position: fixed;
                top: 0;
                left: 0;
                width: 100%;
                height: 100%;
                background: #000;
                z-index: 999999;
                display: flex;
                align-items: center;
                justify-content: center;
                animation: fadeIn 0.5s ease-out;
            }

            @keyframes fadeIn {
                from { opacity: 0; }
                to { opacity: 1; }
            }

            @keyframes fadeOut {
                from { opacity: 1; }
                to { opacity: 0; }
            }

            .age-gate-content {
                max-width: 600px;
                padding: 60px 40px;
                text-align: center;
                background: rgba(0,0,0,0.95);
                border: 2px solid rgba(0,255,255,0.3);
                border-radius: 8px;
                box-shadow: 0 0 40px rgba(0,255,255,0.2);
                animation: slideUp 0.6s ease-out;
            }

            @keyframes slideUp {
                from {
                    opacity: 0;
                    transform: translateY(30px);
                }
                to {
                    opacity: 1;
                    transform: translateY(0);
                }
            }

            .age-gate-logo {
                font-size: 4rem;
                font-weight: 900;
                margin-bottom: 30px;
                background: linear-gradient(135deg, #00ffff, #ff00ff);
                -webkit-background-clip: text;
                -webkit-text-fill-color: transparent;
                background-clip: text;
                letter-spacing: 4px;
                text-shadow: 0 0 30px rgba(0,255,255,0.5);
            }

            .age-gate-title {
                font-size: 1.8rem;
                margin-bottom: 20px;
                color: #fff;
                font-weight: 700;
            }

            .age-gate-text {
                font-size: 1.1rem;
                color: #aaa;
                margin-bottom: 40px;
                line-height: 1.6;
            }

            .age-gate-buttons {
                display: flex;
                gap: 20px;
                justify-content: center;
                flex-wrap: wrap;
            }

            .age-gate-btn {
                padding: 18px 40px;
                font-size: 1.1rem;
                font-weight: 700;
                letter-spacing: 1px;
                text-transform: uppercase;
                border: 2px solid;
                border-radius: 4px;
                cursor: pointer;
                transition: all 0.3s;
                background: transparent;
                font-family: inherit;
            }

            .age-gate-btn-yes {
                color: #00ffff;
                border-color: #00ffff;
            }

            .age-gate-btn-yes:hover {
                background: rgba(0,255,255,0.2);
                box-shadow: 0 0 20px rgba(0,255,255,0.4);
                transform: translateY(-2px);
            }

            .age-gate-btn-no {
                color: #ff3333;
                border-color: #ff3333;
            }

            .age-gate-btn-no:hover {
                background: rgba(255,51,51,0.2);
                box-shadow: 0 0 20px rgba(255,51,51,0.4);
                transform: translateY(-2px);
            }

            .age-gate-warning {
                margin-top: 30px;
                padding: 20px;
                background: rgba(255,100,0,0.1);
                border: 1px solid rgba(255,100,0,0.3);
                border-radius: 4px;
                font-size: 0.9rem;
                color: #ffaa00;
            }

            @media (max-width: 768px) {
                .age-gate-content {
                    padding: 40px 30px;
                    margin: 20px;
                }

                .age-gate-logo {
                    font-size: 3rem;
                }

                .age-gate-title {
                    font-size: 1.5rem;
                }

                .age-gate-text {
                    font-size: 1rem;
                }

                .age-gate-buttons {
                    flex-direction: column;
                }

                .age-gate-btn {
                    width: 100%;
                }
            }
        </style>

        <div class="age-gate-content">
            <div class="age-gate-logo">1142</div>
            <h1 class="age-gate-title">Age Verification Required</h1>
            <p class="age-gate-text">
                This website contains educational content about neuroscience, pharmacology, 
                and consciousness research that may not be suitable for minors.
            </p>
            <p class="age-gate-text">
                <strong>Are you 18 years of age or older?</strong>
            </p>
            <div class="age-gate-buttons">
                <button class="age-gate-btn age-gate-btn-yes" id="age-gate-yes">
                    Yes, I am 18+
                </button>
                <button class="age-gate-btn age-gate-btn-no" id="age-gate-no">
                    No, I am under 18
                </button>
            </div>
            <div class="age-gate-warning">
                ⚠️ By entering, you confirm you are of legal age and understand this is educational content only.
            </div>
        </div>
    `;

    // Add to page
    document.body.appendChild(ageGate);

    // Prevent scrolling while gate is active
    document.body.style.overflow = 'hidden';

    // Handle YES button
    document.getElementById('age-gate-yes').addEventListener('click', function() {
        // Save verification to localStorage
        localStorage.setItem('1142_age_verified', 'true');
        
        // Fade out and remove
        ageGate.style.animation = 'fadeOut 0.4s ease-out';
        setTimeout(function() {
            ageGate.remove();
            document.body.style.overflow = '';
        }, 400);
    });

    // Handle NO button
    document.getElementById('age-gate-no').addEventListener('click', function() {
        // Redirect to appropriate page
        window.location.href = 'https://www.google.com';
    });

})();

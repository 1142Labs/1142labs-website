// 1142 LABS Combo Calculator - Complete Interaction Database
// Educational harm reduction tool - NOT medical advice

const SUBSTANCES = [
    "Methylphenidate",
    "LSD",
    "2C-B",
    "Psilocybin",
    "Peyote",
    "DMT",
    "DOB",
    "MDA",
    "PCP"
];

const INTERACTION_DATA = {
    "Methylphenidate + LSD": {
        risk: "high",
        overallProfile: "Accelerated ideation with weakened self-monitoring",
        perceivedEffects: ["Fast thinking", "Increased confidence", "Heightened alertness"],
        cognitiveCosts: ["Error blindness", "Difficulty slowing thoughts", "Anxiety loops"],
        breakdownPathway: ["Acceleration", "Overconfidence", "Thought looping", "Destabilization"],
        primaryDanger: "False clarity leading to cognitive overload",
        flags: ["🧠 Psychological destabilization risk", "🧠 Thought-loop amplification"]
    },
    "Methylphenidate + 2C-B": {
        risk: "critical",
        overallProfile: "Typically overstimulating with emotional and physical tension",
        perceivedEffects: ["Increased alertness", "Sensory intensity"],
        cognitiveCosts: ["Emotional tension", "Restlessness", "Poor impulse control"],
        breakdownPathway: ["Overstimulation", "Anxiety escalation", "Destabilization"],
        primaryDanger: "Emotional and cognitive overstimulation",
        flags: ["🧠 Anxiety escalation", "🧠 Psychological destabilization risk"]
    },
    "Methylphenidate + Psilocybin": {
        risk: "high",
        overallProfile: "Mentally busy and fragmented cognition",
        perceivedEffects: ["Mental energy", "Active thinking"],
        cognitiveCosts: ["Fragmented reflection", "Agitation", "Mental crowding"],
        breakdownPathway: ["Stimulation", "Fragmentation", "Overwhelm"],
        primaryDanger: "Interrupted reflective quality leads to mental strain",
        flags: ["🧠 Mental fragmentation", "🧠 Anxiety escalation"]
    },
    "Methylphenidate + Peyote": {
        risk: "high",
        overallProfile: "Long-lasting intensity with physical and mental strain",
        perceivedEffects: ["Sustained wakefulness", "Mental engagement"],
        cognitiveCosts: ["Physical strain", "Mental crowding", "Fatigue"],
        breakdownPathway: ["Duration", "Exhaustion", "Strain accumulation"],
        primaryDanger: "Prolonged physical and mental exhaustion",
        flags: ["🧠 Extended mental strain", "🧠 Fatigue-driven instability"]
    },
    "Methylphenidate + DMT": {
        risk: "caution",
        overallProfile: "Extremely sharp and abrupt experience",
        perceivedEffects: ["Intense alertness", "Rapid processing"],
        cognitiveCosts: ["Jarring transitions", "Disorientation", "Compressed intensity"],
        breakdownPathway: ["Spike", "Compression", "Disorientation"],
        primaryDanger: "Compressed, jarring experience without integration time",
        flags: ["🧠 Narrative disruption", "🧠 Acute disorientation"]
    },
    "Methylphenidate + DOB": {
        risk: "critical",
        overallProfile: "Prolonged mental tension and overstimulation",
        perceivedEffects: ["Extended wakefulness", "Sustained engagement"],
        cognitiveCosts: ["Exhaustion", "Mental rigidity", "Inability to rest"],
        breakdownPathway: ["Duration", "Rigidity", "Burnout", "Breakdown"],
        primaryDanger: "Extended mental breakdown over many hours",
        flags: ["🧠 Long-duration psychological stress", "🧠 Extended mental strain"]
    },
    "Methylphenidate + MDA": {
        risk: "critical",
        overallProfile: "Emotionally intense but physically and mentally taxing",
        perceivedEffects: ["Emotional intensity", "Mood elevation"],
        cognitiveCosts: ["Physical drain", "Mental exhaustion", "Poor judgment"],
        breakdownPathway: ["Emotion", "Overconfidence", "Drain", "Collapse"],
        primaryDanger: "Neurotoxicity concern and emotional overload",
        flags: ["🧠 Neurotoxicity concern", "🧠 Emotional destabilization"]
    },
    "Methylphenidate + PCP": {
        risk: "critical",
        overallProfile: "Highly unpredictable with severe confusion",
        perceivedEffects: ["None that are stable"],
        cognitiveCosts: ["Confusion", "Loss of grounding", "Reality distortion"],
        breakdownPathway: ["Stimulation", "Dissociation", "Confusion", "Break"],
        primaryDanger: "Acute psychological destabilization",
        flags: ["🧠 Reality-testing impairment", "🧠 Severe destabilization"]
    },
    "LSD + 2C-B": {
        risk: "high",
        overallProfile: "Very intense sensory and emotional layering",
        perceivedEffects: ["Heightened sensory awareness", "Emotional intensity"],
        cognitiveCosts: ["Mental crowding", "Poor impulse control", "Anxiety"],
        breakdownPathway: ["Stimulation", "Volatility", "Destabilization"],
        primaryDanger: "Mental overload and anxiety escalation",
        flags: ["🧠 Thought-loop amplification", "🧠 Anxiety escalation"]
    },
    "LSD + Psilocybin": {
        risk: "caution",
        overallProfile: "Deep associative and reflective state",
        perceivedEffects: ["Increased insight", "Enhanced perspective shifting"],
        cognitiveCosts: ["Reduced task focus", "Emotional vulnerability", "Mental fatigue"],
        breakdownPathway: ["Reflection", "Rumination", "Overwhelm"],
        primaryDanger: "Emotional flooding and thought loops",
        flags: ["🧠 Emotional overwhelm risk", "🧠 Rumination amplification"]
    },
    "LSD + Peyote": {
        risk: "high",
        overallProfile: "Long, immersive, and emotionally heavy experience",
        perceivedEffects: ["Deep reflection", "Broad perspective", "Meaning-making"],
        cognitiveCosts: ["Emotional saturation", "Fatigue", "Mental drag"],
        breakdownPathway: ["Depth", "Duration", "Exhaustion", "Overload"],
        primaryDanger: "Prolonged psychological strain from extended duration",
        flags: ["🧠 Extended mental strain", "🧠 Emotional saturation"]
    },
    "LSD + DMT": {
        risk: "high",
        overallProfile: "Overwhelming contrast between sustained and abrupt effects",
        perceivedEffects: ["Novel associations", "Extreme insight"],
        cognitiveCosts: ["Disorientation", "Narrative fragmentation", "Memory gaps"],
        breakdownPathway: ["Spike", "Fragmentation", "Panic"],
        primaryDanger: "Loss of mental continuity and narrative coherence",
        flags: ["🧠 Narrative disruption", "🧠 Reality-testing impairment"]
    },
    "LSD + DOB": {
        risk: "critical",
        overallProfile: "Exceptionally long and mentally demanding",
        perceivedEffects: ["Wakefulness", "Sustained engagement (early)"],
        cognitiveCosts: ["Confusion", "Exhaustion", "Mental rigidity"],
        breakdownPathway: ["Duration", "Exhaustion", "Brittle cognition"],
        primaryDanger: "Extended duration psychological breakdown",
        flags: ["🧠 Long-duration psychological stress", "🧠 Extended mental strain"]
    },
    "LSD + MDA": {
        risk: "critical",
        overallProfile: "Emotionally charged with increased neurochemical strain",
        perceivedEffects: ["Empathy", "Emotional openness"],
        cognitiveCosts: ["Impaired judgment", "Reduced error detection", "Vulnerability"],
        breakdownPathway: ["Emotion", "Overconfidence", "Collapse"],
        primaryDanger: "Emotional destabilization and neurotoxicity concern",
        flags: ["🧠 Emotional destabilization", "🧠 Neurotoxicity concern"]
    },
    "LSD + PCP": {
        risk: "critical",
        overallProfile: "Reality becomes unstable with severe fragmentation",
        perceivedEffects: ["Detachment (unstable)"],
        cognitiveCosts: ["Reality-testing failure", "Loss of coherence", "Confusion"],
        breakdownPathway: ["Detachment", "Confusion", "Psychological break"],
        primaryDanger: "Acute psychological break and reality fragmentation",
        flags: ["🧠 Reality-testing impairment", "🧠 Severe psychological destabilization"]
    },
    "2C-B + Psilocybin": {
        risk: "high",
        overallProfile: "Emotionally volatile with perceptual crowding",
        perceivedEffects: ["Emotional vividness", "Sensory richness"],
        cognitiveCosts: ["Impulse control loss", "Attentional scatter", "Mood swings"],
        breakdownPathway: ["Stimulation", "Volatility", "Anxiety"],
        primaryDanger: "Emotional dysregulation and mental crowding",
        flags: ["🧠 Emotional instability", "🧠 Anxiety escalation"]
    },
    "2C-B + Peyote": {
        risk: "high",
        overallProfile: "Extended stimulation with introspective heaviness",
        perceivedEffects: ["Engagement", "Emotional warmth"],
        cognitiveCosts: ["Cognitive fatigue", "Mental drag", "Physical exhaustion"],
        breakdownPathway: ["Duration", "Exhaustion", "Confusion"],
        primaryDanger: "Fatigue-driven instability over extended duration",
        flags: ["🧠 Extended mental strain", "🧠 Fatigue-driven confusion"]
    },
    "2C-B + DMT": {
        risk: "high",
        overallProfile: "Rapid perceptual shifts with no recovery window",
        perceivedEffects: ["Intense novelty", "Sensory intensity"],
        cognitiveCosts: ["Disorientation", "Narrative loss", "Mental crowding"],
        breakdownPathway: ["Spike", "Fragmentation", "Panic"],
        primaryDanger: "Compressed perceptual overload",
        flags: ["🧠 Narrative disruption", "🧠 Acute disorientation"]
    },
    "2C-B + DOB": {
        risk: "critical",
        overallProfile: "Extremely long and stimulating with high physical burden",
        perceivedEffects: ["Prolonged engagement"],
        cognitiveCosts: ["Physical exhaustion", "Mental rigidity", "Confusion"],
        breakdownPathway: ["Duration", "Overstimulation", "Breakdown"],
        primaryDanger: "Extended overstimulation leading to breakdown",
        flags: ["🧠 Long-duration psychological stress", "🧠 Physical strain"]
    },
    "2C-B + MDA": {
        risk: "critical",
        overallProfile: "Emotionally intense with neurotoxicity concern",
        perceivedEffects: ["Emotional warmth", "Sensory enhancement"],
        cognitiveCosts: ["Poor judgment", "Emotional volatility", "Physical drain"],
        breakdownPathway: ["Emotion", "Impulsivity", "Collapse"],
        primaryDanger: "Neurotoxicity and emotional destabilization",
        flags: ["🧠 Neurotoxicity concern", "🧠 Emotional destabilization"]
    },
    "2C-B + PCP": {
        risk: "critical",
        overallProfile: "Chaotic and unpredictable with reality distortion",
        perceivedEffects: ["None that are stable"],
        cognitiveCosts: ["Confusion", "Reality distortion", "Loss of control"],
        breakdownPathway: ["Stimulation", "Dissociation", "Chaos"],
        primaryDanger: "Severe psychological destabilization",
        flags: ["🧠 Reality-testing impairment", "🧠 Severe destabilization"]
    },
    "Psilocybin + Peyote": {
        risk: "caution",
        overallProfile: "Long and deeply introspective with emotional weight",
        perceivedEffects: ["Deep reflection", "Emotional processing"],
        cognitiveCosts: ["Mental fatigue", "Emotional heaviness", "Duration strain"],
        breakdownPathway: ["Depth", "Duration", "Fatigue"],
        primaryDanger: "Extended emotional and mental exhaustion",
        flags: ["🧠 Extended mental strain", "🧠 Emotional saturation"]
    },
    "Psilocybin + DMT": {
        risk: "high",
        overallProfile: "Sudden intensity spike during reflective state",
        perceivedEffects: ["Novel insights", "Perspective shifts"],
        cognitiveCosts: ["Disorientation", "Narrative disruption", "Integration difficulty"],
        breakdownPathway: ["Reflection", "Spike", "Fragmentation"],
        primaryDanger: "Jarring transition disrupts integration",
        flags: ["🧠 Narrative disruption", "🧠 Integration difficulty"]
    },
    "Psilocybin + DOB": {
        risk: "critical",
        overallProfile: "Extremely long with mental and physical exhaustion",
        perceivedEffects: ["Extended wakefulness (early)"],
        cognitiveCosts: ["Exhaustion", "Mental rigidity", "Confusion"],
        breakdownPathway: ["Duration", "Fatigue", "Breakdown"],
        primaryDanger: "Extended duration psychological breakdown",
        flags: ["🧠 Long-duration psychological stress", "🧠 Extended mental strain"]
    },
    "Psilocybin + MDA": {
        risk: "critical",
        overallProfile: "Emotionally intense with neurotoxicity concern",
        perceivedEffects: ["Emotional openness", "Empathy"],
        cognitiveCosts: ["Poor judgment", "Emotional vulnerability", "Neurotoxicity"],
        breakdownPathway: ["Emotion", "Overconfidence", "Collapse"],
        primaryDanger: "Neurotoxicity and emotional destabilization",
        flags: ["🧠 Neurotoxicity concern", "🧠 Emotional destabilization"]
    },
    "Psilocybin + PCP": {
        risk: "critical",
        overallProfile: "Reality testing severely compromised",
        perceivedEffects: ["None that are stable"],
        cognitiveCosts: ["Confusion", "Reality distortion", "Loss of grounding"],
        breakdownPathway: ["Reflection", "Dissociation", "Break"],
        primaryDanger: "Severe psychological destabilization",
        flags: ["🧠 Reality-testing impairment", "🧠 Severe destabilization"]
    },
    "Peyote + DMT": {
        risk: "high",
        overallProfile: "Abrupt intensity during long introspective journey",
        perceivedEffects: ["Novel insights"],
        cognitiveCosts: ["Disorientation", "Narrative disruption", "Fatigue"],
        breakdownPathway: ["Duration", "Spike", "Fragmentation"],
        primaryDanger: "Jarring transition during extended experience",
        flags: ["🧠 Narrative disruption", "🧠 Extended mental strain"]
    },
    "Peyote + DOB": {
        risk: "critical",
        overallProfile: "Exceptionally long with severe exhaustion",
        perceivedEffects: ["None sustainable"],
        cognitiveCosts: ["Extreme exhaustion", "Mental rigidity", "Confusion"],
        breakdownPathway: ["Duration", "Exhaustion", "Breakdown"],
        primaryDanger: "Prolonged psychological breakdown over many hours",
        flags: ["🧠 Long-duration psychological stress", "🧠 Extreme exhaustion"]
    },
    "Peyote + MDA": {
        risk: "critical",
        overallProfile: "Long, emotionally taxing with neurotoxicity concern",
        perceivedEffects: ["Emotional warmth (early)"],
        cognitiveCosts: ["Exhaustion", "Emotional drain", "Neurotoxicity"],
        breakdownPathway: ["Duration", "Emotion", "Collapse"],
        primaryDanger: "Extended neurotoxicity and emotional exhaustion",
        flags: ["🧠 Neurotoxicity concern", "🧠 Extended mental strain"]
    },
    "Peyote + PCP": {
        risk: "critical",
        overallProfile: "Long, confusing, and psychologically destabilizing",
        perceivedEffects: ["None that are stable"],
        cognitiveCosts: ["Confusion", "Reality distortion", "Exhaustion"],
        breakdownPathway: ["Duration", "Dissociation", "Break"],
        primaryDanger: "Prolonged psychological destabilization",
        flags: ["🧠 Reality-testing impairment", "🧠 Severe destabilization"]
    },
    "DMT + DOB": {
        risk: "critical",
        overallProfile: "Jarring spike followed by prolonged confusion",
        perceivedEffects: ["None sustainable"],
        cognitiveCosts: ["Disorientation", "Exhaustion", "Mental rigidity"],
        breakdownPathway: ["Spike", "Duration", "Breakdown"],
        primaryDanger: "Compressed intensity followed by extended breakdown",
        flags: ["🧠 Narrative disruption", "🧠 Long-duration psychological stress"]
    },
    "DMT + MDA": {
        risk: "critical",
        overallProfile: "Abrupt intensity with emotional and neurotoxic strain",
        perceivedEffects: ["None stable"],
        cognitiveCosts: ["Disorientation", "Emotional volatility", "Neurotoxicity"],
        breakdownPathway: ["Spike", "Emotion", "Collapse"],
        primaryDanger: "Neurotoxicity with acute disorientation",
        flags: ["🧠 Neurotoxicity concern", "🧠 Narrative disruption"]
    },
    "DMT + PCP": {
        risk: "critical",
        overallProfile: "Extremely unpredictable and destabilizing",
        perceivedEffects: ["None that are stable"],
        cognitiveCosts: ["Severe confusion", "Reality distortion", "Loss of control"],
        breakdownPathway: ["Spike", "Dissociation", "Break"],
        primaryDanger: "Acute severe psychological destabilization",
        flags: ["🧠 Reality-testing impairment", "🧠 Severe destabilization"]
    },
    "DOB + MDA": {
        risk: "critical",
        overallProfile: "Extremely long with neurotoxicity and exhaustion",
        perceivedEffects: ["None sustainable"],
        cognitiveCosts: ["Extreme exhaustion", "Neurotoxicity", "Confusion"],
        breakdownPathway: ["Duration", "Neurotoxicity", "Breakdown"],
        primaryDanger: "Extended neurotoxicity and psychological breakdown",
        flags: ["🧠 Neurotoxicity concern", "🧠 Long-duration psychological stress"]
    },
    "DOB + PCP": {
        risk: "critical",
        overallProfile: "Prolonged confusion and severe destabilization",
        perceivedEffects: ["None that are stable"],
        cognitiveCosts: ["Severe confusion", "Reality distortion", "Exhaustion"],
        breakdownPathway: ["Duration", "Dissociation", "Break"],
        primaryDanger: "Extended severe psychological destabilization",
        flags: ["🧠 Reality-testing impairment", "🧠 Long-duration psychological stress"]
    },
    "MDA + PCP": {
        risk: "critical",
        overallProfile: "Chaotic, unpredictable with neurotoxicity",
        perceivedEffects: ["None that are stable"],
        cognitiveCosts: ["Severe confusion", "Neurotoxicity", "Reality distortion"],
        breakdownPathway: ["Emotion", "Dissociation", "Break"],
        primaryDanger: "Neurotoxicity with severe psychological destabilization",
        flags: ["🧠 Neurotoxicity concern", "🧠 Severe destabilization"]
    }
};

const RISK_CONFIGS = {
    caution: {
        label: "CAUTION",
        bg: "rgba(255, 200, 0, 0.05)",
        border: "rgba(255, 200, 0, 0.6)",
        text: "#ffcc00"
    },
    high: {
        label: "HIGH RISK",
        bg: "rgba(255, 100, 0, 0.05)",
        border: "rgba(255, 100, 0, 0.6)",
        text: "#ff6600"
    },
    critical: {
        label: "CRITICAL",
        bg: "rgba(255, 0, 0, 0.05)",
        border: "rgba(255, 0, 0, 0.6)",
        text: "#ff3333"
    }
};

// Initialize the calculator
document.addEventListener('DOMContentLoaded', function() {
    const substance1Select = document.getElementById('substance1');
    const substance2Select = document.getElementById('substance2');
    const analyzeBtn = document.getElementById('analyzeBtn');
    const resultsContainer = document.getElementById('results');

    // Populate dropdowns
    function populateDropdowns() {
        SUBSTANCES.forEach(substance => {
            const option1 = document.createElement('option');
            option1.value = substance;
            option1.textContent = substance;
            substance1Select.appendChild(option1);

            const option2 = document.createElement('option');
            option2.value = substance;
            option2.textContent = substance;
            substance2Select.appendChild(option2);
        });
    }

    // Update button state
    function updateButtonState() {
        const s1 = substance1Select.value;
        const s2 = substance2Select.value;
        analyzeBtn.disabled = !s1 || !s2 || s1 === s2;
    }

    // Get combo key (order-independent)
    function getComboKey(s1, s2) {
        const sorted = [s1, s2].sort();
        return `${sorted[0]} + ${sorted[1]}`;
    }

    // Analyze combination
    function analyzeCombo() {
        const s1 = substance1Select.value;
        const s2 = substance2Select.value;

        if (!s1 || !s2 || s1 === s2) return;

        const comboKey = getComboKey(s1, s2);
        const data = INTERACTION_DATA[comboKey];

        if (!data) {
            alert('Interaction data not found for this combination.');
            return;
        }

        const riskConfig = RISK_CONFIGS[data.risk];

        // Update risk card
        const riskCard = document.getElementById('riskCard');
        riskCard.style.background = riskConfig.bg;
        riskCard.style.border = `2px solid ${riskConfig.border}`;
        document.getElementById('riskBadge').textContent = riskConfig.label;
        document.getElementById('riskBadge').style.background = riskConfig.border;
        document.getElementById('comboTitle').textContent = comboKey;
        document.getElementById('comboProfile').textContent = data.overallProfile;
        document.getElementById('comboProfile').style.color = riskConfig.text;

        // Update perceived effects
        const perceivedList = document.getElementById('perceivedEffects');
        perceivedList.innerHTML = '';
        data.perceivedEffects.forEach(effect => {
            const li = document.createElement('li');
            li.textContent = effect;
            perceivedList.appendChild(li);
        });

        // Update cognitive costs
        const costsList = document.getElementById('cognitiveCosts');
        costsList.innerHTML = '';
        data.cognitiveCosts.forEach(cost => {
            const li = document.createElement('li');
            li.textContent = cost;
            costsList.appendChild(li);
        });

        // Update breakdown pathway
        const pathwayDiv = document.getElementById('breakdownPathway');
        pathwayDiv.innerHTML = '';
        data.breakdownPathway.forEach((step, index) => {
            const stepDiv = document.createElement('div');
            stepDiv.className = 'pathway-step';
            stepDiv.textContent = step;
            pathwayDiv.appendChild(stepDiv);

            if (index < data.breakdownPathway.length - 1) {
                const arrow = document.createElement('div');
                arrow.className = 'pathway-arrow';
                arrow.textContent = '→';
                pathwayDiv.appendChild(arrow);
            }
        });

        // Update primary danger
        document.getElementById('primaryDanger').textContent = data.primaryDanger;

        // Update flags
        const flagsList = document.getElementById('flags');
        flagsList.innerHTML = '';
        data.flags.forEach(flag => {
            const li = document.createElement('li');
            li.textContent = flag;
            flagsList.appendChild(li);
        });

        // Show results
        resultsContainer.classList.add('active');
        resultsContainer.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
    }

    // Event listeners
    substance1Select.addEventListener('change', updateButtonState);
    substance2Select.addEventListener('change', updateButtonState);
    analyzeBtn.addEventListener('click', analyzeCombo);

    // Initialize
    populateDropdowns();
});

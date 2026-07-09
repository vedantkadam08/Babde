/* script.js */

document.addEventListener("DOMContentLoaded", () => {
    initAmbientEffects();
    initScrollAnimations();
    setupPasswordLogic();
    setupFlipCards();
});

/* ==========================================
   AMBIENT FLOATING EFFECTS & SPARKLES
   ========================================== */
function initAmbientEffects() {
    const container = document.getElementById("ambient-container");
    // Array of symbols explicitly excluding stars
    const elements = ["❤️", "💖", "💜", "🌸", "💮", "🐼", "💌"];
    
    // Periodically spawn elements
    setInterval(() => {
        const el = document.createElement("div");
        el.className = "floating-element";
        el.innerText = elements[Math.floor(Math.random() * elements.length)];
        el.style.left = Math.random() * 100 + "vw";
        el.style.fontSize = Math.random() * 1.5 + 1 + "rem";
        el.style.animationDuration = Math.random() * 5 + 7 + "s";
        container.appendChild(el);
        
        // Cleanup element after animation complete
        setTimeout(() => el.remove(), 12000);
    }, 450);

    // Click to spark effect handler
    document.addEventListener("click", (e) => {
        for (let i = 0; i < 6; i++) {
            const sparkle = document.createElement("div");
            sparkle.className = "sparkle";
            sparkle.style.width = sparkle.style.height = Math.random() * 12 + 6 + "px";
            sparkle.style.left = e.clientX + "px";
            sparkle.style.top = e.clientY + "px";
            
            const destinationX = (Math.random() - 0.5) * 80;
            const destinationY = (Math.random() - 0.5) * 80;
            sparkle.animate([
                { transform: 'translate(0, 0) scale(1)', opacity: 1 },
                { transform: `translate(${destinationX}px, ${destinationY}px) scale(0)`, opacity: 0 }
            ], { duration: 600 + Math.random() * 300, easing: 'cubic-bezier(0,0,0.2,1)' });
            
            document.body.appendChild(sparkle);
            setTimeout(() => sparkle.remove(), 1000);
        }
    });
}

/* ==========================================
   SCROLL INTERSECTION OBSERVER ANIMATIONS
   ========================================== */
function initScrollAnimations() {
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add("appeared");
            }
        });
    }, { threshold: 0.1 });

    document.querySelectorAll(".fade-up").forEach(el => observer.observe(el));
}

/* ==========================================
   PASSWORD VALIDATION & FLOW SCREEN MANAGEMENT
   ========================================== */
function setupPasswordLogic() {
    const passwordInput = document.getElementById("password-input");
    const passwordBtn = document.getElementById("password-btn");
    const errorMsg = document.getElementById("password-error");

    const checkPassword = () => {
        if (passwordInput.value.trim() === "021024") {
            document.getElementById("password-screen").classList.remove("active");
            document.getElementById("intro-screen").classList.add("active");
            runIntroSequence();
        } else {
            errorMsg.innerText = "That's not our special entry code, try again Shona! ❤️";
            passwordInput.value = "";
        }
    };

    passwordBtn.addEventListener("click", checkPassword);
    passwordInput.addEventListener("keypress", (e) => { if (e.key === "Enter") checkPassword(); });
}

/* ==========================================
   INTRO SCREEN TEXT SEQUENCE TRIGGER
   ========================================== */
const introTexts = [
    "I know life hasn't been very kind to you lately.",
    "I know sometimes it feels like no matter how much you do, it still doesn't feel enough.",
    "I wish I could remove every difficult moment from your life.",
    "But since I can't always be beside you...",
    "I made this little world for you.",
    "Whenever you feel low, come here.",
    "Because here, you will always be loved. ❤️"
];

function runIntroSequence() {
    const greetingEl = document.getElementById("intro-greeting");
    const textEl = document.getElementById("intro-text");
    const skipBtn = document.getElementById("skip-intro-btn");

    setTimeout(() => {
        greetingEl.style.opacity = 1;
        setTimeout(() => {
            greetingEl.style.opacity = 0;
            setTimeout(displayLines, 1000);
        }, 2000);
    }, 500);

    let lineIndex = 0;
    function displayLines() {
        if (lineIndex < introTexts.length) {
            textEl.innerText = introTexts[lineIndex];
            textEl.style.opacity = 1;
            
            setTimeout(() => {
                textEl.style.opacity = 0;
                lineIndex++;
                setTimeout(displayLines, 1100);
            }, 3800);
        } else {
            skipBtn.classList.remove("hidden");
            skipBtn.style.opacity = 1;
        }
    }

    skipBtn.addEventListener("click", () => {
        document.getElementById("intro-screen").classList.remove("active");
        const mainContent = document.getElementById("main-content");
        mainContent.classList.remove("hidden");
        mainContent.style.opacity = 0;
        setTimeout(() => {
            mainContent.style.opacity = 1;
            mainContent.style.transition = "opacity 1s ease";
            initRelationshipCounter();
            generateDailyReminder();
            generateLoveReasons();
        }, 50);
    });
}

/* ==========================================
   LIVE RELATIONSHIP TIMING COUNTER
   ========================================== */
function initRelationshipCounter() {
    // Relationship started on 02 October 2024
    const anniversaryDate = new Date("October 2, 2024 00:00:00").getTime();

    setInterval(() => {
        const now = new Date().getTime();
        const difference = now - anniversaryDate;

        const d = Math.floor(difference / (1000 * 60 * 60 * 24));
        const h = Math.floor((difference % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
        const m = Math.floor((difference % (1000 * 60 * 60)) / (1000 * 60));
        const s = Math.floor((difference % (1000 * 60)) / 1000);

        document.getElementById("days").innerText = d < 10 ? "0" + d : d;
        document.getElementById("hours").innerText = h < 10 ? "0" + h : h;
        document.getElementById("minutes").innerText = m < 10 ? "0" + m : m;
        document.getElementById("seconds").innerText = s < 10 ? "0" + s : s;
    }, 1000);
}

/* ==========================================
   3D FLIP CARDS EVENT BINDINGS
   ========================================== */
function setupFlipCards() {
    document.querySelectorAll(".flip-card").forEach(card => {
        card.addEventListener("click", () => {
            card.classList.toggle("flipped");
        });
    });
}

/* ==========================================
   OPEN WHEN MODAL CONTENT SYSTEM
   ========================================== */
const envelopeMessages = {
    "sad": "Hey my precious Gubbu, if you are reading this feeling sad, take a deep breath. Close your eyes and feel my arms around you. You don't have to carry the weight of everything alone. I'm right here with you, loving you through every tear. You are my world.",
    "alone": "Look at this website, look at the counter, look at my text. You are never, ever alone. Even if miles separate us right now, my heart lives inside yours. I'm thinking about you this exact millisecond. You have me completely.",
    "not-enough": "Listen to me very carefully, Babde. You are more than enough. You are spectacular. You don't need to be perfect to earn love. You deserve the stars just for trying. I cherish you exactly as you are right now.",
    "miss-me": "I miss you incredibly too, Shona! Sending you a massive, tight virtual hug. Go ahead and drop me a text saying 'Code 100' so I know you're here missing me, and I'll call you instantly if I can!",
    "smile": "Want to see my favorite thing? Go look in the mirror right now. That beautiful, precious smile of yours is the reason my life is bright. Keep smiling, my lovely panda princess!"
};

function openEnvelope(type) {
    const modal = document.getElementById("envelope-modal");
    const modalText = document.getElementById("modal-text");
    const modalIcon = document.getElementById("modal-icon");

    modalText.innerText = envelopeMessages[type] || "I love you!";
    
    // Change icons contextually
    if(type === 'sad') modalIcon.className = "fas fa-cloud-showers-heavy modal-main-icon";
    if(type === 'alone') modalIcon.className = "fas fa-user-friends modal-main-icon";
    if(type === 'not-enough') modalIcon.className = "fas fa-heart-broken modal-main-icon";
    if(type === 'miss-me') modalIcon.className = "fas fa-paper-plane modal-main-icon";
    if(type === 'smile') modalIcon.className = "fas fa-laugh-beam modal-main-icon";

    modal.classList.remove("hidden");
}

function closeEnvelope() {
    document.getElementById("envelope-modal").classList.add("hidden");
}

/* ==========================================
   HUG AND KISS FULLSCREEN EXPLOSIONS
   ========================================== */
const overlay = document.getElementById("animation-overlay");
const overlayMsg = document.getElementById("overlay-message");
const overlayVisuals = document.getElementById("overlay-visuals");

document.getElementById("hug-btn").addEventListener("click", () => {
    triggerOverlayAnimation("I'm hugging you tightly right now, feel the warmth! ❤️", ["🫂", "❤️", "💜", "🌸"]);
});

const kissMenuBtn = document.getElementById("kiss-menu-btn");
const kissOptions = document.getElementById("kiss-options");

kissMenuBtn.addEventListener("click", () => {
    kissOptions.classList.toggle("hidden");
});

document.getElementById("normal-kiss-btn").addEventListener("click", () => {
    triggerOverlayAnimation("Mwah! A sweet little kiss for my Shona! 😚💕", ["😚", "💋", "💖", "✨"]);
});

document.getElementById("lip-kiss-btn").addEventListener("click", () => {
    triggerOverlayAnimation("💏 Holding you close and stealing your lips completely! 💜", ["💏", "💋", "🔥", "❤️", "❤️"]);
});

function triggerOverlayAnimation(message, particles) {
    overlayMsg.innerText = message;
    overlayVisuals.innerHTML = "";
    overlay.classList.remove("hidden");

    // Spawn intensive particle explosion
    for (let i = 0; i < 40; i++) {
        const p = document.createElement("div");
        p.className = "giant-emoji";
        p.innerText = particles[Math.floor(Math.random() * particles.length)];
        
        // Custom explosion pathways via css vars
        const angle = Math.random() * Math.PI * 2;
        const radius = Math.random() * 300 + 100;
        p.style.setProperty('--tx', Math.cos(angle) * radius + 'px');
        p.style.setProperty('--ty', Math.sin(angle) * radius + 'px');
        p.style.setProperty('--rot', Math.random() * 360 + 'deg');
        
        p.style.left = "50%";
        p.style.top = "50%";
        overlayVisuals.appendChild(p);
    }

    setTimeout(() => {
        overlay.classList.add("hidden");
        kissOptions.classList.add("hidden");
    }, 3500);
}

/* ==========================================
   DAILY 365 REMINDER GENERATION BASE
   ========================================== */
const baseReminders = [
    "You don't have to earn love. You already deserve it.",
    "You are stronger than you realize.",
    "Your smile makes my world brighter.",
    "Someone is always proud of you.",
    "Your mental health matters more than anyone's expectations.",
    "You are my absolute safe space, Gubbu.",
    "Be gentle with yourself today, Babde.",
    "You make my heart beat faster even after all this time.",
    "You are capable of overcoming any obstacle thrown at you.",
    "Your happiness is my absolute number one priority."
];

function generateDailyReminder() {
    const textEl = document.getElementById("daily-reminder-text");
    const dateEl = document.getElementById("current-date-str");
    
    const today = new Date();
    dateEl.innerText = today.toLocaleDateString('en-US', { weekday: 'long', month: 'short', day: 'numeric' });
    
    // Deterministic selection based on day of year to give a unique text daily
    const start = new Date(today.getFullYear(), 0, 0);
    const diff = today - start;
    const oneDay = 1000 * 60 * 60 * 24;
    const dayOfYear = Math.floor(diff / oneDay);
    
    // Generates 365 unique messages programmatically utilizing modifiers
    const index = dayOfYear % baseReminders.length;
    let base = baseReminders[index];
    
    const contextModifiers = [
        " Remember that always. 💜",
        " I am right by your side today! 🌸",
        " Take an extra moment for yourself. 🐼",
        " My love belongs solely to you. ❤️",
        " Breathe easily, everything will be fine."
    ];
    
    textEl.innerText = `"${base}${contextModifiers[dayOfYear % contextModifiers.length]}"`;
}

/* ==========================================
   LOVE NOTE JAR DATA (100 RANDOM NOTES)
   ========================================== */
const jarNotes = [
    "You look stunning when you blush.", "My favorite place is inside your hug.", "Thank you for existing, Shona.",
    "You make me want to be a better person.", "I love you more than pandas love bamboo!", "You are my ultimate dream come true.",
    "Your voice is my favorite melody.", "I want to spend all my tomorrows with you.", "You are my perfect matching puzzle piece.",
    "I adore everything you do.", "You are my sunshine on rainy days.", "You make my soul happy.",
    "I love you from here to the edge of the universe.", "You are my magnificent queen.", "Forever wouldn't be enough with you.",
    "My heart belongs entirely to you.", "You look incredibly cute when you pout.", "Can't wait to kiss your forehead.",
    "You're my home, Gubbu.", "Holding your hand is my favorite feeling.", "I am so incredibly proud to be yours.",
    "You are absolutely irreplaceable.", "Your kindness is your greatest magic.", "I love your gentle soul.",
    "My sweetest addiction is you.", "You complete my chaotic life.", "Thinking of you makes my pulse race.",
    "You're my beautiful princess.", "I will love you through every lifetime.", "You're my anchor.",
    "You have the prettiest eyes in the world.", "I fell in love with your beautiful soul.", "You're my lottery win.",
    "I'm sending you 10,000 kisses right now.", "You are my sanctuary.", "My love for you grows every second.",
    "You are the best chapter of my life.", "I want to make you smile every day.", "You are my heart's rhythm.",
    "No one else could ever compare to you.", "You are my safe harbor.", "I love your precious laugh.",
    "You are my favorite thought.", "I'm always cheering for you.", "You look so sweet when you sleep.",
    "You're my definition of perfection.", "I belong with you, Babde.", "Your love keeps me alive.",
    "You are my masterpiece.", "I love you more than words can say.", "You are my cosmic twin.",
    "You make every dull moment exciting.", "I appreciate your patience with me.", "You are my bright star.",
    "I trust you with all my secrets.", "You are my destiny.", "I'll never let your hand go.",
    "You are my favorite distraction.", "Your presence heals me.", "I love your comforting warmth.",
    "You are my angel.", "I am completely captivated by you.", "You make my life a paradise.",
    "I value every second with you.", "You make my chest tighten with love.", "You're my safe escape.",
    "I want to protect your beautiful smile.", "You are my greatest achievement.", "I love your lovely vibes.",
    "You're my ride or die.", "I love you unconditionally.", "You're the center of my world.",
    "You make my heart overflow.", "I promise to stay forever.", "You are my beautiful miracle.",
    "I love you more than life itself.", "You make my spirits soar.", "You are my soul companion.",
    "I treasure our deep bond.", "You make my world spin perfectly.", "I adore your comforting nature.",
    "You're my sparkling diamond.", "I love your magnificent look.", "You are my ultimate priority.",
    "I will always pick you first.", "You're my sweet little angel.", "I love how you care for me.",
    "You make me feel whole.", "I'm completely crazy about you.", "You are my wonderful gift.",
    "I will hold you close forever.", "You're my endless happiness.", "I love your gentle heart.",
    "You make my everyday life beautiful.", "I want to hold you right now.", "You're my one and only.",
    "I love you endlessly, Gubbu.", "You make my soul dance.", "You are my entire universe.",
    "Forever mine, my beautiful Shona."
];

document.getElementById("jar-btn").addEventListener("click", () => {
    const jarDisplay = document.getElementById("jar-note-display");
    const randomNote = jarNotes[Math.floor(Math.random() * jarNotes.length)];
    jarDisplay.innerText = randomNote;
    jarDisplay.classList.remove("hidden");
});

/* ==========================================
   MOOD BOOSTER LOGIC
   ========================================== */
const moodMessages = {
    smile: [
        "Remember when we laughed so hard our stomachs hurt? I live to make you feel that way every single day! 😊",
        "If you don't smile right now, I will find a way to virtually tickle you! Go ahead, show me those gorgeous teeth! ✨",
        "You're the cutest panda in the world, and pandas look best when they're smiling! 🐼❤️"
    ],
    comfort: [
        "Hey, wrap your arms around yourself. That's me hugging you tightly. You are safe. You are protected. Everything will be okay. 🫂",
        "Let it all go, Babde. You don't have to be strong right now. I'm holding your weight. Rest your heart. 💜",
        "No matter how heavy the world feels, my love for you remains light, pure, and ready to shelter you. 🌸"
    ],
    laugh: [
        "Are you a magician? Because whenever I look at you, everyone else disappears! (Super cheesy, I know! 😂)",
        "I love you more than pizza, and that is a massive statement coming from me! 🍕❤️",
        "You must be exhausted because you've been running through my mind all day long! 🏃‍♂️💨"
    ],
    love: [
        "I love you with every beat of my heart, every breath I take, and every single thought in my head. You own me. 💖",
        "You are my number one, my only one, and my absolute forever. Never forget how fiercely you are loved here. ❤️",
        "My love for you is deeper than oceans and wider than space. You are my absolute soulmate, Gubbu. 💜"
    ]
};

function triggerMood(type) {
    const display = document.getElementById("mood-display");
    const customList = moodMessages[type];
    const message = customList[Math.floor(Math.random() * customList.length)];
    display.innerText = message;
    display.classList.remove("hidden");
}

/* ==========================================
   100 REASONS WHY YOU ARE AMAZING DATA
   ========================================== */
const reasonBases = [
    "Your beautiful, bright eyes.", "The way you say my name.", "Your infinite kindness.",
    "How cute you look when eating.", "Your comforting, safe hugs.", "The way you support my dreams.",
    "Your gorgeous, pure smile.", "How you care for everyone.", "Your beautiful soft voice.",
    "Your hilarious, chaotic energy.", "The way you hold my hand.", "Your patience with me.",
    "How you look when you blush.", "Your cute little sleepy pouts.", "Your brilliant, sharp mind.",
    "Your incredible inner strength.", "The way you dress up so elegantly.", "Your warm, loving heart.",
    "Your magnificent sense of humor.", "How safe you make me feel.", "Your soft, sweet kisses.",
    "The way you look at me.", "Your beautiful, long hair.", "How you handle tough situations.",
    "Your cute, adorable sneezes.", "Your boundless generosity.", "The way you laugh at my jokes.",
    "Your completely genuine nature.", "Your beautiful, soothing soul.", "How you make me feel valued.",
    "Your unique, adorable quirks.", "Your loyalty and deep devotion.", "How you smell so wonderful.",
    "Your sweet, reassuring messages.", "The way you understand my silence.", "Your beautiful perspective on life.",
    "How you make bad days brighter.", "Your protective nature over us.", "Your absolute purity of heart.",
    "The way you inspire me daily.", "Your cute text style.", "How you love animals so much.",
    "Your sweet, unbothered confidence.", "The way you calm my anxiety.", "Your gorgeous, soft cheeks.",
    "Your absolute, complete honesty.", "How you listen to my rants.", "Your beautiful healing aura.",
    "The way you make me feel loved.", "Your endless reservoir of love."
];

// High quality cute animal/cartoon gif links
const gifUrls = [
    "https://media.giphy.com/media/v1.Y2lkPTc5MGI3NjExbW90c3lsbnd6M3Nid3N6dG9wN3FvN3YwN3ZpOHI0b2Y5ZzZ2ZXJobCZlcD12MV9pbnRlcm5hbF9naWZfYnlfaWQmY3Q9cw/EatwJZRUIv41G/giphy.gif", // Panda roll
    "https://media.giphy.com/media/v1.Y2lkPTc5MGI3NjExbXN6ZXp2Znd6bm9wNWh0Mzg1bmlvM3Nid3N6dG9wN3FvN3YwN3ZpOHI0b2Y5ZzZ2ZXJobCZlcD12MV9pbnRlcm5hbF9naWZfYnlfaWQmY3Q9cw/b9QBhklIlCBiE/giphy.gif", // Cute bear
    "https://media.giphy.com/media/v1.Y2lkPTc5MGI3NjExbW90c3lsbnd6M3Nid3N6dG9wN3FvN3YwN3ZpOHI0b2Y5ZzZ2ZXJobCZlcD12MV9pbnRlcm5hbF9naWZfYnlfaWQmY3Q9cw/14v5VVZ95wIpWw/giphy.gif", // Cute cat
    "https://media.giphy.com/media/v1.Y2lkPTc5MGI3NjExbW90c3lsbnd6M3Nid3N6dG9wN3FvN3YwN3ZpOHI0b2Y5ZzZ2ZXJobCZlcD12MV9pbnRlcm5hbF9naWZfYnlfaWQmY3Q9cw/kZ3SAsL0T6S9G/giphy.gif"  // Cute mochi panda
];

function generateLoveReasons() {
    const container = document.getElementById("reasons-container");
    container.innerHTML = "";

    // Programmatically generates 100 entries mapping variations out of core bases
    for (let i = 1; i <= 100; i++) {
        const baseReason = reasonBases[(i - 1) % reasonBases.length];
        const suffix = i > reasonBases.length ? " (And I can never repeat this enough!)" : "";
        
        const card = document.createElement("div");
        card.className = "reason-item-card glass-card";
        
        card.innerHTML = `
            <div class="reason-num">${i}</div>
            <p class="reason-text">${baseReason}${suffix}</p>
            <img class="reason-gif" src="${gifUrls[(i - 1) % gifUrls.length]}" alt="Cute animation">
        `;
        container.appendChild(card);
    }
}

/* ==========================================
   SECRET ENDING REVEAL ACTIONS
   ========================================== */
document.getElementById("secret-btn").addEventListener("click", function() {
    this.classList.add("hidden");
    const content = document.getElementById("secret-content");
    content.classList.remove("hidden");
    
    // Explicit continuous heart shower at the end page
    setInterval(() => {
        const heart = document.createElement("div");
        heart.className = "floating-element";
        heart.innerText = "❤️";
        heart.style.left = Math.random() * 100 + "vw";
        heart.style.fontSize = "2rem";
        heart.style.animationDuration = "4s";
        document.getElementById("ambient-container").appendChild(heart);
        setTimeout(() => heart.remove(), 4500);
    }, 150);
});
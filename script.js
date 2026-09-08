// Lyrics data with precise delay timing (seconds)
const lyrics = [
    { text: "You know it's true", charDelay: 0.07, lineDelay: 2.3 },
    { text: "Yeah i miss you", charDelay: 0.08, lineDelay: 3.2 },
    { text: "You know it's true", charDelay: 0.09, lineDelay: 3.1 },
    { text: "So, What if i call?", charDelay: 0.06, lineDelay: 2.7 },
    { text: "And you pick up the phone", charDelay: 0.06, lineDelay: 2.9 },
    { text: "And i use this holiday", charDelay: 0.06, lineDelay: 1.8 },
    { text: "To make my way to your ghost", charDelay: 0.08, lineDelay: 3.4 },
    { text: "Oh, what if you're lonely?", charDelay: 0.07, lineDelay: 2.9 },
    { text: "You know i am too", charDelay: 0.06, lineDelay: 2.8 },
    { text: "And i get the chance to say", charDelay: 0.05, lineDelay: 2.4 },
    { text: "Merry Christmas i miss you", charDelay: 0.08, lineDelay: 3.8 },
    { text: "I MISS YOU", charDelay: 0.09, lineDelay: 2.5 }
];

// DOM Elements
const canvas = document.getElementById('bgCanvas');
const ctx = canvas.getContext('2d');
const lyricsTextEl = document.getElementById('lyricsText');
const cursorEl = document.getElementById('cursor');
const playBtn = document.getElementById('playBtn');
const playSvg = document.getElementById('playSvg');
const pauseSvg = document.getElementById('pauseSvg');
const musicCard = document.getElementById('musicCard');
const songStatus = document.getElementById('songStatus');
const replayBtn = document.getElementById('replayBtn');
const bgAudio = document.getElementById('bgAudio');

let isPlaying = false;
let currentLyricIndex = 0;
let typewriterTimeout = null;
let lineTimeout = null;

// Canvas & Particle Animation
let width, height;
const particles = [];
const particleCount = 120;

function resizeCanvas() {
    width = canvas.width = window.innerWidth;
    height = canvas.height = window.innerHeight;
}

window.addEventListener('resize', resizeCanvas);
resizeCanvas();

class Particle {
    constructor() {
        this.reset();
    }

    reset() {
        this.x = Math.random() * width;
        this.y = Math.random() * height - height;
        this.type = Math.random() < 0.4 ? 'snowflake' : (Math.random() < 0.7 ? 'raindrop' : 'sparkle');
        this.size = Math.random() * 3 + 1.5;
        this.speedY = Math.random() * 1.8 + 0.8;
        this.speedX = Math.random() * 0.6 - 0.3;
        this.opacity = Math.random() * 0.7 + 0.3;

        if (this.type === 'raindrop') {
            this.length = Math.random() * 12 + 8;
            this.speedY = Math.random() * 4 + 4;
        } else if (this.type === 'snowflake') {
            this.char = ['❄', '❆', '❅'][Math.floor(Math.random() * 3)];
            this.size = Math.random() * 10 + 10;
        } else {
            this.char = '✦';
            this.size = Math.random() * 8 + 6;
        }
    }

    update() {
        this.y += this.speedY;
        this.x += this.speedX;

        if (this.y > height) {
            this.reset();
            this.y = 0;
        }
    }

    draw() {
        ctx.save();
        ctx.globalAlpha = this.opacity;

        if (this.type === 'raindrop') {
            ctx.strokeStyle = '#87cefa';
            ctx.lineWidth = 1.2;
            ctx.beginPath();
            ctx.moveTo(this.x, this.y);
            ctx.lineTo(this.x + this.speedX, this.y + this.length);
            ctx.stroke();
        } else if (this.type === 'snowflake') {
            ctx.fillStyle = '#f0ffff';
            ctx.font = `${this.size}px sans-serif`;
            ctx.fillText(this.char, this.x, this.y);
        } else {
            ctx.fillStyle = '#ffe066';
            ctx.font = `${this.size}px sans-serif`;
            ctx.fillText(this.char, this.x, this.y);
        }

        ctx.restore();
    }
}

// Initialize particles
for (let i = 0; i < particleCount; i++) {
    const p = new Particle();
    p.y = Math.random() * height; // initial distribution
    particles.push(p);
}

function animateParticles() {
    ctx.clearRect(0, 0, width, height);
    particles.forEach(p => {
        p.update();
        p.draw();
    });
    requestAnimationFrame(animateParticles);
}
animateParticles();

// Lyrics data with stretched timings so lyrics stay visible on screen much longer
const timedLyrics = [
    { time: 0.5, text: "You know it's true", duration: 5.0 },
    { time: 6.0, text: "Yeah i miss you", duration: 5.0 },
    { time: 11.5, text: "You know it's true", duration: 5.0 },
    { time: 17.0, text: "So, What if i call?", duration: 5.0 },
    { time: 22.5, text: "And you pick up the phone", duration: 5.5 },
    { time: 28.5, text: "And i use this holiday", duration: 5.0 },
    { time: 34.0, text: "To make my way to your ghost", duration: 6.0 },
    { time: 40.5, text: "Oh, what if you're lonely?", duration: 5.5 },
    { time: 46.5, text: "You know i am too", duration: 5.0 },
    { time: 52.0, text: "And i get the chance to say", duration: 5.5 },
    { time: 58.0, text: "Merry Christmas i miss you", duration: 7.0 },
    { time: 66.0, text: "I MISS YOU", duration: 8.0 }
];

let activeLyricIndex = -1;
let charInterval = null;

function resetToIdleState() {
    if (charInterval) clearInterval(charInterval);
    lyricsTextEl.textContent = '';
    cursorEl.style.display = 'inline-block';
    activeLyricIndex = -1;
}

function updateLyricsOnTimeUpdate() {
    if (!isPlaying) return;
    const currentTime = bgAudio.currentTime;
    
    // Find active lyric for current playback timestamp
    let newIndex = -1;
    for (let i = timedLyrics.length - 1; i >= 0; i--) {
        if (currentTime >= timedLyrics[i].time) {
            if (currentTime <= timedLyrics[i].time + timedLyrics[i].duration + 1.2) {
                newIndex = i;
            }
            break;
        }
    }

    if (newIndex !== activeLyricIndex) {
        activeLyricIndex = newIndex;
        if (newIndex !== -1) {
            renderLyricItem(timedLyrics[newIndex]);
        } else {
            resetToIdleState();
        }
    }
}

function renderLyricItem(item) {
    if (charInterval) clearInterval(charInterval);
    lyricsTextEl.textContent = '';
    cursorEl.style.display = 'inline-block';

    let charIdx = 0;
    const charDelay = (item.duration * 1000) / item.text.length;

    charInterval = setInterval(() => {
        if (charIdx < item.text.length) {
            lyricsTextEl.textContent += item.text.charAt(charIdx);
            charIdx++;
        } else {
            clearInterval(charInterval);
        }
    }, charDelay);
}

// Audio & Controls Logic
function togglePlay() {
    isPlaying = !isPlaying;
    if (isPlaying) {
        playSvg.classList.add('hidden');
        pauseSvg.classList.remove('hidden');
        musicCard.classList.add('playing');
        
        if (!bgAudio.src || bgAudio.src === '') {
            bgAudio.src = 'music.mp3';
        }
        
        bgAudio.play().then(() => {
            songStatus.textContent = 'Memutar musik & lirik...';
        }).catch((err) => {
            console.log('Audio playback error:', err);
            songStatus.textContent = 'Klik tombol play lagi untuk memutar';
        });
    } else {
        playSvg.classList.remove('hidden');
        pauseSvg.classList.add('hidden');
        musicCard.classList.remove('playing');
        songStatus.textContent = 'Di-pause (Klik untuk lanjut)';
        bgAudio.pause();
        resetToIdleState();
    }
}

bgAudio.addEventListener('timeupdate', updateLyricsOnTimeUpdate);
bgAudio.addEventListener('ended', () => {
    isPlaying = false;
    playSvg.classList.remove('hidden');
    pauseSvg.classList.add('hidden');
    musicCard.classList.remove('playing');
    songStatus.textContent = 'Selesai diputar';
    resetToIdleState();
});

playBtn.addEventListener('click', togglePlay);

replayBtn.addEventListener('click', () => {
    bgAudio.currentTime = 0;
    resetToIdleState();
    if (!isPlaying) {
        togglePlay();
    } else {
        bgAudio.play();
    }
});

// Set initial state: Empty text with blinking cursor line only
document.addEventListener('DOMContentLoaded', () => {
    resetToIdleState();
});



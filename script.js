// Function to create heart-shaped image layout
function createHeartLayout() {
    const container = document.getElementById('heartContainer');
    const images = [
        'images/IMG_3591 (Copy).jpeg', 'images/IMG_3578 (Copy).jpeg', 'images/IMG_3315 (Copy).jpeg', 'images/IMG_3303 (Copy).JPG',
        'images/IMG_3301 (Copy).JPG', 'images/IMG_3207 (Copy).JPG', 'images/IMG_3191 (Copy).jpeg', 'images/IMG_3167 (Copy).JPG',
        'images/IMG_3166 (Copy).JPG', 'images/IMG_3165 (Copy).JPG', 'images/IMG_3161 (Copy).jpeg', 'images/IMG_3158 (Copy).jpeg',
        'images/IMG_3096 (Copy).jpeg', 'images/IMG_3084 (Copy).jpeg', 'images/IMG_3076 (Copy).jpeg', 'images/IMG_3044 (Copy).jpeg',
        'images/IMG_2860 (Copy).JPG', 'images/IMG_2841 (Copy).JPG', 'images/IMG_2831 (Copy).JPG', 'images/IMG_2826 (Copy).JPG',
        'images/IMG_2825 (Copy).JPG', 'images/IMG_2818 (Copy).JPG', 'images/IMG_2811 (Copy).JPG', 'images/IMG_2795 (Copy).jpeg',
        'images/IMG_2724 (Copy).jpeg', 'images/IMG_2710 (Copy).jpeg', 'images/IMG_2695 (Copy).jpeg', 'images/IMG_2687 (Copy).jpeg',
        'images/IMG_2680 (Copy).jpeg', 'images/IMG_2679 (Copy).jpeg', 'images/IMG_2667 (Copy).jpeg', 'images/IMG_2665 (Copy).jpeg',
        'images/IMG_2651 (Copy).jpeg', 'images/IMG_2640 (Copy).jpeg', 'images/IMG_2492 (Copy).jpeg', 'images/IMG_2491 (Copy).jpeg',
        'images/IMG_2304 (Copy).jpeg', 'images/IMG_1589 (Copy).jpeg', 'images/IMG_3647 (Copy).JPG',
    ];
    // Shuffle images
    const shuffled = images.slice().sort(() => Math.random() - 0.5);

    // Dense heart grid (11x9) with sharp bottom
    const heartGrid = [
      [0,1,1,0,0,0,0,0,1,1,0],
      [1,1,1,1,0,0,0,1,1,1,1],
      [1,1,1,1,1,0,1,1,1,1,1],
      [1,1,1,1,1,1,1,1,1,1,1],
      [0,1,1,1,1,1,1,1,1,1,0],
      [0,0,1,1,1,1,1,1,1,0,0],
      [0,0,0,1,1,1,1,1,0,0,0],
      [0,0,0,0,1,1,1,0,0,0,0],
      [0,0,0,0,0,1,0,0,0,0,0], // sharp bottom
    ];

    const padding = 32; // should match CSS
    const cols = heartGrid[0].length;
    const rows = heartGrid.length;
    const cellSize = Math.floor((container.offsetWidth - 2 * padding) / cols);
    const offsetX = padding + (container.offsetWidth - 2 * padding - (cellSize * cols)) / 2;
    const offsetY = padding + (container.offsetHeight - 2 * padding - (cellSize * rows)) / 2;

    let imgIndex = 0;
    for (let row = 0; row < rows; row++) {
        for (let col = 0; col < cols; col++) {
            if (heartGrid[row][col] === 1) {
                const img = document.createElement('img');
                img.src = shuffled[imgIndex % shuffled.length];
                img.className = 'heart-image';
                img.alt = `Memory ${imgIndex + 1}`;
                img.style.position = 'absolute';
                img.style.left = `${offsetX + col * cellSize}px`;
                img.style.top = `${offsetY + row * cellSize}px`;
                img.style.width = `${cellSize}px`;
                img.style.height = `${cellSize}px`;
                img.style.objectFit = 'cover';
                img.loading = 'lazy';
                img.width = cellSize;
                img.height = cellSize;
                container.appendChild(img);
                imgIndex++;
            }
        }
    }
}

// Initialize the layout when the page loads
window.addEventListener('load', createHeartLayout);

// Lightbox zoom for heart images
const lightboxOverlay = document.getElementById('lightboxOverlay');
const lightboxImg = document.getElementById('lightboxImg');
const heartContainer = document.getElementById('heartContainer');

heartContainer.addEventListener('click', function(e) {
    if (e.target.classList.contains('heart-image')) {
        lightboxImg.src = e.target.src;
        lightboxOverlay.style.display = 'flex';
        // Trigger reflow
        void lightboxOverlay.offsetWidth;
        lightboxOverlay.classList.add('active');
    }
});

lightboxOverlay.addEventListener('click', function(e) {
    if (e.target === lightboxOverlay) {
        lightboxOverlay.classList.remove('active');
        setTimeout(() => {
            lightboxOverlay.style.display = 'none';
            lightboxImg.src = '';
        }, 300);
    }
});

// --- Falling Particles Animation ---
(function() {
    const canvas = document.getElementById('particlesCanvas');
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    let width = window.innerWidth;
    let height = window.innerHeight;
    canvas.width = width;
    canvas.height = height;

    function resizeCanvas() {
        width = window.innerWidth;
        height = window.innerHeight;
        canvas.width = width;
        canvas.height = height;
    }
    window.addEventListener('resize', resizeCanvas);

    // Load images for heart, petal, sparkle
    const imageSources = {
        heart: 'https://cdn.jsdelivr.net/gh/twitter/twemoji@14.0.2/assets/72x72/2764.png',
        petal: 'https://cdn.jsdelivr.net/gh/twitter/twemoji@14.0.2/assets/72x72/1f339.png',
        sparkle: 'https://cdn.jsdelivr.net/gh/twitter/twemoji@14.0.2/assets/72x72/2728.png'
    };
    const images = {};
    let imagesLoaded = 0;
    const totalImages = Object.keys(imageSources).length;
    for (const key in imageSources) {
        images[key] = new Image();
        images[key].crossOrigin = 'anonymous';
        images[key].src = imageSources[key];
        images[key].onload = () => {
            imagesLoaded++;
        };
    }

    const PARTICLE_TYPES = ['heart', 'petal', 'sparkle'];

    function randomType() {
        return PARTICLE_TYPES[Math.floor(Math.random() * PARTICLE_TYPES.length)];
    }

    function createParticle() {
        const type = randomType();
        const size = Math.random() * 18 + 24; // 24-42px
        return {
            x: Math.random() * width,
            y: -size,
            size,
            speed: Math.random() * 1.2 + 0.6,
            drift: (Math.random() - 0.5) * 0.6,
            type,
            angle: Math.random() * Math.PI * 2,
            rotateSpeed: (Math.random() - 0.5) * 0.01
        };
    }

    let particles = [];
    for (let i = 0; i < 28; i++) particles.push(createParticle());

    function drawParticle(p) {
        const img = images[p.type];
        if (!img || !img.complete) return;
        ctx.save();
        ctx.translate(p.x, p.y);
        ctx.rotate(p.angle);
        ctx.globalAlpha = 0.85;
        ctx.drawImage(img, -p.size/2, -p.size/2, p.size, p.size);
        ctx.globalAlpha = 1;
        ctx.restore();
    }

    function animate() {
        if (imagesLoaded < totalImages) {
            requestAnimationFrame(animate);
            return;
        }
        ctx.clearRect(0, 0, width, height);
        for (let p of particles) {
            p.y += p.speed;
            p.x += p.drift;
            p.angle += p.rotateSpeed;
            drawParticle(p);
        }
        // Remove off-screen and add new
        particles = particles.filter(p => p.y < height + 40);
        while (particles.length < 28) particles.push(createParticle());
        requestAnimationFrame(animate);
    }
    animate();
})(); 
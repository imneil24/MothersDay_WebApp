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

// Zoom on click/tap for heart images
const container = document.getElementById('heartContainer');
container.addEventListener('click', function(e) {
    if (e.target.classList.contains('heart-image')) {
        // Remove zoom from all images
        document.querySelectorAll('.heart-image').forEach(img => img.classList.remove('zoomed'));
        // Add zoom to clicked image
        e.target.classList.add('zoomed');
    } else {
        // Clicked outside, remove zoom
        document.querySelectorAll('.heart-image').forEach(img => img.classList.remove('zoomed'));
    }
}); 
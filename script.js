
document.addEventListener("DOMContentLoaded", function() {
    const iconContainer = document.querySelector('.icon-container');
    const icons = iconContainer.querySelectorAll('.floating-icon');
  
    // Define initial positions for each icon type
    const initialPositions = {
      'linkedin-icon': { top: 35+6, left: 25 },
      'github-icon': { top: 41+6, left: 25 },
      'instagram-icon': { top: 47+6, left: 25 },
      'facebook-icon': { top: 53+6, left: 25 },
    };
  
    let animationFrames = {}; // Object to store animation frames for each icon
    let isFloating = false; // Flag to track if icons are currently floating
  
    function startFloating() {
      icons.forEach(icon => {
        const iconType = icon.classList[1];
        const iconSize = icon.offsetWidth;
        const initialTop = initialPositions[iconType].top;
        const initialLeft = initialPositions[iconType].left;
        const maxX = window.innerWidth - iconSize;
        const maxY = window.innerHeight - iconSize;
        let x = (initialLeft / 100) * maxX;
        let y = (initialTop / 100) * maxY;
  
        // Initialize random floating direction and speed
        let deltaX = (Math.random() - 0.5) * 2;
        let deltaY = (Math.random() - 0.5) * 2;
        const speed = Math.random() * 2 + 1; // Random speed between 1 and 3 pixels per frame
  
        // Animation loop
        function floatStep() {
          // Update position based on direction and speed
          x += deltaX * speed;
          y += deltaY * speed;
  
          // Check if the icon is out of bounds and adjust its position
          if (x < 0) {
            x = 0;
            deltaX *= -1;
          }
          if (x > maxX) {
            x = maxX;
            deltaX *= -1;
          }
          if (y < 0) {
            y = 0;
            deltaY *= -1;
          }
          if (y > maxY) {
            y = maxY;
            deltaY *= -1;
          }
  
          icon.style.left = `${x}px`;
          icon.style.top = `${y}px`;
          animationFrames[iconType] = requestAnimationFrame(floatStep);
        }
  
        animationFrames[iconType] = requestAnimationFrame(floatStep);
      });
      isFloating = true;
    }
  
    function stopFloating() {
      icons.forEach(icon => {
        const iconType = icon.classList[1];
        cancelAnimationFrame(animationFrames[iconType]);
      });
      isFloating = false;
    }

    // Start floating initially
    startFloating();
  
    // Event listener for the button click
    document.querySelector('.bubbly-button').addEventListener('click', function() {
      if (isFloating) {
        stopFloating();
        // Reset icon positions to initial positions
        icons.forEach(icon => {
          const iconType = icon.classList[1];
          const initialTop = initialPositions[iconType].top;
          const initialLeft = initialPositions[iconType].left;
          const iconSize = icon.offsetWidth;
          const maxX = window.innerWidth - iconSize;
          const maxY = window.innerHeight - iconSize;
          let x = (initialLeft / 100) * maxX;
          let y = (initialTop / 100) * maxY;
          icon.style.left = `${x}px`;
          icon.style.top = `${y}px`;
        });
      } else {
        startFloating();
      }
    });
});

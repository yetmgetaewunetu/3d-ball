// Handles camera auto-rotation and user override
let autoRotate = true;
let lastUserInteraction = 0;

export function setupCameraAnimation(camera, controls) {
  controls.enableDamping = true;
  controls.dampingFactor = 0.08;
  controls.enablePan = true;
  controls.enableZoom = true;
  controls.enableRotate = false; // We'll rotate camera manually

  controls.addEventListener("start", () => {
    autoRotate = false;
    lastUserInteraction = performance.now();
  });
}

export function animateCamera(camera, elapsed) {
  if (autoRotate) {
    const radius = 6;
    const speed = 0.3; // radians/sec
    const angle = elapsed * speed;
    camera.position.x = radius * Math.sin(angle);
    camera.position.z = radius * Math.cos(angle);
    camera.lookAt(0, 1, 0);
  } else {
    // Resume auto-rotate after 4s of inactivity
    if (performance.now() - lastUserInteraction > 4000) {
      autoRotate = true;
    }
  }
}

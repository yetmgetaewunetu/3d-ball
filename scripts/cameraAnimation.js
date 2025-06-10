// Handles camera auto-rotation and user override
let autoRotate = true;
let lastUserInteraction = 0;

export function setupCameraAnimation(camera, controls) {
  controls.enableDamping = true;
  controls.dampingFactor = 0.08;
  controls.enablePan = true; // Allow panning
  controls.enableZoom = true;
  controls.enableRotate = true; // Allow user to rotate manually
}

export function animateCamera(camera, elapsed, product) {
  // Add continuous rotation to the product (ball)
  if (product) {
    product.rotation.y += 0.01; // Adjust speed as desired
  }
}

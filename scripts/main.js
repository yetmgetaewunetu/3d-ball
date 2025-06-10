// Entry point: initializes everything and runs the animation loop
import { initScene } from "./initScene.js";
import { createProduct } from "./createProduct.js";
import { addLighting } from "./addLighting.js";
import { setupInteraction } from "./interaction.js";
import { setupCameraAnimation, animateCamera } from "./cameraAnimation.js";
import * as THREE from "three";
import { OrbitControls } from "https://unpkg.com/three@0.155.0/examples/jsm/controls/OrbitControls.js";

let scene, camera, renderer, controls;

// Setup
const { scene: s, camera: c, renderer: r } = initScene(document.body);
scene = s;
camera = c;
renderer = r;

// Product
const product = createProduct();
scene.add(product);

// Lighting
addLighting(scene);

// Controls
controls = new OrbitControls(camera, renderer.domElement);
setupCameraAnimation(camera, controls);

// Interaction
setupInteraction(renderer, camera, scene, product);

// Animation loop
let clock = new THREE.Clock();
function animate() {
  requestAnimationFrame(animate);
  const elapsed = clock.getElapsedTime();
  animateCamera(camera, elapsed); // Camera auto-rotation
  controls.update();
  // Optional: floating effect
  product.position.y = 0.05 * Math.sin(elapsed * 2);
  renderer.render(scene, camera);
}
animate();

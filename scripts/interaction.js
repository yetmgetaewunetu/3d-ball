// Handles raycasting, hover/click feedback, and info panel
import * as THREE from "three";

let raycaster = new THREE.Raycaster();
let mouse = new THREE.Vector2();

export function setupInteraction(renderer, camera, scene, productGroup) {
  // Remove all mouse event listeners for tooltip and click
  // No tooltip, no click action, no hover effect
}

function setMouseCoords(event, domElement) {
  const rect = domElement.getBoundingClientRect();
  mouse.x = ((event.clientX - rect.left) / rect.width) * 2 - 1;
  mouse.y = -((event.clientY - rect.top) / rect.height) * 2 + 1;
}

function getIntersects(camera, group) {
  raycaster.setFromCamera(mouse, camera);
  return raycaster.intersectObjects(group.children, false);
}

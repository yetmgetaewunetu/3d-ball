// Handles raycasting, hover/click feedback, and info panel
import * as THREE from "three";

let raycaster = new THREE.Raycaster();
let mouse = new THREE.Vector2();
let hovered = null;

export function setupInteraction(renderer, camera, scene, productGroup) {
  const infoPanel = document.getElementById("infoPanel");

  renderer.domElement.addEventListener("mousemove", (event) => {
    setMouseCoords(event, renderer.domElement);
    const intersects = getIntersects(camera, productGroup);
    if (intersects.length > 0) {
      if (hovered !== intersects[0].object) {
        if (hovered) hovered.scale.set(1, 1, 1);
        hovered = intersects[0].object;
        hovered.scale.set(1.08, 1.08, 1.08);
        infoPanel.textContent = hovered.name;
        infoPanel.style.display = "block";
      }
      infoPanel.style.left = event.clientX + 20 + "px";
      infoPanel.style.top = event.clientY + "px";
    } else {
      if (hovered) hovered.scale.set(1, 1, 1);
      hovered = null;
      infoPanel.style.display = "none";
    }
  });

  renderer.domElement.addEventListener("click", (event) => {
    setMouseCoords(event, renderer.domElement);
    const intersects = getIntersects(camera, productGroup);
    if (intersects.length > 0) {
      const obj = intersects[0].object;
      const origColor = obj.material.color.getHex();
      obj.material.color.set(0xffc107);
      setTimeout(() => obj.material.color.set(origColor), 250);
      infoPanel.textContent = obj.name;
      infoPanel.style.display = "block";
      infoPanel.style.left = event.clientX + 20 + "px";
      infoPanel.style.top = event.clientY + "px";
    }
  });
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

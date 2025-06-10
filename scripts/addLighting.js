// Adds ambient and directional light to the scene
import * as THREE from "three";

export function addLighting(scene) {
  const ambient = new THREE.AmbientLight(0xffffff, 0.5);
  scene.add(ambient);

  const dirLight = new THREE.DirectionalLight(0xffffff, 0.8);
  dirLight.position.set(3, 6, 4);
  dirLight.castShadow = true;
  scene.add(dirLight);
}

// FIFA-style soccer ball using IcosahedronGeometry
import * as THREE from "three";

export function createProduct() {
  const group = new THREE.Group();

  // Ball (FIFA style: alternating black/white faces, smoother sphere)
  const radius = 1;
  // Increase detail for a smoother sphere
  const geometry = new THREE.IcosahedronGeometry(radius, 4); // Subdivision 4 for smoothness

  // Prepare color attribute for each vertex
  const position = geometry.attributes.position;
  const colors = [];
  const white = new THREE.Color(0xffffff);
  const black = new THREE.Color(0x222222);

  // Each face is a triangle (3 vertices)
  let faceCount;
  if (geometry.index) {
    faceCount = geometry.index.count / 3;
    for (let i = 0; i < geometry.index.count; i += 3) {
      const color = (i / 3) % 2 === 0 ? white : black;
      for (let j = 0; j < 3; j++) {
        colors.push(color.r, color.g, color.b);
      }
    }
  } else {
    faceCount = position.count / 3;
    for (let i = 0; i < position.count; i += 3) {
      const color = (i / 3) % 2 === 0 ? white : black;
      for (let j = 0; j < 3; j++) {
        colors.push(color.r, color.g, color.b);
      }
    }
  }
  geometry.setAttribute("color", new THREE.Float32BufferAttribute(colors, 3));

  const material = new THREE.MeshStandardMaterial({
    vertexColors: true,
    roughness: 0.4,
    metalness: 0.2,
    flatShading: false, // Set to false for smooth shading
  });

  const ball = new THREE.Mesh(geometry, material);
  ball.name = "FIFA Ball";
  group.add(ball);

  group.position.set(0, 1, 0);
  return group;
}

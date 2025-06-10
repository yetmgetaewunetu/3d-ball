// FIFA-style soccer ball using IcosahedronGeometry
import * as THREE from "three";

export function createProduct() {
  const group = new THREE.Group();

  // Main Ball (FIFA style, smooth)
  const radius = 1;
  const ballGeometry = new THREE.IcosahedronGeometry(radius, 4);
  const position = ballGeometry.attributes.position;
  const colors = [];
  const white = new THREE.Color(0xffffff);
  const black = new THREE.Color(0x222222);
  let faceCount;
  if (ballGeometry.index) {
    faceCount = ballGeometry.index.count / 3;
    for (let i = 0; i < ballGeometry.index.count; i += 3) {
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
  ballGeometry.setAttribute(
    "color",
    new THREE.Float32BufferAttribute(colors, 3)
  );
  const ballMaterial = new THREE.MeshStandardMaterial({
    vertexColors: true,
    roughness: 0.4,
    metalness: 0.2,
    flatShading: false,
  });
  const ball = new THREE.Mesh(ballGeometry, ballMaterial);
  ball.name = "Ball";
  ball.position.y = 1;
  group.add(ball);

  // Stand (Cylinder)
  const standGeometry = new THREE.CylinderGeometry(0.3, 0.3, 0.2, 32);
  const standMaterial = new THREE.MeshStandardMaterial({
    color: 0x888888,
    roughness: 0.7,
  });
  const stand = new THREE.Mesh(standGeometry, standMaterial);
  stand.name = "Stand";
  stand.position.y = 0.1;
  group.add(stand);

  // Base (Box) - Colorful stripes
  const baseGeometry = new THREE.BoxGeometry(1, 0.1, 1);
  // Create an array of colors for each face (6 faces, 2 triangles per face)
  const baseColors = [
    0xff0000, // red
    0xffa500, // orange
    0xffff00, // yellow
    0x00ff00, // green
    0x0000ff, // blue
    0x800080, // purple
  ];
  const baseMaterialArray = baseColors.map(
    (color) => new THREE.MeshStandardMaterial({ color, roughness: 0.8 })
  );
  const base = new THREE.Mesh(baseGeometry, baseMaterialArray);
  base.name = "Base";
  base.position.y = -0.05;
  group.add(base);

  group.position.set(0, 0, 0);
  return group;
}

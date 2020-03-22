import * as THREE from 'three';
export default class Road extends THREE.Mesh {
  constructor(color) {
    const geometry = new THREE.BoxGeometry(10, 10, 50);
    geometry.translate(0, 5, 0);

    const scale = 0.015;
    geometry.scale(scale, scale, scale);

    const material = new THREE.MeshStandardMaterial({ color });
    super(geometry, material);
  }
}

import * as THREE from 'three';

export default class Settlement extends THREE.Mesh {
  constructor(color) {
    const geometry = new THREE.Geometry();
    const SIDE_HEIGHT = 7 * 2; // origin on y axis
    const ROOF_ADD = 4 * 2;

    const WIDTH = 10;
    const LENGTH = 14;

    const ROOF_HEIGHT = ROOF_ADD + SIDE_HEIGHT;
    geometry.vertices.push(
      new THREE.Vector3(-WIDTH, 0, LENGTH), // 0
      new THREE.Vector3(WIDTH, 0, LENGTH), // 1
      new THREE.Vector3(-WIDTH, SIDE_HEIGHT, LENGTH), // 2
      new THREE.Vector3(WIDTH, SIDE_HEIGHT, LENGTH), // 3
      new THREE.Vector3(-WIDTH, 0, -LENGTH), // 4
      new THREE.Vector3(WIDTH, 0, -LENGTH), // 5
      new THREE.Vector3(-WIDTH, SIDE_HEIGHT, -LENGTH), // 6
      new THREE.Vector3(WIDTH, SIDE_HEIGHT, -LENGTH), // 7
      new THREE.Vector3(0, ROOF_HEIGHT, -LENGTH), // 8
      new THREE.Vector3(0, ROOF_HEIGHT, LENGTH) // 9
    );

    geometry.faces.push(
      // front
      new THREE.Face3(0, 3, 2),
      new THREE.Face3(0, 1, 3),
      // right
      new THREE.Face3(1, 7, 3),
      new THREE.Face3(1, 5, 7),
      // back
      new THREE.Face3(5, 6, 7),
      new THREE.Face3(5, 4, 6),
      // left
      new THREE.Face3(4, 2, 6),
      new THREE.Face3(4, 0, 2),
      // top
      new THREE.Face3(2, 7, 6),
      new THREE.Face3(2, 3, 7),
      // bottom
      new THREE.Face3(4, 1, 0),
      new THREE.Face3(4, 5, 1),

      // roof back
      new THREE.Face3(8, 7, 6),

      // roof front
      new THREE.Face3(9, 2, 3),

      // roof right
      new THREE.Face3(8, 3, 7),
      new THREE.Face3(3, 8, 9),

      // roof left
      new THREE.Face3(6, 2, 8),
      new THREE.Face3(2, 9, 8)
    );

    geometry.computeFaceNormals();

    const scale = 0.015;
    geometry.scale(scale, scale, scale);

    const material = new THREE.MeshStandardMaterial({ color });
    super(geometry, material);
  }
}

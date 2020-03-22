import * as THREE from 'three';
import Sheep from '../sheep';

// same for all tiles, do once
const tile_side_texture = new THREE.TextureLoader().load(
  `../../../assets/tiles/tile_side.png`
);
const material_side = new THREE.MeshBasicMaterial({ map: tile_side_texture });

export default class ResourceTile extends THREE.Mesh {
  constructor(resource = 'brick') {
    const texture_top = new THREE.TextureLoader().load(
      `../../../assets/tiles/${resource}.png`
    );

    // randomly rotate
    texture_top.rotation = (Math.PI / 3) * Math.floor(Math.random() * 6);
    texture_top.center = new THREE.Vector2(0.5, 0.5);

    const material_top = new THREE.MeshBasicMaterial({ map: texture_top });

    const material = new THREE.MeshFaceMaterial([material_top, material_side]);

    const width = 1;

    const thickness = 0.2;
    const num_sides = 6;
    const geometry = new THREE.CylinderGeometry(
      width,
      width,
      thickness,
      num_sides
    );
    geometry.faces.forEach((face, i) => {
      face.materialIndex =
        i < num_sides * 2 // is a side
          ? 1
          : 0;
    });

    super(geometry, material);

    if (resource === 'sheep') {
      const numSheep = Math.ceil(Math.random() * 3);
      for (let i = 0; i < numSheep; i++) {
        const sheep = new Sheep();
        const scale = 0.1;
        sheep.scale.set(scale, scale, scale);
        const randomVector = new THREE.Vector2(
          -1 + 2 * Math.random(),
          -1 + 2 * Math.random()
        );
        randomVector.normalize();
        randomVector.multiplyScalar(Math.random() * 0.8);
        sheep.position.x = sheep.position.x + randomVector.x;
        sheep.position.z = sheep.position.z + randomVector.y;
        sheep.rotateY(Math.floor(Math.random() * 6));

        this.add(sheep);
      }
    }
  }
}

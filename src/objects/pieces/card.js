import * as THREE from 'three';
export default class Card extends THREE.Mesh {
  constructor(type) {
    let material;
    if (type) {
      const texture = new THREE.TextureLoader().load(
        `../../../assets/cards/${type}_card.png`
      );
      material = new THREE.MeshBasicMaterial({ map: texture });
    } else {
      material = new THREE.MeshStandardMaterial({ color: 'purple' });
    }

    const geometry = new THREE.BoxGeometry(7, 0.1, 10);

    const scale = 0.25;
    geometry.scale(scale, scale, scale);

    super(geometry, material);
  }
}

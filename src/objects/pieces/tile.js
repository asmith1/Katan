import * as THREE from 'three';

const brick1_texture = new THREE.TextureLoader().load("../../../assets/tiles/brick1.png");
const brick1_material = new THREE.MeshBasicMaterial( { map: brick1_texture } );

export function createTile({color = "grey", resource, variant, }) {
    let material = null;
    if (resource && variant) {
        const texture = new THREE.TextureLoader().load(`../../../assets/tiles/${resource}${variant}.png`);
        // randomly rotate
        texture.rotation =  (Math.PI / 3) * (Math.floor(Math.random() * 6));
        texture.center = new THREE.Vector2(0.5, 0.5);
        material  = new THREE.MeshBasicMaterial( { map: texture } );
    } else {
        material = new THREE.MeshStandardMaterial({color});
    }

    const width = 1.125
    const height = 0.2
    var geometry = new THREE.CylinderGeometry( width, width, height, 6 );
    geometry.translate(0, -(height / 2 - 0.01), 0);

    var tile = new THREE.Mesh( geometry, material );
    return tile;
}
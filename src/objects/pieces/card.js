import * as THREE from 'three';

const brick1_texture = new THREE.TextureLoader().load("../../../assets/tiles/brick1.png");
const brick1_material = new THREE.MeshBasicMaterial( { map: brick1_texture } );

export function createCard(cardPathName) {
    let material;
    if (cardPathName) {
        const texture = new THREE.TextureLoader().load(`../../../assets/cards/${cardPathName}_card.png`);
        material  = new THREE.MeshBasicMaterial( { map: texture } );
    } else {
        material = new THREE.MeshStandardMaterial({color: 'purple'})
    }

    const geometry = new THREE.BoxGeometry( 7, 0.1, 10 );

    const scale = 0.25
    geometry.scale(scale, scale, scale)

    const card = new THREE.Mesh( geometry, material );
    return card;
}

export default class Card extends THREE.Mesh{
    constructor(type) {
        let material;
        if (cardPathName) {
            const texture = new THREE.TextureLoader().load(`../../../assets/cards/${cardPathName}_card.png`);
            material  = new THREE.MeshBasicMaterial( { map: texture } );
        } else {
            material = new THREE.MeshStandardMaterial({color: 'purple'})
        }
    
        const geometry = new THREE.BoxGeometry( 7, 0.1, 10 );
    
        const scale = 0.25
        geometry.scale(scale, scale, scale)
    
        super( geometry, material );
     }
}
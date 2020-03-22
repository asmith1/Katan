import * as THREE from 'three';

// same for all tiles, do once
const tile_side_texture =  new THREE.TextureLoader().load(`../../../assets/tiles/tile_side.png`);
const material_side  = new THREE.MeshBasicMaterial( { map: tile_side_texture  } );

export default class Tile extends THREE.Mesh {
    constructor(resource) {
        const texture_top = new THREE.TextureLoader().load(`../../../assets/tiles/${resource}.png`);

        // randomly rotate
        texture_top.rotation =  (Math.PI / 3) * (Math.floor(Math.random() * 6));
        texture_top.center = new THREE.Vector2(0.5, 0.5);
    
        const material_top  = new THREE.MeshBasicMaterial( { map: texture_top  } );
    
        const material = new THREE.MeshFaceMaterial([material_top, material_side]);
    
        const width = 1.125
        const height = 0.2
        const num_sides = 6;
        const geometry = new THREE.CylinderGeometry( width, width, height, num_sides );
        geometry.faces.forEach((face, i) => {
            face.materialIndex = i < num_sides * 2 // is a side
                ? 1 
                : 0
         })
    
         super(geometry, material);
    }
}
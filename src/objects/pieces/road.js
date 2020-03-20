import * as THREE from 'three';

export function createRoad(color = "orange") {
    var geometry = new THREE.BoxGeometry( 10, 10, 50 );

    const scale = 0.015
    geometry.scale(scale, scale, scale)

    var material = new THREE.MeshStandardMaterial({color});
    var road = new THREE.Mesh( geometry, material );
    return road;
}
import * as THREE from 'three';
import Land from './Land/Land.js';
import Flower from './Flower/Flower.js';
import BasicLights from './Lights.js';

function createTile() {
    // var geometry = new THREE.BoxGeometry( 1, 1, 1 );

    var geometry = new THREE.CylinderGeometry( 1.125, 1.125, 0.2, 6 );

    var material = new THREE.MeshStandardMaterial();
    var tile = new THREE.Mesh( geometry, material );
    return tile;
}

function createTiles() {
  const tiles = [];
    for (let i = 0; i < 20; i++) {
      tiles.push(createTile())
    }

    tiles[1].position.x = 2;
    tiles[2].position.x = 2;
    tiles[3].position.x = -2;
    tiles[4].position.x = 4;
    tiles[5].position.x = -4;

    // 2nd from bottom
    tiles[6].position.z = Math.sqrt(3);
    tiles[6].position.x = 1;

    tiles[7].position.z = Math.sqrt(3);
    tiles[7].position.x = 3;

    tiles[8].position.z = Math.sqrt(3);
    tiles[8].position.x = -1;

    tiles[9].position.z = Math.sqrt(3);
    tiles[9].position.x = -3;

    // 2nd from top
    tiles[10].position.z = -Math.sqrt(3);
    tiles[10].position.x = 1;

    tiles[11].position.z = -Math.sqrt(3);
    tiles[11].position.x = 3;

    tiles[12].position.z = -Math.sqrt(3);
    tiles[12].position.x = -1;

    tiles[13].position.z = -Math.sqrt(3);
    tiles[13].position.x = -3;

    // bottom 
    tiles[14].position.z = Math.sqrt(3) * 2;
    tiles[14].position.x = 0;

    tiles[15].position.z = Math.sqrt(3) * 2;
    tiles[15].position.x = -2;

    tiles[16].position.z = Math.sqrt(3) * 2;
    tiles[16].position.x = 2;

    // Top
    tiles[17].position.z = -Math.sqrt(3) * 2;
    tiles[17].position.x = 0;

    tiles[18].position.z = -Math.sqrt(3) * 2;
    tiles[18].position.x = -2;

    tiles[19].position.z = -Math.sqrt(3) * 2;
    tiles[19].position.x = 2;
    return tiles
}

function createHouse() {
      var geometry = new THREE.BoxGeometry( 1, 1, 1 );
      var material = new THREE.MeshStandardMaterial({color: "orange"});
      var tile = new THREE.Mesh( geometry, material );
      return tile;
}

export default class SeedScene extends THREE.Group {
  constructor() {
    super();
    
    const land = new Land();

    const tiles = createTiles();

    const house = createHouse();
    house.position.y = 1;

     // const flower = new Flower();
    const lights = new BasicLights();

    this.add(
      ...tiles,
      house,
      lights
    );
  }

  update(timeStamp) {
    // this.rotation.y = timeStamp / 10000;
  }
}


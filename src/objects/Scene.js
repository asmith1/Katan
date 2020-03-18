import * as THREE from 'three';
import Land from './Land/Land.js';
import Flower from './Flower/Flower.js';
import BasicLights from './Lights.js';
import {setDragControls} from '../entry.js';

function randomColor() {
  const color = new THREE.Color( 0xffffff );
  color.setHex( Math.random() * 0xffffff );
  return color;
}

function createTile() {
    // var geometry = new THREE.BoxGeometry( 1, 1, 1 );

    const width = 1.125
    const height = 0.2
    var geometry = new THREE.CylinderGeometry( width, width, height, 6 );
    geometry.translate(0, -(height / 2 - 0.01), 0);

    var material = new THREE.MeshStandardMaterial({color: randomColor()});
    var tile = new THREE.Mesh( geometry, material );
    return tile;
}

function createSettlement() {
      var geometry = new THREE.Geometry();
      const SIDE_HEIGHT = 7 * 2; // origin on y axis
      const ROOF_ADD = 4 * 2;

    
      const WIDTH = 10;
      const LENGTH = 14;


      const ROOF_HEIGHT = ROOF_ADD + SIDE_HEIGHT; 
      geometry.vertices.push(
        new THREE.Vector3(-WIDTH, 0,  LENGTH),  // 0
        new THREE.Vector3( WIDTH, 0,  LENGTH),  // 1
        new THREE.Vector3(-WIDTH, SIDE_HEIGHT,  LENGTH),  // 2
        new THREE.Vector3( WIDTH, SIDE_HEIGHT,  LENGTH),  // 3
        new THREE.Vector3(-WIDTH, 0, -LENGTH),  // 4
        new THREE.Vector3( WIDTH, 0, -LENGTH),  // 5
        new THREE.Vector3(-WIDTH, SIDE_HEIGHT, -LENGTH),  // 6
        new THREE.Vector3( WIDTH, SIDE_HEIGHT, -LENGTH),  // 7
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
        new THREE.Face3(9, 2, 3 ),

        // roof right 
        new THREE.Face3(8, 3, 7),
        new THREE.Face3(3, 8, 9),

        // roof left
        new THREE.Face3(6, 2, 8),
        new THREE.Face3(2, 9, 8)
      );
            
      geometry.computeFaceNormals();

      const scale = 0.02
      geometry.scale(scale, scale, scale)

      var material = new THREE.MeshStandardMaterial({color: "orange"});
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

export default class SeedScene extends THREE.Group {
  constructor() {
    super();
    
    const land = new Land();

    const tiles = createTiles();

    const settlement = createSettlement();
    settlement.position.y = 1;

     // const flower = new Flower();
    const lights = new BasicLights();

    var size = 10;
    var divisions = 10;

    var gridHelper = new THREE.GridHelper( size, divisions );

    setTimeout(
      () => {
        setDragControls(settlement);
      }, 
      1000
    );


    this.add(
      ...tiles,
      settlement,
      lights,
      gridHelper
    );
  }

  update(timeStamp) {
    // this.rotation.y = timeStamp / 10000;
  }
}
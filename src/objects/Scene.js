import * as THREE from 'three';
  import BasicLights from './Lights.js';
import {setDragControls} from '../entry.js';
import {createSettlement} from "./pieces/settlement";
import {createTile} from "./pieces/tile";
import {createRoad} from "./pieces/road";
import {createCard} from "./pieces/card";
import { Vector3, Vector2 } from 'three';

function randomColor() {
  const color = new THREE.Color( 0xffffff );
  color.setHex( Math.random() * 0xffffff );
  return color;
}

/**
 * Shuffles array in place. ES6 version
 * @param {Array} a items An array containing the items.
 */
function shuffle(a) {
  for (let i = a.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [a[i], a[j]] = [a[j], a[i]];
  }
  return a;
}

// obj - your object (THREE.Object3D or derived)
// point - the point of rotation (THREE.Vector3)
// axis - the axis of rotation (normalized THREE.Vector3)
// theta - radian value of rotation
// pointIsWorld - boolean indicating the point is in world coordinates (default = false)
function rotateAboutPoint(obj, point, axis, theta, pointIsWorld){
  pointIsWorld = (pointIsWorld === undefined)? false : pointIsWorld;

  if(pointIsWorld){
      obj.parent.localToWorld(obj.position); // compensate for world coordinate
  }

  obj.position.sub(point); // remove the offset
  obj.position.applyAxisAngle(axis, theta); // rotate the POSITION
  obj.position.add(point); // re-add the offset

  if(pointIsWorld){
      obj.parent.worldToLocal(obj.position); // undo world coordinates compensation
  }

  obj.rotateOnAxis(axis, theta); // rotate the OBJECT
}

function createTiles() {
  const tiles = [];

    for (let i = 0; i < 3; i++) {
      tiles.push(createTile({resource: "brick", variant: i + 1}))
    }

    for (let i = 0; i < 3; i++) {
      tiles.push(createTile({resource: "ore", variant: i + 1}))
    }

    for (let i = 0; i < 4; i++) {
      tiles.push(createTile({resource: "wheat", variant: i + 1}))
    }

    for (let i = 0; i < 4; i++) {
      tiles.push(createTile({resource: "wood", variant: i + 1}))
    }

    for (let i = 0; i < 4; i++) {
      tiles.push(createTile({resource: "sheep", variant: i + 1}))
    }

    for (let i = 0; i < 1; i++) {
      tiles.push(createTile({resource: "desert", variant: i + 1}))
    }

    shuffle(tiles);

    tiles[1].position.x = 2;
    tiles[2].position.x = -2;
    tiles[3].position.x = 4;
    tiles[4].position.x = -4;

    // 2nd from bottom
    tiles[5].position.z = Math.sqrt(3);
    tiles[5].position.x = 1;

    tiles[6].position.z = Math.sqrt(3);
    tiles[6].position.x = 3;

    tiles[7].position.z = Math.sqrt(3);
    tiles[7].position.x = -1;

    tiles[8].position.z = Math.sqrt(3);
    tiles[8].position.x = -3;

    // 2nd from top
    tiles[9].position.z = -Math.sqrt(3);
    tiles[9].position.x = 1;

    tiles[10].position.z = -Math.sqrt(3);
    tiles[10].position.x = 3;

    tiles[11].position.z = -Math.sqrt(3);
    tiles[11].position.x = -1;

    tiles[12].position.z = -Math.sqrt(3);
    tiles[12].position.x = -3;

    // bottom 
    tiles[13].position.z = Math.sqrt(3) * 2;
    tiles[13].position.x = 0;

    tiles[14].position.z = Math.sqrt(3) * 2;
    tiles[14].position.x = -2;

    tiles[15].position.z = Math.sqrt(3) * 2;
    tiles[15].position.x = 2;

    // Top
    tiles[16].position.z = -Math.sqrt(3) * 2;
    tiles[16].position.x = 0;

    tiles[17].position.z = -Math.sqrt(3) * 2;
    tiles[17].position.x = -2;

    tiles[18].position.z = -Math.sqrt(3) * 2;
    tiles[18].position.x = 2;

    return tiles;
}

function createPieces(color, offsetZ) {
  const pieces = [];
  for (let i = 0; i < 5; i++) { 
    const settlement = createSettlement(color);
    settlement.position.y = 1;
    settlement.position.x = (i % 2)  ? (i + 1) / 4 : - i / 4;
    settlement.position.z = offsetZ;
    pieces.push(settlement)
    };
  const roads = [];
  for (let i = 0; i < 5; i++) { 
    const road = createRoad(color);
    road.position.y = 1;
    road.position.x = (i % 2)  ? (i + 1) / 4 : - i / 4;
    road.position.z = 1 + offsetZ;
    pieces.push(road) 
  };
  const group = new THREE.Group();
  pieces.forEach(p => group.add(p))
  return group;
}

function createCardStack(resource, number) {
  const group = new THREE.Group();
  for (let i = 0; i < number; i++) {
    const card = createCard(resource);
    card.position.y = i * 0.1;
    group.add(card);
  }
  return group;
}

function createResourceCardStacks() {
  const cardOrder = ["wheat", "ore", "brick", "sheep", "wood", "dev_back" ]
  const cards = [
    ...cardOrder.map(resource => createCardStack(resource, 10)),
    ...cardOrder.map(resource => createCardStack(resource, 9))
  ];
  const cardsGroup = new THREE.Group();
  cards.forEach(c => cardsGroup.add(c));
  return cardsGroup;
}

export default class SeedScene extends THREE.Group {
  constructor() {
    super();

    const boardCenterNormal = new Vector3(0, 1, 0);
    const boardCenter = new THREE.Vector3(0, 0, 0);

    var size = 10;
    var divisions = 10;
    
    const tiles = createTiles();

    const orangePieces = createPieces("orange", 0);
    const bluePieces = createPieces("blue", 0);
    const redPieces = createPieces("red", 0);
    const whitePieces = createPieces("white", 0);


    const pieces = new THREE.Group();
    [orangePieces, bluePieces, redPieces, whitePieces].forEach(
      (colorSet, i) => {
        colorSet.children.forEach(
          piece => {
            piece.position.z = piece.position.z - size * 0.6;
            rotateAboutPoint(piece, boardCenter, boardCenterNormal, i * (Math.PI / 2), true);
          }
        );
        pieces.add(colorSet);
      }
    )
    
    const resourceCardStacks = createResourceCardStacks();

    resourceCardStacks.children.forEach((c, i, all) => {
      // c.position.x = (- size / 2) + (i * (size /( all.length - 1)));
      c.position.z = (- size / 2) - 2;
      rotateAboutPoint(c, boardCenter, boardCenterNormal, i * (Math.PI / 6), true);
    });
 
     // const flower = new Flower();
    const lights = new BasicLights();

    var gridHelper = new THREE.GridHelper( size, divisions );

    setTimeout(
      () => {
        setDragControls([pieces, resourceCardStacks]);
      }, 
      1000
    );


    this.add(
      ...tiles,
      pieces,
      resourceCardStacks,
      lights,
      gridHelper
    );
  }

  update(timeStamp) {
    // this.rotation.y = timeStamp / 10000;
  }
}
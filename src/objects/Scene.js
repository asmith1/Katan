import * as THREE from 'three';
import BasicLights from './Lights.js';
import { setDragControls } from '../entry.js';
import Settlement from './pieces/settlement';
import Road from './pieces/road';
import Card from './pieces/card';
import { Vector3 } from 'three';
import rotateAboutPoint from '../util/rotateAroundPoint.js';
import Board from './pieces/board/index.js';

function createPieces(color) {
  const pieces = [];
  for (let i = 0; i < 5; i++) {
    const settlement = new Settlement(color);
    settlement.position.y = 1;
    settlement.position.x = i % 2 ? (i + 1) / 4 : -i / 4;
    settlement.position.z = 0;
    pieces.push(settlement);
  }
  // const roads = [];
  for (let i = 0; i < 5; i++) {
    const road = new Road(color);
    road.position.y = 1;
    road.position.x = i % 2 ? (i + 1) / 4 : -i / 4;
    road.position.z = 1 + 0;
    pieces.push(road);
  }
  const group = new THREE.Group();
  pieces.forEach((p) => group.add(p));
  return group;
}

function createCardStack(resource, number) {
  const group = new THREE.Group();
  for (let i = 0; i < number; i++) {
    const card = new Card(resource);
    card.position.y = i * 0.1;
    group.add(card);
  }
  return group;
}

const cardOrder = ['wheat', 'ore', 'brick', 'sheep', 'wood', 'dev_back'];
function createResourceCardStacks() {
  const cards = [
    ...cardOrder.map((resource) => createCardStack(resource, 10)),
    ...cardOrder.map((resource) => createCardStack(resource, 9)),
  ];
  const cardsGroup = new THREE.Group();
  cards.forEach((c) => cardsGroup.add(c));
  return cardsGroup;
}

export default class SeedScene extends THREE.Group {
  constructor() {
    super();

    const boardCenterNormal = new Vector3(0, 1, 0);
    const boardCenter = new THREE.Vector3(0, 0, 0);

    var size = 10;
    // var divisions = 10;

    const pieces = ['orange', 'blue', 'red', 'white']
      .map(createPieces)
      .reduce((currentPieces, colorSet, i) => {
        colorSet.children.forEach((piece) => {
          piece.position.z = piece.position.z - size * 0.6;
          rotateAboutPoint(
            piece,
            boardCenter,
            boardCenterNormal,
            i * (Math.PI / 2),
            true
          );
        });
        return [...currentPieces, ...colorSet.children];
      }, []);

    const resourceCardStacks = createResourceCardStacks();

    const resourceCards = resourceCardStacks.children.reduce(
      (accCards, stack, i) => {
        stack.children.forEach((c) => {
          c.position.z = -size / 2 - 2;
          rotateAboutPoint(
            c,
            boardCenter,
            boardCenterNormal,
            i * (Math.PI / 6),
            true
          );
        });
        return [...accCards, ...stack.children];
      },
      []
    );

    const lights = new BasicLights();
    const board = new Board();

    // var gridHelper = new THREE.GridHelper(size, divisions);

    setTimeout(() => {
      setDragControls([...pieces, ...resourceCards]);
    }, 1000);

    this.add(
      ...board.children, // for intersection points we want to spread this.
      ...pieces,
      ...resourceCards,
      lights
      // gridHelper
    );
  }

  update(/* timeStamp */) {
    // this.rotation.y = timeStamp / 10000;
  }
}

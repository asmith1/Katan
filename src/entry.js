/**
 * entry.js
 *
 * This is the first file loaded. It sets up the Renderer,
 * Scene and Camera. It also starts the render loop and
 * handles window resizes.
 *
 */

import {
  WebGLRenderer,
  PerspectiveCamera,
  Scene,
  Vector3,
  Raycaster,
  Vector2,
  Plane,
} from 'three';
import { DragControls } from 'three/examples/jsm/controls/DragControls.js';

import GameScene from './objects/GameScene.js';

import Card from './objects/pieces/card.js';

import genBoardSeed from './seeds/genBoardSeed';

const scene = new Scene();
const camera = new PerspectiveCamera();
const renderer = new WebGLRenderer({ antialias: true });

const BOARD_RADIUS = 2;
const gameScene = new GameScene({
  boardSeed: genBoardSeed(BOARD_RADIUS),
  boardRadius: BOARD_RADIUS,
});

// scene
scene.add(gameScene);

// camera
camera.position.set(9, 15, 9);
camera.lookAt(scene.position);

// renderer
renderer.setPixelRatio(window.devicePixelRatio);
renderer.setClearColor(0x7ec0ee, 1);

let theta = Math.PI / 2;

// render loop
const onAnimationFrameHandler = (timeStamp) => {
  camera.position.x = 9 * Math.cos(theta);
  camera.position.y = 10;
  camera.position.z = 9 * Math.sin(theta);
  camera.lookAt(scene.position);

  renderer.render(scene, camera);
  gameScene.update && gameScene.update(timeStamp);
  window.requestAnimationFrame(onAnimationFrameHandler);
};
window.requestAnimationFrame(onAnimationFrameHandler);

// resize
const windowResizeHanlder = () => {
  const { innerHeight, innerWidth } = window;
  renderer.setSize(innerWidth, innerHeight);
  camera.aspect = innerWidth / innerHeight;
  camera.updateProjectionMatrix();
};
windowResizeHanlder();
window.addEventListener('resize', windowResizeHanlder);

// dom
document.body.style.margin = 0;
document.body.appendChild(renderer.domElement);

document.addEventListener('keydown', onDocumentKeyDown, false);

const rotationIncrement = Math.PI / 12;
function onDocumentKeyDown(event) {
  const keyCode = event.which;
  // left / 'a'
  if (keyCode === 37 || keyCode === 65) {
    theta = theta + rotationIncrement;
  }

  // right / d
  if (keyCode === 39 || keyCode === 68) {
    theta = theta - rotationIncrement;
  }

  // q
  if (keyCode === 81) {
    if (selectedObject) {
      selectedObject.rotateY(+0.1);
    }
  }

  // e
  if (keyCode === 69) {
    if (selectedObject) {
      selectedObject.rotateY(-0.1);
    }
  }

  // spacebar flips the card over
  if(keyCode === 32) {
    if (selectedObject instanceof Card) {
      selectedObject.rotateZ(Math.PI);
    }
  }
}

var controls = null;
let selectedObject = null;
export const setDragControls = (objects) => {
  controls = new DragControls(objects, camera, renderer.domElement);

  controls.addEventListener('drag', (event) => {
    event.object.position.y = intersection.y; // should be same as intersection.z
    event.object.position.x = intersection.x;
    event.object.position.z = intersection.z;
  });

  controls.addEventListener('dragstart', function (event) {
    if (event.object.material.emissive) {
      event.object.material.emissive.set(0xaaaaaa);
    }
    selectedObject = event.object;
  });

  // Make dragged objects visually lighter
  // TODO: glow as color of player
  controls.addEventListener('dragend', function (event) {
    if (event.object.material.emissive) {
      event.object.material.emissive.set(0x000000);
    }

    selectedObject = null;
  });
};

var mouse = new Vector2();
var raycaster = new Raycaster();
var plane = new Plane(new Vector3(0, 0, 1), 0);
var planeNormal = null;
var intersection = new Vector3();

window.addEventListener('mousemove', onMouseMove, false);

function onMouseMove(event) {
  mouse.x = (event.clientX / window.innerWidth) * 2 - 1;
  mouse.y = -(event.clientY / window.innerHeight) * 2 + 1;

  planeNormal = new Vector3(0, 1, 0);
  plane = new Plane(planeNormal, 0);

  raycaster.setFromCamera(mouse, camera);

  // Get all intersection with mouse ray, use the first intersection not part of the
  // selected object
  const currentSelectedObjectUuid = selectedObject ? selectedObject.uuid : null;
  const intersectionCandidateObjects = scene.children[0].children.filter(
    ({ uuid }) => uuid !== currentSelectedObjectUuid
  );
  const [newIntersection] = raycaster.intersectObjects(
    intersectionCandidateObjects
  );

  intersection = newIntersection
    ? newIntersection.point
    : raycaster.ray.intersectPlane(plane); // we could do the assignment as the 'target' of intersectPlane
}

/**
 * entry.js
 * 
 * This is the first file loaded. It sets up the Renderer, 
 * Scene and Camera. It also starts the render loop and 
 * handles window resizes.
 * 
 */

import { WebGLRenderer, PerspectiveCamera, Scene, Vector3, Raycaster, Vector2, Plane } from 'three';
import { DragControls } from 'three/examples/jsm/controls/DragControls.js';

import SeedScene from './objects/Scene.js';

const scene = new Scene();
const camera = new PerspectiveCamera();
const renderer = new WebGLRenderer({antialias: true});
const seedScene = new SeedScene();

// scene
scene.add(seedScene);

// camera
camera.position.set(9, 15, 9);
camera.lookAt( scene.position );

// renderer
renderer.setPixelRatio(window.devicePixelRatio);
renderer.setClearColor(0x7ec0ee, 1);

let theta = 0;

// render loop
const onAnimationFrameHandler = (timeStamp) => {
  camera.position.x = 9 * Math.cos( theta );
  camera.position.y = 10;
  camera.position.z = 9 * Math.sin( theta );
  camera.lookAt( scene.position );

  renderer.render(scene, camera);
  seedScene.update && seedScene.update(timeStamp);
  window.requestAnimationFrame(onAnimationFrameHandler);
}
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
document.body.appendChild( renderer.domElement );


document.addEventListener("keydown", onDocumentKeyDown, false);
 
const rotationIncrement = Math.PI / 12;
function onDocumentKeyDown(event) {
    const keyCode = event.which;
    // left / 'a'
    if (keyCode === 37 || keyCode === 65) {
      theta = theta + rotationIncrement;
    }

    // d
    if (keyCode === 39 || keyCode === 68) {
      theta = theta - rotationIncrement;
    }

    // q
    if (keyCode === 81) {
      if (!!selectedObject) {
        selectedObject.rotateY(-0.1);
      }
    }

    // e
     if (keyCode === 69) {
      if (!!selectedObject) {
        selectedObject.rotateY(+0.1);
      }
    }
};

var controls = null;
let selectedObject = null
export const setDragControls = (objects) => {
   controls = new DragControls( objects, camera, renderer.domElement );

   controls.addEventListener('drag', (event) => {
     event.object.position.y = intersection.y; // should be same as intersection.z
     event.object.position.x = intersection.x;
     event.object.position.z = intersection.z;
   });

   controls.addEventListener( 'dragstart', function ( event ) {
    if (event.object.material.emissive) {
      event.object.material.emissive.set( 0xaaaaaa );
    }
    selectedObject = event.object;
  } );
  
  controls.addEventListener( 'dragend', function ( event ) {

    if (event.object.material.emissive) {
      event.object.material.emissive.set( 0x000000 );  
    }

    selectedObject = null;
  } );
}

var mouse = new Vector2();
var raycaster = new Raycaster();
var plane = new Plane( new Vector3( 0, 0, 1 ), 0 );
var planeNormal = null;
var intersection = new Vector3();

window.addEventListener( 'mousemove', onMouseMove, false );

function onMouseMove( event ) {

	mouse.x = ( event.clientX / window.innerWidth ) * 2 - 1;
  mouse.y = - ( event.clientY / window.innerHeight ) * 2 + 1; 
  

  planeNormal = new Vector3(0, 1, 0);
  plane = new Plane(planeNormal, 0);

  raycaster.setFromCamera(mouse, camera);
  const intersectedObjects = raycaster.intersectObjects( scene.children, true );

  let intersectedObject = null;
  const [first, second] = intersectedObjects;
  // ensure intersection isn't the selected object. Use the second intersection if it is.
  if (first) {
    intersectedObject =  
    (!selectedObject || first.object.uuid !== selectedObject.uuid)
      ? first 
      : second;
  }

  if (!intersectedObject) {
    raycaster.ray.intersectPlane(plane, intersection);
  } else {
    intersection = intersectedObject.point
  }
 }
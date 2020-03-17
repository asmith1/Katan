/**
 * entry.js
 * 
 * This is the first file loaded. It sets up the Renderer, 
 * Scene and Camera. It also starts the render loop and 
 * handles window resizes.
 * 
 */

import { WebGLRenderer, PerspectiveCamera, Scene, Vector3, Raycaster, Vector2 } from 'three';
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
  camera.position.y = 15;
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
function onDocumentKeyDown(event) {
    const keyCode = event.which;
    // left / 'a'
    if (keyCode === 37 || keyCode === 65) {
      theta = theta - 0.2;
    }

    if (keyCode === 39 || keyCode === 68) {
      theta = theta + 0.2;
    }
};



var mouse = new Vector2(), raycaster = new Raycaster();
var enableSelection = false;

export const setDragControls = (object) => {
   controls = new DragControls( [ object ], camera, renderer.domElement );
}
      
function onClick( event ) {
  event.preventDefault();
  if ( enableSelection === true ) {

    var draggableObjects = controls.getObjects();
    draggableObjects.length = 0;

    mouse.x = ( event.clientX / window.innerWidth ) * 2 - 1;
    mouse.y = - ( event.clientY / window.innerHeight ) * 2 + 1;

    raycaster.setFromCamera( mouse, camera );

    var intersections = raycaster.intersectObjects( objects, true );

    if ( intersections.length > 0 ) {

      var object = intersections[ 0 ].object;

      if ( group.children.includes( object ) === true ) {
        object.material.emissive.set( 0x000000 );
        scene.attach( object );
      } else {
        object.material.emissive.set( 0xaaaaaa );
        group.attach( object );
      }
      controls.transformGroup = true;
      draggableObjects.push( group );

    }

    if ( group.children.length === 0 ) {

      controls.transformGroup = false;
      draggableObjects.push( ...objects );

    }
  }
}

function onKeyUp() {
  enableSelection = false;
}

function onKeyDown( event ) {
  enableSelection = ( event.keyCode === 16 ) ? true : false;
}

document.addEventListener( 'click', onClick, false );
window.addEventListener( 'keydown', onKeyDown, false );
window.addEventListener( 'keyup', onKeyUp, false );
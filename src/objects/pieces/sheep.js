import * as THREE from 'three';
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader';
   
// Instantiate a loader
const loader = new GLTFLoader();


export default class Sheep extends THREE.Object3D {
    constructor() {
        super();
        loader.load(
            '../../../assets/models/Adult Sheep.glb',
            (gltf) => {
                this.add(gltf.scene.children[0])
            },
            null,
            console.error
        );
    }
}
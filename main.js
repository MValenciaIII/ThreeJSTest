import * as THREE from 'three';
import { GLTFLoader } from 'three/examples/jsm/Addons.js';
import { OrbitControls } from 'three/examples/jsm/Addons.js';
import { VRButton } from 'three/examples/jsm/Addons.js';


const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera( 75, window.innerWidth / window.innerHeight, 0.1, 1000 );


const renderer = new THREE.WebGLRenderer();
renderer.setSize( window.innerWidth, window.innerHeight );
document.body.appendChild( renderer.domElement );
document.body.appendChild( VRButton.createButton(renderer))

const controls = new OrbitControls(camera, renderer.domElement);
camera.position.set( 100, 100, 400 );
controls.update();

renderer.xr.enabled = true;
renderer.xr.setReferenceSpaceType( 'local' );


const loader = new GLTFLoader();
loader.load('scene.gltf', function (gltf) {
    scene.add(gltf.scene)

    const ambientLight = new THREE.AmbientLight(0xffffff, 0.5);
    scene.add(ambientLight);

    const directionalLight = new THREE.DirectionalLight(0xffffff, 0.5);
    directionalLight.position.set(1, 1, 1);
    scene.add(directionalLight);
}, undefined, function (error) {
    console.error(error);
})

// renderer.setAnimationLoop( animate );

// const geometry = new THREE.BoxGeometry( 1, 1, 1 );
// const material = new THREE.MeshBasicMaterial( { color: 0x00ff00 } );
// const cube = new THREE.Mesh( geometry, material );
// scene.add( cube );


function animate() {
    
    requestAnimationFrame(animate)

    controls.update();

    renderer.setAnimationLoop( function () {
        renderer.render(scene, camera)
    })
    
}

animate()


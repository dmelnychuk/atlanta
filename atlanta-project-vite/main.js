import * as THREE from 'three';
import './style.css';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js';
import gsap from 'gsap';


//Scene 
const scene = new THREE.Scene();

//Create our sphere
const geometry = new THREE.SphereGeometry(3, 32, 32);

//Create our material
const material = new THREE.MeshStandardMaterial({color: 0xff0000});

//Create our mesh
const mesh = new THREE.Mesh(geometry, material);

scene.add(mesh);

//Sizes
const sizes = {
    width: window.innerWidth,
    height: window.innerHeight,
}

//Resize
window.addEventListener('resize', () => {
    sizes.width = window.innerWidth;
    sizes.height = window.innerHeight;
        //Update camera
        camera.aspect = sizes.width / sizes.height;
        camera.updateProjectionMatrix();
        renderer.setSize(sizes.width, sizes.height);
})



//light
const light = new THREE.PointLight(0xFFFF00, 1, 100);
light.position.set(0, 10, 10);
scene.add(light);

//Camera

const camera = new THREE.PerspectiveCamera(45, sizes.width / sizes.height, 0.1, 100);
camera.position.z = 20;
scene.add(camera);



//Renderer
const canvas = document.querySelector(".webgl");
const renderer = new THREE.WebGLRenderer({canvas});
//set pixel ratio to rotate more smooth
renderer.setPixelRatio(2);
renderer.setSize(sizes.width, sizes.height);
renderer.render(scene, camera);


//Controls
const controls = new OrbitControls(camera, canvas);
controls.enableDamping = true;
controls.enablePan = false;
controls.enableZoom = false;
controls.autoRotate = true;
controls.autoRotateSpeed = 5;


//Loop to rerender the scene everytime when smth happens
const loop = () => {
    controls.update();
    renderer.render(scene, camera);
    window.requestAnimationFrame(loop);
}
loop();

//Timeline animation
const tl = gsap.timeline({defaults:{duration: 1}});
//change the position of the sphere
tl.fromTo(mesh.position, {x: 0, y: 0, z: 0}, {x: 0.5, y: 0.5, z: 5})
//change the scale of the sphere
// tl.fromTo(mesh.position, {x: 0, y: 0, z: 0}, {x: 1, y: 1, z: 1})
//change nav bar transition
tl.fromTo("nav", {y: "-100%"}, {y: "0%"})
tl.fromTo(".title", {opacity: 0}, {opacity: 1, stagger: 0.2})


//Mouse animation color
let mouseDown = false;
let rgb = [];
window.addEventListener('mousedown', () => {mouseDown = true});
window.addEventListener('mouseup', () => {mouseDown = false});
window.addEventListener('mousemove', (event) => {
    if (mouseDown) {
        rgb = [
            Math.round(event.clientX / window.innerWidth * 255),
            Math.round(event.clientY / window.innerHeight * 255),
        ]
        ///Animate the color change
        tl.to(material.color, {r: rgb[0] / 255, g: rgb[1] / 255, b: 0, duration: 0.1})



    }
})

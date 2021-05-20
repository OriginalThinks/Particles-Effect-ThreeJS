import * as THREE from "./three.module.js";
import { OrbitControls } from "./OrbitControls.js";

// Canvas
var canvas = document.querySelector("canvas.webgl");

//Creating Scene
var scene = new THREE.Scene();

//Add Camera
var camera = new THREE.PerspectiveCamera(
  75,
  window.innerWidth / window.innerHeight
);

camera.position.z = 2.5;

//Add Renderer
var renderer = new THREE.WebGLRenderer();
renderer.setSize(window.innerWidth, window.innerHeight);
document.body.appendChild(renderer.domElement);

//Add geometry
var geometry = new THREE.SphereGeometry(0.8, 40, 40);
var geometry1 = new THREE.SphereGeometry(1, 100, 40);

var particlesGeometry = new THREE.BufferGeometry();
var particlesCnt = 30000;

var posArray = new Float32Array(particlesCnt * 2);
// xyz xyz xyz xyz

for (let i = 0; i < particlesCnt * 3; i++) {
  //posArray[i] = Math.random();
  //posArray[i] = Math.random() - 0.5;
  //posArray[i] = (Math.random() - 0.5) * 5;
  posArray[i] = (Math.random() - 0.5) * (Math.random() * 5);
}

particlesGeometry.setAttribute(
  "position",
  new THREE.BufferAttribute(posArray, 3, true)
);

//Materials
var material = new THREE.PointsMaterial({
  size: 0.005,
});

const particlesMaterial = new THREE.PointsMaterial({
  size: 0.002,
  transparent: true,
  color: "blue",
  blending: THREE.AdditiveBlending,
});

//Mesh
var sphere = new THREE.Points(geometry, material);
var sphere1 = new THREE.Points(geometry1, material);
var particlesMesh = new THREE.Points(particlesGeometry, particlesMaterial);
scene.add(sphere, sphere1, particlesMesh);

//Resize
window.addEventListener("resize", resize);

function resize() {
  camera.aspect = window.innerWidth / window.innerHeight;
  camera.updateProjectionMatrix();
  renderer.setSize(window.innerWidth, window.innerHeight);
  renderer.render(scene, camera);
}

document.addEventListener("mousemove", animateParticles);

let mouseX = 0;
let mouseY = 0;

function animateParticles(event) {
  mouseX = event.clientX;
  mouseY = event.clientY;
}

const controls = new OrbitControls(camera, renderer.domElement);
// animate
const clock = new THREE.Clock();

const tick = () => {
  const elapsedTime = clock.getElapsedTime();

  // Update objects
  sphere.rotation.y = 0.04 * elapsedTime;
  sphere1.rotation.x = 0.02 * elapsedTime;
  particlesMesh.rotation.y = -0.005 * elapsedTime;

  if (mouseX > 0) {
    particlesMesh.rotation.x = -mouseY * (elapsedTime * 0.00005);
    particlesMesh.rotation.y = mouseX * (elapsedTime * 0.00005);
  }
  // Update Orbital Controls
  // controls.update()

  // Render
  renderer.render(scene, camera);

  // Call tick again on the next frame
  window.requestAnimationFrame(tick);
};

tick();

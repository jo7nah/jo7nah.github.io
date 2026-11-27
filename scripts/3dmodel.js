import * as THREE from "https://cdn.skypack.dev/three@0.129.0/build/three.module.js";
import { GLTFLoader } from "https://cdn.skypack.dev/three@0.129.0/examples/jsm/loaders/GLTFLoader.js";

const section = document.getElementById('about-subpage');
const container = document.getElementById('container3d');

//Create a Three.JS Scene
const scene = new THREE.Scene();
//create a new camera with positions and angles
const camera = new THREE.PerspectiveCamera(15, Math.min(section.clientWidth, 600) / (Math.min(section.clientWidth/1.75, 343)), 0.1, 10000);


//Keep track of the mouse position, so we can make the eye move
let mouseX = window.innerWidth / 2;
let mouseY = window.innerHeight / 2;

//Keep the 3D object on a global variable so we can access it later
let object;

//Set which object to render
let objToRender = 'mii';

// --- BLINKING SETUP ---
const textureLoader = new THREE.TextureLoader();
// Update this path to your closed-eyes version of baseColor_2.png
const eyesClosedTexture = textureLoader.load(`./models/${objToRender}/baseColor_2_blink.png`);

// 1. Match glTF orientation & color encoding (Three.js r129)
eyesClosedTexture.flipY = false;
eyesClosedTexture.encoding = THREE.sRGBEncoding;

// 2. Match glTF Sampler 1 (33648 = MirroredRepeatWrapping) so both eyes render properly
eyesClosedTexture.wrapS = THREE.MirroredRepeatWrapping;
eyesClosedTexture.wrapT = THREE.MirroredRepeatWrapping;

let eyesOpenTexture = null;
let maskMaterial = null;

function scheduleNextBlink() {
  // Random delay between 2000ms (2s) and 6000ms (6s)
  const nextBlinkDelay = 2000 + Math.random() * 4000;

  setTimeout(() => {
    triggerBlink();
  }, nextBlinkDelay);
}

function triggerBlink(isDoubleBlink = false) {
  if (!maskMaterial) return;

  // Close eyes
  maskMaterial.map = eyesClosedTexture;
  maskMaterial.needsUpdate = true;

  // Open eyes after 100ms
  setTimeout(() => {
    maskMaterial.map = eyesOpenTexture;
    maskMaterial.needsUpdate = true;

    // 10% chance to do a quick double-blink
    if (!isDoubleBlink && Math.random() < .1) {
      setTimeout(() => triggerBlink(true), 100);
    } else {
      scheduleNextBlink();
    }
  }, 100);
}


//Instantiate a loader for the .gltf file
const loader = new GLTFLoader();

//Load the file
loader.load(
  `./models/${objToRender}/scene.gltf`,
  function (gltf) {
    object = gltf.scene;
    scene.add(object);

    // Target ONLY the "Mask" material (which uses baseColor_2.png)
    object.traverse((child) => {
      if (child.isMesh && child.material && child.material.name === "Mask") {
        maskMaterial = child.material;
        eyesOpenTexture = maskMaterial.map;
      }
    });

    if (maskMaterial) {
      scheduleNextBlink();
    }
  },
  function (xhr) {
    console.log((xhr.loaded / xhr.total * 100) + '% loaded');
  },
  function (error) {
    console.error(error);
  }
);

//Instantiate a new renderer and set its size
const renderer = new THREE.WebGLRenderer({ alpha: true }); //Alpha: true allows for the transparent background
renderer.outputEncoding = THREE.sRGBEncoding; // Fixes washed-out/dark glTF colors in r129
renderer.setSize(Math.min(section.clientWidth, 600), Math.min(section.clientWidth/1.75, 343));

//Add the renderer to the DOM
container.appendChild(renderer.domElement);

//Set how far the camera will be from the 3D model
camera.position.y = .5;
camera.position.z = 5;

//Add lights to the scene, so we can actually see the 3D model
const topLight = new THREE.DirectionalLight(0xffffff, .75); // (color, intensity)
topLight.position.set(50, 100, 50) //top-left-ish
topLight.castShadow = true;
scene.add(topLight);

const ambientLight = new THREE.AmbientLight(0xffffff, 1);
scene.add(ambientLight);

//Render the scene
function animate() {
  requestAnimationFrame(animate);

  if (objToRender === "mii" && object) {
    // Calculate where the head wants to look
    const targetY = -0.5 + (mouseX / window.innerWidth) * 1;
    const targetX = -0.5 + (mouseY / window.innerHeight) * 1;

    // Smoothly glide toward the target (lower 0.05 for heavier/slower, raise to 0.15 for snappier)
    object.rotation.y = THREE.MathUtils.lerp(object.rotation.y, targetY, 0.05);
    object.rotation.x = THREE.MathUtils.lerp(object.rotation.x, targetX, 0.05);
  }

  renderer.render(scene, camera);
}


//Add a listener to the window, so we can resize the window and the camera
window.addEventListener("resize", function () {
  camera.aspect = Math.min(section.clientWidth, 600) / Math.min(section.clientWidth/1.75, 343);
  camera.updateProjectionMatrix();
  renderer.setSize(Math.min(section.clientWidth, 600), Math.min(section.clientWidth/1.75, 343));
});

//add mouse position listener, so we can make the head move
document.onmousemove = (e) => {
  mouseX = e.clientX;
  mouseY = e.clientY;
}

//Start the 3D rendering
animate();
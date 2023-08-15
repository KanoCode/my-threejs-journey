import {
  Scene,
  BoxGeometry,
  MeshBasicMaterial,
  Mesh,
  PerspectiveCamera,
  WebGLRenderer,
} from "three";

import { OrbitControls } from "three/examples/jsm/controls/OrbitControls.js";

// The Camera
const sizes = {
  width: 800,
  height: 600,
};
const canvas = document.getElementById("three-canvas");

const camera = new PerspectiveCamera(75, sizes.width / sizes.height);
camera.position.z = 2;

// 1 The scene
const scene = new Scene();

// 2 The Object
const geometry = new BoxGeometry(0.5, 0.5, 0.5);
const orangeMaterial = new MeshBasicMaterial({ color: "orange" });
const blueMaterial = new MeshBasicMaterial({ color: "blue" });
const orangeCube = new Mesh(geometry, orangeMaterial);
scene.add(orangeCube);

const bigBlueCube = new Mesh(geometry, blueMaterial);
bigBlueCube.position.x += 1;
bigBlueCube.scale.set(2, 2, 2);
scene.add(bigBlueCube);

const renderer = new WebGLRenderer({
  canvas,
});
scene.add(camera);

renderer.setSize(sizes.width, sizes.height);

// camera controls

const controls = new OrbitControls(camera, canvas);
controls.enableDamping = true;

// animation
function animate() {
  controls.update();
  renderer.render(scene, camera);
  requestAnimationFrame(animate);
}
animate();

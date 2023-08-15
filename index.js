import {
  Scene,
  BoxGeometry,
  MeshBasicMaterial,
  MeshLambertMaterial,
  MeshPhongMaterial,
  Mesh,
  Light,
  PerspectiveCamera,
  DirectionalLight,
  WebGLRenderer,
  TextureLoader,
  AmbientLight,
  // import these for camera controls to work
  MOUSE,
  Vector2,
  Vector3,
  Vector4,
  Quaternion,
  Matrix4,
  Box3,
  Spherical,
  Sphere,
  Raycaster,
  MathUtils,
  Clock,
} from "three";

import CameraControls from "camera-controls";

// The Camera
const sizes = {
  width: 800,
  height: 600,
};
const canvas = document.getElementById("three-canvas");

const subsetOfTHREE = {
  MOUSE,
  Vector2,
  Vector3,
  Vector4,
  Quaternion,
  Matrix4,
  Spherical,
  Box3,
  Sphere,
  Raycaster,
  MathUtils: {
    DEG2RAD: MathUtils.DEG2RAD,
    clamp: MathUtils.clamp,
  },
};

const camera = new PerspectiveCamera(75, sizes.width / sizes.height);
camera.position.z = 2;

CameraControls.install({ THREE: subsetOfTHREE });

const clock = new Clock();
const cameraControls = new CameraControls(camera, canvas);
cameraControls.dollyToCursor = true;

// 1 The scene
const scene = new Scene();

// 2 The Object
const geometry = new BoxGeometry(0.5, 0.5, 0.5);
const imgTexture = new TextureLoader();
const orangeMaterial = new MeshLambertMaterial({
  color: 0x8800ff,
});
// const orangeMaterial = new MeshPhongMaterial({
//   color: 0xff0000,
//   specular: 0xffffff,
//   shininess: 100,
//   flatshading: true,
// });
const blueMaterial = new MeshLambertMaterial({
  color: "orange",
  map: imgTexture.load("./sample.jpg"),
});
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

//lights

const light = new DirectionalLight();
light.position.set(3, 2, 1).normalize();
scene.add(light);

let ambientLight = new AmbientLight(0xffffff, 1); // applies light across the evenly

scene.add(ambientLight);


// animation
function animate() {
  const delta = clock.getDelta();
  cameraControls.update(delta);
  // if you want to rotate the objects uncomment the lines below
  // orangeCube.rotation.x += 0.04;
  // bigBlueCube.rotation.y += 0.03
  renderer.render(scene, camera);
  requestAnimationFrame(animate);
}
animate();

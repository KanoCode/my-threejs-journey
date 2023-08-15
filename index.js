import {
  Scene,
  BoxGeometry,
  SphereGeometry,
  MeshBasicMaterial,
  MeshLambertMaterial,
  MeshPhongMaterial,
  Mesh,
  Light,
  PerspectiveCamera,
  DirectionalLight,
  WebGLRenderer,
  AxesHelper,
  TextureLoader,
  HemisphereLight,
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
const geometry = new BoxGeometry(3,3,3);

const imgTexture = new TextureLoader();

const boxLambertMaterial = new MeshLambertMaterial({ color: "yellow" });
const box = new Mesh(geometry, boxLambertMaterial);
box.position.x += 2;
scene.add(box);

// add axes-helper
const axes = new AxesHelper();
axes.material.depthTest = false;
axes.renderOrder = 2;
scene.add(axes);


const cubeAxes = new AxesHelper(0.5);
cubeAxes.material.depthTest = false;
cubeAxes.renderOrder = 2;
box.add(cubeAxes);




const renderer = new WebGLRenderer({
  canvas,
});
scene.add(camera);

renderer.setSize(sizes.width, sizes.height);

const skyColor = 0xb1e1ff;
const groundColor = 0xb97a20;
const intensity = 1;
const newlight = new HemisphereLight(skyColor, groundColor, intensity);
scene.add(newlight);

// animation
function animate() {
  // sunMesh.rotation.y += 0.005;
  // earthMesh.rotation.y += 0.05;
  const delta = clock.getDelta();
  cameraControls.update(delta);
  box.rotation.y += 0.01
  renderer.render(scene, camera);
  requestAnimationFrame(animate);
}
animate();

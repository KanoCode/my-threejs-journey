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
  HemisphereLight,
  WebGLRenderer,
  AxesHelper,
  GridHelper,
  TextureLoader,
  // HemisphereLight,
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

import gsap from "gsap";

import GUI from "three/examples/jsm/libs/lil-gui.module.min.js";

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
camera.position.x = 6;
camera.position.y = 4;

CameraControls.install({ THREE: subsetOfTHREE });

const clock = new Clock();
const cameraControls = new CameraControls(camera, canvas);
cameraControls.dollyToCursor = true;

// 1 The scene
const scene = new Scene();

// 2 The Object
const geometry = new BoxGeometry(3, 3, 3);

const imgTexture = new TextureLoader();

const boxMaterial = new MeshPhongMaterial({
  specular: 0x852e2e,
  color: 0xffffff,
  shininess: 20,
});
const box = new Mesh(geometry, boxMaterial);
box.position.x += 2;
scene.add(box);

// add axes-helper
const axes = new AxesHelper();
axes.material.depthTest = false;
axes.renderOrder = 2;
scene.add(axes);

const grid = new GridHelper();
grid.material.depthTest = false;
grid.renderOrder = 2;
scene.add(grid);

const renderer = new WebGLRenderer({
  canvas,
});
// to change the background color use the code below
renderer.setClearColor(0x3e3e3e, 1);
scene.add(camera);

renderer.setSize(sizes.width, sizes.height);

const skyColor = 0xb1e1ff;
const groundColor = 0xb97a20;
const intensity = 2;
const newlight = new HemisphereLight(skyColor, groundColor, intensity);
scene.add(newlight);

// animation
function animate() {
  const delta = clock.getDelta();
  cameraControls.update(delta);

  renderer.render(scene, camera);
  requestAnimationFrame(animate);
}
animate();

//debugging

// an interface for mocking purposes
const gui = new GUI();

const min = -3;
const max = 3;
const step = 0.01;

gui.addFolder("Visibility").add(box, "visible");

const transformationFolder = gui.addFolder("Transformation");
transformationFolder.add(box.position, "y", min, max, step).name("y-axis");
transformationFolder.add(box.position, "x", min, max, step).name("x-axis");
transformationFolder.add(box.position, "z", min, max, step).name("z-axis");

const colorParam = {
  value: 0xff0000,
};

gui
  .addColor(colorParam, "value")
  .name("Color")
  .onChange(() => {
    box.material.color.set(colorParam.value);
  });

const functionParam = {
  spin: () => {
    gsap.to(box.rotation, { y: box.rotation.y + 10, duration: 1 });
  },
};

gui.add(functionParam, "spin");

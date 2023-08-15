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
  TextureLoader,
  HemisphereLight,
  Object3D,
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
const geometry = new SphereGeometry(0.5);

const imgTexture = new TextureLoader();
const solarSystem = new Object3D();
scene.add(solarSystem);

const sunMaterial = new MeshLambertMaterial({ color: "yellow" });
const sunMesh = new Mesh(geometry, sunMaterial);
// sunMesh.scale.set(0.3,0.3,0.3)
solarSystem.add(sunMesh);

const earthMaterial = new MeshBasicMaterial({ color: "blue" });
const earthMesh = new Mesh(geometry, earthMaterial);
earthMesh.position.set(2, 0, 0);
earthMesh.scale.set(0.2,0.2,0.2)
sunMesh.add(earthMesh);

const moonMaterial = new MeshBasicMaterial({ color: "white" });
const moonMesh = new Mesh(geometry, moonMaterial);
moonMesh.scale.set(0.5, 0.5, 0.5);
moonMesh.position.set(1, 0, 0);
earthMesh.add(moonMesh);


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
  sunMesh.rotation.y += 0.005;
  earthMesh.rotation.y += 0.05;
  const delta = clock.getDelta();
  cameraControls.update(delta);
  // if you want to rotate the objects uncomment the lines below
  // orangeCube.rotation.x += 0.04;
  // bigBlueCube.rotation.y += 0.03
  renderer.render(scene, camera);
  requestAnimationFrame(animate);
}
animate();

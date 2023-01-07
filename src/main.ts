import "./style.css";
import * as THREE from "three";
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls";
import { GLTFLoader } from "three/examples/jsm/loaders/GLTFLoader";

const ballurl = new URL("/fireball_vfx.glb", import.meta.url);

const scene = new THREE.Scene();

// const geometry = new THREE.SphereGeometry(3, 64, 64);
// const material = new THREE.MeshStandardMaterial({ color: "#00ff83" });
// const mesh = new THREE.Mesh(geometry, material);

const assetLoader = new GLTFLoader();

assetLoader.load(
  ballurl.href,
  (gltf) => {
    const model = gltf.scene;
    scene.add(model);
  },
  undefined,
  (err) => console.log(err)
);

// scene.add(mesh);

const camera = new THREE.PerspectiveCamera(
  45,
  window.innerWidth / (window.innerHeight - 10),
  1,
  100
);
camera.position.z = 20;
scene.add(camera);

// const light = new THREE.PointLight(0xc8cf0e, 10, 100);

// light.position.set(0, 10, 10);
// scene.add(light);

const light = new THREE.AmbientLight(0xffffff);
scene.add(light);

const canvas = document.getElementById("app") as HTMLCanvasElement;
const renderer = new THREE.WebGLRenderer({ canvas });
renderer.pixelRatio = 60;
renderer.setClearColor(0x000000, 0);
renderer.setSize(window.innerWidth, window.innerHeight - 10);
renderer.render(scene, camera);
window.addEventListener("resize", () => {
  camera.aspect = window.innerWidth / (window.innerHeight - 10);
  camera.updateProjectionMatrix();
  renderer.setSize(window.innerWidth, window.innerHeight - 10);
});

//controls
const controls = new OrbitControls(camera, canvas);
controls.maxZoom = 20;
controls.maxDistance = 15;
controls.minDistance = 5;
controls.enableDamping = true;
controls.autoRotate = true;
controls.autoRotateSpeed = 5;
controls.enablePan = false;
// controls.zoomSpeed = -1;
// controls.enableRotate = false;
// controls.enableZoom = false;

const loop = () => {
  controls.update();
  renderer.render(scene, camera);
  window.requestAnimationFrame(loop);
};

canvas.addEventListener("wheel", (e: any) => {
  const y = e.deltaY;

  scrollBy(0, y);
});

loop();

import './style.css';
import * as THREE from "three";
import { GUI } from "three/examples/jsm/libs/lil-gui.module.min.js";
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls.js";

//canvas
const canvas = document.querySelector("#canvas");

//サイズ
const sizes = {
	width: innerWidth,
	height: innerHeight,
};

//シーン
const scene = new THREE.Scene();

//カメラ
const camera = new THREE.PerspectiveCamera(
	75,
	sizes.width / sizes.height,
	1,
	10000
);
camera.position.set(0, 0, 1000);

//ライト
const light = new THREE.AmbientLight(0xffffff);
light.intensity = 2;
scene.add(light);

//レンダラー
const renderer = new THREE.WebGLRenderer({
	canvas: canvas,
	alpha: true,
});
renderer.setSize(sizes.width, sizes.height);
renderer.setPixelRatio(window.devicePixelRatio);
renderer.outputEncoding = THREE.sRGBEncoding;

//テクスチャ
const loader = new THREE.CubeTextureLoader();
loader.setPath('textures/cube/Bridge2/');

const textureCube = loader.load(['posx.jpg', 'negx.jpg', 'posy.jpg', 'negy.jpg', 'posz.jpg', 'negz.jpg']);
textureCube.encoding = THREE.sRGBEncoding;

scene.background = textureCube;

//ジオメトリ・マテリアル
const geometry = new THREE.IcosahedronGeometry(300, 15);
const material = new THREE.MeshLambertMaterial({
	envMap: textureCube
});
const sphere = new THREE.Mesh(geometry, material);
scene.add(sphere);

//マウス制御
const controls = new OrbitControls(camera, renderer.domElement);

//アニメーション
const animate = function () {
	window.requestAnimationFrame(animate);
	renderer.render(scene, camera);
};

animate();

//ブラウザのリサイズ操作
window.addEventListener("resize", function () {
	sizes.width = window.innerWidth;
	sizes.height = window.innerHeight;

	camera.aspect = sizes.width / sizes.height;
	camera.updateProjectionMatrix();

	renderer.setSize(sizes.width, sizes.height);
	renderer.setPixelRatio(window.devicePixelRatio);
});
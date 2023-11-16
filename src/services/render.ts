import * as THREE from 'three'

export const render = (canvas: any, callback: (scene: THREE.Scene) => void) => {
  const width = window.innerWidth - 65;
  const height = window.innerHeight - 200;
  const renderer = new THREE.WebGLRenderer({ canvas: canvas });
  renderer.setSize(width, height);

  const scene = new THREE.Scene();
  const light = new THREE.AmbientLight(0xffffff);
  scene.add(light);

  callback(scene);

  const camera = new THREE.PerspectiveCamera(45, width / height, 0.1, 8000);
  camera.position.set(0, 0, 1000);

  renderer.render(scene, camera);
}

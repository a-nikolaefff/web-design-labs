import * as THREE from 'three'

export const render = (
  canvas: any,
  func: (scene: THREE.Scene) => void,
  whiteBackground: boolean = false
) => {
  const width = window.innerWidth - 65
  const height = window.innerHeight - 200
  const renderer = new THREE.WebGLRenderer({ canvas: canvas })
  renderer.setSize(width, height)
  if (whiteBackground) {
    renderer.setClearColor(0xffffff)
  }

  const scene = new THREE.Scene()

  const light = new THREE.AmbientLight(0xffffff)
  scene.add(light)

  func(scene)

  const camera = new THREE.PerspectiveCamera(45, width / height, 0.1, 8000)

  camera.position.set(0, 0, 1000)

  renderer.render(scene, camera)
}

import * as THREE from 'three'

export const createTorus = (color: string) => {
  const geometry = new THREE.TorusGeometry(100, 30, 25, 25)
  const material = new THREE.MeshBasicMaterial({ color: color, wireframe: true })
  const torus = new THREE.Mesh(geometry, material)

  return torus
}

export const createRing = (
  color: string,
  innerRadius: number = 80,
  outerRadius: number = 90,
  segments: number = 100,
  wireframe: boolean = false
) => {
  const geometry = new THREE.RingGeometry(innerRadius, outerRadius, segments)
  const material = new THREE.MeshBasicMaterial({
    color: color,
    side: THREE.DoubleSide,
    wireframe: wireframe
  })
  const ring = new THREE.Mesh(geometry, material)

  return ring
}

export const createBox = (size: number, segments: number, color: string) => {
  const geometry = new THREE.BoxGeometry(size, size, size, segments, segments, segments)
  const material = new THREE.MeshBasicMaterial({ color: color, wireframe: true })
  const cube = new THREE.Mesh(geometry, material)

  return cube
}

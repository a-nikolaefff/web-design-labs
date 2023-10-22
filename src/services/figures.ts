import * as THREE from 'three'

export const getTorus = (color: string) => {
  const geometry = new THREE.TorusGeometry(130, 60, 15, 15)
  const material = new THREE.MeshBasicMaterial({ color: color, wireframe: true })
  const torus = new THREE.Mesh(geometry, material)

  return torus
}

export const getRing = (
  color: string,
  innerRadius: number = 130,
  outerRadius: number = 120,
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

export const getCircle = () => {
  const geometry = new THREE.CircleGeometry(15, 32);
  const material = new THREE.MeshBasicMaterial({ color: 'white' });
  const circle = new THREE.Mesh(geometry, material);

  return circle;
}

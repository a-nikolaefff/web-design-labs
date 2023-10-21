import * as THREE from 'three'

export const setPositions = (mesh: THREE.Mesh, x: number, y: number) => {
  mesh.position.x = x;
  mesh.position.y = y;

  return mesh;
}

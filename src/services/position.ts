import * as THREE from 'three'

export const setPositions = (mesh: THREE.Mesh, x: number, y: number, z: number) => {
  mesh.position.x = x;
  mesh.position.y = y;
  mesh.position.z = z;

  return mesh;
}

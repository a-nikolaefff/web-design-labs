import * as THREE from 'three'
import {Object3D} from 'three'

export const getTorus = (color: string): Object3D => {
  const geometry = new THREE.TorusGeometry(130, 60, 15, 15);
  const material = new THREE.MeshBasicMaterial({ color: color, wireframe: true });

  return new THREE.Mesh(geometry, material);
}

export const getRing = (
  color: string,
  innerRadius: number = 130,
  outerRadius: number = 120,
  segments: number = 100,
  wireframe: boolean = false
): Object3D => {
  const geometry = new THREE.RingGeometry(innerRadius, outerRadius, segments);
  const material = new THREE.MeshBasicMaterial({
    color: color,
    side: THREE.DoubleSide,
    wireframe: wireframe
  });

  return new THREE.Mesh(geometry, material);
}

export const getCube = (size: number, segments: number, color: string): Object3D => {
  const geometry = new THREE.BoxGeometry(size, size, size, segments, segments, segments);
  const material = new THREE.MeshBasicMaterial({ color: color, wireframe: true });

  return new THREE.Mesh(geometry, material);
}

export const getCircle = (): Object3D => {
  const geometry = new THREE.CircleGeometry(15, 32);
  const material = new THREE.MeshBasicMaterial({ color: 'white' });

  return new THREE.Mesh(geometry, material);
}

export const getSimpleSphere = (radius: number, widthSegments: number, heightSegments: number, withWireframe: boolean = false): Object3D => {
  const geometry = new THREE.SphereGeometry(radius, widthSegments, heightSegments);
  const material = new THREE.MeshNormalMaterial({ wireframe: withWireframe });

  return new THREE.Mesh(geometry, material);
}

export const getTexturedSphere = (radius: number, widthSegments: number, heightSegments: number, texturePath = '', emissive = undefined) => {
  const geometry = new THREE.SphereGeometry(radius, widthSegments, heightSegments);

  const textureLoader = new THREE.TextureLoader();
  const texture = textureLoader.load(texturePath);
  texture.anisotropy = 16;

  const material = new THREE.MeshPhongMaterial({ map: texture, emissive: emissive });

  return new THREE.Mesh(geometry, material);
}
import * as THREE from 'three'
import {Object3D} from 'three'

export const getTorus = (color: string): Object3D => {
    const geometry = new THREE.TorusGeometry(130, 60, 15, 15);
    const material = new THREE.MeshBasicMaterial({color: color, wireframe: true});

    return new THREE.Mesh(geometry, material);
}

export const getRing = (color: string): Object3D => {
    const geometry = new THREE.RingGeometry(130, 120, 100);
    const material = new THREE.MeshBasicMaterial(
        {color: color, side: THREE.DoubleSide, wireframe: false});

    return new THREE.Mesh(geometry, material);
}

export const getCube = (size: number, segments: number, color: string): Object3D => {
    const geometry = new THREE.BoxGeometry(size, size, size, segments, segments, segments);
    const material = new THREE.MeshBasicMaterial({color: color, wireframe: true});

    return new THREE.Mesh(geometry, material);
}

export const getCircle = (): Object3D => {
    const geometry = new THREE.CircleGeometry(15, 32);
    const material = new THREE.MeshBasicMaterial({color: 'white'});

    return new THREE.Mesh(geometry, material);
}

export const getSimpleSphere = (radius: number,
                                widthSegments: number,
                                heightSegments: number,
                                withWireframe: boolean = false): Object3D => {
    const geometry = new THREE.SphereGeometry(radius, widthSegments, heightSegments);
    const material = new THREE.MeshNormalMaterial({wireframe: withWireframe});

    return new THREE.Mesh(geometry, material);
}

export const getTexturedSphere = (radius: number,
                                  widthSegments: number,
                                  heightSegments: number,
                                  texturePath = '',
                                  emissive = undefined,
                                  anisotropy: number = 16) => {
    const geometry = new THREE.SphereGeometry(radius, widthSegments, heightSegments);

    const textureLoader = new THREE.TextureLoader();
    const texture = textureLoader.load(texturePath);
    texture.anisotropy = anisotropy;

    const material = new THREE.MeshPhongMaterial({map: texture, emissive: emissive});

    return new THREE.Mesh(geometry, material);
}
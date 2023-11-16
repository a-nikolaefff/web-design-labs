import {Object3D} from "three";
import * as THREE from "three";

export const setPlanetParameters = (planet: Object3D, speed: number, x: number, y: number, z: number) => {
    planet.position.x = Math.sin(speed) * x;
    planet.position.y = y;
    planet.position.z = Math.cos(speed) * z;
};

export const getSaturnRing = (color: any, size: number) => {
    const saturnRingGeometry = new THREE.Geometry();
    const saturnRingMaterial = new THREE.PointsMaterial({
        color: color,
        size: size,
        sizeAttenuation: false
    });

    for (let i = 0; i < 20000; i++) {
        let vertex = new THREE.Vector3();
        vertex.x = Math.sin(Math.PI / 180 * i) * (550 - i / 80);
        vertex.y = Math.random() * 20;
        vertex.z = Math.cos(Math.PI / 180 * i) * (550 - i / 80);

        saturnRingGeometry.vertices.push(vertex);
    }

    return new THREE.Points(saturnRingGeometry, saturnRingMaterial);
}
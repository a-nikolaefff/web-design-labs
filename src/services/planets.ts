import {Object3D} from "three";

export const setPlanetParameters = (planet: Object3D, speed: number, x: number, y: number, z: number) => {
    planet.position.x = Math.sin(speed) * x;
    planet.position.y = y;
    planet.position.z = Math.cos(speed) * z;
};
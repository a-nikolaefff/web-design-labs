import * as THREE from "three";

export const createStars = (color: any, count: number, scalar: number) => {
    const geometry = new THREE.Geometry();
    const material = new THREE.PointsMaterial({
        color: color,
        opacity: 0.1,
        size: 1,
        sizeAttenuation: false});

    for (let i = 0; i < count; i++) {
        let vertex = new THREE.Vector3();
        vertex.x = Math.random() * 2 - 1;
        vertex.y = Math.random() * 2 - 1;
        vertex.z = Math.random() * 2 - 1;

        vertex.multiplyScalar(scalar);
        geometry.vertices.push(vertex);
    }

    const stars = new THREE.Points(geometry, material);
    stars.scale.set(200, 200, 200);

    return stars;
}
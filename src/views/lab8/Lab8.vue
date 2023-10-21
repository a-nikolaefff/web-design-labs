<script setup lang="ts">
import { ref, watchEffect } from "vue";

import * as THREE from 'three';

const webGl = ref();

var Orbit = function (radius: number) {
    this.radius = radius;

    this.draw = function (scene: any) {
        var og = new THREE.Geometry();
        var om = new THREE.PointsMaterial({color:0xbfbfbf,size: 1, sizeAttenuation: false});

        for(let i =0; i<50000; i++)
        {
            var v = new THREE.Vector3();
            v.x = Math.sin(180/Math.PI*i)*this.radius; 
            v.z = Math.cos(180/Math.PI*i)*this.radius;
            
            og.vertices.push(v);
        }

        var obj = new THREE.Points(og,om);
        scene.add(obj);
    }
}

var Planet = function(radius: number, texture: string){
    this.radius = radius;
    this.texture = texture;
    this.init= function(){
        let g = new THREE.SphereGeometry(this.radius, 40, 40);
        var onloadT = new THREE.TextureLoader();
        var t = onloadT.load(this.texture);
        t.anisotropy = 8;
        let material = new THREE.MeshPhongMaterial({ map: t });
        let p = new THREE.Mesh(g, material)
        p.castShadow = true;

        return p;
    }
}

const createSphere = (radius, w_segments, h_segments, texturePath = '', emissive = undefined) => {
    let geometry = new THREE.SphereGeometry(radius, w_segments, h_segments);
    const loader = new THREE.TextureLoader();
    const texture = loader.load(texturePath);
    texture.anisotropy = 8;
    let material = new THREE.MeshPhongMaterial({ map: texture, emissive: emissive });
    let sphere = new THREE.Mesh(geometry, material)

    return sphere;
}

watchEffect(() => {
    if (webGl.value) {
        const canvas = webGl.value;

        const width = window.innerWidth - 350;
        const height = window.innerHeight - 200;

        const renderer = new THREE.WebGLRenderer({ canvas: canvas });
        renderer.setSize(width, height);

        const scene = new THREE.Scene();
        const light1 = new THREE.AmbientLight(0x808080);
        const light2 = new THREE.PointLight( 0xffffff, 3, 200000 );
        light2.castShadow = true;
        light2.shadow.mapSize.width = 2048;
        light2.shadow.mapSize.height = 2048;
        light2.position.set(0,0,0);

        scene.add(light1);
        scene.add(light2);

        var sun = createSphere(2300, 80, 80, '/src/assets/textures/sun.jpg', 0xff0000);
        
        var earth = new Planet(100, '/src/assets/textures/earth.jpg').init();
        var mercury = new Planet(60, '/src/assets/textures/mercury.jpg').init();
        var mercury_orbit = new Orbit(4000);
        mercury_orbit.draw(scene);
        
        var venus = new Planet(90, '/src/assets/textures/venus.jpg').init();
        var venus_orbit = new Orbit(5500);
        venus_orbit.draw(scene);

        var mars = new Planet(80, '/src/assets/textures/mars.jpg').init();
        var mars_orbit = new Orbit(8000);
        mars_orbit.draw(scene);

        var jupiter = new Planet(350, '/src/assets/textures/jupiter.jpg').init();
        var jupiter_orbit = new Orbit(10700);
        jupiter_orbit.draw(scene);

        var saturn = new Planet(230, '/src/assets/textures/saturn.jpg').init();

        var saturn_orbit = new Orbit(12000);
        saturn_orbit.draw(scene);

        const ring_saturn_geometry = new THREE.Geometry();
        const ring_saturn_geometry_material = new THREE.PointsMaterial({color:0x3A3A3A, size: 1, sizeAttenuation: false});

        for(let i=0; i<20000; i++)
        {
            var vertex = new THREE.Vector3();
            vertex.x = Math.sin(180/Math.PI*i)*(550 - i/80);
            vertex.y = Math.random() * 20;
            vertex.z = Math.cos(180/Math.PI*i)*(550 - i/80);

            ring_saturn_geometry.vertices.push(vertex); 
        }

        var ring = new THREE.Points(ring_saturn_geometry, ring_saturn_geometry_material);
        ring.castShadow = true;
        scene.add(ring);



        const earth_orbit_geometry = new THREE.Geometry();
        const earth_orbit_geometry_material = new THREE.PointsMaterial({color:0xffffff, size: 1, opacity: 0.3, sizeAttenuation: false});

        for(let i=0; i<200000; i++)
        {
            var earth_orbit_vertex = new THREE.Vector3();
            earth_orbit_vertex.x = Math.sin(180/Math.PI*i)*7500;
            earth_orbit_vertex.z = Math.cos(180/Math.PI*i)*7500;

            earth_orbit_geometry.vertices.push(earth_orbit_vertex); 
        }

        var earth_orbit = new THREE.Points(earth_orbit_geometry, earth_orbit_geometry_material);
        earth_orbit.castShadow = true;
        scene.add(earth_orbit);

        scene.add(sun);
        scene.add(earth);
        scene.add(mercury);
        scene.add(venus);
        scene.add(mars);
        scene.add(jupiter);
        scene.add(saturn);

        const camera = new THREE.PerspectiveCamera(45, width / height, 0.1, 30000)

        camera.position.set(0, 0, 19000);

        var t = 0;

        const loop = () => {
            
            requestAnimationFrame(loop);

            

            camera.position.y = 1500;
            
            ring.position.x = saturn.position.x;
            ring.position.z = saturn.position.z;

            earth.position.x = Math.sin(t * 0.1) * 7500;
            earth.position.z = Math.cos(t * 0.1) * 7500;

            mercury.position.x = Math.sin(t * 0.3) * 4000;
            mercury.position.z = Math.cos(t * 0.3) * 4000;

            venus.position.x = Math.sin(t * 0.2) * 5500;
            venus.position.z = Math.cos(t * 0.2) * 5500;

            mars.position.x = Math.sin(t * 0.08) * 8000;
            mars.position.z = Math.cos(t * 0.08) * 8000;

            jupiter.position.x = Math.sin(t * 0.08) * 10700;
            jupiter.position.z = Math.cos(t * 0.08) * 10700;

            saturn.position.x = Math.sin(t * 0.08) * 12000;
            saturn.position.z = Math.cos(t * 0.08) * 12000;

            t += 0.01;

            sun.rotation.y += 0.001;
            earth.rotation.y += 0.0008;

            saturn.rotation.y += 0.001;
            ring.rotation.y -= 0.001;

            renderer.render(scene, camera);
        }

        loop();

    }
})

</script>

<template>
    <h1>Оптимизация.</h1>
    <canvas ref="webGl" class="webGl"></canvas>
</template>

<style scoped  lang="scss">
h1 {
    margin: 15px 0px;
}
</style>
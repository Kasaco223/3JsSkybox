import * as THREE from 'three';
import { RGBELoader } from 'three/examples/jsm/loaders/RGBELoader.js';

// —————— 1. Referencia al <canvas> ——————
const canvas = document.getElementById('canvas');

// —————— 2. Escena y cámara ——————
const scene = new THREE.Scene();
scene.background = new THREE.Color(0x000000);

const camera = new THREE.PerspectiveCamera(
  75,                               
  window.innerWidth / window.innerHeight, 
  0.1,                                
  1000                                
);
camera.position.z = 5;

// —————— 3. Renderer ——————
const renderer = new THREE.WebGLRenderer({
  canvas,
  antialias: true
});
renderer.setSize(window.innerWidth, window.innerHeight);
renderer.setPixelRatio(Math.min(window.devicePixelRatio, 1));

// —————— 4. Adaptar al tamaño de la ventana ——————
window.addEventListener('resize', () => {
  const w = window.innerWidth;
  const h = window.innerHeight;
  renderer.setSize(w, h);
  camera.aspect = w / h;
  camera.updateProjectionMatrix();
});

// —————— 5. Declaramos skyMesh en un scope «visible» para animate() ——————
let skyMesh = null;

// —————— 6. Cargar la textura HDR y crear la esfera “skybox” ——————
new RGBELoader()
  .setDataType(THREE.FloatType)
  .load(
    '/skybox/skybox.hdr',
    (hdrTexture) => {
      hdrTexture.mapping = THREE.EquirectangularReflectionMapping;

      // Geometría y material para la esfera de fondo
      const skyGeo = new THREE.SphereGeometry(500, 60, 40);
      const skyMat = new THREE.MeshBasicMaterial({
        map: hdrTexture,
        side: THREE.BackSide
      });

      // Asignamos el mesh a la variable declarada arriba
      skyMesh = new THREE.Mesh(skyGeo, skyMat);
      scene.add(skyMesh);
    },
    undefined,
    (err) => {
      console.error('Error cargando la textura HDR:', err);
    }
  );

// —————— 7. Preparar una variable para ir rotando la esfera ——————
let angle = 0;

// —————— 8. Bucle de animación ——————
function animate() {
  requestAnimationFrame(animate);

 


  renderer.render(scene, camera);
}

animate();

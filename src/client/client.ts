import * as THREE from 'three'
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls'
import { GUI } from 'dat.gui'


const scene = new THREE.Scene()

// persp camera
// const camera = new THREE.PerspectiveCamera(
//     75, window.length / window.innerHeight, 0.1, 1000
// )
const camera = new THREE.PerspectiveCamera(75, 1, 0.1, 100)

// ortho camera
const camera2 = new THREE.OrthographicCamera(-8, 8, 8, -8, 1, 10)

const canvas1 = document.getElementById('c1') as HTMLCanvasElement
const canvas2 = document.getElementById('c2') as HTMLCanvasElement

// persp camera positioning
camera.position.z = 0.5
camera.position.y = -8
camera.rotation.x = 1.4140685871405376

// ortho camera pos
camera2.position.z = 1.37
camera2.position.y = -8
camera2.rotation.x = 1.4140685871405376

const renderer = new THREE.WebGLRenderer({ canvas: canvas1 })
renderer.setSize(800, 800)
//document.body.appendChild(renderer.domElement)
const renderer2 = new THREE.WebGLRenderer({ canvas: canvas2 })
renderer2.setSize(800, 800)





new OrbitControls(camera, renderer.domElement)

const geometry = new THREE.BoxGeometry()
const material = new THREE.MeshBasicMaterial({
    color: 0x00ff00,
    // wireframe: true
})

const cube = new THREE.Mesh(geometry, material)
scene.add(cube)
cube.position.set(0, -5, 0.25)

// adding plane geometry to scene
const geometry1 = new THREE.PlaneGeometry(10, 4)
const planeMaterial = new THREE.MeshBasicMaterial({color: 0xffff00, side: THREE.DoubleSide})

const plane = new THREE.Mesh( geometry1, planeMaterial )
scene.add(plane)
plane.position.z = -0.25

// adding torus knot to scene
const geometry2 = new THREE.TorusKnotGeometry(10, 3, 100, 16)
const material2 = new THREE.MeshBasicMaterial( { color: 0x4287f5, wireframe: true } )
const torusKnot = new THREE.Mesh( geometry2, material2 );
scene.add(torusKnot)
torusKnot.position.set(4.8, 4.2, 0.45)

// window.addEventListener('resize', onWindowResize, false)
// function onWindowResize() {
//     camera.aspect = window.innerWidth / window.innerHeight
//     camera.updateProjectionMatrix()
//     renderer.setSize(window.innerWidth, window.innerHeight)
//     render()
// }

// adding GUI functionality
const gui = new GUI()

const cubeFolder = gui.addFolder('Cube')
cubeFolder.add(cube.rotation, 'x', 0, Math.PI * 2)
cubeFolder.add(cube.rotation, 'y', 0, Math.PI * 2)
cubeFolder.add(cube.rotation, 'z', 0, Math.PI * 2)
cubeFolder.add(cube.position, 'x', -5, 5)
cubeFolder.add(cube.position, 'y', -5, 5)
cubeFolder.add(cube.position, 'z', -5, 5)
// cubeFolder.open()

const planeFolder = gui.addFolder('Plane')
planeFolder.add(plane.rotation, 'x', 0, Math.PI * 2)
planeFolder.add(plane.rotation, 'y', 0, Math.PI * 2)
planeFolder.add(plane.rotation, 'z', 0, Math.PI * 2)
planeFolder.add(plane.position, 'x', 0, 10)
planeFolder.add(plane.position, 'y', -10, 10)
planeFolder.add(plane.position, 'z', -5, 5)

const cameraFolder = gui.addFolder('Camera')
cameraFolder.add(camera2.rotation, 'x', 0, Math.PI * 2)
cameraFolder.add(camera2.rotation, 'y', 0, Math.PI * 2)
cameraFolder.add(camera2.rotation, 'z', 0, Math.PI * 2)
cameraFolder.add(camera2.position, 'x', 0, 10)
cameraFolder.add(camera2.position, 'y', -10, 10)
cameraFolder.add(camera2.position, 'z', 0, 10)


function animate() {
    requestAnimationFrame(animate)

    cube.rotation.z += 0.01
    torusKnot.rotation.z += -0.01
    
    render()
}

function render(){
    renderer.render(scene, camera)
    renderer2.render(scene, camera2)
}

animate()
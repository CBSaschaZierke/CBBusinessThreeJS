import './style.css'
import * as dat from 'dat.gui'
import * as THREE from 'three'
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js'
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader.js'
import { DRACOLoader } from 'three/examples/jsm/loaders/DRACOLoader.js'

/**
 * Base
 */
// Debug
const gui = new dat.GUI({
    width: 400
})

// Canvas
const canvas = document.querySelector('canvas.webgl')

// Scene
const scene = new THREE.Scene()

/**
 * Loaders
 */
// Texture loader
const textureLoader = new THREE.TextureLoader()

// Draco loader
const dracoLoader = new DRACOLoader()
dracoLoader.setDecoderPath('draco/')

// GLTF loader
const gltfLoader = new GLTFLoader()
gltfLoader.setDRACOLoader(dracoLoader)

/**
 * Object
 */

const bakedTexture = textureLoader.load('baked.jpg')
bakedTexture.flipY = false
bakedTexture.encoding = THREE.sRGBEncoding

const bakedMaterial = new THREE.MeshBasicMaterial(({ map: bakedTexture }))
let test

gltfLoader.load(
    'platform.glb',
    (gltf) => {
        gltf.scene.traverse((child) =>{
            child.material = bakedMaterial
        })
        scene.add(gltf.scene)
        test = gltf.scene
        console.log(test)
    }
)


/**
 * Sizes
 */
const sizes = {
    width: window.innerWidth,
    height: window.innerHeight
}

window.addEventListener('resize', () =>
{
    // Update sizes
    sizes.width = window.innerWidth
    sizes.height = window.innerHeight

    // Update camera
    camera.aspect = sizes.width / sizes.height
    camera.updateProjectionMatrix()

    // Update renderer
    renderer.setSize(sizes.width, sizes.height)
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2))
})

/**
 * Camera
 */
// Base camera
const camera = new THREE.PerspectiveCamera(45, sizes.width / sizes.height, 0.1, 100)
camera.position.x = -6
camera.position.y = 5
camera.position.z = 3
camera.lookAt(0,0,0)
scene.add(camera)

// Controls
const controls = new OrbitControls(camera, canvas)
controls.enableDamping = true

// window.addEventListener('click', () => {
//     console.log('clicked')
//     camera.position.set(-12, 4, 6)
//     controls.target = new THREE.Vector3(-7, 0, 5);
// })

// controls.object.position.set(-1, 3, 8);

const raycaster = new THREE.Raycaster()
const rayOrigin = new THREE.Vector3(-3,0,0)
const rayDirection = new THREE.Vector3(10,0,0)
rayDirection.normalize()

raycaster.set(rayOrigin, rayDirection)

/**
 * Renderer
 */
const renderer = new THREE.WebGLRenderer({
    canvas: canvas,
    antialias: true
})
renderer.setSize(sizes.width, sizes.height)
renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2))
renderer.outputEncoding = THREE.sRGBEncoding


// Mouse

const mouse = new THREE.Vector2()

window.addEventListener('mousemove', (e) => {
    mouse.x = e.clientX / sizes.width * 2 - 1
    mouse.y = - (e.clientY / sizes.height) * 2 + 1
})

window.addEventListener('click', (e) => {
    if(currentIntersect && rayBool){

        if(currentIntersect.object.name === 'Cube032'){
            camera.position.set(-12, 4, 6)
            controls.target = new THREE.Vector3(-7, 0, 5);
        }

        if(currentIntersect.object.name === 'Cube002'){
            camera.position.set(5, 4, 11)
            controls.target = new THREE.Vector3(4, 0, 5);
        }

        if(currentIntersect.object.name === 'Cube001'){
            camera.position.set(10, 4, -8)
            controls.target = new THREE.Vector3(5, 0, -6);
        }

        if(currentIntersect.object.name === 'Cube003'){
            camera.position.set(-6, 4, -11)
            controls.target = new THREE.Vector3(-3, 0, -5);
        }

        if(currentIntersect.object.name === 'Plane'){
            camera.position.set(-6, 5, 3)
            controls.target = new THREE.Vector3(0,0,0);
        }
    }
})

/**
 * EventListeners for Switch in States
 */

let rayBool = true

window.addEventListener('keydown', (e) => {
    if(e.code === 'Space'){
        camera.position.set(0, 30, 0)
        controls.target = new THREE.Vector3(0,0,0);
        for(const point of points){
            point.element.classList.add('visible')
        }
        rayBool = false
    }
})

window.addEventListener('keydown', (e) => {
    if(e.code === 'Escape'){
        camera.position.set(-6, 5, 3)
        controls.target = new THREE.Vector3(0,0,0);
        for(const point of points){
            point.element.classList.remove('visible')
        }
        rayBool = true
    }
})

// Points of Interes
const points = [
    {
        position: new THREE.Vector3(1.55, .3, 9),
        element: document.querySelector('.point-0')
    },
    {
        position: new THREE.Vector3(-10, .3, 5),
        element: document.querySelector('.point-1')
    },
    {
        position: new THREE.Vector3(-8, .3, -8),
        element: document.querySelector('.point-2')
    },
    {
        position: new THREE.Vector3(8, .3, -6),
        element: document.querySelector('.point-3')
    }
]

/**
 * Animate
 */
const clock = new THREE.Clock()

let currentIntersect = null

const tick = () =>
{
    const elapsedTime = clock.getElapsedTime()

    // Update controls
    controls.update()

    for(const point of points){
        const screenPosition = point.position.clone()
        screenPosition.project(camera)

        const translateX = screenPosition.x * sizes.width *.5
        const translateY = -screenPosition.y * sizes.height *.5
        point.element.style.transform = `translateX(${translateX}px) translateY(${translateY}px)`
    }

    // Render

    if(test !== undefined && rayBool){
        raycaster.setFromCamera(mouse, camera)

        const intersects = raycaster.intersectObjects(test.children)

        for( const intersect of intersects){
            console.log(intersect.object.name)
        }

        if(intersects.length){
            if(!currentIntersect){
                console.log('mouse enter')
            }
            currentIntersect = intersects[0]
        }
        else{
            if(currentIntersect){
                console.log('mouse leave')
            }
            currentIntersect = null
        }
    }


    renderer.render(scene, camera)

    // Call tick again on the next frame
    window.requestAnimationFrame(tick)
}

tick()
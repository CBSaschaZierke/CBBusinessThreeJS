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
const matCapTexture = textureLoader.load('textures/matcaps/whitegrey.png')
const matCapTexture2 = textureLoader.load('textures/matcaps/BB.png')

// Draco loader
const dracoLoader = new DRACOLoader()
dracoLoader.setDecoderPath('draco/')

// GLTF loader
const gltfLoader = new GLTFLoader()
gltfLoader.setDRACOLoader(dracoLoader)

const fontLoader = new THREE.FontLoader()


/**
 * Fonts
 */
const textMaterial = new THREE.MeshMatcapMaterial({ matcap: matCapTexture})
fontLoader.load('fonts/helvetiker_regular.typeface.json', (font) => {
    const textGeometry = new THREE.TextGeometry('Health Care', {
        font: font,
        size: 1,
        height: .2,
        curveSegments: 12,
        bevelEnabled: true,
        bevelThickness: .03,
        bevelSize: .02,
        bevelOffset: 0,
        bevelSegments: 5
    })
    const text1Material = new THREE.MeshMatcapMaterial({matcap: matCapTexture2})
    const text = new THREE.Mesh(textGeometry, text1Material)
    // textGeometry.computeBoundingBox()
    // textGeometry.translate(
    //     -(textGeometry.boundingBox.max.x -.02) * .5,
    //     (textGeometry.boundingBox.max.y - .5),
    //     -(textGeometry.boundingBox.max.z -.03) * .5
    // )
    textGeometry.center()
    text.position.set(-10, .55, 55) //.22
    scene.add(text)

    const text2Geometry = new THREE.TextGeometry('Income', {
        font: font,
        size: .5,
        height: .2,
        curveSegments: 12,
        bevelEnabled: true,
        bevelThickness: .03,
        bevelSize: .02,
        bevelOffset: 0,
        bevelSegments: 5
    })
    const text2 = new THREE.Mesh(text2Geometry, textMaterial)
    // textGeometry.computeBoundingBox()
    // textGeometry.translate(
    //     -(textGeometry.boundingBox.max.x -.02) * .5,
    //     (textGeometry.boundingBox.max.y - .5),
    //     -(textGeometry.boundingBox.max.z -.03) * .5
    // )
    text2Geometry.center()
    text2.position.set(-15, .25, 60) //.22
    scene.add(text2)

    const text3Geometry = new THREE.TextGeometry('In Progress', {
        font: font,
        size: .5,
        height: .2,
        curveSegments: 12,
        bevelEnabled: true,
        bevelThickness: .03,
        bevelSize: .02,
        bevelOffset: 0,
        bevelSegments: 5
    })
    const text3 = new THREE.Mesh(text3Geometry, textMaterial)
    // textGeometry.computeBoundingBox()
    // textGeometry.translate(
    //     -(textGeometry.boundingBox.max.x -.02) * .5,
    //     (textGeometry.boundingBox.max.y - .5),
    //     -(textGeometry.boundingBox.max.z -.03) * .5
    // )
    text3Geometry.center()
    text3.position.set(-10, .25, 60) //.22
    scene.add(text3)

    const text4Geometry = new THREE.TextGeometry('Closed', {
        font: font,
        size: .5,
        height: .2,
        curveSegments: 12,
        bevelEnabled: true,
        bevelThickness: .03,
        bevelSize: .02,
        bevelOffset: 0,
        bevelSegments: 5
    })
    const text4 = new THREE.Mesh(text4Geometry, textMaterial)
    // textGeometry.computeBoundingBox()
    // textGeometry.translate(
    //     -(textGeometry.boundingBox.max.x -.02) * .5,
    //     (textGeometry.boundingBox.max.y - .5),
    //     -(textGeometry.boundingBox.max.z -.03) * .5
    // )
    text4Geometry.center()
    text4.position.set(-5, .25, 60) //.22
    scene.add(text4)

    const text5Geometry = new THREE.TextGeometry('COMMERCIAL', {
        font: font,
        size: 1,
        height: .2,
        curveSegments: 12,
        bevelEnabled: true,
        bevelThickness: .03,
        bevelSize: .02,
        bevelOffset: 0,
        bevelSegments: 5
    })
    const text5 = new THREE.Mesh(text5Geometry, textMaterial)
    text5Geometry.center()
    text5.position.set(-42, .55, 17) //.22
    text5.rotation.y = Math.PI * .5
    scene.add(text5)
})

/**
 * Object
 */

const bakedTexture = textureLoader.load('baked.jpg')
bakedTexture.flipY = false
bakedTexture.encoding = THREE.sRGBEncoding

const cbcTex = textureLoader.load('cbcmat.png')
cbcTex.flipY = false
cbcTex.encoding = THREE.sRGBEncoding

const bakedMaterial = new THREE.MeshBasicMaterial(({ map: bakedTexture }))
const cbcMat = new THREE.MeshBasicMaterial({map:cbcTex})
let test

// gltfLoader.load(
//     'platform.glb',
//     (gltf) => {
//         gltf.scene.traverse((child) =>{
//             child.material = bakedMaterial
//         })
//         scene.add(gltf.scene)
//         test = gltf.scene
//         console.log(test)
//     }
// )

const light = new THREE.AmbientLight( 0xFFF7A0, .7 );
scene.add( light );


gltfLoader.load(
    'CBCnew.glb',
    (gltf) => {
        gltf.scene.traverse((child) =>{
            //child.material = cbcMat
            child.castShadow = true
            child.receiveShadow = true
        })
        // gltf.castShadow = true
        // gltf.receiveShadow = true
        scene.add(gltf.scene)
        // test = gltf.scene
        // console.log(test)
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
renderer.shadowMap.enabled = true;
renderer.shadowMap.type = THREE.PCFSoftShadowMap
renderer.setSize(sizes.width, sizes.height)
renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2))
// renderer.outputEncoding = THREE.sRGBEncoding

// const dirlight = new THREE.DirectionalLight( 0xFFF7A0, 1, 100 );
// dirlight.position.set( 0, 10, 0 ); //default; light shining from top
// dirlight.rotation.z = Math.PI * .5
// dirlight.castShadow = true; // default false
// dirlight.shadow.mapSize.width = 256;
// dirlight.shadow.mapSize.height = 256;
// dirlight.shadow.camera.near = 0.5;
// dirlight.shadow.camera.far = 40;
// scene.add( dirlight );

const directionalLight = new THREE.DirectionalLight(0xFFF7A0, 0.5)
directionalLight.position.set(5, 20, 0)
directionalLight.target.position.set(-200,0,10)
directionalLight.castShadow = true
directionalLight.shadow.mapSize.width = 1024*8;
directionalLight.shadow.mapSize.height = 1024*8;
 directionalLight.shadow.camera.left = - 64
 directionalLight.shadow.camera.top = 64
 directionalLight.shadow.camera.right = 64
 directionalLight.shadow.camera.bottom = - 64
scene.add(directionalLight)


// Mouse

const mouse = new THREE.Vector2()

window.addEventListener('mousemove', (e) => {
    mouse.x = e.clientX / sizes.width * 2 - 1
    mouse.y = - (e.clientY / sizes.height) * 2 + 1
})

window.addEventListener('click', (e) => {
    if(currentIntersect && rayBool){
        // Techniker
        if(currentIntersect.object.name === 'Cube032'){
            camera.position.set(-12, 4, 6)
            controls.target = new THREE.Vector3(-7, 0, 5);
        }
        // Bank
        if(currentIntersect.object.name === 'Cube002'){
            camera.position.set(5, 4, 11)
            controls.target = new THREE.Vector3(4, 0, 5);
        }
        // Makler
        if(currentIntersect.object.name === 'Cube001'){
            camera.position.set(10, 4, -8)
            controls.target = new THREE.Vector3(5, 0, -6);
        }
        // Gesellschaft
        if(currentIntersect.object.name === 'Cube003'){
            camera.position.set(-7, 4, -11)
            controls.target = new THREE.Vector3(-5, 0, -5);
        }
        //Ground
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
// const light = new THREE.AmbientLight(0xFFF7A0)
// scene.add(light)


const helper = new THREE.CameraHelper( directionalLight.shadow.camera );
scene.add( helper );

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
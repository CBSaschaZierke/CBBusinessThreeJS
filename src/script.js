import './style.css'
import './main.js'
import * as dat from 'dat.gui'
import * as THREE from 'three'
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js'
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader.js'
import { DRACOLoader } from 'three/examples/jsm/loaders/DRACOLoader.js'
import {gsap} from "gsap/gsap-core";
import * as main from './main.js'

/**
 * Base
 */
// Debug
// const gui = new dat.GUI({
//     width: 400
// })

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

const textHealthCare = 'HEALTH CARE'
const textCommercial = 'COMMERCIAL'
const textResidential = 'RESIDENTIAL'


/**
 * Fonts
 */
const textMaterial = new THREE.MeshMatcapMaterial({ matcap: matCapTexture})
fontLoader.load('fonts/helvetiker_regular.typeface.json', (font) => {
    const textGeometry = new THREE.TextGeometry(textHealthCare, {
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
    const text1Material = new THREE.MeshMatcapMaterial({matcap: matCapTexture2})
    const text = new THREE.Mesh(textGeometry, text1Material)
    // textGeometry.computeBoundingBox()
    // textGeometry.translate(
    //     -(textGeometry.boundingBox.max.x -.02) * .5,
    //     (textGeometry.boundingBox.max.y - .5),
    //     -(textGeometry.boundingBox.max.z -.03) * .5
    // )
    textGeometry.center()
    text.position.set(-10, .55, 67) //.22
    text.castShadow = true
    text.receiveShadow = true
    scene.add(text)

    const text5Geometry = new THREE.TextGeometry(textCommercial, {
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
    text5.position.set(-40, .55, 17) //.22
    text5.rotation.y = Math.PI * .5
    text5.castShadow = true
    text5.receiveShadow = true
    scene.add(text5)

    const textResGeometry = new THREE.TextGeometry(textResidential, {
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
    const textRes = new THREE.Mesh(textResGeometry, textMaterial)
    textResGeometry.center()
    textRes.position.set(-42, .22, -9) //.22
    // textRes.rotation.x = Math.PI * .5
    textRes.rotation.y = - Math.PI * .5
    // textRes.rotation.z = Math.PI
    textRes.castShadow = true
    textRes.receiveShadow = true
    scene.add(textRes)

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

const light = new THREE.AmbientLight( 0xFFFFFF, .7 ); //0xFFF7A0
scene.add( light );


gltfLoader.load(
    'CBCohneAlles.glb',
    (gltf) => {
        gltf.scene.traverse((child) =>{
            child.castShadow = true
            child.receiveShadow = true
        })
        scene.add(gltf.scene)
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
camera.position.x = -11
camera.position.y = 4
camera.position.z = -10
scene.add(camera)

// Controls
const controls = new OrbitControls(camera, canvas)

controls.target = new THREE.Vector3(-11,4,-12)

let animArray = []
let playMeToo = false
let longerTimeout = false

let anim1 = gsap.to( camera.position, {
    duration: 5,
    x: -11,
    y: 2,
    z: -7,
})
anim1.pause()
animArray.push(anim1)

let anim1_1 = gsap.to( controls.target, {
    duration: 5,
    x: -15,
    y: 2,
    z: -7,
    onStart: () =>{
        longerTimeout = true
    }
})
anim1_1.pause()
animArray.push(anim1_1)

// let anim2 = gsap.to( camera.position, {
//     // delay: 15,
//     duration: 5,
//     x: -11,
//     y: 1,
//     z: -6,
//     onComplete: () => {
//         gsap.to(controls.target, {
//             duration: 1,
//             x: -12,
//             y: 1,
//             z: -6,
//         })
//     }
// })
// anim2.pause()
// animArray.push(anim2)


let anim3 = gsap.to( controls.target, {
    //delay: 20,
    duration: 5,
    x: -12,
    y: 1,
    z: 3,
})
anim3.pause()
animArray.push(anim3)

let anim3_1 = gsap.to(camera.position, {
    duration: 3,
    x: -12,
    y: 1,
    z: 0,
})
anim3_1.pause()
animArray.push(anim3_1)

let anim4 = gsap.to( controls.target, {
    // delay: 23,
    duration: 2,
    x: -40,
    y: 1,
    z: 0,
})
anim4.pause()
animArray.push(anim4)

let anim4_1 =  gsap.to(camera.position, {
    duration: 2,
    x: -20,
    y: 1,
    z: 0,
})
anim4_1.pause()
animArray.push(anim4_1)

let anim5 = gsap.to( controls.target, {
    // delay: 31,
    duration:2,
    x: -20,
    y: 1,
    z: 60,
})
anim5.pause()
animArray.push(anim5)

let anim5_1 = gsap.to(camera.position, {
    duration: 2,
    x: -20,
    y: 1,
    z: 36,
    onStart: () => {
        playMeToo = true
        longerTimeout = true
    }
})
anim5_1.pause()
animArray.push(anim5_1)

// let anim6 = gsap.to( controls.target, {
//     // delay: 40,
//     duration: 2,
//     x: -40,
//     y: 1,
//     z: 36,
// })
// anim6.pause()
// animArray.push(anim6)

// let anim6_1 = gsap.to(camera.position, {
//     duration: 2,
//     x: -32,
//     y: 1,
//     z: 36,
// })
// anim6_1.pause()
// animArray.push(anim6_1)
//
// let anim7 = gsap.to( controls.target, {
//     // delay: 49,
//     duration: 2,
//     x: -32,
//     y: 1,
//     z: 66,
// })
// anim7.pause()
// animArray.push(anim7)
//
// let anim7_1 = gsap.to(camera.position, {
//     duration: 2,
//     x: -32,
//     y: 1,
//     z: 56,
// })
// anim7_1.pause()
// animArray.push(anim7_1)

// let anim7_2 = gsap.to(camera.position, {
//     duration: 5,
//     x: -12,
//     y: 1,
//     z: 60,
// })
// anim7_2.pause()
// animArray.push(anim7_2)

// Play more
let anim8 = gsap.to( controls.target, {
    delay: 2,
    // delay: 58,
    duration: 5,
    x: -10,
    y: 1,
    z: 55,
})
anim8.pause()
animArray.push(anim8)

/**
 * View Healthcare view
 */
let anim8_1 = gsap.to(camera.position, {
    duration: 5,
    x: -10,
    y: 2,
    z: 73,
    onStart: () => {
        playMeToo = true
    }
})
anim8_1.pause()
animArray.push(anim8_1)

let anim10 = gsap.to( controls.target, {
    // delay: 78,
    duration: 10,
    x: -20,
    y: 1,
    z: 36,
})
anim10.pause()
animArray.push(anim10)

let anim10_1 = gsap.to(camera.position, {
    duration: 5,
    x: 5,
    y: 1,
    z: 36,
    onStart: () => {
        playMeToo = true
    }
})
anim10_1.pause()
animArray.push(anim10_1)

let anim11 = gsap.to( controls.target, {
    // delay: 87,
    duration: 5,
    x: -100,
    y: 1,
    z: 36,
})
anim11.pause()
animArray.push(anim11)

let anim11_1 = gsap.to(camera.position, {
    duration: 5,
    x: -32,
    y: 1,
    z: 36,
    onStart: () => {
        playMeToo = true
        longerTimeout = true
    }
})
anim11_1.pause()
animArray.push(anim11_1)

// let anim12 = gsap.to( controls.target, {
//     // delay: 96,
//     duration: 5,
//     x: -51.5,
//     y: 1,
//     z: -80,
// })
// anim12.pause()
// animArray.push(anim12)
//
// let anim12_1 = gsap.to(camera.position, {
//     duration: 5,
//     x: -51.5,
//     y: 1,
//     z: 0,
// })
// anim12_1.pause()
// animArray.push(anim12_1)
//
// let anim13 = gsap.to( controls.target, {
//     // delay: 105,
//     duration: 5,
//     x: -100,
//     y: 1,
//     z: 0,
// })
// anim13.pause()
// animArray.push(anim13)
//
// let anim13_1 = gsap.to(camera.position, {
//     duration: 5,
//     x: -71.5,
//     y: 1,
//     z: 0,
// })
// anim13_1.pause()
// animArray.push(anim13_1)
//
// let anim14 = gsap.to( controls.target, {
//     // delay: 114,
//     duration: 5,
//     x: -71.5,
//     y: 1,
//     z: 100,
// })
// anim14.pause()
// animArray.push(anim14)
//
// // TOO
// let anim14_1 = gsap.to(camera.position, {
//     duration: 5,
//     x: -71.5,
//     y: 1,
//     z: 20,
// })
// anim14_1.pause()
// animArray.push(anim14_1)

let anim15 = gsap.to( controls.target, {
    // delay: 124,
    duration:5,
    x: -42,
    y: 3,
    z: 17,
    onStart: () => {
        // longer timeout
    }
})
anim15.pause()
animArray.push(anim15)


/**
 * view Commercial
 */

let anim15_1 = gsap.to(camera.position, {
    duration: 7,
    x: -30,
    y: 4.5,
    z: 17,
    onStart: () => {
        // longer timeout
        playMeToo = true
    }
})
anim15_1.pause()
animArray.push(anim15_1)

// let anim16 = gsap.to( controls.target, {
//     // delay: 136,
//     duration: 10,
//     x: -45,
//     y: 15,
//     z: 10,
// })
// anim16.pause()
// animArray.push(anim16)
//
// let anim16_1 = gsap.to(camera.position, {
//     duration: 10,
//     x: -45,
//     y: 25,
//     z: 3,
// })
// anim16_1.pause()
// animArray.push(anim16_1)
//
// //TOO
// let anim16_2 = gsap.to(camera.position, {
//     duration:2,
//     x: -45,
//     y: 25,
//     z: 5,
//     onStart: () => {
//         playMeToo = true
//     }
// })
// anim16_2.pause()
// animArray.push(anim16_2)

let anim17 = gsap.to( controls.target, {
    // delay: 150,
    duration: 5,
    x: 0,
    y: 1,
    z: 0,
})
anim17.pause()
animArray.push(anim17)

let anim17_1 = gsap.to(camera.position, {
    duration: 5,
    x: -30,
    y: 1,
    z: 0,
})
anim17_1.pause()
animArray.push(anim17_1)


let anim18 = gsap.to( camera.position, {
    // delay: 159,
    duration:5,
    x: -20,
    y: 1,
    z: 0,
})
anim18.pause()
animArray.push(anim18)

let anim19 = gsap.to( controls.target, {
    // delay: 163,
    duration: 5,
    x: -20,
    y: 1,
    z: -50,
})
anim19.pause()
animArray.push(anim19)

let anim19_pos = gsap.to( camera.position, {
    // delay: 166,
    duration:5,
    x: -20,
    y: 1,
    z: -20,
})
anim19_pos.pause()
animArray.push(anim19_pos)

let anim20 = gsap.to( controls.target, {
    // delay: 170,
    duration: 5,
    x: -35,
    y: 1,
    z: -20.5,
})
anim20.pause()
animArray.push(anim20)

// TOO
let anim20_pos = gsap.to( camera.position, {
    // delay: 176,
    duration:5,
    x: -35,
    y: 10,
    z: -21,
})
anim20_pos.pause()
animArray.push(anim20_pos)

let anim20_pos1 = gsap.to( camera.position, {
    // delay: 176,
    duration:5,
    x: -40,
    y: 10,
    z: -21,
    onStart: () => {
        playMeToo = true
        longerTimeout = true
    }
})
anim20_pos1.pause()
animArray.push(anim20_pos1)

let anim21 = gsap.to( controls.target, {
    // delay: 180,
    duration: 5,
    x: -35,
    y: 1,
    z: -9.9,
})
anim21.pause()
animArray.push(anim21)

/**
 * View Residential
 */
let anim21_pos = gsap.to( camera.position, {
    // delay: 180,
    duration:5,
    x: -52,
    y: 5,
    z: -9,
})
anim21_pos.pause()
animArray.push(anim21_pos)

//TOO
let anim21_pos_1 = gsap.to(camera.position, {
    duration: 2,
    x: -50,
    y: 17,
    z: -10,
    onStart: () => {
        playMeToo = true
    }
})
anim21_pos_1.pause()
animArray.push(anim21_pos_1)

let anim22_pos_1 = gsap.to(controls.target,{
    duration: 2,
    x: -11,
    y: 4,
    z: -12,
})
anim22_pos_1.pause()
animArray.push(anim22_pos_1)

let anim22_pos = gsap.to( camera.position, {
    // delay: 176,
    duration:2,
    x: -11,
    y: 4,
    z: -10,
})
anim22_pos.pause()
animArray.push(anim22_pos)


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

// window.addEventListener('keydown', (e) => {
//     if(e.code === 'Space'){
//         camera.position.set(0, 30, 0)
//         controls.target = new THREE.Vector3(0,0,0);
//         for(const point of points){
//             point.element.classList.add('visible')
//         }
//         rayBool = false
//     }
// })
//
// window.addEventListener('keydown', (e) => {
//     if(e.code === 'Escape'){
//         camera.position.set(-6, 5, 3)
//         controls.target = new THREE.Vector3(0,0,0);
//         for(const point of points){
//             point.element.classList.remove('visible')
//         }
//         rayBool = true
//     }
// })

const vidraycaster = new THREE.Raycaster()

const hccards = [
    {
        position: new THREE.Vector3(-16.4, 3, 62),
        element: document.querySelector('.hccardIncome')
    },
    {
        position: new THREE.Vector3(-12.5, 3, 58),
        element: document.querySelector('.hccardProgress')
    },
    {
        position: new THREE.Vector3(-6, 3, 58.5),
        element: document.querySelector('.hccardClosed')
    },
    {
        position: new THREE.Vector3(-13.5, 8, 47),
        element: document.querySelector('.hcimg')
    },

    {
        position: new THREE.Vector3(-41.6, 4, 24.25),
        element: document.querySelector('.cocardIncome')
    },
    {
        position: new THREE.Vector3(-41.6, 4, 19.25),
        element: document.querySelector('.cocardProgress')
    },
    {
        position: new THREE.Vector3(-41.6, 4, 14.5),
        element: document.querySelector('.cocardClosed')
    },
    {
        position: new THREE.Vector3(-41.6, 6.75, 14.5),
        element: document.querySelector('.coimg')
    },

    {
        position: new THREE.Vector3(-40.2, 3, -15.5),
        element: document.querySelector('.rescardIncome')
    },
    {
        position: new THREE.Vector3(-40.2, 3, -10.75),
        element: document.querySelector('.rescardProgress')
    },
    {
        position: new THREE.Vector3(-40.2, 3, -5.75),
        element: document.querySelector('.rescardClosed')
    },
    {
        position: new THREE.Vector3(-40.2, 5.4, -11),
        element: document.querySelector('.resimg')
    }
]

let homecards=[
    {
        position: new THREE.Vector3(-6.25, 2.25, 5),
        element: document.querySelector('.GermanIncome')
    },
    {
        position: new THREE.Vector3(-10.25, 2.25, 5),
        element: document.querySelector('.GermanProgress')
    },
    {
        position: new THREE.Vector3(-14.8, 2.25, 2),
        element: document.querySelector('.GermanClosed')
    },
    {
        position: new THREE.Vector3(-10.5, 6.4, 9),
        element: document.querySelector('.Germanimg')
    },
]

/**
 * Animate
 */
const clock = new THREE.Clock()

let currentIntersect = null
let showElBool1 = false
let showElBool2 = false
let showElBool3 = false
let showHomeBool = false


const tick = () =>
{
    const elapsedTime = clock.getElapsedTime()

    // Update controls
    controls.update()

    // Go through each point
    if(showElBool1){
        for(let i=0;i<4;i++)
        {
            // Get 2D screen position
            const screenPosition = hccards[i].position.clone()
            screenPosition.project(camera)

            // Set the raycaster
            raycaster.setFromCamera(screenPosition, camera)
            const intersects = raycaster.intersectObjects(scene.children, true)

            // No intersect found
            if(intersects.length === 0)
            {
                // Show
                hccards[i].element.classList.add('visible')
            }

            // Intersect found
            else
            {
                // Get the distance of the intersection and the distance of the point
                const intersectionDistance = intersects[0].distance
                const pointDistance = hccards[i].position.distanceTo(camera.position)

                // Intersection is close than the point
                if(intersectionDistance < pointDistance)
                {
                    // Hide
                    hccards[i].element.classList.remove('visible')
                }
                // Intersection is further than the point
                else
                {
                    // Show
                    hccards[i].element.classList.add('visible')
                }
            }

            const translateX = screenPosition.x * sizes.width * 0.5
            const translateY = - screenPosition.y * sizes.height * 0.5
            hccards[i].element.style.transform = `translateX(${translateX}px) translateY(${translateY}px)`
        }
    }

    if(showElBool2){
        for(let i=4;i<8;i++)
        {
            // Get 2D screen position
            const screenPosition = hccards[i].position.clone()
            screenPosition.project(camera)

            // Set the raycaster
            raycaster.setFromCamera(screenPosition, camera)
            const intersects = raycaster.intersectObjects(scene.children, true)

            // No intersect found
            if(intersects.length === 0)
            {
                // Show
                hccards[i].element.classList.add('visible')
            }

            // Intersect found
            else
            {
                // Get the distance of the intersection and the distance of the point
                const intersectionDistance = intersects[0].distance
                const pointDistance = hccards[i].position.distanceTo(camera.position)

                // Intersection is close than the point
                if(intersectionDistance < pointDistance)
                {
                    // Hide
                    hccards[i].element.classList.remove('visible')
                }
                // Intersection is further than the point
                else
                {
                    // Show
                    hccards[i].element.classList.add('visible')
                }
            }

            const translateX = screenPosition.x * sizes.width * 0.5
            const translateY = - screenPosition.y * sizes.height * 0.5
            hccards[i].element.style.transform = `translateX(${translateX}px) translateY(${translateY}px)`
        }
    }

    if(showElBool3){
        for(let i=8;i<hccards.length;i++)
        {
            // Get 2D screen position
            const screenPosition = hccards[i].position.clone()
            screenPosition.project(camera)

            // Set the raycaster
            raycaster.setFromCamera(screenPosition, camera)
            const intersects = raycaster.intersectObjects(scene.children, true)

            // No intersect found
            if(intersects.length === 0)
            {
                // Show
                hccards[i].element.classList.add('visible')
            }

            // Intersect found
            else
            {
                // Get the distance of the intersection and the distance of the point
                const intersectionDistance = intersects[0].distance
                const pointDistance = hccards[i].position.distanceTo(camera.position)

                // Intersection is close than the point
                if(intersectionDistance < pointDistance)
                {
                    // Hide
                    hccards[i].element.classList.remove('visible')
                }
                // Intersection is further than the point
                else
                {
                    // Show
                    hccards[i].element.classList.add('visible')
                }
            }

            const translateX = screenPosition.x * sizes.width * 0.5
            const translateY = - screenPosition.y * sizes.height * 0.5
            hccards[i].element.style.transform = `translateX(${translateX}px) translateY(${translateY}px)`
        }
    }

    if(showHomeBool) {
        for (let i=0; i<homecards.length;i++) {
            // Get 2D screen position
            const screenPosition = homecards[i].position.clone()
            screenPosition.project(camera)

            // let dist = 9.8/homecards[i].position.distanceTo(camera.position) NO SCALING FOR NOW


            // Set the raycaster
            raycaster.setFromCamera(screenPosition, camera)
            const intersects = raycaster.intersectObjects(scene.children, true)

            // No intersect found
            if(intersects.length === 0)
            {
                // Show
                homecards[i].element.classList.add('visible')
                // homecards[i].element.style.transform = `scale(${dis}, ${dis})`
            }

            // Intersect found
            else
            {
                // Get the distance of the intersection and the distance of the point
                const intersectionDistance = intersects[0].distance
                const pointDistance = homecards[i].position.distanceTo(camera.position)

                // Intersection is close than the point
                if(intersectionDistance < pointDistance)
                {
                    // Hide
                    homecards[i].element.classList.remove('visible')
                    // homecards[i].element.style.transform = `scale(0, 0)`
                }
                // Intersection is further than the point
                else
                {
                    // Show
                    homecards[i].element.classList.add('visible')
                    // homecards[i].element.style.transform = `scale(${dis}, ${dis})`
                }
            }

            // NO SCALING FOR NOW
            // let offset = 1/dist
            //
            // if(offset < 0){
            //     offset *= -1
            // }

            let translateX = screenPosition.x * canvas.clientWidth *.5 // *offset
            let translateY = - screenPosition.y * canvas.clientHeight * .5 // *offset
            homecards[i].element.style.transform = `translateX(${translateX}px) translateY(${translateY}px)` //  scale(${dist})

        }
    }


    // Render

    renderer.render(scene, camera)

    // Call tick again on the next frame
    window.requestAnimationFrame(tick)
}

tick()

// index 10 für Healcare View

// index 22 für Com View

// index 30 für res view

let cameraAnimIndex = 0

function showVideo() {
    let video = document.getElementById('video-1')
    if(cameraAnimIndex === -1){
        video.classList.add('active')
        video.currentTime = 0
        video.load()
    }
    video.onended = () => {
        video.classList.remove('active')
        cameraAnimIndex = 0
        cameraAnimation()
    }
}
showVideo()

function cameraAnimation(){
    if(cameraAnimIndex >= animArray.length){
        cameraAnimIndex = -1
        showVideo()
    }
    if(cameraAnimIndex >= 0){
        for(let i=0; i<animArray.length;i++){
            animArray[i].pause()
        }
        for(let i = 0; i<hccards.length;i++){
            hccards[i].element.classList.remove('visible')
        }
        for(let i=0;i<homecards.length;i++){
            homecards[i].element.classList.remove('visible')
        }
        animArray[cameraAnimIndex].restart()
        if(playMeToo){
            playMultipleAnims(cameraAnimIndex)
        }
        let timeout = animArray[cameraAnimIndex].duration() * 1000

        if(cameraAnimIndex > 8 && cameraAnimIndex < 15){
            showElBool1 = true
        }
        else if(cameraAnimIndex > 9 && cameraAnimIndex < 18){
            showElBool2 = true
        }
        else if(cameraAnimIndex > 20 && cameraAnimIndex < 26){
            showElBool3 = true
        }
        else if(cameraAnimIndex > 1 && cameraAnimIndex <3){
            showHomeBool = true
        }
        else {
            showElBool1 = false
            showElBool2 = false
            showElBool3 = false
            showHomeBool = false
        }

        if(longerTimeout){
            timeout += (5000 * 7)
            longerTimeout = false
        }
        cameraAnimIndex++
        setTimeout(cameraAnimation, timeout)
    }
}

function playMultipleAnims(index){
    if(index+1 < animArray.length){
        animArray[index+1].restart()
        cameraAnimIndex++
        playMeToo = false
    }
}
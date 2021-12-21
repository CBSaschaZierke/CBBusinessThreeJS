import './style.css'
import * as THREE from 'three'
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js'
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader.js'
import { DRACOLoader } from 'three/examples/jsm/loaders/DRACOLoader.js'
import {gsap} from "gsap/gsap-core";
import {
    changeCommercialdata, changeHealthCaredata,
    changeResidentialdata,
    setCoOnView, setHcOnView,
    setOnView,
    setResOnView,
    showState,
    addFooterContent,
} from "./main";

/**
 * Base
 */

// Canvas
const canvas = document.querySelector('canvas.webgl')

// Scene
const scene = new THREE.Scene()

/**
 * Loaders
 */
let loaders = false
const loadingBarElement = document.querySelector('.loadingbar')
const loadingManager = new THREE.LoadingManager(
    () =>{
        window.setTimeout(() =>{
            document.querySelector('.webgl').classList.add('m-fadeIn')
            document.querySelector('.loading').classList.add('m-fadeOut')
            loadingBarElement.classList.add('ended')
            loadingBarElement.style.transform = ''
            addFooterContent()
        }, 500)
    },
    (itemUrl, itemsLoaded, itemsTotal) =>{
        const progressRatio = itemsLoaded/itemsTotal
        loadingBarElement.style.transform = `scaleX(${progressRatio})`
    }
)
let video = document.getElementById('video-1')
// Texture loader
const textureLoader = new THREE.TextureLoader(loadingManager)
const matCapTexture = textureLoader.load('textures/matcaps/whitegrey.png')
const matCapTexture2 = textureLoader.load('textures/matcaps/BB.png')

// Draco loader
const dracoLoader = new DRACOLoader(loadingManager)
dracoLoader.setDecoderPath('draco/')

// GLTF loader
const gltfLoader = new GLTFLoader(loadingManager)
gltfLoader.setDRACOLoader(dracoLoader)

const fontLoader = new THREE.FontLoader(loadingManager)

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
    textRes.rotation.y = - Math.PI * .5
    textRes.castShadow = true
    textRes.receiveShadow = true
    scene.add(textRes)

})

/**
 * Object
 */

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

/*
    TODO: you can add pause, play, resume restart and for fun reverse for debug purpose
    https://greensock.com/get-started/
 */

export let videotl = gsap.timeline({repeat: -1})
videotl.timeScale(2)

videotl.to( camera.position, {
    duration: 5,
    x: -11,
    y: 2,
    z: -7,
    onStart: function (){
        videotl.pause()
        showVideo()
    }
})

videotl.to( controls.target, {
    duration: 5,
    x: -15,
    y: 2,
    z: -7,
})


videotl.to( controls.target, {
    duration: 5,
    x: -12,
    y: 1,
    z: 3,
    onStart: function (){
        showHomeBool = true
        setOnView(true)
        showState()
    }
})

videotl.to(camera.position, {
    duration: 3,
    x: -12,
    y: 1,
    z: 0,
    onStart:function () {
        videotl.pause()
    },
})

videotl.to( controls.target, {
    duration: 2,
    x: -40,
    y: 1,
    z: 0,
    onStart: () => {
        showHomeBool = false
    }
})

videotl.to(camera.position, {
    duration: 2,
    x: -20,
    y: 1,
    z: 0,
})

videotl.to( controls.target, {
    duration:2,
    x: -20,
    y: 1,
    z: 60,
})

videotl.to(camera.position, {
    duration: 2,
    x: -20,
    y: 1,
    z: 36,
})

videotl.addLabel('toHCView')

// Play more
videotl.to( controls.target, {
    duration: 5,
    x: -10,
    y: 1,
    z: 55,
}, 'toHCView')

/**
 * View Healthcare view
 */
videotl.to(camera.position, {
    duration: 5,
    x: -10,
    y: 2,
    z: 73,

}, 'toHCView')

videotl.to( controls.target, {
    duration: 10,
    x: -20,
    y: 1,
    z: 36,
    onStart: function (){
        showElBool1 = true
        setHcOnView(true)
        changeHealthCaredata()
    }
}, 'toHCView')

videotl.addLabel('afterHCView')

videotl.to(camera.position, {
    duration: 5,
    x: 5,
    y: 1,
    z: 36,
    onStart: () => {
        videotl.pause()
    }
}, 'afterHCView')

videotl.to( controls.target, {
    duration: 5,
    x: -100,
    y: 1,
    z: 36,
}, 'afterHCView')

videotl.to(camera.position, {
    duration: 5,
    x: -32,
    y: 1,
    z: 36,
    onStart: () => {
        showElBool1 = false
    }
})

videotl.addLabel('toComView')

videotl.to( controls.target, {
    duration:5,
    x: -42,
    y: 3,
    z: 17,
}, 'toComView')


/**
 * view Commercial
 */

videotl.to(camera.position, {
    duration: 7,
    x: -30,
    y: 4.5,
    z: 17,
    onStart: function (){
        showElBool2 = true
        setCoOnView(true)
        changeCommercialdata()
    }
}, 'toComView')

videotl.addLabel('afterComView')

videotl.to( controls.target, {
    // delay: 150,
    duration: 5,
    x: 0,
    y: 1,
    z: 0,
    onStart: () => {
        videotl.pause()
    }
}, 'afterComView')

videotl.to(camera.position, {
    duration: 5,
    x: -30,
    y: 1,
    z: 0,
}, 'afterComView')


videotl.to( camera.position, {
    duration:5,
    x: -20,
    y: 1,
    z: 0,
    onStart: function() {
        showElBool2 = false
    }
})

videotl.to( controls.target, {
    duration: 5,
    x: -20,
    y: 1,
    z: -50,
})

videotl.to( camera.position, {
    duration:5,
    x: -20,
    y: 1,
    z: -20,
})

videotl.to( controls.target, {
    duration: 5,
    x: -35,
    y: 1,
    z: -20.5,
})

videotl.to( camera.position, {
    duration:5,
    x: -35,
    y: 10,
    z: -21,
})

videotl.to( camera.position, {
    duration:5,
    x: -40,
    y: 10,
    z: -21,
})

videotl.addLabel('toResView')

videotl.to( controls.target, {
    duration: 5,
    x: -35,
    y: 1,
    z: -9.9,
}, 'toResView')

/**
 * View Residential
 */
videotl.to( camera.position, {
    duration:5,
    x: -52,
    y: 5,
    z: -9,
    onStart: function (){
        showElBool3 = true
        setResOnView(true)
        changeResidentialdata()
    }
}, 'toResView')

//TOO
videotl.to(camera.position, {
    duration: 2,
    x: -50,
    y: 17,
    z: -10,
    onStart: () => {
        videotl.pause()
    }
})

videotl.addLabel('afterResView')

videotl.to(controls.target,{
    duration: 2,
    x: -11,
    y: 4,
    z: -12,
    OnStart:function (){
        showElBool3 = false
    }
}, 'afterResView')

videotl.to( camera.position, {
    duration:2,
    x: -11,
    y: 4,
    z: -10,
}, 'afterResView')

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



/**
 * HTML Content
 */
const hccards = [
    {
        position: new THREE.Vector3(-19, 3, 58),
        element: document.querySelector('.hccardIncome')
    },
    {
        position: new THREE.Vector3(-12.5, 3, 58),
        element: document.querySelector('.hccardProgress')
    },
    {
        position: new THREE.Vector3(-6, 3, 58),
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
        position: new THREE.Vector3(-41.6, 4, 14.25),
        element: document.querySelector('.cocardClosed')
    },
    {
        position: new THREE.Vector3(-41.6, 6.75, 19),
        element: document.querySelector('.coimg')
    },

    {
        position: new THREE.Vector3(-40.2, 3, -15.75),
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
        position: new THREE.Vector3(-40.2, 5.4, -10),
        element: document.querySelector('.resimg')
    }
]

let homecards=[
    {
        position: new THREE.Vector3(-7, 2.25, 2),
        element: document.querySelector('.GermanIncome')
    },
    {
        position: new THREE.Vector3(-10.5, 2.25, 2),
        element: document.querySelector('.GermanProgress')
    },
    {
        position: new THREE.Vector3(-14, 2.25, 2),
        element: document.querySelector('.GermanClosed')
    },
    {
        position: new THREE.Vector3(-10, 6.4, 9),
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

    if(!showHomeBool){
        for(let i=0;i<homecards.length;i++){
            homecards[i].element.classList.remove('visible')
        }
    }

    if(!showElBool1 && !showElBool2 && !showElBool3){
        for(let i = 0; i<hccards.length;i++){
            hccards[i].element.classList.remove('visible')
        }
    }
    console.log('Home: ' + showHomeBool)
    console.log('HC: ' + showElBool1)
    console.log('Com: ' + showElBool2)
    console.log('Res: ' + showElBool3)

    // Show healthcare cards
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

    // Show Commercial cards
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

    // Show Residential Cards
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

    // Show Home cards
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

function showVideo() {
    video.classList.add('active')
    video.currentTime = 0
    video.playbackRate = 2.0
    video.play()
}

video.addEventListener('ended', (event) => {
    video.classList.remove('active')
    videotl.resume()
});
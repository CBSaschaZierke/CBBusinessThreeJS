import './style.css'
import * as dat from 'dat.gui'
import * as THREE from 'three'
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js'
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader.js'
import { DRACOLoader } from 'three/examples/jsm/loaders/DRACOLoader.js'
import {gsap} from "gsap/gsap-core";

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


const textIncome = 'Income'
const textInProgess = 'In Progress'
const textClosed = 'Closed'

const textHealthCare = 'HEALTH CARE'
const textCommercial = 'COMMERCIAL'
const textResidential = 'RESIDENTIAL'

let textBundesland = 'Berlin'

let textHCIncVal = '3'
let textHCProVal = '2'
let textHCCloVal = '1'

let textCOIncVal = '7'
let textCOProVal = '6'
let textCOCloVal = '5'

let textREIncVal = '5'
let textREProVal = '4'
let textRECloVal = '3'


/**
 * Fonts
 */
const textMaterial = new THREE.MeshMatcapMaterial({ matcap: matCapTexture})
fontLoader.load('fonts/helvetiker_regular.typeface.json', (font) => {
    const textGeometry = new THREE.TextGeometry(textHealthCare, {
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
    textGeometry.text = 'test'
    text.position.set(-10, .55, 55) //.22
    scene.add(text)

    const textBundeslandHCGeometry = new THREE.TextGeometry(textBundesland, {
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
    const textBundeslandHC = new THREE.Mesh(textBundeslandHCGeometry, textMaterial)
    // textGeometry.computeBoundingBox()
    // textGeometry.translate(
    //     -(textGeometry.boundingBox.max.x -.02) * .5,
    //     (textGeometry.boundingBox.max.y - .5),
    //     -(textGeometry.boundingBox.max.z -.03) * .5
    // )
    textBundeslandHCGeometry.center()
    textBundeslandHC.position.set(-10, 0, 57) //.22
    textBundeslandHC.rotation.x = -Math.PI * .5
    scene.add(textBundeslandHC)

    const text2Geometry = new THREE.TextGeometry(textIncome, {
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
    text2.position.set(-15, 0, 60) //.22
    text2.rotation.x = -Math.PI * .5
    scene.add(text2)

    const textInGeometry = new THREE.TextGeometry(textHCIncVal, {
        font: font,
        size: .5,
        height: .1,
        curveSegments: 12,
        bevelEnabled: true,
        bevelThickness: .03,
        bevelSize: .02,
        bevelOffset: 0,
        bevelSegments: 5
    })
    const textIn = new THREE.Mesh(textInGeometry, textMaterial)
    // textGeometry.computeBoundingBox()
    // textGeometry.translate(
    //     -(textGeometry.boundingBox.max.x -.02) * .5,
    //     (textGeometry.boundingBox.max.y - .5),
    //     -(textGeometry.boundingBox.max.z -.03) * .5
    // )
    textInGeometry.center()
    textIn.position.set(-15, 0, 61) //.22
    textIn.rotation.x = -Math.PI * .5
    scene.add(textIn)

    const text3Geometry = new THREE.TextGeometry(textInProgess, {
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
    text3Geometry.center()
    text3.position.set(-10, 0, 60) //.22
    text3.rotation.x = -Math.PI * .5
    scene.add(text3)

    const textProGeometry = new THREE.TextGeometry(textHCProVal, {
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
    const textPro = new THREE.Mesh(textProGeometry, textMaterial)
    textProGeometry.center()
    textPro.position.set(-10, 0, 61) //.22
    textPro.rotation.x = -Math.PI * .5
    scene.add(textPro)

    const text4Geometry = new THREE.TextGeometry(textClosed, {
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
    text4Geometry.center()
    text4.position.set(-5, 0, 60) //.22
    text4.rotation.x = -Math.PI * .5
    scene.add(text4)

    const textcloGeometry = new THREE.TextGeometry(textHCCloVal, {
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
    const textclo = new THREE.Mesh(textcloGeometry, textMaterial)
    textcloGeometry.center()
    textclo.position.set(-5, 0, 61) //.22
    textclo.rotation.x = -Math.PI * .5
    scene.add(textclo)

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
    text5.position.set(-42, .55, 17) //.22
    text5.rotation.y = Math.PI * .5
    scene.add(text5)

    const textBundeslandComGeometry = new THREE.TextGeometry(textBundesland, {
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
    const textBundeslandCom = new THREE.Mesh(textBundeslandComGeometry, textMaterial)
    textBundeslandComGeometry.center()
    textBundeslandCom.position.set(-40, .22, 17) //.22
    textBundeslandCom.rotation.y = Math.PI * .5
    scene.add(textBundeslandCom)

    const textComInGeometry = new THREE.TextGeometry(textIncome, {
        font: font,
        size: .5,
        height: .2,
        curveSegments: 12,
        bevelEnabled: true,
        bevelThickness: .01,
        bevelSize: .01,
        bevelOffset: 0,
        bevelSegments: 5
    })
    const textComInc = new THREE.Mesh(textComInGeometry, textMaterial)
    textComInGeometry.center()
    textComInc.position.set(-45, 12.5, 16.5) //.22
    textComInc.rotation.x = Math.PI * .25
    textComInc.rotation.y = -Math.PI
    scene.add(textComInc)

    const textComInValGeometry = new THREE.TextGeometry(textCOIncVal, {
        font: font,
        size: .35,
        height: .1,
        curveSegments: 12,
        bevelEnabled: true,
        bevelThickness: .01,
        bevelSize: .01,
        bevelOffset: 0,
        bevelSegments: 5
    })
    const textComIncVal = new THREE.Mesh(textComInValGeometry, textMaterial)
    textComInValGeometry.center()
    textComIncVal.position.set(-45, 12.5, 15.5) //.22
    textComIncVal.rotation.x = Math.PI * .25
    textComIncVal.rotation.y = -Math.PI
    scene.add(textComIncVal)

    const textComProGeometry = new THREE.TextGeometry(textInProgess, {
        font: font,
        size: .5,
        height: .2,
        curveSegments: 12,
        bevelEnabled: true,
        bevelThickness: .01,
        bevelSize: .01,
        bevelOffset: 0,
        bevelSegments: 5
    })
    const textComPro = new THREE.Mesh(textComProGeometry, textMaterial)
    textComProGeometry.center()
    textComPro.position.set(-46, 13.3, 13) //.22
    textComPro.rotation.x = Math.PI * .25
    textComPro.rotation.y = -Math.PI
    scene.add(textComPro)

    const textComProValGeometry = new THREE.TextGeometry(textCOProVal, {
        font: font,
        size: .4,
        height: .1,
        curveSegments: 12,
        bevelEnabled: true,
        bevelThickness: .01,
        bevelSize: .01,
        bevelOffset: 0,
        bevelSegments: 5
    })
    const textComProVal = new THREE.Mesh(textComProValGeometry, textMaterial)
    textComProValGeometry.center()
    textComProVal.position.set(-45, 13.3, 12) //.22
    textComProVal.rotation.x = Math.PI * .25
    textComProVal.rotation.y = -Math.PI
    scene.add(textComProVal)

    const textComCloGeometry = new THREE.TextGeometry(textClosed, {
        font: font,
        size: .5,
        height: .01,
        curveSegments: 12,
        bevelEnabled: true,
        bevelThickness: .01,
        bevelSize: .01,
        bevelOffset: 0,
        bevelSegments: 5
    })
    const textComClo = new THREE.Mesh(textComCloGeometry, textMaterial)
    textComCloGeometry.center()
    textComClo.position.set(-44.5, 18.8, 8) //.22
    textComClo.rotation.x = Math.PI * .5
    textComClo.rotation.y = -Math.PI
    scene.add(textComClo)

    const textComCloValGeometry = new THREE.TextGeometry(textCOCloVal, {
        font: font,
        size: .4,
        height: .01,
        curveSegments: 12,
        bevelEnabled: true,
        bevelThickness: .01,
        bevelSize: .01,
        bevelOffset: 0,
        bevelSegments: 5
    })
    const textComCloVal = new THREE.Mesh(textComCloValGeometry, textMaterial)
    textComCloValGeometry.center()
    textComCloVal.position.set(-44.5, 18.8, 7) //.22
    textComCloVal.rotation.x = Math.PI * .5
    textComCloVal.rotation.y = -Math.PI
    scene.add(textComCloVal)

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
    textRes.position.set(-35, 0, -19.5) //.22
    textRes.rotation.x = Math.PI * .5
    textRes.rotation.y = Math.PI
    // textRes.rotation.z = Math.PI
    scene.add(textRes)

    const textBundeslandResGeometry = new THREE.TextGeometry(textBundesland, {
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
    const textBundeslandRes = new THREE.Mesh(textBundeslandResGeometry, textMaterial)
    textBundeslandResGeometry.center()
    textBundeslandRes.position.set(-35, 0, -8) //.22
    textBundeslandRes.rotation.x = Math.PI * .5
    textBundeslandRes.rotation.y = Math.PI
    // textRes.rotation.z = Math.PI
    scene.add(textBundeslandRes)

    const textResIncGeometry = new THREE.TextGeometry(textIncome, {
        font: font,
        size: .5,
        height: .01,
        curveSegments: 12,
        bevelEnabled: true,
        bevelThickness: .01,
        bevelSize: .01,
        bevelOffset: 0,
        bevelSegments: 5
    })
    const textResInc = new THREE.Mesh(textResIncGeometry, textMaterial)
    textResIncGeometry.center()
    textResInc.position.set(-39.9, 10, -16) //.22
    // textResInc.rotation.x = -Math.PI
    textResInc.rotation.y = -Math.PI * 0.5
    scene.add(textResInc)

    const textResIncValGeometry = new THREE.TextGeometry(textREIncVal, {
        font: font,
        size: .4,
        height: .01,
        curveSegments: 12,
        bevelEnabled: true,
        bevelThickness: .01,
        bevelSize: .01,
        bevelOffset: 0,
        bevelSegments: 5
    })
    const textResIncVal = new THREE.Mesh(textResIncValGeometry, textMaterial)
    textResIncValGeometry.center()
    textResIncVal.position.set(-39.9, 9, -16) //.22
    // textResIncVal.rotation.x = - Math.PI
    textResIncVal.rotation.y = -Math.PI * 0.5
    scene.add(textResIncVal)

    const textResProGeometry = new THREE.TextGeometry(textInProgess, {
        font: font,
        size: .5,
        height: .01,
        curveSegments: 12,
        bevelEnabled: true,
        bevelThickness: .01,
        bevelSize: .01,
        bevelOffset: 0,
        bevelSegments: 5
    })
    const textResPro = new THREE.Mesh(textResProGeometry, textMaterial)
    textResProGeometry.center()
    textResPro.position.set(-39.9, 10, -10) //.22
    // textResInc.rotation.x = -Math.PI
    textResPro.rotation.y = -Math.PI * 0.5
    scene.add(textResPro)

    const textResProValGeometry = new THREE.TextGeometry(textREProVal, {
        font: font,
        size: .4,
        height: .01,
        curveSegments: 12,
        bevelEnabled: true,
        bevelThickness: .01,
        bevelSize: .01,
        bevelOffset: 0,
        bevelSegments: 5
    })
    const textResProVal = new THREE.Mesh(textResProValGeometry, textMaterial)
    textResProValGeometry.center()
    textResProVal.position.set(-39.8, 9, -10) //.22
    // textResIncVal.rotation.x = - Math.PI
    textResProVal.rotation.y = -Math.PI * 0.5
    scene.add(textResProVal)

    const textResCloGeometry = new THREE.TextGeometry(textClosed, {
        font: font,
        size: .5,
        height: .01,
        curveSegments: 12,
        bevelEnabled: true,
        bevelThickness: .01,
        bevelSize: .01,
        bevelOffset: 0,
        bevelSegments: 5
    })
    const textResClo = new THREE.Mesh(textResCloGeometry, textMaterial)
    textResCloGeometry.center()
    textResClo.position.set(-39.7, 9, -4) //.22
    // textResInc.rotation.x = -Math.PI
    textResClo.rotation.y = -Math.PI * 0.5
    scene.add(textResClo)

    const textResCloValGeometry = new THREE.TextGeometry(textRECloVal, {
        font: font,
        size: .4,
        height: .01,
        curveSegments: 12,
        bevelEnabled: true,
        bevelThickness: .01,
        bevelSize: .01,
        bevelOffset: 0,
        bevelSegments: 5
    })
    const textResCloVal = new THREE.Mesh(textResCloValGeometry, textMaterial)
    textResCloValGeometry.center()
    textResCloVal.position.set(-39.6, 8, -4) //.22
    // textResIncVal.rotation.x = - Math.PI
    textResCloVal.rotation.y = -Math.PI * 0.5
    scene.add(textResCloVal)
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
camera.position.x = -11
camera.position.y = 4
camera.position.z = -10
scene.add(camera)

// Controls
const controls = new OrbitControls(camera, canvas)
controls.enableDamping = true

controls.target = new THREE.Vector3(-11,4,-12)

let animArray = []

let anim1 = gsap.to( camera.position, {
    duration: 5,
    x: -11,
    y: 2,
    z: -7,
    onStart: () => {
        gsap.to( controls.target, {
            duration: 10,
            x: -15,
            y: 2,
            z: -7,
        })
    }
})
anim1.pause()
animArray.push(anim1)

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
    onComplete: () => {
        gsap.to(camera.position, {
            duration: 3,
            x: -12,
            y: 1,
            z: 0,
        })
    }
})
anim3.pause()
animArray.push(anim3)

let anim4 = gsap.to( controls.target, {
    // delay: 23,
    duration: 5,
    x: -40,
    y: 1,
    z: 0,
    onComplete: () => {
        gsap.to(camera.position, {
            duration: 5,
            x: -20,
            y: 1,
            z: 0,
        })
    }
})
anim4.pause()
animArray.push(anim4)

let anim5 = gsap.to( controls.target, {
    // delay: 31,
    duration: 5,
    x: -20,
    y: 1,
    z: 40,
    onComplete: () => {
        gsap.to(camera.position, {
            duration: 5,
            x: -20,
            y: 1,
            z: 36,
        })
    }
})
anim5.pause()
animArray.push(anim5)

let anim6 = gsap.to( controls.target, {
    // delay: 40,
    duration: 5,
    x: -40,
    y: 1,
    z: 36,
    onComplete: () => {
        gsap.to(camera.position, {
            duration: 5,
            x: -32,
            y: 1,
            z: 36,
        })
    }
})
anim6.pause()
animArray.push(anim6)

let anim7 = gsap.to( controls.target, {
    // delay: 49,
    duration: 5,
    x: -32,
    y: 1,
    z: 66,
    onComplete: () => {
        gsap.to(camera.position, {
            duration: 5,
            x: -32,
            y: 1,
            z: 56,
        })
    }
})
anim7.pause()
animArray.push(anim7)

let anim8 = gsap.to( controls.target, {
    // delay: 58,
    duration: 5,
    x: -10,
    y: 1,
    z: 55,
    onComplete: () => {
        gsap.to(camera.position, {
            duration: 5,
            x: -10,
            y: 2,
            z: 70,
        })
    }
})
anim8.pause()
animArray.push(anim8)

let anim9 = gsap.to( controls.target, {
    // delay: 67,
    duration: 10,
    x: -10,
    y: 1,
    z: 60,
    onStart: () => {
        gsap.to(camera.position, {
            duration: 10,
            x: -10,
            y: 15,
            z: 70,
        })
    }
})
anim9.pause()
animArray.push(anim9)

let anim10 = gsap.to( controls.target, {
    // delay: 78,
    duration: 10,
    x: -20,
    y: 1,
    z: 36,
    onStart: () => {
        gsap.to(camera.position, {
            duration: 10,
            x: 5,
            y: 1,
            z: 36,
        })
    }
})
anim10.pause()
animArray.push(anim10)

let anim11 = gsap.to( controls.target, {
    // delay: 87,
    duration: 10,
    x: -100,
    y: 1,
    z: 36,
    onStart: () => {
        gsap.to(camera.position, {
            duration: 10,
            x: -51.5,
            y: 1,
            z: 36,
        })
    }
})
anim11.pause()
animArray.push(anim11)

let anim12 = gsap.to( controls.target, {
    // delay: 96,
    duration: 5,
    x: -51.5,
    y: 1,
    z: -80,
    onComplete: () => {
        gsap.to(camera.position, {
            duration: 5,
            x: -51.5,
            y: 1,
            z: 0,
        })
    }
})
anim12.pause()
animArray.push(anim12)

let anim13 = gsap.to( controls.target, {
    // delay: 105,
    duration: 5,
    x: -100,
    y: 1,
    z: 0,
    onComplete: () => {
        gsap.to(camera.position, {
            duration: 5,
            x: -71.5,
            y: 1,
            z: 0,
        })
    }
})
anim13.pause()
animArray.push(anim13)

let anim14 = gsap.to( controls.target, {
    // delay: 114,
    duration: 5,
    x: -71.5,
    y: 1,
    z: 100,
    onComplete: () => {
        gsap.to(camera.position, {
            duration: 5,
            x: -71.5,
            y: 1,
            z: 20,
        })
    }
})
anim14.pause()
animArray.push(anim14)

let anim15 = gsap.to( controls.target, {
    // delay: 124,
    duration:5,
    x: -42,
    y: 1,
    z: 17,
    onComplete: () => {
        gsap.to(camera.position, {
            duration: 5,
            x: -36,
            y: 1,
            z: 17,
        })
    }
})
anim15.pause()
animArray.push(anim15)

let anim16 = gsap.to( controls.target, {
    // delay: 136,
    duration: 5,
    x: -45,
    y: 15,
    z: 10,
    onStart: () => {
        gsap.to(camera.position, {
            duration: 5,
            x: -45,
            y: 25,
            z: 3,
            onComplete: () =>{
                gsap.to(camera.position, {
                    duration:2,
                    x: -45,
                    y: 25,
                    z: 5,
                })
            }
        })
    }
})
anim16.pause()
animArray.push(anim16)

let anim17 = gsap.to( controls.target, {
    // delay: 150,
    duration: 5,
    x: 0,
    y: 1,
    z: 0,
    onStart: () => {
        gsap.to(camera.position, {
            duration: 5,
            x: -45,
            y: 25,
            z: 0,
            onComplete: () =>{
                gsap.to(camera.position, {
                    duration:2,
                    x: -45,
                    y: 1,
                    z: 0,
                })
            }
        })
    }
})
anim17.pause()
animArray.push(anim17)

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

let anim20_pos = gsap.to( camera.position, {
    // delay: 176,
    duration:5,
    x: -35,
    y: 10,
    z: -21,
})
anim20_pos.pause()
animArray.push(anim20_pos)

let anim21 = gsap.to( controls.target, {
    // delay: 180,
    duration: 5,
    x: -35,
    y: 1,
    z: -9.9,
})
anim21.pause()
animArray.push(anim21)

let anim21_pos = gsap.to( camera.position, {
    // delay: 180,
    duration:5,
    x: -35,
    y: 15,
    z: -10,
    onComplete: () => {
        gsap.to(camera.position, {
            duration: 5,
            x: -50,
            y: 17,
            z: -10,
        })
    }
})
anim21_pos.pause()
animArray.push(anim21_pos)

let anim22_pos = gsap.to( camera.position, {
    // delay: 176,
    duration:5,
    x: -11,
    y: 4,
    z: -10,
    onStart: () => {
        gsap.to(controls.target,{
            duration: 5,
            x: -11,
            y: 4,
            z: -12,
        })
    }
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

const vidraycaster = new THREE.Raycaster()

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

const videos = [
    {
        position: new THREE.Vector3(-15,2.15,-6.2),
        element: document.querySelector('.video-1')
    }
]
// const light = new THREE.AmbientLight(0xFFF7A0)
// scene.add(light)

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

    // for(const point of points){
    //     const screenPosition = point.position.clone()
    //     screenPosition.project(camera)
    //
    //     const translateX = screenPosition.x * sizes.width *.5
    //     const translateY = -screenPosition.y * sizes.height *.5
    //     point.element.style.transform = `translateX(${translateX}px) translateY(${translateY}px)`
    // }

    // Go through each point
    for(const point of videos)
    {
        // Get 2D screen position
        const screenPosition = point.position.clone()
        screenPosition.project(camera)

        // // Set the raycaster
        vidraycaster.setFromCamera(screenPosition, camera)
        const intersects = vidraycaster.intersectObjects(scene.children, true)

        // if(intersects.length === 0)
        // {
        //     // Show
        //     point.element.classList.add('visible')
        // }
        //
        // // Intersect found
        // else
        // {
        //     // Get the distance of the intersection and the distance of the point
        //     const intersectionDistance = intersects[0].distance
        //     const pointDistance = point.position.distanceTo(camera.position)
        //
        //     // Intersection is close than the point
        //     if(intersectionDistance === 0)
        //     {
        //         // Hide
        //         point.element.classList.add('visible')
        //     }
        //     // Intersection is further than the point
        //     else
        //     {
        //         const intersectDistance = intersects[0].distance
        //         const vidDistance = point.position.distanceTo(camera.position)
        //
        //         if(intersectionDistance < pointDistance){
        //             point.element.classList.remove('visible')
        //         }else {
        //             point.element.classList.add('visible')
        //         }
        //
        //     }
        // }

        const translateX = screenPosition.x * sizes.width * .5
        const translateY = - screenPosition.y * sizes.height * .5
        point.element.style.transform = `translate(${translateX}px, ${translateY}px)`
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

let cameraAnimIndex = 0
let timeout
function cameraAnimation(){
    if(cameraAnimIndex >= animArray.length){
        cameraAnimIndex = 0
    }
    for(let i=0; i<animArray.length;i++){
        animArray[i].pause()
    }
    if(cameraAnimIndex === 0){
        videos[0].element.classList.add('visible')
    }else{
        videos[0].element.classList.remove('visible')
    }
    animArray[cameraAnimIndex].restart()
    getTimeout(cameraAnimIndex)
    cameraAnimIndex++
    setTimeout(cameraAnimation, 10000)
}
cameraAnimation()

function getTimeout(test){
    if(animArray[test].vars.onComplete){
        // animArray[test].vars.duration + animArray[test].vars.onComplete.duration
        console.log(animArray[test].vars.duration)
    }

    if(animArray[test].vars.onStart){
        // animArray[test].vars.duration + animArray[test].vars.onStart.duration
        // console.log(animArray[test].vars.duration)
        console.log(animArray[test].totalDuration())
    }
}
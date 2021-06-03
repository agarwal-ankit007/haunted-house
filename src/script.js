import './style.css'
import * as THREE from 'three'
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js'


/*
textures
*/


const textureLoader = new THREE.TextureLoader()

const doorColorTexture = textureLoader.load('./textures/door/color.jpg')
const doorAlphaTexture = textureLoader.load('./textures/door/alpha.jpg')
const doorAmbientOcclusionTexture = textureLoader.load('./textures/door/ambientOcclusion.jpg')
const doorHeightTexture = textureLoader.load('./textures/door/height.jpg')
const doorNormalTexture = textureLoader.load('./textures/door/normal.jpg')
const doorMetalnessTexture = textureLoader.load('./textures/door/metalness.jpg')
const doorRoughnessTexture = textureLoader.load('./textures/door/roughness.jpg')


const bricksColorTexture = textureLoader.load('./textures/bricks/color.jpg')
const bricksAmbientOcclusionTexture = textureLoader.load('./textures/bricks/ambientOcclusion.jpg')
const bricksNormalTexture = textureLoader.load('./textures/bricks/normal.jpg')
const bricksRoughnessTexture = textureLoader.load('./textures/bricks/roughness.jpg')


const grassColorTexture = textureLoader.load('./textures/grass/color.jpg')
const grassAmbientOcclusionTexture = textureLoader.load('./textures/grass/ambientOcclusion.jpg')
const grassNormalTexture = textureLoader.load('./textures/grass/normal.jpg')
const grassRoughnessTexture = textureLoader.load('./textures/grass/roughness.jpg')

grassColorTexture.repeat.set(8, 8)
grassAmbientOcclusionTexture.repeat.set(8, 8)
grassNormalTexture.repeat.set(8, 8)
grassRoughnessTexture.repeat.set(8, 8)

grassColorTexture.wrapS = THREE.RepeatWrapping
grassAmbientOcclusionTexture.wrapS = THREE.RepeatWrapping
grassNormalTexture.wrapS = THREE.RepeatWrapping
grassRoughnessTexture.wrapS = THREE.RepeatWrapping

grassColorTexture.wrapT = THREE.RepeatWrapping
grassAmbientOcclusionTexture.wrapT = THREE.RepeatWrapping
grassNormalTexture.wrapT = THREE.RepeatWrapping
grassRoughnessTexture.wrapT = THREE.RepeatWrapping


//to create the scene
const scene = new THREE.Scene()

const material = new THREE.MeshStandardMaterial()
material.metalness = 0
material.roughness = 0.7


//fog
const fog = new THREE.Fog(0x262837, 1, 15)
scene.fog = fog


//house

//group
const house = new THREE.Group()
scene.add(house)


//walls
const walls = new THREE.Mesh(
    new THREE.BoxBufferGeometry(4, 2.5, 4),
    new THREE.MeshStandardMaterial({
        map: bricksColorTexture,
        aoMap: bricksAmbientOcclusionTexture,
        normalMap: bricksNormalTexture,
        roughnessMap: bricksRoughnessTexture
    })
)
//for aoMap to work
walls.geometry.setAttribute('uv2', new THREE.Float32BufferAttribute(walls.geometry.attributes.uv.array, 2))

walls.position.y = 2.5 / 2
house.add(walls)

//we can add the roof using pyramid
//roof
const roof = new THREE.Mesh(
    new THREE.ConeBufferGeometry(3.5, 1, 4),
    new THREE.MeshStandardMaterial({ color: '#b35f45' })
)
roof.position.y = 2.5 + 0.5
roof.rotation.y = Math.PI * 0.25
house.add(roof)

//door
const door = new THREE.Mesh(
    new THREE.PlaneBufferGeometry(2.2, 2.2, 100, 100),
    new THREE.MeshStandardMaterial({
        map: doorColorTexture,
        transparent: true,
        alphaMap: doorAlphaTexture,
        aoMap: doorAmbientOcclusionTexture,
        displacementMap: doorHeightTexture,
        displacementScale: 0.1,
        normalMap: doorNormalTexture,
        metalnessMap: doorMetalnessTexture,
        roughnessMap: doorRoughnessTexture
    })
)
//for aoMap to work
door.geometry.setAttribute('uv2', new THREE.Float32BufferAttribute(door.geometry.attributes.uv.array, 2))

door.position.y = 1
door.position.z = 2 + 0.01
house.add(door)

//bushes
const bushGeometry = new THREE.SphereBufferGeometry(1, 16, 16)
const bushMaterial = new THREE.MeshStandardMaterial({ color: '#89c854' })

const bush1 = new THREE.Mesh(bushGeometry, bushMaterial)
bush1.scale.set(0.5, 0.5, 0.5)
bush1.position.set(0.8, 0.2, 2.2)

const bush2 = new THREE.Mesh(bushGeometry, bushMaterial)
bush2.scale.set(0.25, 0.25, 0.25)
bush2.position.set(1.4, 0.1, 2.1)

const bush3 = new THREE.Mesh(bushGeometry, bushMaterial)
bush3.scale.set(0.4, 0.4, 0.4)
bush3.position.set(-0.8, 0.1, 2.2)

const bush4 = new THREE.Mesh(bushGeometry, bushMaterial)
bush4.scale.set(0.15, 0.15, 0.15)
bush4.position.set(-1, 0.05, 2.6)

house.add(bush1, bush2, bush3, bush4)

//Graves group

const graves = new THREE.Group()
scene.add(graves)

const graveGeometry = new THREE.BoxBufferGeometry(0.6, 0.8, 0.2)
const graveMaterial = new THREE.MeshStandardMaterial({ color: '#b2b6b1' })

for (let i = 0; i < 50; i++) {
    const angle = Math.random() * Math.PI * 2
    const radius = 3 + Math.random() * 6
    const x = Math.sin(angle) * radius
    const z = Math.cos(angle) * radius

    const grave = new THREE.Mesh(graveGeometry, graveMaterial)
    grave.position.set(x, 0.3, z)
    grave.rotation.y = (Math.random() - 0.5) * 0.4
    grave.rotation.z = (Math.random() - 0.5) * 0.4
    grave.castShadow = true
    graves.add(grave)
}

const floorGeometry = new THREE.PlaneBufferGeometry(20, 20)

const floor = new THREE.Mesh(
    floorGeometry,
    new THREE.MeshStandardMaterial({
        map: grassColorTexture,
        aoMap: grassAmbientOcclusionTexture,
        normalMap: grassNormalTexture,
        roughnessMap: grassNormalTexture
    })
)
//for aoMap to work
floor.geometry.setAttribute('uv2', new THREE.Float32BufferAttribute(floor.geometry.attributes.uv.array, 2))


floor.rotation.x = -(Math.PI * 0.5)
floor.position.y = 0


//scene.add(cube, sphere, torus, plane)
scene.add(floor)


/**
 * lights
 */

//ambient light
const ambientLight = new THREE.AmbientLight(0xb9d5ff, 0.12)
scene.add(ambientLight)



//Moon light
const moonLight = new THREE.DirectionalLight(0xb9d5ff, 0.12)
moonLight.position.set(2, 2, -1)
scene.add(moonLight)




//doorLight
const doorLight = new THREE.PointLight(0xff7d46, 1, 7)
doorLight.position.set(0, 2.2, 2.7)
house.add(doorLight)


//Ghosts

const ghost1 = new THREE.PointLight(0xff00ff, 2, 3)
scene.add(ghost1)

const ghost2 = new THREE.PointLight(0x00ffff, 2, 3)
scene.add(ghost2)

const ghost3 = new THREE.PointLight(0xffff00, 2, 3)
scene.add(ghost3)
//sizes
const sizes = {
    width: window.innerWidth,
    height: window.innerHeight
}

//handle resize
window.addEventListener('resize', () => {
    //console.log('resize')
    //update sizes
    sizes.width = window.innerWidth
    sizes.height = window.innerHeight

    //update camera aspect ratio
    camera.aspect = sizes.width / sizes.height

    //when changing properties like aspect, we need to call the camera.updateProjectionMatrix()
    camera.updateProjectionMatrix()

    //update renderer
    renderer.setSize(sizes.width, sizes.height)

    //set pixelRatio
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2))

})

//handle fullscreen
window.addEventListener('dblclick', () => {
    // console.log('double clicked')
    const fullscreenElement = document.fullscreenElement || document.webkitFullscreenElement
    if (!fullscreenElement) {
        // console.log('go fullscreen');
        if (canvas.requestFullscreen) {
            canvas.requestFullscreen()
        }
        else if (canvas.webkitRequestFullscreen) {
            canvas.webkitRequestFullscreen()
        }
    }
    else {
        // console.log('leave fullscreen');
        if (document.exitFullscreen) {
            document.exitFullscreen()
        }
        else if (document.webkitExitFullscreen) {
            document.webkitExitFullscreen()
        }
    }

})


const camera = new THREE.PerspectiveCamera(75, sizes.width / sizes.height, 0.1, 100)


//adjusting the camera
camera.position.z = 8
camera.position.y = 5

//camera.lookAt(house.position)

//add camera to the scene
scene.add(camera)

const canvas = document.querySelector('.webgl')

const controls = new OrbitControls(camera, canvas)

controls.enabled = true
controls.enableDamping = true


//renderer
//renders the scene on the canvas, <canvas> is an html element where you can draw

const renderer = new THREE.WebGLRenderer({
    canvas: canvas
})

//update the size of the renderer
renderer.setSize(sizes.width, sizes.height)
//set pixelRatio
renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2))

renderer.setClearColor(0x262837)

//set shadowmap to true 
renderer.shadowMap.enabled = true
renderer.shadowMap.type = THREE.PCFSoftShadowMap

moonLight.castShadow = true
doorLight.castShadow = true
ghost1.castShadow = true
ghost2.castShadow = true
ghost3.castShadow = true

walls.castShadow = true
bush1.castShadow = true
bush2.castShadow = true
bush3.castShadow = true
bush4.castShadow = true

floor.receiveShadow = true

doorLight.shadow.mapSize.width = 256
doorLight.shadow.mapSize.height = 256
doorLight.shadow.camera.far = 7

ghost1.shadow.mapSize.width = 256
ghost1.shadow.mapSize.height = 256
ghost1.shadow.camera.far = 7

ghost2.shadow.mapSize.width = 256
ghost2.shadow.mapSize.height = 256
ghost2.shadow.camera.far = 7

ghost3.shadow.mapSize.width = 256
ghost3.shadow.mapSize.height = 256
ghost3.shadow.camera.far = 7


//clock
let clock = new THREE.Clock()

const tick = () => {

    //clock
    const elapsedTime = clock.getElapsedTime()

    //update ghosts
    const ghost1Angle = elapsedTime * 0.5
    ghost1.position.x = Math.cos(ghost1Angle) * 4
    ghost1.position.z = Math.sin(ghost1Angle) * 4
    ghost1.position.y = Math.sin(elapsedTime * 3)

    const ghost2Angle = -elapsedTime * 0.32
    ghost2.position.x = Math.cos(ghost2Angle) * 5
    ghost2.position.z = Math.sin(ghost2Angle) * 5
    ghost2.position.y = Math.sin(elapsedTime * 4) + Math.sin(elapsedTime * 2.5)

    const ghost3Angle = -elapsedTime * 0.18
    ghost3.position.x = Math.cos(ghost3Angle) * (7 + Math.sin(elapsedTime * 0.32))
    ghost3.position.z = Math.sin(ghost3Angle) * (7 + Math.sin(elapsedTime * 0.5))
    ghost3.position.y = Math.sin(elapsedTime * 5) + Math.sin(elapsedTime * 2)

    //update controls
    controls.update()

    //renderer
    renderer.render(scene, camera)
    //to call on each frame
    window.requestAnimationFrame(tick)
}

tick()
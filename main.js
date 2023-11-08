import './style.css'

import * as THREE from 'three'
import { OrbitControls } from 'three/addons/controls/OrbitControls.js'
import { VRButton } from 'three/addons/webxr/VRButton.js'
import { XRAvatarModelFactory } from './src/XRAvatarModelFactory'

const HAND_TYPES = [
  'WEBXR',
  'BABYLON',
  'VRM',
  'RPM'
]

let container
let camera, scene, renderer
let hand1, hand2
let controller1, controller2

let controls

init()

async function init() {

  container = document.createElement( 'div' )
  document.body.appendChild( container )

  scene = new THREE.Scene()
  window.scene = scene
  scene.background = new THREE.Color( 0x444444 )

  camera = new THREE.PerspectiveCamera( 50, window.innerWidth / window.innerHeight, 0.1, 10 )
  camera.position.set( 0, 1.6, 3 )

  controls = new OrbitControls( camera, container )
  controls.target.set( 0, 1.6, 0 )
  controls.update()

  const floorGeometry = new THREE.PlaneGeometry( 4, 4 )
  const floorMaterial = new THREE.MeshStandardMaterial( { color: 0x666666 } )
  const floor = new THREE.Mesh( floorGeometry, floorMaterial )
  floor.rotation.x = - Math.PI / 2
  floor.receiveShadow = true
  scene.add( floor )

  scene.add( new THREE.HemisphereLight( 0xbcbcbc, 0xa5a5a5, 3 ) )

  const light = new THREE.DirectionalLight( 0xffffff, 3 )
  light.position.set( 0, 6, 0 )
  light.castShadow = true
  light.shadow.camera.top = 2
  light.shadow.camera.bottom = -2
  light.shadow.camera.right = 2
  light.shadow.camera.left = -2
  light.shadow.mapSize.set( 4096, 4096 )
  scene.add( light )

  //

  renderer = new THREE.WebGLRenderer( { antialias: true } )
  renderer.setPixelRatio( window.devicePixelRatio )
  renderer.setSize( window.innerWidth, window.innerHeight )
  renderer.shadowMap.enabled = true
  renderer.xr.enabled = true

  container.appendChild( renderer.domElement )

  document.body.appendChild( VRButton.createButton( renderer ) )

  // controllers
  controller1 = renderer.xr.getController( 0 )
  scene.add( controller1 )

  controller2 = renderer.xr.getController( 1 )
  scene.add( controller2 )

  const handAvatarFactory = new XRAvatarModelFactory()

  // Hand 1

  hand1 = renderer.xr.getHand( 0 )
  window.hand = hand1
  hand1.userData.currentHandModel = 0

  hand2 = renderer.xr.getHand( 1 )
  hand2.userData.currentHandModel = 0
  
  const avatarModels = HAND_TYPES.map( (type) => {
    const avatarModel = handAvatarFactory.createAvatarModel( hand1, hand2, type )
    scene.add(avatarModel)
    return avatarModel
  })
  console.log(avatarModels)

  for ( let i = 0; i < avatarModels.length; i ++ ) {

    const model = avatarModels[ i ]
    model.visible = i === 0

  }

  hand1.addEventListener( 'pinchend', function () {

    avatarModels[ this.userData.currentHandModel ].visible = false
    this.userData.currentHandModel = ( this.userData.currentHandModel + 1 ) % avatarModels.length
    hand2.userData.currentHandModel = this.userData.currentHandModel
    avatarModels[ this.userData.currentHandModel ].visible = true

  } )

  hand2.addEventListener( 'pinchend', function () {

    avatarModels[ this.userData.currentHandModel ].visible = false
    this.userData.currentHandModel = ( this.userData.currentHandModel + 1 ) % avatarModels.length
    hand1.userData.currentHandModel = this.userData.currentHandModel
    avatarModels[ this.userData.currentHandModel ].visible = true

  } )

  //

  const geometry = new THREE.BufferGeometry().setFromPoints( [ new THREE.Vector3( 0, 0, 0 ), new THREE.Vector3( 0, 0, - 1 ) ] )

  const line = new THREE.Line( geometry )
  line.name = 'line'
  line.scale.z = 5

  controller1.add( line.clone() )
  controller2.add( line.clone() )
  
  //

  window.addEventListener( 'resize', onWindowResize )
  animate()
}

function onWindowResize() {

  camera.aspect = window.innerWidth / window.innerHeight
  camera.updateProjectionMatrix()

  renderer.setSize( window.innerWidth, window.innerHeight )

}
//

function animate() {
  renderer.setAnimationLoop( render )
}

function render() {
  renderer.render( scene, camera )
}


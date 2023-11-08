import { GLTFLoader } from 'three/addons/loaders/GLTFLoader.js'
import { DRACOLoader } from 'three/addons/loaders/DRACOLoader.js'
import { VRMLoaderPlugin } from '@pixiv/three-vrm'

const DEFAULT_HAND_PROFILE_PATH = 'https://cdn.jsdelivr.net/npm/@webxr-input-profiles/assets@1.0/dist/profiles/generic-hand/'

const loaderGLTF = new GLTFLoader()
const dracoLoader = new DRACOLoader()
dracoLoader.setDecoderPath( '/draco/' )
loaderGLTF.setDRACOLoader( dracoLoader )

export function loadRPMAsync ( path = 'rpm.glb' ) {
  return new Promise ( ( resolve, reject ) => {
    loaderGLTF.load( path, ( gltf ) => {
      const avatar = gltf.scene.children[0]
      const avatarHeadParts = [
        'EyeLeft',
        'EyeRight',
        'Wolf3D_Head',
        'Wolf3D_Hair',
        'Wolf3D_Teeth',
        'Wolf3D_Headwear',
        'Wolf3D_Beard',
        'Wolf3D_Glasses',
        'Wolf3D_Outfit_Top'
      ]

      for (const part of avatarHeadParts) {
        const partMesh = avatar.getObjectByName(part)
        if (partMesh) {
          partMesh.visible = false
        }
      }
      avatar.rotation.y = Math.PI
      avatar.avatarType = 'RPM'

      resolve( avatar )
    }, null, reject )
  } )
}

export function loadVRMAsync ( path = '100avatars.vrm' ) {
  return new Promise ( ( resolve, reject ) => {
    loaderGLTF.register( (parser) => {
      return new VRMLoaderPlugin(parser)
    })
    loaderGLTF.load( path, ( gltf ) => {
      const avatar = gltf.userData.vrm.scene
      avatar.avatarType = 'VRM'
      console.log('vrm', avatar)

      resolve( avatar )
    }, null, reject )
  } )

}

export function loadHandsAsync ( handedness, path = DEFAULT_HAND_PROFILE_PATH ) {
  return new Promise ( (resolve, reject) => {
    loaderGLTF.setPath( path )
    loaderGLTF.load( `${handedness}.glb`, ( gltf ) => {
      const hand = gltf.scene
      hand.avatarType = path.includes('webxr-input-profiles') ? 'WEBXR' : 'BABYLON'
      resolve( hand )
    }, null, reject )
  })

}
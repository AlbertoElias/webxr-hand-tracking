import { Quaternion } from 'three';

import { getHandMapping, WebXRHandJointNames } from './hand-mappings.js';

let lol = false

class XRHandMeshModel {

	constructor( handModel, handedness, avatarType, handObject ) {

		this.handModel = handModel;

		this.bones = [];

    this.prepareJoints(handObject, getHandMapping(handedness, avatarType))

	}

  prepareJoints (handObject, joints) {
    const mesh = handObject.getObjectByProperty( 'type', 'SkinnedMesh' );
    mesh.frustumCulled = false;
    mesh.castShadow = true;
    mesh.receiveShadow = true;

    joints.forEach( (jointName, index) => {

      const bone = handObject.getObjectByName( jointName );

      if ( bone !== undefined ) {

        bone.jointName = WebXRHandJointNames[ index ];

      } else {

        console.warn( `Couldn't find ${jointName} in ${handObject.name} hand mesh` );

      }

      this.bones.push( bone );

    } );
  }

	updateMesh() {

		// XR Joints
		const XRJoints = this.handModel.controller.joints;

		for ( let i = 0; i < this.bones.length; i ++ ) {

			const bone = this.bones[ i ];

			if ( bone ) {

				const XRJoint = XRJoints[ bone.jointName ];
        if (!lol && bone.jointName === 'index-finger-phalanx-distal') {
          const joint = XRJoints[ bone.jointName ]
          console.log(joint)
          console.log(joint.quaternion)
          console.log(joint.getWorldQuaternion(new Quaternion()))
          lol = true
        }

				if ( bone.visible ) {
					const position = bone.parent.worldToLocal(XRJoint.position);
					bone.position.copy( position );
          const boneQuaternionInverse = bone.parent.quaternion.clone().invert()
					// bone.quaternion.multiplyQuaternions( boneQuaternionInverse, XRJoint.quaternion );
          // bone.quaternion.premultiply(XRJoint.quaternion.clone().invert())
          bone.rotation.copy(XRJoint.rotation)
					// bone.scale.setScalar( XRJoint.jointRadius || defaultRadius );
				}

			}

		}

	}

}

export { XRHandMeshModel };
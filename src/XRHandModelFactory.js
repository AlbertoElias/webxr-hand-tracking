import {
	Object3D
} from 'three'

import {
	XRHandMeshModel
} from './XRHandMeshModel.js'

class XRHandModel extends Object3D {

	constructor( controller ) {

		super()

		this.controller = controller
		this.motionController = null
		this.envMap = null

	}

	updateMatrixWorld( force ) {

		super.updateMatrixWorld( force )

		if ( this.motionController ) {

			this.motionController.updateMesh()

		}

	}

}

class XRHandModelFactory {

	createHandModel( controller, type, avatarModel ) {

		const handModel = new XRHandModel( controller )

		controller.addEventListener( 'connected', ( event ) => {

			const xrInputSource = event.data

			if ( xrInputSource.hand && !handModel.motionController ) {

				handModel.xrInputSource = xrInputSource
				const handedness = xrInputSource.handedness

				switch (type ) {
					case 'RPM':
						handModel.motionController = new XRHandMeshModel( handModel, handedness, type, avatarModel[`${handedness}HandObject`] )
						break
					case 'VRM':
						handModel.motionController = new XRHandMeshModel( handModel, handedness, type, avatarModel[`${handedness}HandObject`] )
						break
					case 'BABYLON':
						handModel.motionController = new XRHandMeshModel( handModel, handedness, type, avatarModel[`${handedness}HandObject`] )
						break
					case 'WEBXR':
						handModel.motionController = new XRHandMeshModel( handModel, handedness, type, avatarModel[`${handedness}HandObject`] )
						break
				}
			}

			controller.visible = true

		} )

		controller.addEventListener( 'disconnected', () => {

			controller.visible = false
			handModel.motionController = null
			// handModel.remove( scene )
			// scene = null

		} )

		return handModel

	}

}

export { XRHandModelFactory }
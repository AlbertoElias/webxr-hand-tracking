import {
	Object3D
} from 'three';

import {
	XRHandModelFactory
} from './XRHandModelFactory.js';
import { loadRPMAsync, loadHandsAsync } from './loaders.js';

class XRAvatarModel extends Object3D {

	constructor( handController1, handController2, type ) {

		super();

		this.avatarType = type
		this.controllers = [ handController1, handController2 ];
		this.leftHandObject = null
		this.rightHandObject = null
		this.envMap = null;

	}

	setHandObjects ( leftHandObject, rightHandObject ) {
		this.leftHandObject = leftHandObject
		this.rightHandObject = rightHandObject
		this.add(leftHandObject)
		if (leftHandObject !== rightHandObject) {
			this.add(rightHandObject)
		}
	}

	setHandModels ( leftHandModel, rightHandModel ) {
		this.handModels = [ leftHandModel, rightHandModel ]
		this.handModels.forEach( (handModel) => this.add(handModel) )
	}

	setType( type ) {
		this.avatarType = type
	}

	updateMatrixWorld( force ) {

		super.updateMatrixWorld( force );

		if ( this.motionController ) {

			this.motionController.updateMesh();

		}

	}

}

class XRAvatarModelFactory {

	createAvatarModel( handController1, handController2, type ) {

		const avatarModel = new XRAvatarModel( handController1, handController2, type );
		const handModelFactory = new XRHandModelFactory();

		switch (type ) {
			case 'RPM':
				loadRPMAsync().then(object => {
          avatarModel.setHandObjects( object, object )
					avatarModel.setHandModels(
						handModelFactory.createHandModel( handController1, type, avatarModel ),
						handModelFactory.createHandModel( handController2, type, avatarModel )
					)
        })
				break;
			case 'VRM':
				break;
			case 'BABYLON':
				Promise.all([
					loadHandsAsync('left', '/'),
					loadHandsAsync('right', '/')
				]).then(([leftHandObject, rightHandObject]) => {
					avatarModel.setHandObjects( leftHandObject, rightHandObject )
					avatarModel.setHandModels(
						handModelFactory.createHandModel( handController1, type, avatarModel ),
						handModelFactory.createHandModel( handController2, type, avatarModel )
					)
				})
				break;
			case 'WEBXR':
				Promise.all([
					loadHandsAsync('left'),
					loadHandsAsync('right')
				]).then(([leftHandObject, rightHandObject]) => {
					avatarModel.setHandObjects( leftHandObject, rightHandObject )
					avatarModel.setHandModels(
						handModelFactory.createHandModel( handController1, type, avatarModel ),
						handModelFactory.createHandModel( handController2, type, avatarModel )
					)
				})
				break;
		}

		return avatarModel;

	}
}

export { XRAvatarModelFactory };
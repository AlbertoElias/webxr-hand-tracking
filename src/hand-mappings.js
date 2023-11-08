export const WebXRHandJointNames = [
  'wrist',
  'thumb-metacarpal',
  'thumb-phalanx-proximal',
  'thumb-phalanx-distal',
  'thumb-tip',
  'index-finger-metacarpal',
  'index-finger-phalanx-proximal',
  'index-finger-phalanx-intermediate',
  'index-finger-phalanx-distal',
  'index-finger-tip',
  'middle-finger-metacarpal',
  'middle-finger-phalanx-proximal',
  'middle-finger-phalanx-intermediate',
  'middle-finger-phalanx-distal',
  'middle-finger-tip',
  'ring-finger-metacarpal',
  'ring-finger-phalanx-proximal',
  'ring-finger-phalanx-intermediate',
  'ring-finger-phalanx-distal',
  'ring-finger-tip',
  'pinky-finger-metacarpal',
  'pinky-finger-phalanx-proximal',
  'pinky-finger-phalanx-intermediate',
  'pinky-finger-phalanx-distal',
  'pinky-finger-tip'
]

export function getRPMHandMapping(isRight) {
  return [
    'Hand',
    'HandThumb1',
    'HandThumb2',
    'HandThumb3',
    'HandThumb4',
    'HandIndex_Undefined',
    'HandIndex1',
    'HandIndex2',
    'HandIndex3',
    'HandIndex4',
    'HandMiddle_Undefined',
    'HandMiddle1',
    'HandMiddle2',
    'HandMiddle3',
    'HandMiddle4',
    'HandRing_Undefined',
    'HandRing1',
    'HandRing2',
    'HandRing3',
    'HandRing4',
    'HandPinky_Undefined',
    'HandPinky1',
    'HandPinky2',
    'HandPinky3',
    'HandPinky4'
  ].map((joint) => `${isRight ? 'Right' : 'Left'}${joint}`)
}

export function getVRMHandMapping(isRight) {
  return [
    'Hand',
    'HandThumb1',
    'HandThumb2',
    'HandThumb3',
    'HandThumb4',
    'HandIndex_Undefined',
    'HandIndex1',
    'HandIndex2',
    'HandIndex3',
    'HandIndex4',
    'HandMiddle_Undefined',
    'HandMiddle1',
    'HandMiddle2',
    'HandMiddle3',
    'HandMiddle4',
    'HandRing_Undefined',
    'HandRing1',
    'HandRing2',
    'HandRing3',
    'HandRing4',
    'HandPinky_Undefined',
    'HandPinky1',
    'HandPinky2',
    'HandPinky3',
    'HandPinky4'
  ].map((joint) => `mixamorig${isRight ? 'Right' : 'Left'}${joint}`)
}

export function getBabylonHandMapping (handedness) {
  return [
    "wrist_",
    "thumb_metacarpal_",
    "thumb_proxPhalanx_",
    "thumb_distPhalanx_",
    "thumb_tip_",
    "index_metacarpal_",
    "index_proxPhalanx_",
    "index_intPhalanx_",
    "index_distPhalanx_",
    "index_tip_",
    "middle_metacarpal_",
    "middle_proxPhalanx_",
    "middle_intPhalanx_",
    "middle_distPhalanx_",
    "middle_tip_",
    "ring_metacarpal_",
    "ring_proxPhalanx_",
    "ring_intPhalanx_",
    "ring_distPhalanx_",
    "ring_tip_",
    "little_metacarpal_",
    "little_proxPhalanx_",
    "little_intPhalanx_",
    "little_distPhalanx_",
    "little_tip_",
  ].map((joint) => `${joint}${handedness === "right" ? "R" : "L"}`)
}

export function getHandMapping (handedness, type) {
  switch (type) {
    case 'WEBXR':
      return WebXRHandJointNames
    case 'BABYLON':
      return getBabylonHandMapping(handedness)
    case 'VRM':
      return getVRMHandMapping(handedness === 'right')
    case 'RPM':
      return getRPMHandMapping(handedness === 'right')
  }
}
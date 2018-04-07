import Vector3 from '../math/Vector3'
import Matrix3 from '../math/Matrix3'
import Matrix4 from '../math/Matrix4'
import Quaternion from '../math/Quaternion'
import _Math from '../math/Math.js'

let object3DId = 0

class Object3D {
  static DefaultUp = new Vector3(0, 1, 0)
  static DefaultMatrixAutoUpdate = true

  static q1 = new Quaternion()
  static axisX = new Vector3(1, 0, 0)
  static axisY = new Vector3(0, 1, 0)
  static axisZ = new Vector3(0, 0, 1)

  constructor () {
    this.id = object3DId++
    this.name = ''
    this.type = 'Object3D'
    this.isObject3D = true
    this.parent = null
    this.children = []
    
    this.up = Object3D.DefaultUp.clone()

    let position = new Vector3()
    let rotation = new Euler()
    let quaternion = new quaternion()
      quaternion.setFromEuler( rotation, false )
  
    let scale = new Vector3(1, 1, 1)

    function onRotationChange() {

    }
  
    function onQuaternionChange() {
  
      rotation.setFromQuaternion( quaternion, undefined, false )
  
    }
  
    rotation.onChange( onRotationChange );
    quaternion.onChange( onQuaternionChange );
  
    Object.defineProperties( this, {
      position: {
        enumerable: true,
        value: position
      },
      rotation: {
        enumerable: true,
        value: rotation
      },
      quaternion: {
        enumerable: true,
        value: quaternion
      },
      scale: {
        enumerable: true,
        value: scale
      },
      modelViewMatrix: {
        value: new Matrix4()
      },
      normalMatrix: {
        value: new Matrix3()
      }
    })

    this.matrix = new Matrix4()
    this.matrixWorld = new Matrix4()

    this.matrixAutoUpdate = Object3D.DefaultMatrixAutoUpdate
    this.matrixWorldNeedsUpdate = false

    this.visible = true
    
    this.castShadow = false
    this.receiveShadow = false

    this.frustumCulled = true
    this.renderOrder = 0
  }

  setRotationFromQuaternion (q) {
    this.quaternion.copy(q)
  }

  rotateX (angle) {
    const v1 = Object3D.axisX

    return this.rotateOnAxis(v1, angle)
  }

  rotateY (angle) {
    const v1 = Object3D.axisY

    return this.rotateOnAxis(v1, angle)
  }
  rotateZ (angle) {
    const v1 = Object3D.axisZ

    return this.rotateOnAxis(v1, angle)
  }

  rotateOnAxis (axis, anlge) {
    const q1 = Object3D.q1
    q1.setFromAxisAngle(axis, angle)
    this.quaternion.multiply(q1)

    return this
  }

  
}
import Vector3 from './Vector3'

class Quaternion {
  static slerp (qa, qb, qm, t) {
    return qm.copy(qa).slerp(qb, t)
  }

  static slerpFlat (dst, dstOffset, src0, srcOffset0, src1, srcOffset1, t) {
    // fuzz-free, array-based Quaternion SLERP operation

		let x0 = src0[ srcOffset0 + 0 ]
    let y0 = src0[ srcOffset0 + 1 ]
    let z0 = src0[ srcOffset0 + 2 ]
    let w0 = src0[ srcOffset0 + 3 ]

    let x1 = src1[ srcOffset1 + 0 ]
    let y1 = src1[ srcOffset1 + 1 ]
    let z1 = src1[ srcOffset1 + 2 ]
    let w1 = src1[ srcOffset1 + 3 ]

    if ( w0 !== w1 || x0 !== x1 || y0 !== y1 || z0 !== z1 ) {

      let s = 1 - t

      let cos = x0 * x1 + y0 * y1 + z0 * z1 + w0 * w1

      let dir = ( cos >= 0 ? 1 : - 1 )
      let sqrSin = 1 - cos * cos

      // Skip the Slerp for tiny steps to avoid numeric problems:
      if ( sqrSin > Number.EPSILON ) {

        let sin = Math.sqrt( sqrSin )
        let len = Math.atan2( sin, cos * dir )

        s = Math.sin( s * len ) / sin
        t = Math.sin( t * len ) / sin

      }

      let tDir = t * dir

      x0 = x0 * s + x1 * tDir
      y0 = y0 * s + y1 * tDir
      z0 = z0 * s + z1 * tDir
      w0 = w0 * s + w1 * tDir

      // Normalize in case we just did a lerp:
      if ( s === 1 - t ) {

        let f = 1 / Math.sqrt( x0 * x0 + y0 * y0 + z0 * z0 + w0 * w0 )

        x0 *= f
        y0 *= f
        z0 *= f
        w0 *= f

      }

    }

    dst[ dstOffset ] = x0
    dst[ dstOffset + 1 ] = y0
    dst[ dstOffset + 2 ] = z0
    dst[ dstOffset + 3 ] = w0
  }
  
  constructor(x, y, z, w) {
    this._x = x || 0
    this._y = y || 0
    this._z = z || 0
    this._w = ( w !== undefined ) ? w : 1
  }

  get x () {
    return this._x
  }

  set x (value) {
    this._x = value
    this.onChangeCallback()
  }

  get y () {
    return this._y
  }

  set y (value) {
    this._y = value
    this.onChangeCallback()
  }

  get z () {
    return this._z
  }

  set z (value) {
    this._z = value
    this.onChangeCallback()
  }

  get w () {
    return this._w
  }

  set w (value) {
    this._w = value
    this.onChangeCallback()
  }

  set (x, y, z, w) {
    this._x = x
		this._y = y
		this._z = z
		this._w = w
		this.onChangeCallback()

		return this
  }

  clone () {
    return new Quaternion(this._x, this._y, this._z, this._w)
  }

  copy (quaternion) {
    this._x = quaternion.x
    this._y = quaternion.y
    this._z = quaternion.z
    this._w = quaternion.w
  }
  
  setFromEuler (euler, update) {
    if (! (euler && euler.isEuler)) {
      throw new Error( 'THREE.Quaternion: .setFromEuler() now expects an Euler rotation rather than a Vector3 and order.' )
    }
    
    let x = euler._x, y = euler._y, z = euler._z, order = euler.order

		// http://www.mathworks.com/matlabcentral/fileexchange/
		// 	20696-function-to-convert-between-dcm-euler-angles-quaternions-and-euler-vectors/
		//	content/SpinCalc.m

		let cos = Math.cos
		let sin = Math.sin

		let c1 = cos( x / 2 )
		let c2 = cos( y / 2 )
		let c3 = cos( z / 2 )

		let s1 = sin( x / 2 )
		let s2 = sin( y / 2 )
		let s3 = sin( z / 2 )

		if ( order === 'XYZ' ) {

			this._x = s1 * c2 * c3 + c1 * s2 * s3
			this._y = c1 * s2 * c3 - s1 * c2 * s3
			this._z = c1 * c2 * s3 + s1 * s2 * c3
			this._w = c1 * c2 * c3 - s1 * s2 * s3

		} else if ( order === 'YXZ' ) {

			this._x = s1 * c2 * c3 + c1 * s2 * s3
			this._y = c1 * s2 * c3 - s1 * c2 * s3
			this._z = c1 * c2 * s3 - s1 * s2 * c3
			this._w = c1 * c2 * c3 + s1 * s2 * s3

		} else if ( order === 'ZXY' ) {

			this._x = s1 * c2 * c3 - c1 * s2 * s3
			this._y = c1 * s2 * c3 + s1 * c2 * s3
			this._z = c1 * c2 * s3 + s1 * s2 * c3
			this._w = c1 * c2 * c3 - s1 * s2 * s3

		} else if ( order === 'ZYX' ) {

			this._x = s1 * c2 * c3 - c1 * s2 * s3
			this._y = c1 * s2 * c3 + s1 * c2 * s3
			this._z = c1 * c2 * s3 - s1 * s2 * c3
			this._w = c1 * c2 * c3 + s1 * s2 * s3

		} else if ( order === 'YZX' ) {

			this._x = s1 * c2 * c3 + c1 * s2 * s3
			this._y = c1 * s2 * c3 + s1 * c2 * s3
			this._z = c1 * c2 * s3 - s1 * s2 * c3
			this._w = c1 * c2 * c3 - s1 * s2 * s3

		} else if ( order === 'XZY' ) {

			this._x = s1 * c2 * c3 - c1 * s2 * s3
			this._y = c1 * s2 * c3 - s1 * c2 * s3
			this._z = c1 * c2 * s3 + s1 * s2 * c3
			this._w = c1 * c2 * c3 + s1 * s2 * s3

		}

		if ( update !== false ) this.onChangeCallback()

		return this
  }

}
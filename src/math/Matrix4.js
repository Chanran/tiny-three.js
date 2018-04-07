import {Vector3} from './Vector3'

class Matrix4 {
  constructor() {
    this.elements = [
      1, 0, 0, 0,
      0, 1, 0, 0,
      0, 0, 1, 0,
      0, 0, 0, 1
    ]

    this.isMatrix4 = true
    
    if (arguments.length > 0) {
      console.error( 'THREE.Matrix4: the constructor no longer reads arguments. use .set() instead.' )
    }
  }

  set (n11, n12, n13, n14, n21, n22, n23, n24, n31, n32, n33, n34, n41, n42, n43, n44) {
    let te = this.elements
    te[ 0 ] = n11; te[ 4 ] = n12; te[ 8 ] = n13; te[ 12 ] = n14;
		te[ 1 ] = n21; te[ 5 ] = n22; te[ 9 ] = n23; te[ 13 ] = n24;
		te[ 2 ] = n31; te[ 6 ] = n32; te[ 10 ] = n33; te[ 14 ] = n34;
    te[ 3 ] = n41; te[ 7 ] = n42; te[ 11 ] = n43; te[ 15 ] = n44;
    
    return this
  }

  identity () {
    this.set(
      1, 0, 0, 0,
			0, 1, 0, 0,
			0, 0, 1, 0,
			0, 0, 0, 1
    )

    return this
  }

  clone () {
    return new Matrix4().fromArray(this.elements)
  }

  fromArray (array, offset) {

		if ( offset === undefined ) {
      offset = 0
    }

		for ( let i = 0; i < 16; i ++ ) {
			this.elements[ i ] = array[ i + offset ]
		}

		return this
  }
  
  copy (m) {
    let te = this.elements
    let me = m.elements

    te[ 0 ] = me[ 0 ]; te[ 1 ] = me[ 1 ]; te[ 2 ] = me[ 2 ]; te[ 3 ] = me[ 3 ];
		te[ 4 ] = me[ 4 ]; te[ 5 ] = me[ 5 ]; te[ 6 ] = me[ 6 ]; te[ 7 ] = me[ 7 ];
		te[ 8 ] = me[ 8 ]; te[ 9 ] = me[ 9 ]; te[ 10 ] = me[ 10 ]; te[ 11 ] = me[ 11 ];
    te[ 12 ] = me[ 12 ]; te[ 13 ] = me[ 13 ]; te[ 14 ] = me[ 14 ]; te[ 15 ] = me[ 15 ];
    
    return this
  }

  copyPosition (m) {

		let te = this.elements, me = m.elements

		te[ 12 ] = me[ 12 ]
		te[ 13 ] = me[ 13 ]
		te[ 14 ] = me[ 14 ]

		return this
  }
  
  makeRotationFromEuler (euler) {

		if ( ! ( euler && euler.isEuler ) ) {

			console.error( 'THREE.Matrix4: .makeRotationFromEuler() now expects a Euler rotation rather than a Vector3 and order.' )

		}

		let te = this.elements

		let x = euler.x, y = euler.y, z = euler.z
		let a = Math.cos( x ), b = Math.sin( x )
		let c = Math.cos( y ), d = Math.sin( y )
		let e = Math.cos( z ), f = Math.sin( z )

		if ( euler.order === 'XYZ' ) {

			let ae = a * e, af = a * f, be = b * e, bf = b * f

			te[ 0 ] = c * e
			te[ 4 ] = - c * f
			te[ 8 ] = d

			te[ 1 ] = af + be * d
			te[ 5 ] = ae - bf * d
			te[ 9 ] = - b * c

			te[ 2 ] = bf - ae * d
			te[ 6 ] = be + af * d
			te[ 10 ] = a * c

		} else if ( euler.order === 'YXZ' ) {

			let ce = c * e, cf = c * f, de = d * e, df = d * f

			te[ 0 ] = ce + df * b
			te[ 4 ] = de * b - cf
			te[ 8 ] = a * d

			te[ 1 ] = a * f
			te[ 5 ] = a * e
			te[ 9 ] = - b

			te[ 2 ] = cf * b - de
			te[ 6 ] = df + ce * b
			te[ 10 ] = a * c

		} else if ( euler.order === 'ZXY' ) {

			let ce = c * e, cf = c * f, de = d * e, df = d * f

			te[ 0 ] = ce - df * b
			te[ 4 ] = - a * f
			te[ 8 ] = de + cf * b

			te[ 1 ] = cf + de * b
			te[ 5 ] = a * e
			te[ 9 ] = df - ce * b

			te[ 2 ] = - a * d
			te[ 6 ] = b
			te[ 10 ] = a * c

		} else if ( euler.order === 'ZYX' ) {

			let ae = a * e, af = a * f, be = b * e, bf = b * f

			te[ 0 ] = c * e
			te[ 4 ] = be * d - af
			te[ 8 ] = ae * d + bf

			te[ 1 ] = c * f
			te[ 5 ] = bf * d + ae
			te[ 9 ] = af * d - be

			te[ 2 ] = - d
			te[ 6 ] = b * c
			te[ 10 ] = a * c

		} else if ( euler.order === 'YZX' ) {

			let ac = a * c, ad = a * d, bc = b * c, bd = b * d

			te[ 0 ] = c * e
			te[ 4 ] = bd - ac * f
			te[ 8 ] = bc * f + ad

			te[ 1 ] = f
			te[ 5 ] = a * e
			te[ 9 ] = - b * e

			te[ 2 ] = - d * e
			te[ 6 ] = ad * f + bc
			te[ 10 ] = ac - bd * f

		} else if ( euler.order === 'XZY' ) {

			let ac = a * c, ad = a * d, bc = b * c, bd = b * d

			te[ 0 ] = c * e
			te[ 4 ] = - f
			te[ 8 ] = d * e

			te[ 1 ] = ac * f + bd
			te[ 5 ] = a * e
			te[ 9 ] = ad * f - bc

			te[ 2 ] = bc * f - ad
			te[ 6 ] = b * e
			te[ 10 ] = bd * f + ac

		}

		// last column
		te[ 3 ] = 0
		te[ 7 ] = 0
		te[ 11 ] = 0

		// bottom row
		te[ 12 ] = 0
		te[ 13 ] = 0
		te[ 14 ] = 0
		te[ 15 ] = 1

		return this

	}

	makeRotationFromQuaternion (q) {

		let te = this.elements

		let x = q._x, y = q._y, z = q._z, w = q._w
		let x2 = x + x, y2 = y + y, z2 = z + z
		let xx = x * x2, xy = x * y2, xz = x * z2
		let yy = y * y2, yz = y * z2, zz = z * z2
		let wx = w * x2, wy = w * y2, wz = w * z2

		te[ 0 ] = 1 - ( yy + zz )
		te[ 4 ] = xy - wz
		te[ 8 ] = xz + wy

		te[ 1 ] = xy + wz
		te[ 5 ] = 1 - ( xx + zz )
		te[ 9 ] = yz - wx

		te[ 2 ] = xz - wy
		te[ 6 ] = yz + wx
		te[ 10 ] = 1 - ( xx + yy )

		// last column
		te[ 3 ] = 0
		te[ 7 ] = 0
		te[ 11 ] = 0

		// bottom row
		te[ 12 ] = 0
		te[ 13 ] = 0
		te[ 14 ] = 0
		te[ 15 ] = 1

		return this
  }
  
  setPosition (v) {
    let te = this.elements

    te[ 12 ] = v.x
    te[ 13 ] = v.y
    te[ 14 ] = v.z

    return this
  }

  getInverse (m, throwOnDegenerate) {

		// based on http://www.euclideanspace.com/maths/algebra/matrix/functions/inverse/fourD/index.htm
		let te = this.elements
		let	me = m.elements

		let	n11 = me[ 0 ], n21 = me[ 1 ], n31 = me[ 2 ], n41 = me[ 3 ]
		let	n12 = me[ 4 ], n22 = me[ 5 ], n32 = me[ 6 ], n42 = me[ 7 ]
		let	n13 = me[ 8 ], n23 = me[ 9 ], n33 = me[ 10 ], n43 = me[ 11 ]
		let	n14 = me[ 12 ], n24 = me[ 13 ], n34 = me[ 14 ], n44 = me[ 15 ]

		let	t11 = n23 * n34 * n42 - n24 * n33 * n42 + n24 * n32 * n43 - n22 * n34 * n43 - n23 * n32 * n44 + n22 * n33 * n44
		let	t12 = n14 * n33 * n42 - n13 * n34 * n42 - n14 * n32 * n43 + n12 * n34 * n43 + n13 * n32 * n44 - n12 * n33 * n44
		let	t13 = n13 * n24 * n42 - n14 * n23 * n42 + n14 * n22 * n43 - n12 * n24 * n43 - n13 * n22 * n44 + n12 * n23 * n44
		let	t14 = n14 * n23 * n32 - n13 * n24 * n32 - n14 * n22 * n33 + n12 * n24 * n33 + n13 * n22 * n34 - n12 * n23 * n34

		let det = n11 * t11 + n21 * t12 + n31 * t13 + n41 * t14;

		if ( det === 0 ) {

			let msg = "THREE.Matrix4: .getInverse() can't invert matrix, determinant is 0";

			if ( throwOnDegenerate === true ) {

				throw new Error( msg )

			} else {

				console.warn( msg )

			}

			return this.identity()

		}

		let detInv = 1 / det

		te[ 0 ] = t11 * detInv
		te[ 1 ] = ( n24 * n33 * n41 - n23 * n34 * n41 - n24 * n31 * n43 + n21 * n34 * n43 + n23 * n31 * n44 - n21 * n33 * n44 ) * detInv
		te[ 2 ] = ( n22 * n34 * n41 - n24 * n32 * n41 + n24 * n31 * n42 - n21 * n34 * n42 - n22 * n31 * n44 + n21 * n32 * n44 ) * detInv
		te[ 3 ] = ( n23 * n32 * n41 - n22 * n33 * n41 - n23 * n31 * n42 + n21 * n33 * n42 + n22 * n31 * n43 - n21 * n32 * n43 ) * detInv

		te[ 4 ] = t12 * detInv
		te[ 5 ] = ( n13 * n34 * n41 - n14 * n33 * n41 + n14 * n31 * n43 - n11 * n34 * n43 - n13 * n31 * n44 + n11 * n33 * n44 ) * detInv
		te[ 6 ] = ( n14 * n32 * n41 - n12 * n34 * n41 - n14 * n31 * n42 + n11 * n34 * n42 + n12 * n31 * n44 - n11 * n32 * n44 ) * detInv
		te[ 7 ] = ( n12 * n33 * n41 - n13 * n32 * n41 + n13 * n31 * n42 - n11 * n33 * n42 - n12 * n31 * n43 + n11 * n32 * n43 ) * detInv

		te[ 8 ] = t13 * detInv
		te[ 9 ] = ( n14 * n23 * n41 - n13 * n24 * n41 - n14 * n21 * n43 + n11 * n24 * n43 + n13 * n21 * n44 - n11 * n23 * n44 ) * detInv
		te[ 10 ] = ( n12 * n24 * n41 - n14 * n22 * n41 + n14 * n21 * n42 - n11 * n24 * n42 - n12 * n21 * n44 + n11 * n22 * n44 ) * detInv
		te[ 11 ] = ( n13 * n22 * n41 - n12 * n23 * n41 - n13 * n21 * n42 + n11 * n23 * n42 + n12 * n21 * n43 - n11 * n22 * n43 ) * detInv

		te[ 12 ] = t14 * detInv
		te[ 13 ] = ( n13 * n24 * n31 - n14 * n23 * n31 + n14 * n21 * n33 - n11 * n24 * n33 - n13 * n21 * n34 + n11 * n23 * n34 ) * detInv
		te[ 14 ] = ( n14 * n22 * n31 - n12 * n24 * n31 - n14 * n21 * n32 + n11 * n24 * n32 + n12 * n21 * n34 - n11 * n22 * n34 ) * detInv
		te[ 15 ] = ( n12 * n23 * n31 - n13 * n22 * n31 + n13 * n21 * n32 - n11 * n23 * n32 - n12 * n21 * n33 + n11 * n22 * n33 ) * detInv

		return this

	}

  scale (v) {

		let te = this.elements;
		let x = v.x, y = v.y, z = v.z;

		te[ 0 ] *= x; te[ 4 ] *= y; te[ 8 ] *= z;
		te[ 1 ] *= x; te[ 5 ] *= y; te[ 9 ] *= z;
		te[ 2 ] *= x; te[ 6 ] *= y; te[ 10 ] *= z;
		te[ 3 ] *= x; te[ 7 ] *= y; te[ 11 ] *= z;

		return this;

	}

  makeTranslation (x, y, z) {

		this.set(
			1, 0, 0, x,
			0, 1, 0, y,
			0, 0, 1, z,
			0, 0, 0, 1
		);

		return this
  }
  
  makeRotationX (theta) {

		let c = Math.cos( theta ), s = Math.sin( theta )

		this.set(

			1, 0, 0, 0,
			0, c, - s, 0,
			0, s, c, 0,
			0, 0, 0, 1

		)

		return this

	}

	makeRotationY (theta) {

		let c = Math.cos( theta ), s = Math.sin( theta )

		this.set(

			 c, 0, s, 0,
			 0, 1, 0, 0,
			- s, 0, c, 0,
			 0, 0, 0, 1

		)

		return this;

	}

	makeRotationZ (theta) {

		var c = Math.cos( theta ), s = Math.sin( theta )

		this.set(

			c, - s, 0, 0,
			s, c, 0, 0,
			0, 0, 1, 0,
			0, 0, 0, 1

		)

		return this
  }
  
  makeScale (x, y, z) {

		this.set(

			x, 0, 0, 0,
			0, y, 0, 0,
			0, 0, z, 0,
			0, 0, 0, 1

		)

		return this
  }
  
  compose (position, quaternion, scale) {

		this.makeRotationFromQuaternion( quaternion )
		this.scale( scale )
		this.setPosition( position )

		return this
  }
  
  equals ( matrix ) {

		let te = this.elements
		let me = matrix.elements

		for ( let i = 0; i < 16; i ++ ) {

			if ( te[ i ] !== me[ i ] ) return false

		}

		return true
  }
  
  fromArray (array, offset) {

		if ( offset === undefined ) offset = 0

		for ( var i = 0; i < 16; i ++ ) {

			this.elements[ i ] = array[ i + offset ]

		}

		return this
  }
  
  toArray (array, offset) {

		if ( array === undefined ) array = []
		if ( offset === undefined ) offset = 0

		let te = this.elements

		array[ offset ] = te[ 0 ]
		array[ offset + 1 ] = te[ 1 ]
		array[ offset + 2 ] = te[ 2 ]
		array[ offset + 3 ] = te[ 3 ]

		array[ offset + 4 ] = te[ 4 ]
		array[ offset + 5 ] = te[ 5 ]
		array[ offset + 6 ] = te[ 6 ]
		array[ offset + 7 ] = te[ 7 ]

		array[ offset + 8 ] = te[ 8 ]
		array[ offset + 9 ] = te[ 9 ]
		array[ offset + 10 ] = te[ 10 ]
		array[ offset + 11 ] = te[ 11 ]

		array[ offset + 12 ] = te[ 12 ]
		array[ offset + 13 ] = te[ 13 ]
		array[ offset + 14 ] = te[ 14 ]
		array[ offset + 15 ] = te[ 15 ]

		return array

	}
}

export {Matrix4}

import {Vector3} from './Vector3'

class Matrix3 {
  constructor() {
    this.elements = [
      1, 0, 0,
      0, 1, 0,
      0, 0, 1
    ]

    this.isMatrix3 = true

    if ( arguments.length > 0 ) {
      console.error( 'THREE.Matrix3: the constructor no longer reads arguments. use .set() instead.' );
    }
  }

  set (n11, n12, n13, n21, n22, n23, n31, n32, n33) {

		var te = this.elements

		te[ 0 ] = n11; te[ 1 ] = n21; te[ 2 ] = n31;
		te[ 3 ] = n12; te[ 4 ] = n22; te[ 5 ] = n32;
		te[ 6 ] = n13; te[ 7 ] = n23; te[ 8 ] = n33;

		return this
  }
  
  identity () {
    this.set(
      1, 0, 0,
      0, 1, 0,
      0, 0, 1
    )

    return this
  }

  clone () {
    return new Matrix3().fromArray(this.elements)
  }

  copy (m) {
		let te = this.elements
		let me = m.elements

		te[ 0 ] = me[ 0 ]; te[ 1 ] = me[ 1 ]; te[ 2 ] = me[ 2 ];
		te[ 3 ] = me[ 3 ]; te[ 4 ] = me[ 4 ]; te[ 5 ] = me[ 5 ];
		te[ 6 ] = me[ 6 ]; te[ 7 ] = me[ 7 ]; te[ 8 ] = me[ 8 ];

		return this
  }
  
  getInverse (matrix, throwOnDegenerate) {

		if ( matrix && matrix.isMatrix4 ) {

			console.error( "THREE.Matrix3: .getInverse() no longer takes a Matrix4 argument." );

		}

		let me = matrix.elements
		let	te = this.elements

		let	n11 = me[ 0 ], n21 = me[ 1 ], n31 = me[ 2 ]
		let	n12 = me[ 3 ], n22 = me[ 4 ], n32 = me[ 5 ]
		let	n13 = me[ 6 ], n23 = me[ 7 ], n33 = me[ 8 ]

		let	t11 = n33 * n22 - n32 * n23
		let	t12 = n32 * n13 - n33 * n12
		let	t13 = n23 * n12 - n22 * n13

		let	det = n11 * t11 + n21 * t12 + n31 * t13

		if ( det === 0 ) {

			let msg = "THREE.Matrix3: .getInverse() can't invert matrix, determinant is 0"

			if ( throwOnDegenerate === true ) {

				throw new Error( msg )

			} else {

				console.warn( msg )

			}

			return this.identity()

		}

		let detInv = 1 / det

		te[ 0 ] = t11 * detIn
		te[ 1 ] = ( n31 * n23 - n33 * n21 ) * detInv
		te[ 2 ] = ( n32 * n21 - n31 * n22 ) * detInv

		te[ 3 ] = t12 * detInv
		te[ 4 ] = ( n33 * n11 - n31 * n13 ) * detInv
		te[ 5 ] = ( n31 * n12 - n32 * n11 ) * detInv

		te[ 6 ] = t13 * detInv
		te[ 7 ] = ( n21 * n13 - n23 * n11 ) * detInv
		te[ 8 ] = ( n22 * n11 - n21 * n12 ) * detInv

		return this
	}

  scale ( sx, sy ) {
		let te = this.elements

		te[ 0 ] *= sx; te[ 3 ] *= sx; te[ 6 ] *= sx;
		te[ 1 ] *= sy; te[ 4 ] *= sy; te[ 7 ] *= sy;

		return this
	}

	rotate ( theta ) {
		let c = Math.cos( theta )
		let s = Math.sin( theta )

		let te = this.elements

		let a11 = te[ 0 ], a12 = te[ 3 ], a13 = te[ 6 ]
		let a21 = te[ 1 ], a22 = te[ 4 ], a23 = te[ 7 ]

		te[ 0 ] = c * a11 + s * a21
		te[ 3 ] = c * a12 + s * a22
		te[ 6 ] = c * a13 + s * a23

		te[ 1 ] = - s * a11 + c * a21
		te[ 4 ] = - s * a12 + c * a22
		te[ 7 ] = - s * a13 + c * a23

		return this
	}

	translate ( tx, ty ) {
		let te = this.elements

		te[ 0 ] += tx * te[ 2 ]; te[ 3 ] += tx * te[ 5 ]; te[ 6 ] += tx * te[ 8 ];
		te[ 1 ] += ty * te[ 2 ]; te[ 4 ] += ty * te[ 5 ]; te[ 7 ] += ty * te[ 8 ];

		return this
	}

	equals ( matrix ) {
		let te = this.elements
		let me = matrix.elements

		for ( let i = 0; i < 9; i ++ ) {

			if ( te[ i ] !== me[ i ] ) return false

		}

		return true
	}

	fromArray ( array, offset ) {
		if ( offset === undefined ) offset = 0

		for ( let i = 0; i < 9; i ++ ) {

			this.elements[ i ] = array[ i + offset ]

		}

		return this
	}

	toArray ( array, offset ) {
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

		return array
	}
}

export {Matrix3}

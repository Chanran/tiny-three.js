class Euler {

  static RotationOrders = ['XYZ', 'YZX', 'ZXY', 'XZY', 'ZYX']
  static DefaultOrder = 'XYZ'

  constructor(x, y, z, order) {
    this._x = x || 0
    this._y = y || 0
    this._z = z || 0
    this._order = order || Euler.DefaultOrder
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

  get order () {
    return this._order
  }

  set order (value) {
    this._order = value
    this.onChangeCallback()
  }
  
  set (x, y, z, order) {
    this._x = x
    this._y = y
    this._z = z
    this._order = order
    
    this.onChangeCallback()

    return this
  }

  clone () {
    return new Euler(this._x, this._y, this._z, this._order)
  }

  copy (euler) {
    this._x = euler._x
    this._y = euler._y
    this._z = euler._z
    
    this.onChangeCallback()

    return this
  }

  equals (euler) {
		return ( euler._x === this._x ) && ( euler._y === this._y ) && ( euler._z === this._z ) && ( euler._order === this._order );
	}

  onChange (callback) {
    this.onChangeCallback = callback

    return this
  }

  onChange () {

  }
}

export default Euler
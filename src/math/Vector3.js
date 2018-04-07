class Vector3 {
  constructor(x, y, z) {
    this.x = x || 0
    this.y = y || 0
    this.z = z || 0
  }

  set (x, y, z) {
    this.x = x
    this.y = y
    this.z = z
    return this
  }

  setX (x) {
		this.x = x
		return this
	}

	setY (y) {
		this.y = y
		return this

	}

	setZ (z) {
		this.z = z
		return this
  }
  
  clone () {
    return new Vector3(this.x, this.y, this.z)
  }
}

export {Vector3}

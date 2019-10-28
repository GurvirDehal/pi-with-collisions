class Block {
  constructor(x, width, velocity, mass, id) {
    this.x = x
    this.width = width
    this.velocity = velocity
    this.mass = mass
    this.img = document.getElementById(id)
  }
  show() {
    image(blockImg, this.x, this.y, this.width)
  }

  update() {
    this.x += this.velocity
  }

  collide(other) {
     if(this.x + this.width < other.x || this.x > other.x + other.width) { 
       return false //not colliding
     } else {
       return true // are colliding
     }
  }

  bounce(other) {
    let newVelocity = this.velocity * (this.mass - other.mass) / (this.mass + other.mass)
    newVelocity += 2 * other.mass * other.velocity / (this.mass + other.mass)
    return newVelocity
  }

  hitWall() {
    return this.x <= 0
  }

  reverse() {
    this.velocity *= -1
  }

}
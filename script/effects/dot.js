export default class Dot {

  constructor( w, h ) {
    this.speedX = this.random( -0.5, 0.5 )
    this.speedY = this.random( -0.5, 0.5 )
    this.x = Math.random() * w
    this.y = Math.random() * h
    this.color = 'rgb( 100, 100, 100 )'
    this.r = 3

    this.w = w
    this.h = h
  }

  random( min, max ) { 
    return Math.random() * ( max - min ) + min
  }

  draw( ctx ) {
    ctx.beginPath()
    ctx.arc( this.x, this.y, this.r, 0, Math.PI*2 )
    ctx.fillStyle = this.color
    ctx.fill()
  }

  move( currentTime ) {
    this.x > this.w || this.x < 0 ? this.speedX *= -1 : this.x 
    this.y > this.h || this.y < 0 ? this.speedY *= -1 : this.y 

    this.x += this.speedX
    this.y += this.speedY
  }

}
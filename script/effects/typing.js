export default class effect {

  constructor( container, char, amount, speed, duration ) {
    this.container = container
    
    this.char = [...char]
    this.amount = amount
    
    this.maxInterval = 40
    this.lastUpdate = 0
    this.deltaTime = 0
    
    this.duration = duration
    this.speed = speed
  }

  setText( text ) {
    const { floor, random } = Math
    this.arrayText = [...text].map( ( el, index ) => ({start: index, to: el || '', end: index + floor( random() * this.amount )}) )

    this.frame = 0
    this.animate()
  }

  animate( currentTime = 0 ) {
    if( this.frame > ( this.arrayText.length + this.amount ) + this.duration ) return
    requestAnimationFrame( timeStamp => this.animate( timeStamp ) )

    this.deltaTime = currentTime - this.lastUpdate
    this.lastUpdate = currentTime

    if( this.deltaTime > this.maxInterval ) return

    let outline = ''
    this.arrayText.forEach( el => {
      let { start, to, end, char } = el
      const { floor, random } = Math

      if( this.frame >= end + this.duration && el.to === '|' ) outline += '<br>'
      else if( this.frame >= end + this.duration ) outline += to
      else if( this.frame >= start + this.duration ) {
        outline += `<span class="text_double">${ char }</span>`
      }
    })

    this.container.innerHTML = outline
    this.frame += this.speed * ( this.deltaTime / 1000 )
  }
  
}
import Dot from '../effects/dot.js'
import store from '../store.js'

export default {

  props: [ 'components', 'color' ],
  
  template: `
    <canvas class="canvas-dot"></canvas>
  `,

  mounted() {

    const cnv = document.querySelector( 'canvas' )
    const ctx = cnv.getContext( '2d' )

    let w, h, active_color = this.color.theme.active;

    function reSize() {
      w = cnv.width = window.innerWidth
      h = cnv.height = window.innerHeight

      let array = new Array( 70 ).fill().map( el => new Dot( w, h ) )
      array[1].x = -2000
      array[1].y = -2000
      
      array[1].speedX = 0
      array[1].speedY = 0
      array[1].color = `#${ active_color }`
      array[1].r = 0

      return array
    }

    let arrayDot = reSize()
    window.addEventListener( 'resize', () => {
      arrayDot = reSize()
    })

    const html = document.documentElement
    window.addEventListener( 'mousemove', ( e ) => {
      arrayDot[1].x = JSON.parse(html.style.getPropertyValue( '--mouseX' ).replace(/[^0-9]/g, '')) + 2
      arrayDot[1].y = JSON.parse(html.style.getPropertyValue( '--mouseY' ).replace(/[^0-9]/g, '')) + 2
    })

    function line() {
      let x1, y1, x2, y2, length, opacity
      for( let i in arrayDot ) {
        for( let j in arrayDot ) {
          x1 = arrayDot[i].x
          y1 = arrayDot[i].y
          x2 = arrayDot[j].x
          y2 = arrayDot[j].y
          length = Math.sqrt( Math.pow( x2 - x1, 2 ) + Math.pow( y2 - y1, 2 ) )
          if( 240 > length && i == [1] ) {
            opacity = 1 - length / 120
            ctx.beginPath()
            ctx.moveTo(x1,y1)
            ctx.lineTo(x2,y2)
            ctx.closePath()
            ctx.strokeStyle = `#${ active_color }`
            ctx.stroke()
          }else if(120 > length){
            opacity = 1 - length / 120
            ctx.beginPath()
            ctx.moveTo(x1,y1)
            ctx.lineTo(x2,y2)
            ctx.closePath()
            ctx.strokeStyle = `rgba( 100, 100, 100, ${opacity} )`
            ctx.stroke()
          }
        }
      }
    }

    let 
      maxInterval = 40,
      lastUpdate = 0,
      deltaTime = 0;
    
    function loop( currentTime = 0 ) {
      if( store.current.component !== 'vCanvastwo' ) return
      if( deltaTime > maxInterval ) return

      requestAnimationFrame( timeStamp => loop( timeStamp ) )
      ctx.clearRect( 0, 0, w, h )

      deltaTime = lastUpdate - currentTime
      // console.log( 'canvas-dot' );
      
      arrayDot.forEach( el => {
        if( el.x > ( w + 1 ) || el.x < -1 ) el.speedX *= -1
        if( el.y > ( h + 1 ) || el.y < -1 ) el.speedY *= -1
        
        el.draw( ctx )
        el.move( deltaTime / 15 )
      });
      
      line()

      lastUpdate = currentTime  
    }

    loop()
    
  }
}
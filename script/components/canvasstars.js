import Dot from '../effects/dot.js'
import store from '../store.js'

export default {

  props: [ 'components', 'color' ],
  
  template: `
    <canvas class="canvas-stars"></canvas>
  `,

  mounted() {

    const cnv = document.querySelector( 'canvas' )
    const ctx = cnv.getContext( '2d' )

    let w, h, active_color = this.color.theme.active, colors = [ 'rgb( 100, 100, 100 )', `#${ active_color }` ];
    const { PI, random, floor, sin, cos } = Math

    function reSize() {
      w = cnv.width = window.innerWidth
      h = cnv.height = window.innerHeight

      ctx.fillStyle = 'rgba( 0, 0, 8, 1 )'
      ctx.fillRect( 0, 0, w, h )

      return new Array( 300 ).fill().map( el => ({ 
        a: random() * (PI*2),
        c: floor( random() * colors.length ),
        s: random() * 0.01, 
        r: random() * w,
      }) ).filter( el => el.r > 100 )
    }

    let arrayStars = reSize()
    // console.log( arrayStars );
    window.addEventListener( 'resize', () => {
      arrayStars = reSize()
    })

    let 
      maxInterval = 40,
      lastUpdate = 0,
      deltaTime = 0;
    
    function loop( currentTime = 0 ) {
      if( store.current.component !== 'vCanvasthree' ) return
      if( deltaTime > maxInterval ) return
      if( !arrayStars.length ) return

      requestAnimationFrame( timeStamp => loop( timeStamp ) )
      ctx.fillStyle = 'rgba( 0, 0, 8, .1 )'
      ctx.fillRect( 0, 0, w, h )

      deltaTime = lastUpdate - currentTime
      
      arrayStars.forEach( el => {
        el.a += el.s

        ctx.beginPath()
        ctx.arc( cos( el.a ) * el.r + w/2, sin( el.a ) * el.r + h/2, 2, 0, PI*2 )
        ctx.closePath()

        ctx.fillStyle = colors[ el.c ]
        ctx.fill()
      });
      
      lastUpdate = currentTime  
    }

    loop()
    
  }
}
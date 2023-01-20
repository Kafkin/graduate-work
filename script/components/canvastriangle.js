import Mesh from '../effects/mesh.js'
import store from '../store.js'

export default {

  template: `
    <canvas class="canvas-mesh"></canvas>
  `,

  data() {
    return {

    }
  },

  mounted() {

    const cnv = document.querySelector( 'canvas' )
    const ctx = cnv.getContext( '2d' )

    let w, h, mesh;
    function reSize() {
      w = cnv.width = window.innerWidth
      h = cnv.height = window.innerHeight
    }

    window.addEventListener( 'resize', () => {
      reSize()
      mesh = new Mesh( w, h )
    })
    reSize()

    mesh = new Mesh( w, h )

    let 
      maxInterval = 40,
      lastUpdate = 0,
      deltaTime = 0;
    
    function loop( currentTime = 0 ) {
      if( store.current.component !== 'vCanvasone' ) return
      if( deltaTime > maxInterval ) return
      // console.log( 'canvas-trianles' );

      requestAnimationFrame( timeStamp => loop( timeStamp ) )
      ctx.clearRect( 0, 0, w, h )

      deltaTime = lastUpdate - currentTime

      mesh.renderTriangles( ctx )
      mesh.updateParticles( deltaTime / 1000 )

      lastUpdate = currentTime
    }

    loop()

  }

}
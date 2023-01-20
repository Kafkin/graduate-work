import store from '../store.js'

export default {

  template: `
    <canvas class="canvas-upper"></canvas>
  `,

  mounted() {

    const cnv = document.querySelector( '.canvas-upper' )
    const ctx = cnv.getContext( '2d' )

    let w, h;
    function reSize() {
      w = cnv.width = window.innerWidth
      h = cnv.height = window.innerHeight
      ctx.fillStyle = 'rgba( 0, 0, 8, 1 )'
      ctx.fillRect( 0, 0, w, h )
    }
    
    window.addEventListener( 'resize', () => {
      reSize()
    })
    
    reSize()

  }
}
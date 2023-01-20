export default {

  props: [ 'modelValue', 'active', 'settings' ],

  template: `
    <div 
      :style="{ '--x': x, '--y': y, 'z-index': active === settings.name ? 400 : settings.index }" 
      @mousedown="$emit( 'update:active', settings.name )"
      :class="{ 'cmd-hidden': !show.body }"
      v-if="show.header" 
      class="cmd" 
    >
      <div class="cmd-header" @mousedown="onDrag">
        <slot class="cmd-title" name="cmd-header"></slot>
        
        <div class="cmd-icons">
          <span class="collapse" @click="show.body = false"></span>
          <span class="expand" @click="show.body = true"></span>
          <span class="exit" @click="$emit( 'update:modelValue', closeWindow() )"></span>
        </div>
      </div>

      
      <transition name="body">
        <slot name="cmd-body" v-if="show.body"></slot>
      </transition>
    </div>
  `,

  data() {
    return {

      show: {
        header: true,
        body: true
      },
      
      x: '30px',
      y: '30px',

    }
  },

  watch: {
    x() {}
  },

  methods: {

    closeWindow() {
      return this.modelValue.filter( el => el !== this.settings.name )
    },
    
    onDrag( e ) {
      const cmd = e.target.offsetParent
      
      let shiftX = e.pageX - cmd.offsetLeft
      let shiftY = e.pageY - cmd.offsetTop

      document.onmousemove = ( e ) => {
        this.moveAt( e, shiftX, shiftY );
      };
    
      cmd.onmouseup = function() {
        document.onmousemove = null;
        cmd.onmouseup = null;
      };
    },

    moveAt( e, shiftX, shiftY ){
      this.x = e.pageX - shiftX + 'px';
      this.y = e.pageY - shiftY + 'px';
    },

  }

}
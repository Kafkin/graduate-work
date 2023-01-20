export default {

  props: [ 'modelValue', 'settings' ],

  template: `
    <span class="form-span">
      <label :for="settings.id" class="form-label">{{ settings.title }}</label>

      <input 
        class="form-input" 
        :type="settings.type" 
        :value="modelValue"
        @input="$emit( 'update:modelValue', $event.target.value )"
        :placeholder="settings.placeholder" 
        :minlength="settings.min" 
        :maxlength="settings.max" 
        :id="settings.id"
      >

      <div class="circle">
        <div class="outer" :style="progress"></div>
        <div class="inner"></div>
      </div>
    </span>
  `,
  
  computed: {

    progress() {
      let p = this.modelValue ? ( this.modelValue.length * 100 ) / this.settings.max : 0
      if( p >= 100 ) return 'clip-path: polygon(50% 0%, 50% 0, 50% 0, 50% 0, 50% 0, 50% 0, 50% 0, 50% 50%, 50% 50%)';
      if( p >= 87.5 ) return 'clip-path: polygon(50% 0%, 100% 0, 100% 0, 100% 0, 100% 0, 100% 0, 100% 0, 50% 50%, 50% 50%)';
      if( p >= 75 ) return 'clip-path: polygon(50% 0%, 100% 0, 100% 50%, 100% 50%, 100% 50%, 100% 50%, 100% 50%, 50% 50%, 50% 50%)';
      if( p >= 62.5 ) return 'clip-path: polygon(50% 0%, 100% 0, 100% 100%, 100% 100%, 100% 100%, 100% 100%, 100% 100%, 50% 50%, 50% 50%)';
      if( p >= 50 ) return 'clip-path: polygon(50% 0%, 100% 0, 100% 100%, 50% 100%, 50% 100%, 50% 100%, 50% 100%, 50% 50%, 50% 50%)';
      if( p >= 37.5 ) return 'clip-path: polygon(50% 0%, 100% 0, 100% 100%, 0 100%, 0 100%, 0 100%, 0 100%, 50% 50%, 50% 50%)';
      if( p >= 25 ) return 'clip-path: polygon(50% 0%, 100% 0, 100% 100%, 0 100%, 0 100%, 0 50%, 0 50%, 50% 50%, 50% 50%)';
      if( p >= 12.5 ) return 'clip-path: polygon(50% 0%, 100% 0, 100% 100%, 0 100%, 0 100%, 0 0, 0 0, 50% 50%, 50% 50%)'
    }

  }

}
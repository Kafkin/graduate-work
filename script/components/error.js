export default {

  props: [ 'modelValue', 'message', 'index' ],

  template: `
    <div class="error" v-if="modelValue">
      <p class="error_message" v-typing="{ char: '01', amount: 0, duration: index * 10, speed: 55}" v-once>{{ message }}</p>
    </div>
  `,

  mounted() {
    setTimeout(() => {
      this.$emit( 'update:modelValue', false )
    }, 5000)
  }

}
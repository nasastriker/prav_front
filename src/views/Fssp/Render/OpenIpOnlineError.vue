<template>
  <div >
      <span style="color: blue" class="hover:text-primary cursor-pointer" @click="showText=!showText">{{ params.value }}</span>

      <vs-popup class="holamundo" title="Текст" :active.sync="showText">
        <vs-textarea height="600px" class="w-100" v-model="params.value"> </vs-textarea>
      </vs-popup>
    </div>
</template>

<script>
export default {
  data () {
    return {
      showText:false,
    }
  },
}
</script>

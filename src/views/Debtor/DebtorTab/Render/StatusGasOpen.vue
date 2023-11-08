<template>
  <div >
    <span style="color: red" @click="showData=!showData">{{params.data.status_sudrf}}</span>
    <vs-popup class="holamundo" title="Инфо" :active.sync="showData">
      <template v-if="typeof params.data.all_status!='undefined'">
        <json-viewer
            :value="params.data.all_status"
            :expand-depth=5
            copyable

            sort></json-viewer>
      </template>
    </vs-popup>

  </div>

</template>

<script>
export default {
  components: {
  },

  data () {
    return {
      showData:false,
    }
  },

  methods: {


  },
  mounted () {
  }
}

</script>

<style lang="scss">
</style>

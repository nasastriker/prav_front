<template>
  <div>
    <template   v-if="params.data.address_good==0">
      <span @click="openPop=!openPop" style="color: red">{{params.value}} </span>
    </template>
    <template   v-if="params.data.address_good==1">
      <span @click="openPop=!openPop" style="color: green">{{params.value}} </span>
    </template>
    <vs-popup classContent="popup-example" title="Ответ почты" :active.sync="openPop">
      <json-viewer
          :value="params.data.pochta_data"
          :expand-depth=5
          copyable

          sort></json-viewer>
      <div style="text-align: center">
        <template   v-if="params.data.code==0&&params.data.code_area!=0">
          <span @click="$router.push('/handbook/fssp/'+params.data.code_area)" style="color: green;cursor: pointer">{{params.data.name_fssp}} </span>
        </template>
        <template   v-if="params.data.code!=0&&params.data.code_area==0">
          <span @click="$router.push('/handbook/fssp_otdels/'+params.data.code)" style="color: green;cursor: pointer">{{params.data.name_fssp}} </span>
        </template>
      </div>

    </vs-popup>


  </div>
</template>

<script>

    export default {
        data () {
            return {
              openPop:false
            }
        },

        computed: {

        },
    }
</script>
<style>


</style>
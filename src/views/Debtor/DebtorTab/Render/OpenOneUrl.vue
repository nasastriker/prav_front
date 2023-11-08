<template>
  <div >
    <div v-if="typeUrl==1">
      <a :href="params.value" target="_blank">{{ params.value }}</a>
    </div>
    <div v-else>
      <span style="color: blue" class="hover:text-primary cursor-pointer" @click="showText=!showText">{{ params.value }}</span>

      <vs-popup class="holamundo" title="Текст" :active.sync="showText">
        <vs-textarea height="600px" class="w-100" v-model="params.value"> </vs-textarea>
      </vs-popup>
    </div>
  </div>
</template>

<script>
import Vue from 'vue'
import { mapActions,mapGetters } from 'vuex'
export default {
  name: 'OneJournalUrl',
  data () {
    return {
      showText:false,
    }
  },
  computed: {
    typeUrl () {
      if (this.params.value.startsWith('http')) return 1
      else return 0
    },
  }
}
</script>

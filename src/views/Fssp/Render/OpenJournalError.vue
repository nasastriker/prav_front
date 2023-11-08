<template>
  <div>
      <span style="color: blue" class="hover:text-primary cursor-pointer" @click="showError=!showError">{{ params.value }}</span>

    <vs-popup class="holamundo" title="Ошибка:" :active.sync="showError">
      <vs-textarea height="600px" class="w-100" v-model="params.value"> </vs-textarea>
    </vs-popup>
  </div>
</template>

<script>
    import Vue from 'vue'
    import { mapActions,mapGetters } from 'vuex'
    export default {
        name: 'OpenJournalError',
      data () {
        return {
          showError:false,
        }
      }
    }
</script>

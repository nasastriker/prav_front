<template>
  <div>
    <span style="color: blue" class="hover:text-primary cursor-pointer" @click="showError=!showError">{{ params.value }}</span>

    <vs-popup class="holamundo" title="Ошибка:" :active.sync="showError">
      <vs-textarea height="600px" rows="26" class="w-100" v-model="params.value"></vs-textarea>
    </vs-popup>
  </div>
</template>

<script>
    export default {
        name: 'OpenJournalErrorOne',
      data () {
        return {
          showError:false,
        }
      }
    }
</script>

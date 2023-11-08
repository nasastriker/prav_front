<template>
  <div>
    <div v-if="params.data.status == 0">
      <a v-if="params.data.can_delete_file_name_zip == 1" v-auth-href :href="url">{{ params.value }}</a>
      <span v-else style="color: #c2c2c2">{{ params.value }}</span>
    </div>
    <div v-else>
      <span style="color: #c2c2c2">{{ params.value }}</span>
    </div>
  </div>
</template>

<script>
    import VueAuthHref from 'vue-auth-href';
    import Vue from "vue";
    const options = {
      token: () => `${localStorage.getItem('accessToken')}`
    }
    Vue.use(VueAuthHref, options)
    export default {
        computed: {
          url(){
            return '/unrecognized_files/?id_file='+this.params.data.id+'&type=3';
          }
        },
    }
</script>

<style lang="scss" scpoped>
</style>

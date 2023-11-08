<template>
  <div style="display: flex">
    <a v-auth-href :href="url">
      <feather-icon icon="FileTextIcon" title="Сгенерировать документ" svgClasses="h-5 w-5 mr-4 hover:text-primary cursor-pointer"/>
    </a>
    <feather-icon icon="AlignLeftIcon" title="Сгенерировать текст для поля Описание в ГУ" svgClasses="h-5 w-5 mr-4 hover:text-primary cursor-pointer" @click="genOpisTextStart"/>
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
        data () {
            return {}
        },
      computed: {
        url(){
          return '/fssp_hod_send/gen_document/?id_credit='+this.params.data.id+'&id_record='+this.params.data.id_fssp_send_hod_record;
        }
      },
      methods: {
        genOpisTextStart(){
          this.params.genOpisText(this.params.data.id, this.params.data.id_fssp_send_hod_record);
        },
      }
    }
</script>

<template>
  <div id="page-user-list">
    <div class="vx-card p-6">
      <div style="margin-bottom: 10px; display: flex">
        <Back></Back>
        <h3 style="margin-left: 15px">{{ FnsAnswerFileName }}</h3>
      </div>
      <hr style="margin-bottom: 15px; border: 0.5px solid #7367f0;">
      <vs-tabs>
        <vs-tab label="Заемщики">
          <FnsAnswerFiles style="margin-top: 20px"></FnsAnswerFiles>
        </vs-tab>
        <vs-tab label="Загрузки">
          <LoadingFiles style="margin-top: 20px"></LoadingFiles>
        </vs-tab>
      </vs-tabs>
    </div>
  </div>
</template>

<script>
import {mapActions, mapGetters} from 'vuex'
    import FnsAnswerFiles from "./FnsAnswerFiles.vue";
    import Back from "../../components/Back.vue";
    import LoadingFiles from "./LoadingFiles.vue";
    export default {
      components: {
        FnsAnswerFiles,Back,LoadingFiles
      },
      computed: {
        ...mapGetters([
          'FnsAnswerFileName'
        ]),
      },
      methods: {
        ...mapActions([
            'getFnsAnswerFileName'
        ]),
      },
      mounted () {
        this.getFnsAnswerFileName(this.$route.params.id);
      }
    }

</script>

<style lang="scss">
    #page-user-list {
    .user-list-filters {
    .vs__actions {
        position: absolute;
        right: 0;
        top: 50%;
        transform: translateY(-58%);
    }
    }
    }
</style>

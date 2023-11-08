<template>
    <div id="page-user-list">
        <div class="vx-card p-6" style="min-width: 95vh;">
          <div class="inline-flex items-center" style="cursor: pointer;" @click="backToList">
            <span class="text-primary cursor-default">
              <arrow-left-icon  style="cursor: pointer;" size="1.5x" class="custom-class" ></arrow-left-icon>
            </span>
            <h4 style="margin-left: 10px">Назад к списку</h4>
            <span class="breadcrumb-separator mx-2 flex items-start">
              <span class="feather-icon select-none relative"></span>
            </span>
          </div>
          <hr style="margin-bottom: 15px; margin-top: 15px; border: 0.5px solid #7367f0;">
          <FnsAnswer :from_fns_answers="true"></FnsAnswer>
        </div>
    </div>
</template>

<script>
    import { mapActions } from 'vuex'
    import FnsAnswer from "./FnsAnswer.vue";
    import { ArrowLeftIcon } from 'vue-feather-icons'
    export default {
        components: {
          FnsAnswer,ArrowLeftIcon
        },
        methods: {
          backToList(){
            this.$router.back();
          },
          ...mapActions([
              'getDataDebtorsById'
          ]),
        },
        mounted () {
          this.getDataDebtorsById(this.$route.params.id);
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

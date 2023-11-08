<template>
    <div >

      <div v-if="params.value === 1">
        Проверено
      </div>
      <div v-if="params.value === 2 && params.data.cancel_claim === 0" @click="showClaims" class="hover:text-primary cursor-pointer" style="color: royalblue">
        На обжаловании
      </div>
      <div v-if="params.value === 3 && params.data.cancel_claim === 0" @click="showClaims" class="hover:text-primary cursor-pointer" style="color: royalblue">
        Обжаловано
      </div>
      <div v-if="params.value === 3 && params.data.cancel_claim === 1" @click="showClaims" class="hover:text-primary cursor-pointer" style="color: royalblue">
        На отзыве
      </div>
      <div v-if="params.value === 3 && params.data.cancel_claim === 2" @click="showClaims" class="hover:text-primary cursor-pointer" style="color: royalblue">
        Отозвано
      </div>
      <div v-if="params.value === 2 && params.data.cancel_claim === 1" @click="showClaims" class="hover:text-primary cursor-pointer" style="color: royalblue">
        Отменено
      </div>


  <vs-popup classContent="popup-example" title="Основания для обжалования" :active.sync="popupClaims">
    <vs-button @click="cancelClaim">Отозвать жалобу</vs-button>
    <span style="margin-left: 10px;color: red" v-if="FsspPostanClaimCancelInfo === 1">На отзыве</span>
    <span style="margin-left: 10px;color: red" v-if="FsspPostanClaimCancelInfo === 2">Отозвано</span>
    <span style="margin-left: 10px;color: red" v-if="FsspPostanClaimCancelInfo === 3">Отменено</span>
    <div style="margin-top: 10px" v-for="claim in FsspPostanClaimsArr">
      - {{ claim }}
    </div>
  </vs-popup>
    </div>
</template>

<script>
    import Vue from 'vue'
    import { mapActions,mapGetters } from 'vuex'
    export default {
        name: 'ResCheck',
      data() {
        return {
          popupClaims:false,
          claims:{},
        }
      },
        computed: {
          ...mapGetters([
              'FsspPostanClaimsArr','FsspPostanClaimCancelInfo'
          ]),
        },
        methods: {
          ...mapActions([
            'getPostanClaims','getPostanCancelInfo','cancelPostanClaim'
          ]),
          showClaims(){
            this.getPostanClaims(this.params.data.id);
            this.getPostanCancelInfo(this.params.data.id);
            this.popupClaims = true;
          },
          cancelClaim(){
            this.cancelPostanClaim(this.params.data.id).then((response) => {
              if (response){
                this.getPostanCancelInfo(this.params.data.id);
              }
            });
          },
        }
    }
</script>

<template>
    <div style="">
      <div class="centerx">
        <vs-tooltip text="Для ввода пустого значения нажмите на крестик" position="top" color="rgb(211,51,0)">
          <h6 class="h6 mb-1">Место нахождения ИД:<VarToClipboard name="dc_find_sa"/></h6>
        </vs-tooltip>
      </div>
      <div class="trigger_vyn_el">
      <v-select class="mb-2" style="width: 200px;" :options="MestoIdList" v-model="Deb.debtorCredit.find_sa" @input="changeDeb"></v-select>
      </div>
      <!-- <div class="hidden_vyn_el" style="padding-left: 10px;padding-right: 10px;padding-top: 5px;padding-bottom: 5px;background-color: #FCEEE0;border-radius: 0px 0px 5px 5px;">
        <p style="font-size: 8pt;color: red;line-height: 1em;">Для ввода пустого значения нажмите на крестик</p>
      </div> -->
    </div>
</template>

<script>
    import Vue from 'vue'
    import { mapActions,mapGetters } from 'vuex'
    import VarToClipboard from "../../../VarToClipboard.vue";
    import vSelect from "vue-select";
    export default {
      components: {
        'v-select': vSelect,VarToClipboard
      },
        data () {
            return {
              showVyn:false,
            }
        },
      mounted(){
        this.getMestoIdList();

      },
      computed: {
        ...mapGetters([
          'Deb','MestoIdList'
        ]),
      },
        methods: {
            ...mapActions([
              'getMestoIdList','changeDeb'
            ]),

          sobit(){
            console.log('dadasd')
          }

        }
    }
</script>

<style lang="scss">
.hidden_vyn_el { display: none; }
.trigger_vyn_el:hover + .hidden_vyn_el { display: block; }
</style>

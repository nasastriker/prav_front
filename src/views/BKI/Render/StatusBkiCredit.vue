<template>
    <div >
        <template v-if="params.value===1">
            <vs-chip  class="ag-grid-cell-chip cursor-pointer" style="color:deepskyblue;margin-top: 12px">
                <span style="padding-right: 30px;padding-left: 30px" >не загружен ответ</span>
            </vs-chip>
        </template>
        <template v-if="params.value===2">
            <vs-chip  class="ag-grid-cell-chip cursor-pointer" color="success" style="margin-top: 12px">
                <span style="padding-right: 30px;padding-left: 30px" >успешно</span>
            </vs-chip>
        </template>
        <template v-if="params.value===3">
            <div  @click="showError">
            <vs-chip  class="ag-grid-cell-chip cursor-pointer" color="warning" style="margin-top: 12px">
                <span  style="padding-right: 30px;padding-left: 30px" >ошибка</span>
            </vs-chip>
            </div>

        </template>

        <vs-popup  classContent="popup-example"  title="Ошибка" :active.sync="errorPopup">
            <textarea readonly style="width: 100%;height: 100%" v-model="params.data.error"></textarea>
        </vs-popup>


    </div>
</template>

<script>
    import Vue from 'vue'

    import { mapActions,mapGetters,mapMutations } from 'vuex'
    export default {
        data(){
            return{
                errorPopup:false,
            }
        },
        methods:{
          showError(){
            this.errorPopup=true
          },
        }
    }
</script>

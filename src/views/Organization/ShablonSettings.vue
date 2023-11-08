<template>
  <div>
    <template v-for="item in settings">
      <div class="vx-row" style="margin-bottom: 10px">
        <span style="margin-left: 20px;margin-right: 10px;margin-top: 10px; color: #0e84b5">{{item.name}} ID №</span>
        <!--                <vs-input type="number" v-model="item.value" @blur="changeSetting"></vs-input>-->
        <v-select style="width: 200px" class="w-50 " :reduce="label => label.id" label="nameForTask" :options="ShablonDocumentsArr" v-model="item.value" @input="changeSetting"></v-select>
      </div>
    </template>

  </div>
</template>

<script>
import axios from '../../axios'
import {mapActions, mapGetters} from 'vuex'
import r from '../../route'
export default {
  data(){
    return{
      settings:[],
    }
  },
  mounted(){
    this.getDataShablonDocuments();
    axios.get(r('organization.index'), {
      params: {
        method: 'getShablonSettings',
        param: this.$route.params.id
      }
    }).then(res=>{
      if(res.data.result){
        this.settings=res.data.data
      }
    })
  },
  computed: {
    ...mapGetters([
      'ShablonDocumentsArr'
    ]),

  },
  methods:{
    ...mapActions([
      'getDataShablonDocuments'
    ]),
    changeSetting(){
      this.$vs.loading({ color: '#ff8000' })
      axios.post(r('organization.update'), {
        params: {
          method: 'saveShablonSettings',
          param: this.settings
        }
      }).then(res=>{
        if(res.data.result){
          this.$vs.notify({
            title: 'Успешно',
            text: 'Успешно!!!',
            color: 'success',
            position: 'top-center'
          })
        }
        else{
          this.$vs.notify({
            title: 'Ошибка',
            text: 'Ошибка !!!',
            color: 'danger',
            position: 'top-center'
          })
        }
        this.$vs.loading.close()
      }).catch(e=>{
        this.$vs.notify({
          title: 'Ошибка',
          text: 'Ошибка !!!',
          color: 'danger',
          position: 'top-center'
        })
        this.$vs.loading.close()
      })
    }
  },
}
</script>

<style scoped>

</style>
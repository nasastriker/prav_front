<template>
  <vx-card no-shadow>
    <h3>{{label}} </h3>
    <h6 style="margin-top: 15px" class="mb-1">Дата начала:</h6>
    <vs-input type="date" class="w-100 mb-4" v-model="rate.data_begin"></vs-input>
    <h6 class="mb-1">Дата окончания:</h6>
    <vs-input  type="date" class="w-100 mb-4"  v-model="rate.data_end"></vs-input>
    <h6 class="mb-1">Ставка:</h6>
    <vs-input   class="w-100 mb-base"  v-model="rate.rate"></vs-input>
    <div style="margin-top: 20px">
      <vs-button color="primary"  class="pull-right mr-4" type="filled"  @click="$router.push('/handbook/StavkaCB/')">Закрыть</vs-button>
      <vs-button color="success" class="pull-right" type="filled"  @click="save">Сохранить</vs-button>

    </div>


  </vx-card>
</template>

<script>
import r from '../../route';
import { mapActions } from 'vuex'
import axios from '../../axios'
export default {
  components: {
  },
  data () {
    return {
      label:'Редактирование:',
      rate:{

      },
    }
  },
  mounted(){
    if (this.$route.params.id){
      if (this.$route.params.id!='new') {
        this.getData(this.$route.params.id);
        this.label='Редактирование:'
      }else {
        this.label='Новый период:'
      }
    }
  },
  methods: {
    ...mapActions([
      'saveRate',
    ]),
    getData(id){
      axios.get(r("ratecb.index"), {
        params: {
          method: 'getRate',
          param: id

        }
      }).then((response) => {
        if (response.data.result){
          this.rate=response.data.data
        }
      })
    },
    save(){
      this.rate.id=this.$route.params.id;
      this.saveRate(this.rate).then((response) => {
        if(response){
          this.$vs.notify({  title:'Успешно', text: 'Сохранено!!!', color: 'success', position: 'top-center' })
          this.$router.push('/stavkaCB/')
        }
        else{
          this.$vs.notify({  title:'Ошибка', text: 'Сохранить не удалось !!!', color: 'danger', position: 'top-center' })
        }
      })
    },
  },
}
</script>

<template >
  <div>
      <h6 class="h6" style="margin-top: 25px">Госпошлина Судебный приказ:</h6>
      <vs-input class="w-100 " v-model="data.sud" ></vs-input>
      <h6 class="h6" style="margin-top: 25px">Госпошлина Исковое:</h6>
      <vs-input class="w-100 " v-model="data.isk" ></vs-input>
      <h6 class="h6" style="margin-top: 25px">Госпошлина Полная:</h6>
      <vs-input class="w-100 " v-model="data.full" ></vs-input>
      <h6 class="h6" style="margin-top: 25px">Госпошлина Оплаченная на текущий момент:</h6>
      <vs-input class="w-100 " v-model="data.pay" ></vs-input>
  </div>
</template>

<script>
import r from '../../../../route';
import axios from '../../../../axios'
export default {
    props: ['id_debcredit'],
    components: {
    },
    data() {
        return {
            data:{

            }
        }
    },
    computed: {},
    methods: {
        getData() {
            if (this.id_debcredit != null) {
                axios.get(r("debtorCredit.index"), {
                    params: {
                        method: 'getInfoGosp',
                        param: this.id_debcredit
                    }
                }).then((response) => {
                    if (response.data.result) {
                        this.data =  response.data.data;

                    }
                })
            }
        }
    },
    mounted() {
        this.getData()
    }
}


</script>

<style lang="scss">

</style>

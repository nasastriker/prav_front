<template>
    <vx-card no-shadow   style="min-height: 95vh;"  >
    <div>
        <h8 style="margin-bottom: 5px">Название переменнной</h8>
        <div class="vx-row">
            <span style="color:blue;margin-top: 5px;margin-left: 20px;margin-right: 5px">calc_</span>
            <vs-input class="w-50" style="margin-bottom: 5px;min-width: 85%" v-model="formula.name"></vs-input>
        </div>

        <h8>Введите формулу</h8>
        <vs-textarea class="w-full" style="margin-bottom: 5px" v-model="formula.formula"></vs-textarea>
        <div style="text-align: center">
            <vs-button @click="save">Сохранить</vs-button>
            <vs-button @click="close">Отмена</vs-button>

        </div>
    </div>
    </vx-card>
</template>

<script>
import r from '../../route'
import { mapActions, mapGetters } from 'vuex'
import axios from '../../axios'
export default {
  props:['id'],
  data () {
    return {
      formula:{
        id:'new',
        formula:'',
        name:''
      }
    }
  },
  mounted () {
    if (this.$route.params.id === 'new') {
      this.formula = {
        id:'new',
        formula:'',
        name:''
      }
    } else {
      this.getCalculateVarsOnce(this.$route.params.id).then(res => {
        if (res.result) {
          this.formula = res.data
        } else {
          this.$vs.notify({
            title: 'Ошибка',
            text: 'Ошибка !!!',
            color: 'danger',
            position: 'top-center'
          })
        }
      }).catch(err => {
        this.$vs.notify({
          title: 'Ошибка',
          text: 'Ошибка !!!',
          color: 'danger',
          position: 'top-center'
        })
      })
    }
  },
  computed: {
    ...mapGetters([''])

  },
  methods: {
    ...mapActions(['getCalculateVarsOnce', 'VerifyFormula', 'getCalculateVarsArr']),
    close () {
      this.$router.back()
    },
    save () {
      if (this.formula.name === '') {
        this.$vs.notify({
          title: 'Ошибка',
          text: 'Заполните название переменной',
          color: 'danger',
          position: 'top-center'
        })
        return
      }
      if (this.formula.formula === '') {
        this.$vs.notify({
          title: 'Ошибка',
          text: 'Введите формулу',
          color: 'danger',
          position: 'top-center'
        })
        return
      }
      this.VerifyFormula(this.formula.formula).then(result => {
        if (result !== true) {
          this.$vs.notify({
            title: 'Ошибка',
            text: `Ошибка! ${result}`,
            color: 'danger',
            position: 'top-center'
          })
                        
        }
      })
      axios.post(r('calculateVars.update'), {
        params: {
          method: 'save',
          param: this.formula
        }
      }).then(res => {
        if (res.data.result) {
          this.$vs.notify({
            title: 'Успешно',
            text: 'Успешно!!!',
            color: 'success',
            position: 'top-center'
          })
          this.getCalculateVarsArr()
          this.close()
        } else {
          this.$vs.notify({
            title: 'Ошибка',
            text: 'Ошибка !!!',
            color: 'danger',
            position: 'top-center'
          })
        }
      }).catch(e => {
        this.$vs.notify({
          title: 'Ошибка',
          text: 'Ошибка !!!',
          color: 'danger',
          position: 'top-center'
        })
      })
    }
  }
}
</script>

<style scoped>

</style>
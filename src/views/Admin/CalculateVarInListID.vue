<template>
    <vx-card no-shadow   style="min-height: 95vh;"  >
        <div>
            <h6 style="margin-bottom: 5px">Название переменнной</h6>
                <vs-input class="w-50" style="margin-bottom: 5px;" v-model="formula.name" ></vs-input>

            <h6>Введите формулу</h6>
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
        name:'',
        id_reestr:this.$route.params.id_reestr
      },
      searchQuery: ''

    }
  },
  mounted () {
    if (this.$route.params.id === 'new') {
      this.formula = {
        id:'new',
        formula:'',
        name:'',
        id_reestr:this.$route.params.id_reestr
      }
    } else {
      this.getCalculateVarsInListOnce(this.$route.params.id).then(res => {
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
    ...mapActions(['getCalculateVarsInListOnce', 'VerifyFormula', 'getCalculateVarsInList']),
    checkName () {
      if (this.formula.name.slice(0, 5) !== '${dc_') {
        this.$vs.notify({
          title: 'Ошибка',
          text: 'Заполните название переменной (Название должно начинаться с ${dc_ )',
          color: 'danger',
          position: 'top-center'
        })
        return false
      }
      if (this.formula.name.slice(-1) !== '}') {

        this.$vs.notify({
          title: 'Ошибка',
          text: 'Заполните название переменной (Название должно заканчиваться на } )',
          color: 'danger',
          position: 'top-center'
        })
        return false
      }
      return true
    },
    close () {
      this.$router.back()
    },
    save () {
      if (!this.checkName()) {
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
          this.getCalculateVarsInList(this.$route.params.id_reestr)
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
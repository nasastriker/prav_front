<template>
    <div>
      <span style="color: blue" class="hover:text-primary cursor-pointer mr-4" @click="showNewCheckBox">[ Добавить ]</span>
      <span style="color: red" class="hover:text-primary cursor-pointer mr-4" v-if="editFlag" @click="editFlag=!editFlag">[ Отключить редактирование ]</span>
      <span style="color: blue" class="hover:text-primary cursor-pointer" v-else @click="editFlag=!editFlag">[ Редактировать ]</span>

      <div v-if="CheckBoxList.length > 0">
        <div v-for="chBox in CheckBoxList">
<!--          <vs-checkbox :title="chBox.shab_text" style="margin-top: 15px" v-model="chBox.val" @input="changeDynCheckBox(chBox)">-->
          <vs-checkbox :title="chBox.shab_text" style="margin-top: 15px" v-model="Deb.debtorCreditDop[chBox.perem]" @input="changeDeb">
            {{ chBox.name }}
          </vs-checkbox>

          <span v-if="editFlag" style="color: red" class="hover:text-primary cursor-pointer mr-4" @click="showDataCheckBox(chBox.perem)">Изменить</span>
          <span v-if="editFlag" style="color: red" class="hover:text-primary cursor-pointer" @click="showQuestDelCheckBox(chBox.perem)">Удалить</span>
        </div>
      </div>

      <vs-popup class="holamundo" title="Добавление:" :active.sync="showAddCheckBox">
        <h6 class="mb-1">Название</h6>
        <vs-input class="w-full mb-4" v-model="data.name"></vs-input>
        <h6 class="mb-1">Переменная (Допустимы только латинские буквы)</h6>
        <vs-input v-if="changeFlag" class="w-full mb-4" v-model="data.perem" @keypress="validateChar" disabled></vs-input>
        <vs-input v-else class="w-full mb-4" v-model="data.perem" @keypress="validateChar"></vs-input>
        <h6 class="mb-1">Текст для вставки в шаблон:</h6>
        <vs-textarea height="250px" rows="10" class="w-100" v-model="data.shab_text"> </vs-textarea>

        <vs-button v-if="changeFlag" color="danger" class="mr-4" @click="changeCB">Изменить</vs-button>
        <vs-button v-else color="primary" @click="saveCB">Сохранить</vs-button>
      </vs-popup>
    </div>
</template>

<script>
    import { mapActions,mapGetters } from 'vuex';
    import VarToClipboard from "../VarToClipboard.vue";
    export default {
        components: {
          VarToClipboard
        },

        props:['prist_perem'],
        data () {
            return {
              showAddCheckBox:false,
              changeFlag:false,
              data: {},
              delPerem: '',
              editFlag:false,
            }
        },
        mounted(){
          this.getCheckBoxList({prist_perem: this.prist_perem, id_credit: this.Deb.debtorCredit.id});
        },
        computed: {
            ...mapGetters([
                'User','Deb','CheckBoxList'
            ]),
        },
        methods: {
          deleteOneCheckBox(){
            this.deleteCheckBox(this.delPerem).then((response) => {
                  if (response.result) {
                    this.getCheckBoxList({prist_perem: this.prist_perem, id_credit: this.Deb.debtorCredit.id});
                    this.$vs.notify({
                      title: 'Успешно',
                      text: 'Сохранено!!!',
                      color: 'success',
                      position: 'top-center'
                    })
                  } else {
                    this.$vs.notify({
                      title: 'Ошибка',
                      text: 'Удалить не удалось',
                      color: 'danger',
                      position: 'top-center'
                    })
                  }
            });
          },

          closeDialog(){},
          showQuestDelCheckBox(perem){
            this.delPerem = perem;
            this.$vs.dialog({
              type: 'confirm',
              color: 'danger',
              title: 'Внимание',
              text: 'Вы действительно хотите удалить?',
              accept: this.deleteOneCheckBox,
              cancel:this.closeDialog,
              acceptText: 'Да',
              cancelText: 'Нет',
              parameters: ['hello']
            })
          },

          changeCB(){
            let flag = true;

            if (typeof this.data.name == 'undefined' || this.data.name.trim() == '' || this.data.name.trim() == ' '){
              flag = false;
            }
            if (typeof this.data.shab_text == 'undefined' || this.data.shab_text.trim() == '' || this.data.shab_text.trim() == ' '){
              flag = false;
            }

            if (flag) {
              this.changeCheckBox({data: this.data, prist_perem: this.prist_perem}).then((response) => {
                if (response.result) {
                  this.showAddCheckBox = false;
                  this.getCheckBoxList({prist_perem: this.prist_perem, id_credit: this.Deb.debtorCredit.id});
                  this.$vs.notify({
                    title: 'Успешно',
                    text: 'Сохранено!!!',
                    color: 'success',
                    position: 'top-center'
                  })
                } else {
                  this.$vs.notify({
                    title: 'Ошибка',
                    text: 'Ошибка',
                    color: 'danger',
                    position: 'top-center'
                  })
                }
              });
            } else {
              this.$vs.notify({
                title: 'Ошибка',
                text: 'Заполните необходимые поля',
                color: 'danger',
                position: 'top-center'
              })
            }
          },

          showNewCheckBox(){
            this.data = {};
            this.showAddCheckBox = true;
            this.changeFlag = false;
          },

          showDataCheckBox(perem){
            this.getDataOneCheckBox({perem: perem, prist_perem: this.prist_perem}).then((response) => {
                  if (response.result) {
                    this.data = response.data;
                    this.showAddCheckBox = true;
                    this.changeFlag = true;
                  } else {
                    this.$vs.notify({
                      title: 'Ошибка',
                      text: 'Ошибка',
                      color: 'danger',
                      position: 'top-center'
                    })
                  }
            });
          },

          changeDynCheckBox(chBoxOne){
            // console.log({chBoxOne: chBoxOne, id_credit: this.Deb.debtorCredit.id})
            this.saveCheckBoxVal({chBoxOne: chBoxOne, id_credit: this.Deb.debtorCredit.id, prist_perem: this.prist_perem}).then((response) => {
                  if (!response.result) {
                    this.$vs.notify({
                      title: 'Ошибка',
                      text: 'Ошибка',
                      color: 'danger',
                      position: 'top-center'
                    })
                  } else {
                    // this.changeDeb();
                  }
            });
          },

          saveCB(){
            let flag = true;

            if (typeof this.data.name == 'undefined' || this.data.name.trim() == '' || this.data.name.trim() == ' '){
              flag = false;
            }
            if (typeof this.data.perem == 'undefined' || this.data.perem.trim() == ''){
              flag = false;
            }
            if (typeof this.data.shab_text == 'undefined' || this.data.shab_text.trim() == '' || this.data.shab_text.trim() == ' '){
              flag = false;
            }

            if (flag) {
              this.saveCheckBox({data: this.data, prist_perem: this.prist_perem}).then((response) => {
                if (response.result) {
                  this.showAddCheckBox = false;
                  this.getCheckBoxList({prist_perem: this.prist_perem, id_credit: this.Deb.debtorCredit.id});
                  this.$vs.notify({
                    title: 'Успешно',
                    text: 'Сохранено!!!',
                    color: 'success',
                    position: 'top-center'
                  })
                } else {
                  this.$vs.notify({
                    title: 'Ошибка',
                    text: response.error,
                    color: 'danger',
                    position: 'top-center'
                  })
                }
              });
            } else {
              this.$vs.notify({
                title: 'Ошибка',
                text: 'Заполните необходимые поля',
                color: 'danger',
                position: 'top-center'
              })
            }
          },
          validateChar: event => {
            const charCode = String.fromCharCode(event.keyCode);
            if (!/[a-z,A-Z]/.test(charCode)) {
              event.preventDefault();
            }
          },

          ...mapActions([
              'saveCheckBox','getCheckBoxList','saveCheckBoxVal','getDataOneCheckBox','changeCheckBox','deleteCheckBox',
              'changeDeb'
          ]),

        },
    }
</script>

<style lang="scss">
    .address-component {
        flex: 1 1 auto;
        width: 1%;

    input {
        height: auto;
        width: 100%;
        padding: 0.375rem 0.75rem;
        font-size: 1rem;
        font-weight: 400;
        line-height: 1.5;
        color: #495057;
        background-color: #fff;
        background-clip: padding-box;
        border: 1px solid #ced4da;
        border-radius: 0.25rem;
        transition: border-color 0.15s ease-in-out, box-shadow 0.15s ease-in-out;
        border-top-left-radius: 0;
        border-bottom-left-radius: 0;

    &:focus {
         color: #495057;
         background-color: #fff;
         border-color: #80bdff;
         outline: 0;
         box-shadow: 0 0 0 0.2rem rgba(0, 123, 255, 0.25);
     }
    }
    }
</style>

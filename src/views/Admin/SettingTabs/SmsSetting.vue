<template>
    <vx-card no-shadow style="    min-height: 80vh;">
        <div>
          <h6 class="h7">Смс провайдер:</h6>
          <v-select  class="w-50 " label="name" :options="arr"  v-model="data.type" @input="save"  ></v-select>
        </div>
      <template v-if="data.type=='BEELINE'">
        <h6 class="h7" >Beeline Url </h6>
        <vs-input type="text" class="w-full " v-model="data.beeline_url" @change="save" ></vs-input>

        <h6 class="h7" >Beeline Username </h6>
        <vs-input type="text" class="w-full " v-model="data.beeline_username" @change="save" ></vs-input>

        <h6 class="h7" >Beeline Password </h6>
        <vs-input type="text" class="w-full " v-model="data.beeline_password" @change="save" ></vs-input>

      </template>
      <template v-if="data.type=='MTS'">
        <h6 class="h7" >Mts Name  </h6>
        <vs-input type="text" class="w-full " v-model="data.mts_name" @change="save" ></vs-input>

        <h6 class="h7" >Mts Token </h6>
        <vs-input type="text" class="w-full " v-model="data.mts_token" @change="save" ></vs-input>

      </template>
      <template v-if="data.type=='MANGO'">
        <h6 class="h7" >Mango Key  </h6>
        <vs-input type="text" class="w-full " v-model="data.mango_key" @change="save" ></vs-input>

        <h6 class="h7" >Mango Код АТС </h6>
        <vs-input type="text" class="w-full " v-model="data.mango_code" @change="save" ></vs-input>

        <h6 class="h7" >Mango внутренний номер сотрудника </h6>
        <vs-input type="text" class="w-full " v-model="data.mango_from_extension" @change="save" ></vs-input>

        <h6 class="h7" >Mango Имя отправителя </h6>
        <vs-input type="text" class="w-full " v-model="data.mango_sender" @change="save" ></vs-input>
      </template>

      <h6 class="h7" style="margin-top: 50px">Тест:</h6>
      <h6 class="h7">Текст Сообщения:</h6>
      <vs-textarea class="w-100"  v-model="text" > </vs-textarea>
      <h6 class="h7">Номер телефона:</h6>
      <vs-input type="text" class="w-full " v-model="phone"  ></vs-input>
      <vs-button style="margin-top: 15px" @click="sendSms" color="primary" type="border" >Отправить</vs-button>
    </vx-card>
</template>

<script>
    import r from '@/route';
    import axios from '@/axios'

    export default {
        components: {
        },

        data () {
            return {
                text:'',
                phone:'',
                arr:['BEELINE','MANGO','MTS'
                ],
                data:{
                  type:null,
                },
            }
        },
        methods: {
            sendSms(){
              this.$vs.loading({ color: '#ff8000' })
              axios.post(r("sms.update"), {
                params: {
                  method: 'sendSms',
                  param: {
                    text:this.text,
                    phone:this.phone,
                  }

                }
              }).then((response) => {
                if (response.data.result) {

                  this.$vs.notify({
                    title: 'Успешно',
                    text: 'Сохранено!!!',
                    color: 'success',
                    position: 'top-center'
                  })

                }
                else {
                  this.$vs.notify({
                    title: 'Ошибка',
                    text: 'Сохранить не удалось !!!',
                    color: 'danger',
                    position: 'top-center'
                  })
                  // this.close();
                }
                this.$vs.loading.close()
                this.getData()
              }).catch(e=>{
                this.$vs.loading.close()
              })
            },
            getData(){
                axios.get(r("sms.index"), {
                    params: {
                        method: 'getSmsSetting',

                    }
                }).then((response) => {
                    if (response.data.result){

                        this.data=response.data.data

                    }

                })
            },
            save(){
                this.$vs.loading({ color: '#ff8000' })
                axios.post(r("sms.update"), {
                    params: {
                        method: 'saveSmsSetting',
                        param: this.data

                    }
                }).then((response) => {
                    if (response.data.result) {

                        this.$vs.notify({
                            title: 'Успешно',
                            text: 'Сохранено!!!',
                            color: 'success',
                            position: 'top-center'
                        })

                    }
                    else {
                        this.$vs.notify({
                            title: 'Ошибка',
                            text: 'Сохранить не удалось !!!',
                            color: 'danger',
                            position: 'top-center'
                        })
                        // this.close();
                    }
                    this.$vs.loading.close()
                    this.getData()
                }).catch(e=>{
                    this.$vs.loading.close()
                })


            },


        },
        mounted(){

            this.getData()

        },
    }
</script>
<style lang="scss">
    .h7{
        font-size: 14px;
        color: cadetblue;
        margin-top: 5px;
    }
    .f {

        border: 1px; border-style: double;border-color: #62626262; border-radius: 8px;
    }
    .l {
        color: #a00;
        padding: 0 10px;
    }


</style>


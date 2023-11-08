<template>
  <vx-card no-shadow>

    <!-- Password 1 -->
    <div class="vx-col w-1/2">
      <vs-input type="password" size="large" v-validate="'min:6|max:10'" label="Новый пароль" name="password" v-model="updatePassword" class="mt-5 w-full" />
      <span class="text-danger text-sm" v-show="errors.has('password')">{{ errors.first('password') }}</span>
    </div>

    <!-- Confirm Password -->
    <div class="vx-col w-1/2">
      <vs-input type="password" size="large" v-validate="'min:6|max:10'" label="Подтверждение пароля" name="confirm_password" v-model="passwordConfirmation" class="mt-5 w-full" data-vv-as="Подтверждением" />
      <span class="text-danger text-sm" v-show="errors.has('confirm_password')">{{ errors.first('confirm_password') }}</span>
    </div>

    <!-- Save & Reset Button -->
    <div class="flex flex-wrap items-center justify-end">
      <vs-button class="ml-auto mt-2" @click="savePassword">Сохранить</vs-button>
    </div>
  </vx-card>
</template>

<script>
    import { mapActions } from 'vuex'
    export default {

        data () {
            return {
                updatePassword:'',
                passwordConfirmation:'',
            }
        },
        methods:{
            ...mapActions([
                'resetPassword'

            ]),
            savePassword(){

                if(this.updatePassword!= this.passwordConfirmation){
                    this.$vs.notify({  title:'Ошибка', text: 'Пароль и его подтверждение не совпадают', color: 'danger', position: 'top-center' })

                }
                else{
                    this.resetPassword({
                        pass:this.updatePassword,
                        passConf:this.passwordConfirmation
                    }).then((response) => {
                        this.updatePassword=''
                        this.passwordConfirmation=''
                        //  console.log(response)
                        if(response){
                            this.$vs.notify({  title:'Успешно', text: 'Пароль изменен успешно!!!', color: 'success', position: 'top-center' })

                        }
                        else{

                            this.$vs.notify({  title:'Неудачно', text: 'Пароль изменить не удалось', color: 'danger', position: 'top-center' })

                        }



                    })
                }

            },
        },
        computed: {
            activeUserInfo () {
                return this.$store.state.AppActiveUser
            }
        }
    }
</script>

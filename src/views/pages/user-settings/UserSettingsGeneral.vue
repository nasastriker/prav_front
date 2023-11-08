<template>
  <vx-card no-shadow>

    <!-- Img Row -->
    <div class="flex flex-wrap items-center mb-base">
      <vs-avatar :src="UrlAvatar" size="70px" class="mr-4 mb-4" />
      <div>
        <vs-button class="mr-4 sm:mb-0 mb-2"  @click="chooseFiles()">Загрузить фото</vs-button>
        <vs-input id="fileUpload" type="file"  class="w-full mb-base" label-placeholder="file"  v-on:change="saveAvatar($event)" style="display: none"/>


        <p class="text-sm mt-2">Допускаются JPG, GIF или PNG. Максимальный размер 800 КБ</p>
      </div>
    </div>

    <!-- Info -->
    <div class="mb-12">
        <vs-input class="w-full mb-8" label-placeholder="Имя" v-model="User.name"></vs-input>
    </div>
    <div class="mb-12">
        <vs-input class="w-full mb-2 mt-12" label-placeholder="Фамилия" v-model="User.name_family"></vs-input>
    </div>
    <div class="mb-8">
        <vs-input class="w-full mb-2" label-placeholder="Отчетсво" v-model="User.name_patronymic"></vs-input>
    </div>

    <div class="mt-6 mb-12">
      <label class="text-sm">Пол</label>
      <div class="mt-2">
        <vs-radio v-model="User.sex" vs-value="M" class="mr-4">Мужской</vs-radio>
        <vs-radio v-model="User.sex" vs-value="F" class="mr-4">Женский</vs-radio>
      </div>
    </div>

    <div class="mt-4 mb-12">
        <vs-input class="w-full mb-base mb-2" label-placeholder="Телефон" v-model="User.phone"></vs-input>
    </div>
    <div class="mb-12">
        <vs-input class="w-full" label-placeholder="Email" disabled  v-model="User.email"></vs-input>
    </div>

    <!--  <vs-alert icon-pack="feather" icon="icon-info" class="h-full my-4" color="warning">
       <span>Your account is not verified. <a href="#" class="hover:underline">Resend Confirmation</a></span>
     </vs-alert> -->

    <!--  <vs-input class="w-full my-base" label-placeholder="Company" v-model="company"></vs-input>-->

     <!-- Save & Reset Button -->
    <div class="flex flex-wrap items-center justify-end">
      <vs-button class="ml-auto mt-2" @click="save">Сохранить</vs-button>
      </div>
  </vx-card>
</template>

<script>
    import { mapActions,mapGetters } from 'vuex'
export default {
    components: {
    },
  data () {
    return {

        fileAvatar:{},

        username: 'johny_01',
      name: this.$store.state.AppActiveUser.displayName,
      email: 'john@admin.com',
      company: 'SnowMash Technologies Pvt Ltd'
    }
  },
    mounted(){
        this.getDataUser();
    },

    computed: {
        ...mapGetters([
            'User',

        ]),
        UrlAvatar:function () {
            return this.User.photoURL
        },
    activeUserInfo () {
      return this.$store.state.AppActiveUser
    }
  },
    methods: {
        ...mapActions([
            'getDataUser',
            'setDataUser',
            'setAvatar',
            'resetPassword'

        ]),

        chooseFiles: function() {
            document.getElementById("fileUpload").click()
        },
        save(){
            this.setDataUser().then((response) => {
                if(response){
                    this.$vs.notify({  title:'Успешно', text: 'Сохранено!!!', color: 'success', position: 'top-center' })
                }



            })
        },
        handleFileChange(evt) {
            this.fileAvatar = evt.target.files;

        },

        saveAvatar(evt){
        //    console.log(evt.target.files[0])
            this.setAvatar(evt.target.files).then((response) => {
                if(response){
                    this.$vs.notify({  title:'Успешно', text: 'Сохранено!!!', color: 'success', position: 'top-center' })
                }



            })
        }

    },
}
</script>

<style>
    #profile-tabs .vs-placeholder-label,
    #profile-tabs .vs-input--label{
        font-size: 12px;
        color: rgba(var(--vs-primary),1)!important;
    }
</style>

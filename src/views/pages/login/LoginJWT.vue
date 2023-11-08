<!--         label-placeholder="" -->
<template>
  <div>
    <h6 class="mb-2">Email</h6>
    <vs-input
        v-validate="'required|email|min:3'"
        data-vv-validate-on="blur"
        name="email"
        icon-no-border
        icon="icon icon-user"
        icon-pack="feather"
        v-model="email"
        class="w-full mb-4 login_input"/>
    <span class="text-danger text-sm">{{ errors.first('email') }}</span>

    <h6 class="mb-2">Password</h6>
    <vs-input
        v-on:keyup.enter="loginJWT"
        data-vv-validate-on="blur"
        v-validate="'required|min:6|max:10'"
        type="password"
        name="password"
        icon-no-border
        icon="icon icon-lock"
        icon-pack="feather"
        v-model="password"
        class="w-full login_input" />
    <span class="text-danger text-sm">{{ errors.first('password') }}</span>

    <div class="flex flex-wrap justify-between my-5">
        <vs-checkbox v-model="checkbox_remember_me" class="mb-3">Запомнить меня</vs-checkbox>

    </div>
    <div class="flex flex-wrap justify-between mb-3">

      <vs-button :disabled="!validateForm" @click="loginJWT">Вход</vs-button>
    </div>
  </div>
</template>

<script>
export default {
  data () {
    return {
        email: '',
        password: '',
        checkbox_remember_me: true
    }
  },
  computed: {
    validateForm () {
      return !this.errors.any() && this.email !== '' && this.password !== ''
    }
  },
  methods: {
    checkLogin () {
      // If user is already logged in notify
      if (this.$store.state.auth.isUserLoggedIn()) {

        // Close animation if passed as payload
        // this.$vs.loading.close()

        this.$vs.notify({
          title: 'Login Attempt',
          text: 'You are already logged in!',
          iconPack: 'feather',
          icon: 'icon-alert-circle',
          color: 'warning'
        })
          this.$router.push('/')

        return false
      }
      return true
    },
    loginJWT () {

    //  if (!this.checkLogin()) return

      // Loading
      this.$vs.loading()

      const payload = {

        userDetails: {
          email: this.email,
          password: this.password,
          remember_me: this.checkbox_remember_me,
        }
      }
      this.$store.dispatch('auth/loginJWT', payload)
        .then(() => {
          this.$vs.loading.close()
      })
        .catch(error => {
          this.$vs.loading.close()
          this.$vs.notify({
            title: 'Error',
            text: error.message,
            iconPack: 'feather',
            icon: 'icon-alert-circle',
            color: 'danger'
          })
        })
    },
    registerUser () {
      if (!this.checkLogin()) return
      this.$router.push('/pages/register').catch(() => {})
    }
  }
}

</script>

<style>
  [dir]  .login_input input.vs-inputx{
    padding-left: 35px!important;
  } 
</style>
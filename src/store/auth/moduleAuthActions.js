/*=========================================================================================
  File Name: moduleAuthActions.js
  Description: Auth Module Actions
  ----------------------------------------------------------------------------------------
  Item Name: Vuexy - Vuejs, HTML & Laravel Admin Dashboard Template
  Author: Pixinvent
  Author URL: http://www.themeforest.net/user/pixinvent
==========================================================================================*/

import jwt from '../../http/requests/auth/jwt/index.js'


import router from '@/router'

export default {
  loginAttempt ({ dispatch }, payload) {

    // New payload for login action
    const newPayload = {
      userDetails: payload.userDetails,
      notify: payload.notify,
      closeAnimation: payload.closeAnimation
    }

    // If remember_me is enabled change firebase Persistence
    if (!payload.checkbox_remember_me) {

      // Change firebase Persistence
      firebase.auth().setPersistence(firebase.auth.Auth.Persistence.SESSION)

      // If success try to login
        .then(function () {
          dispatch('login', newPayload)
        })

      // If error notify
        .catch(function (err) {

          // Close animation if passed as payload
          if (payload.closeAnimation) payload.closeAnimation()

          payload.notify({
            time: 2500,
            title: 'Error',
            text: err.message,
            iconPack: 'feather',
            icon: 'icon-alert-circle',
            color: 'danger'
          })
        })
    } else {
      // Try to login
      dispatch('login', newPayload)
    }
  },
  login ({ commit, state, dispatch }, payload) {

    // If user is already logged in notify and exit
    if (state.isUserLoggedIn()) {
      // Close animation if passed as payload
      if (payload.closeAnimation) payload.closeAnimation()

      payload.notify({
        title: 'Login Attempt',
        text: 'You are already logged in!',
        iconPack: 'feather',
        icon: 'icon-alert-circle',
        color: 'warning'
      })

      return false
    }

    // // Try to sigin
    // firebase.auth().signInWithEmailAndPassword(payload.userDetails.email, payload.userDetails.password)
    //
    //   .then((result) => {
    //
    //     // Set FLAG username update required for updating username
    //     let isUsernameUpdateRequired = false
    //
    //     // if username is provided and updateUsername FLAG is true
    //     // set local username update FLAG to true
    //     // try to update username
    //     if (payload.updateUsername && payload.userDetails.displayName) {
    //
    //       isUsernameUpdateRequired = true
    //
    //       dispatch('updateUsername', {
    //         user: result.user,
    //         username: payload.userDetails.displayName,
    //         notify: payload.notify,
    //         isReloadRequired: true
    //       })
    //     }
    //
    //     // Close animation if passed as payload
    //     if (payload.closeAnimation) payload.closeAnimation()
    //
    //     // if username update is not required
    //     // just reload the page to get fresh data
    //     // set new user data in localstorage
    //     if (!isUsernameUpdateRequired) {
    //       router.push(router.currentRoute.query.to || '/')
    //       commit('UPDATE_USER_INFO', result.user.providerData[0], {root: true})
    //     }
    //   }, (err) => {
    //
    //     // Close animation if passed as payload
    //     if (payload.closeAnimation) payload.closeAnimation()
    //
    //     payload.notify({
    //       time: 2500,
    //       title: 'Error',
    //       text: err.message,
    //       iconPack: 'feather',
    //       icon: 'icon-alert-circle',
    //       color: 'danger'
    //     })
    //   })
  },

  // Google Login
  loginWithGoogle ({commit, state}, payload) {
    if (state.isUserLoggedIn()) {
      payload.notify({
        title: 'Login Attempt',
        text: 'You are already logged in!',
        iconPack: 'feather',
        icon: 'icon-alert-circle',
        color: 'warning'
      })
      return false
    }
    // const provider = new firebase.auth.GoogleAuthProvider()
    //
    // firebase.auth().signInWithPopup(provider)
    //   .then((result) => {
    //     router.push(router.currentRoute.query.to || '/')
    //     commit('UPDATE_USER_INFO', result.user.providerData[0], {root: true})
    //   }).catch((err) => {
    //     payload.notify({
    //       time: 2500,
    //       title: 'Error',
    //       text: err.message,
    //       iconPack: 'feather',
    //       icon: 'icon-alert-circle',
    //       color: 'danger'
    //     })
    //   })
  },

  // Facebook Login
  loginWithFacebook ({commit, state}, payload) {
    if (state.isUserLoggedIn()) {
      payload.notify({
        title: 'Login Attempt',
        text: 'You are already logged in!',
        iconPack: 'feather',
        icon: 'icon-alert-circle',
        color: 'warning'
      })
      return false
    }

  },

  // Twitter Login
  loginWithTwitter ({commit, state}, payload) {
    if (state.isUserLoggedIn()) {
      payload.notify({
        title: 'Login Attempt',
        text: 'You are already logged in!',
        iconPack: 'feather',
        icon: 'icon-alert-circle',
        color: 'warning'
      })
      return false
    }
    const provider = new firebase.auth.TwitterAuthProvider()


  },

  // Github Login
  loginWithGithub ({commit, state}, payload) {
    if (state.isUserLoggedIn()) {
      payload.notify({
        title: 'Login Attempt',
        text: 'You are already logged in!',
        iconPack: 'feather',
        icon: 'icon-alert-circle',
        color: 'warning'
      })
      return false
    }

  },
  registerUser ({dispatch}, payload) {


  },
  updateUsername ({ commit }, payload) {
    payload.user.updateProfile({
      displayName: payload.displayName
    }).then(() => {

      // If username update is success
      // update in localstorage
      const newUserData = Object.assign({}, payload.user.providerData[0])
      newUserData.displayName = payload.displayName
      commit('UPDATE_USER_INFO', newUserData, {root: true})

      // If reload is required to get fresh data after update
      // Reload current page
      if (payload.isReloadRequired) {
        router.push(router.currentRoute.query.to || '/')
      }
    }).catch((err) => {
      payload.notify({
        time: 8800,
        title: 'Error',
        text: err.message,
        iconPack: 'feather',
        icon: 'icon-alert-circle',
        color: 'danger'
      })
    })
  },


  // JWT
  loginJWT ({ commit }, payload) {

    return new Promise((resolve, reject) => {
      jwt.login(payload.userDetails.email, payload.userDetails.password,payload.userDetails.remember_me)
        .then(response => {
       //   console.log(response.data);
          // If there's user data in response
          if (response.data.userData) {
            // Navigate User to homepage
            localStorage.setItem('accessToken', response.data.access_token)
            localStorage.setItem('expires_in', response.data.expires_in)
            localStorage.setItem('loggedIn', true)
            // Update user details
            commit('UPDATE_USER_INFO', response.data.userData, {root: true})

            // Set bearer token in axios
            commit('SET_BEARER', response.data.access_token)

            router.push( '/')

            // Set accessToken




            resolve(response)
          } else {
            reject({message: 'Неправильный Email или Пароль!!'})
          }

        })
        .catch(error => { reject(error) })
    })
  },
  registerUserJWT ({ commit }, payload) {

    const { displayName, email, password, confirmPassword } = payload.userDetails

    return new Promise((resolve, reject) => {

      // Check confirm password
      if (password !== confirmPassword) {
        reject({message: 'Пароль и его подтверждение не совпадают'})
      }

      jwt.registerUser(displayName, email, password)
        .then(response => {
         // console.log(response)
          // Redirect User
            if(response.data.result){
                router.push(router.currentRoute.query.to || '/')

                // Update data in localStorage
                // localStorage.setItem('accessToken', response.data.accessToken)
                // commit('UPDATE_USER_INFO', response.data.userData, {root: true})
            }



          resolve(response)
        })
        .catch(error => { reject(error) })
    })
  },
  fetchAccessToken () {
    return new Promise((resolve) => {
      jwt.refreshToken().then(response => { resolve(response) })
    })
  }
}

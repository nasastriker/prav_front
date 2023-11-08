<!-- =========================================================================================
  File Name: App.vue
  Description: Main vue file - APP
  ----------------------------------------------------------------------------------------
  Item Name: Vuexy - Vuejs, HTML & Laravel Admin Dashboard Template
  Author: Pixinvent
  Author URL: http://www.themeforest.net/user/pixinvent
========================================================================================== -->


<template>
  <div id="app" :class="vueAppClasses">
    <router-view @setAppClasses="setAppClasses" />

  </div>
</template>

<script>
import themeConfig from '@/../themeConfig.js'
import jwt         from '@/http/requests/auth/jwt/index.js'

export default {
  data () {
    return {
      vueAppClasses: []
    }
  },
  watch: {
    '$store.state.theme' (val) {
      this.toggleClassInBody(val)
    },
    '$vs.rtl' (val) {
      document.documentElement.setAttribute('dir', val ? 'rtl' : 'ltr')
    }
  },
  methods: {
    tt(){},
    toggleClassInBody (className) {
      if (className === 'dark') {
        if (document.body.className.match('theme-semi-dark')) document.body.classList.remove('theme-semi-dark')
        document.body.classList.add('theme-dark')
      } else if (className === 'semi-dark') {
        if (document.body.className.match('theme-dark')) document.body.classList.remove('theme-dark')
        document.body.classList.add('theme-semi-dark')
      } else {
        if (document.body.className.match('theme-dark'))      document.body.classList.remove('theme-dark')
        if (document.body.className.match('theme-semi-dark')) document.body.classList.remove('theme-semi-dark')
      }
    },
    setAppClasses (classesStr) {
      this.vueAppClasses.push(classesStr)
    },
    handleWindowResize () {
      this.$store.commit('UPDATE_WINDOW_WIDTH', window.innerWidth)

      // Set --vh property
      document.documentElement.style.setProperty('--vh', `${window.innerHeight * 0.01}px`)
    },
    handleScroll () {
      this.$store.commit('UPDATE_WINDOW_SCROLL_Y', window.scrollY)
    }
  },
  mounted () {

    this.toggleClassInBody(themeConfig.theme)
    this.$store.commit('UPDATE_WINDOW_WIDTH', window.innerWidth)

    const vh = window.innerHeight * 0.01
    // Then we set the value in the --vh custom property to the root of the document
    document.documentElement.style.setProperty('--vh', `${vh}px`)
  },
  async created () {



    // jwt
    jwt.init()

    const dir = this.$vs.rtl ? 'rtl' : 'ltr'
    document.documentElement.setAttribute('dir', dir)

    window.addEventListener('resize', this.handleWindowResize)
    window.addEventListener('scroll', this.handleScroll)

    // Auth0
    try       { await this.$auth.renewTokens() } catch (e) { console.error(e) }

  },
  destroyed () {
    window.removeEventListener('resize', this.handleWindowResize)
    window.removeEventListener('scroll', this.handleScroll)
  }
}

</script>
<style lang="scss">
.vs-sidebar-group .group-header{
    color: rgba(var(--vs-primary),1)!important;
    font-size: 14px!important;
    font-weight: 600;
}
.v-nav-menu .group-header .feather-icon {
    color: rgba(var(--vs-primary),1)!important;
}

.v-nav-menu ul .feather-icon:not(.feather-grp-header-arrow) .feather {
  width: 16px !important;
  height: 16px !important;
  flex: 0 0 auto;
}

.vs-sidebar-group-open .vs-sidebar-group .group-header{
  color: #626262!important;
}
.v-nav-menu .vs-sidebar-group-open .vs-sidebar-group-items .feather-icon {
    color: #626262!important;
}
.v-nav-menu .vs-sidebar-group-open .vs-sidebar-item-active .feather-icon{
  color: #fff!important;
}
h6 {
  font-size: 12px!important;
  color: rgba(var(--vs-primary),1)!important;
}
.h5-labell{
  color: rgba(var(--vs-primary),1)!important;
}
input[type=date].vs-input--input.normal{
  padding: 0.7rem 0.7rem !important;
}
.v-nav-menu .vs-sidebar--item .router-link-active span{
    font-weight: bold;
}
.tablePreloader img{
    width: 70px;
}
.w130{
    width: 130px!important
}
div#vs29__combobox {
    height: auto!important;
}
.ag-grid-table {
  color: inherit !important;
  height: calc(var(--vh, 1vh) * 100 - 20.5rem);

  @media screen and (max-height: 800px) {
    height: calc(var(--vh, 1vh) * 100 - 20.5rem);
  }
}

[dir] .vs__selected-options {
    overflow: hidden;
}
[dir] .vs-button:not(.vs-radius):not(.includeIconOnly):not(.small):not(.large) {
    padding: 0.75rem 2rem;
}
[dir] .v-select .vs__dropdown-toggle {
    padding: 0.75px 0 4px 0;
    height: 40px;
}
button.vs-component.vs-button.btn-drop.settingsBtn.vs-button-primary.vs-button-filled svg,
button.vs-component.vs-button.btn-drop.downloadBtn.vs-button-primary.vs-button-filled svg {
  height: 18px;
  width: auto;
}
.tablePreloader.outer-div {
    padding: 20%;
    text-align: center;
    z-index: 10;
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background-color: rgb(255 255 255);
    border: 1px solid #ccc;
    border-radius: 5px;
    display: flex;
    justify-content: center;
    align-items: center;
    flex-direction: column;
}
[dir] .vs-input--placeholder.normal{
    font-size: 14px;
}
[dir] .vs-input--input.normal {
    padding: 0.75rem !important;
}

[dir] .vs-input--input[disabled] {
  background: #dcddef;
}

div#quill-container {
    height: 400px!important;
}
input.ag-floating-filter-input {
    margin-bottom: 0px!important;
    padding-bottom: 0px!important;
}
[dir] .v-select.responsive_select .vs__dropdown-toggle {
    height: auto;
}
.ag-header-cell-label .ag-header-cell-text{
  color: rgba(0, 0, 0, 0.54);
}
[dir] .ag-grid-cell-chip {
    transform: translateY(-60%);
    min-height: 20px!important;
}
.out-main {
    position: relative;
}
.v-nav-menu .scroll-area-v-nav-menu {
    height: calc(var(--vh, 1vh) * 100 - 160px)!important;
}
[dir] .vs-con-textarea {
    overflow: auto;
}
.vs-textarea-scrolled .vs-textarea{
    height: 100%!important;
    resize: none!important;
  }
  h6.sv-flex-row{
    display: flex;
    justify-content: left;
  }
  h6.sv-flex-row span{
    margin-left: 10px;

  }
  .ag-header-container .select2-container--default .select2-selection--single .select2-selection__rendered {
    color: #777;
    line-height: 28px;
    font-size: 14px;
    padding: 0 14px;
    font-weight: 300;
  }
  .ag-header-container .select2-container--default .select2-selection--single {
      background-color: #fff;
      border: none;
      border-radius: 0;
  }
  .tablePreloader.outer-div {
    padding: 20%;
    text-align: center;
    z-index: 10;
    position: absolute;
    bottom: 0;
    top: 26px;
    left: 0;
    width: 100%;
    height: calc(100% - 26px);
    background-color: white;
    border: 1px solid #ccc;
    border-radius: 5px;
    display: flex;
    justify-content: center;
    align-items: center;
    flex-direction: column;
    bottom: 0;
}
.vs-tooltip{
  z-index: 999;
}
.w200{
  width: 200px;
}
.con-vs-tooltip {
    display: inline-block;
}
</style>

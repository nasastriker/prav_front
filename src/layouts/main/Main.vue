<!-- =========================================================================================
    File Name: Main.vue
    Description: Main layout
    ----------------------------------------------------------------------------------------
    Item Name: Vuexy - Vuejs, HTML & Laravel Admin Dashboard Template
    Author: Pixinvent
    Author URL: http://www.themeforest.net/user/pixinvent
========================================================================================== -->


<template>
  <div class="layout--main" :class="[layoutTypeClass, navbarClasses, footerClasses, {'no-scroll': isAppPage}]">

    <vx-tour :steps="steps" v-if="!disableThemeTour && (windowWidth >= 1200 && mainLayoutType === 'vertical' && verticalNavMenuWidth == 'default')" />
    <ChatBot></ChatBot>
    <Uved
            v-if                    = "!disableHelp"
            :footerType             = "footerType"
            :hideScrollToTop        = "hideScrollToTop"
            :navbarType             = "navbarType"
            :navbarColor            = "navbarColor"
            :routerTransition       = "routerTransition"
            @toggleHideScrollToTop  = "toggleHideScrollToTop"
    @updateFooter           = "updateFooter"
    @updateNavbar           = "updateNavbar"
    @updateNavbarColor      = "updateNavbarColor"
    @updateRouterTransition = "updateRouterTransition" />
    <the-customizer
      v-if                    = "!disableCustomizer"
      :footerType             = "footerType"
      :hideScrollToTop        = "hideScrollToTop"
      :navbarType             = "navbarType"
      :navbarColor            = "navbarColor"
      :routerTransition       = "routerTransition"
      @toggleHideScrollToTop  = "toggleHideScrollToTop"
      @updateFooter           = "updateFooter"
      @updateNavbar           = "updateNavbar"
      @updateNavbarColor      = "updateNavbarColor"
      @updateRouterTransition = "updateRouterTransition" />
    <Help
            v-if                    = "!disableHelp"
            :footerType             = "footerType"
            :hideScrollToTop        = "hideScrollToTop"
            :navbarType             = "navbarType"
            :navbarColor            = "navbarColor"
            :routerTransition       = "routerTransition"
            @toggleHideScrollToTop  = "toggleHideScrollToTop"
    @updateFooter           = "updateFooter"
    @updateNavbar           = "updateNavbar"
    @updateNavbarColor      = "updateNavbarColor"
    @updateRouterTransition = "updateRouterTransition" />
    <UpdateCode
            v-if                    = "!disableHelp"
            :footerType             = "footerType"
            :hideScrollToTop        = "hideScrollToTop"
            :navbarType             = "navbarType"
            :navbarColor            = "navbarColor"
            :routerTransition       = "routerTransition"
            @toggleHideScrollToTop  = "toggleHideScrollToTop"
    @updateFooter           = "updateFooter"
    @updateNavbar           = "updateNavbar"
    @updateNavbarColor      = "updateNavbarColor"
    @updateRouterTransition = "updateRouterTransition" />

    <v-nav-menu
      :navMenuItems = "navMenuItemsLoad"
      title         = "Vuexy"
      parent        = ".layout--main" />

    <!-- <div :is="scrollbarTag" class="chat-content-scroll-area border border-solid d-theme-border-grey-light">
        <div class="_log">
            234234234234
        </div>
    </div> -->

    <div :is="scrollbarTag" class="chat-content-scroll-area border border-solid d-theme-border-grey-light" id="content-area" :class="[contentAreaClass, {'show-overlay': bodyOverlay}]">
      <div id="content-overlay" />



      <div class="content-wrapper">

        <div class="router-view">
          <div >

            <!-- <div style="display: block;width: 100%;cursor: pointer" v-if="TasksBannerData.show_banner" @click="toTasks">
              <div style="display: flex;width: 100%;margin-top: -10px;">
                <div class="err_vyn11q">
                  <div style="display: table-cell;vertical-align: middle;color: white;"><b>!</b></div>
                </div>
                 <div class="err_vyn22q">
              <div style="display: table-cell;vertical-align: middle;color: darkred;">
             <div v-if="User.role_id === 0">
           <div v-if="TasksBannerData.tasks_count > -1">Новых рабочих действий: <b>{{ TasksBannerData.tasks_count }}</b></div>
                <div v-if="TasksBannerData.tasks_ones_count > 0">Новых разовых задач: <b>{{ TasksBannerData.tasks_ones_count }}</b></div>

                </div>
                    <div v-if="User.role_id === 1">
                      <div v-if="TasksBannerData.tasks_ones_confirms_count > 0">Новых подтверждений: <b>{{ TasksBannerData.tasks_ones_confirms_count }}</b></div>
                    </div>


                  </div>
                </div>
              </div>
            </div>-->
            <div style="display: block;width: 100%;cursor: pointer" v-if="DevelopmentMsgBanner.show_banner" @click="ShowMsgBanner">
              <div style="display: flex;width: 100%;">
                <div class="msg_development11">
                  <div style="display: table-cell;vertical-align: middle;color: white;background-color: #21b57f"><b>!</b></div>
                </div>
                <div class="msg_development22">
                  <div style="display: table-cell;vertical-align: middle;color: darkred;">
                    <div v-if="DevelopmentMsgBanner.countMsg > 0|| DevelopmentMsgBanner.countStatus">
                      Новых сообщений с заявок на разработку: <b>{{ DevelopmentMsgBanner.countMsg }}</b> Изменений статуса заявок {{DevelopmentMsgBanner.countStatus}}
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div style="display: block;width: 100%;cursor: pointer" v-if="DevelopmentBanner.show_banner" @click="$router.push('/adm/development')">
              <div style="display: flex;width: 100%;">
                <div class="msg_development11">
                  <div style="display: table-cell;vertical-align: middle;color: white;background-color: #0e84b5"><b>!</b></div>
                </div>
                <div class="msg_development22">
                  <div style="display: table-cell;vertical-align: middle;color: darkred;">
                      <div v-if="DevelopmentBanner.count > 0">Новых заявок на разработку: <b>{{ DevelopmentBanner.count }}</b></div>
                  </div>
                </div>
              </div>
            </div>

            <transition :name="routerTransition">

              <div v-if="$route.meta.breadcrumb || $route.meta.pageTitle" class="router-header flex flex-wrap items-center mb-6">
                <div
                  class="content-area__heading"
                  :class="{'pr-4 border-0 md:border-r border-solid border-grey-light' : $route.meta.breadcrumb}">
                  <h2 class="mb-1">{{ $t(routeTitle) }}</h2>
                </div>

                <!-- BREADCRUMB -->
                <vx-breadcrumb class="ml-4 md:block hidden" v-if="$route.meta.breadcrumb" />

                <!-- DROPDOWN -->
                <vs-dropdown vs-trigger-click class="ml-auto md:block hidden cursor-pointer">
                  <vs-button radius icon="icon-settings" icon-pack="feather" />

                  <vs-dropdown-menu class="w-32">
                    <vs-dropdown-item>
                      <div @click="$router.push('/pages/profile').catch(() => {})" class="flex items-center">
                        <feather-icon icon="UserIcon" class="inline-block mr-2" svgClasses="w-4 h-4" />
                        <span>Profile</span>
                      </div>
                    </vs-dropdown-item>
                    <vs-dropdown-item>
                      <div @click="$router.push('/apps/todo').catch(() => {})" class="flex items-center">
                        <feather-icon icon="CheckSquareIcon" class="inline-block mr-2" svgClasses="w-4 h-4" />
                        <span>Tasks</span>
                      </div>
                    </vs-dropdown-item>
                    <vs-dropdown-item>
                      <div @click="$router.push('/apps/email').catch(() => {})" class="flex items-center">
                        <feather-icon icon="MailIcon" class="inline-block mr-2" svgClasses="w-4 h-4" />
                        <span>Inbox</span>
                      </div>
                    </vs-dropdown-item>
                  </vs-dropdown-menu>

                </vs-dropdown>

              </div>
            </transition>

            <div class="content-area__content">

              <back-to-top bottom="5%" :right="$vs.rtl ? 'calc(100% - 2.2rem - 38px)' : '30px'" visibleoffset="500" v-if="!hideScrollToTop">
                <vs-button icon-pack="feather" icon="icon-arrow-up" class="shadow-lg btn-back-to-top" />
              </back-to-top>

              <transition :name="routerTransition" mode="out-in">
                <router-view @changeRouteTitle="changeRouteTitle" @setAppClasses="(classesStr) => $emit('setAppClasses', classesStr)" @update_nav_menu="(fn) => fn(navMenuItems)" />
              </transition>
            </div>
          </div>
        </div>
      </div>

    </div>
  </div>
</template>


<script>
import VuePerfectScrollbar from 'vue-perfect-scrollbar'
import BackToTop           from 'vue-backtotop'
import HNavMenu            from '@/layouts/components/horizontal-nav-menu/HorizontalNavMenu.vue'
import navMenuItems        from '@/layouts/components/vertical-nav-menu/navMenuItems.js'
import TheCustomizer       from '@/layouts/components/customizer/TheCustomizer.vue'
import Help       from '@/layouts/components/help/Help.vue'
import UpdateCode       from '@/layouts/components/updateCode/UpdateCode.vue'
import Uved       from '@/layouts/components/uved/Uved.vue'
import TheNavbarHorizontal from '@/layouts/components/navbar/TheNavbarHorizontal.vue'
import TheNavbarVertical   from '@/layouts/components/navbar/TheNavbarVertical.vue'
import TheFooter           from '@/layouts/components/TheFooter.vue'
import themeConfig         from '@/../themeConfig.js'
import VNavMenu            from '@/layouts/components/vertical-nav-menu/VerticalNavMenu.vue'
import ChatBot from '../../chatbot/ChatBot.vue'
import { mapActions,mapGetters,mapMutations } from 'vuex'
const VxTour = () => import('@/components/VxTour.vue')

export default {
  components: {
    BackToTop,
    HNavMenu,
    Help,
    UpdateCode,
    Uved,
    TheCustomizer,
    TheFooter,
    ChatBot,
    TheNavbarHorizontal,
    TheNavbarVertical,
    VNavMenu,
    VxTour,
    VuePerfectScrollbar
  },
  data () {
    return {

        disableHelp: themeConfig.disableHelp,
        disableCustomizer : themeConfig.disableCustomizer,
      disableThemeTour  : themeConfig.disableThemeTour,
      dynamicWatchers   : {},
      footerType        : themeConfig.footerType  || 'static',
      hideScrollToTop   : themeConfig.hideScrollToTop,
      isNavbarDark      : false,
      navbarColor       : themeConfig.navbarColor || '#fff',
      navbarType        : themeConfig.navbarType  || 'floating',
      navMenuItems,
      routerTransition  : themeConfig.routerTransition || 'none',
      routeTitle        : this.$route.meta.pageTitle,
      steps: [
        {
          target  : '#btnVNavMenuMinToggler',
          content : 'Toggle Collapse Sidebar.'
        },
        {
          target  : '.vx-navbar__starred-pages',
          content : 'Create your own bookmarks. You can also re-arrange them using drag & drop.'
        },
        {
          target  : '.i18n-locale',
          content : 'You can change language from here.'
        },
        {
          target  : '.navbar-fuzzy-search',
          content : 'Try fuzzy search to visit pages in flash.'
        },
        {
          target  : '.customizer-btn',
          content : 'Customize template based on your preference',
          params  : {
            placement: 'left'
          }
        },
        {
          target  : '.vs-button.buy-now',
          content : 'Buy this awesomeness at affordable price!',
          params  : {
            placement: 'top'
          }
        }
      ]
    }
  },
  watch: {
    '$route' () {
      this.routeTitle = this.$route.meta.pageTitle
    },
    isThemeDark (val) {
      const color = this.navbarColor === '#fff' && val ? '#10163a' : '#fff'
      this.updateNavbarColor(color)
    },
    '$store.state.mainLayoutType' (val) {
      this.setNavMenuVisibility(val)
      this.disableThemeTour = true
    }
  },
  computed: {
      ...mapGetters([
          'UserNavMenuItems','TasksBannerData','User','DevelopmentBanner','DevelopmentMsgBanner'
      ]),
    bodyOverlay () { return this.$store.state.bodyOverlay },
    contentAreaClass () {
      if (this.mainLayoutType === 'vertical') {
        if      (this.verticalNavMenuWidth === 'default') return 'content-area-reduced'
        else if (this.verticalNavMenuWidth === 'reduced') return 'content-area-lg'
        else return 'content-area-full'
      } else return 'content-area-full'
    },
    footerClasses () {
      return {
        'footer-hidden': this.footerType === 'hidden',
        'footer-sticky': this.footerType === 'sticky',
        'footer-static': this.footerType === 'static'
      }
    },
    isAppPage () {
      return this.$route.meta.no_scroll
    },
    isThemeDark ()     { return this.$store.state.theme === 'dark' },
    layoutTypeClass () { return `main-${this.mainLayoutType}`      },
    mainLayoutType ()  { return this.$store.state.mainLayoutType   },
    navbarClasses ()   {
      return {
        'navbar-hidden'   : this.navbarType === 'hidden',
        'navbar-sticky'   : this.navbarType === 'sticky',
        'navbar-static'   : this.navbarType === 'static',
        'navbar-floating' : this.navbarType === 'floating'
      }
    },
    verticalNavMenuWidth () { return this.$store.state.verticalNavMenuWidth },
    windowWidth ()          { return this.$store.state.windowWidth },
      navMenuItemsLoad() {
          return this.UserNavMenuItems.yes ? this.UserNavMenuItems.array : this.navMenuItems
      },
    channel(){
      return this.$echo.join("newTask-channel");
    },
    scrollbarTag () {
      return this.$store.getters.scrollbarTag
    },
  },
  methods: {
      ...mapActions([
          'getDataStatuss', 'getNavMenuItems', 'getStartPageUrl','getBannerData','getDataUser','getVidRecoverInDebtorCreditArr',
          'getDevelopmentBanner','getDadataSettingsArr','getDevelopmentMsgBanner','setDataUser','getStatussDebtorArrAndAll','getArchBankReturnSasList'
      ]),
    ShowMsgBanner(){
          this.getDataUser().then(res=>{
              this.User.pag.development.new_msg=true
              this.setDataUser().then(res=>{
                  this.$router.push('/adm/development');
              })
          })

    },

      changeRouteTitle (title) {
      this.routeTitle = title
    },
    updateNavbar (val) {
      if (val === 'static') this.updateNavbarColor(this.isThemeDark ? '#10163a' : '#fff')
      this.navbarType = val
    },
    updateNavbarColor (val) {
      this.navbarColor = val
      if (val === '#fff') this.isNavbarDark = false
      else this.isNavbarDark = true
    },
    updateFooter (val) {
      this.footerType = val
    },
    updateRouterTransition (val) {
      this.routerTransition = val
    },
    setNavMenuVisibility (layoutType) {
      if ((layoutType === 'horizontal' && this.windowWidth >= 1200) || (layoutType === 'vertical' && this.windowWidth < 1200)) {
        this.$store.commit('TOGGLE_IS_VERTICAL_NAV_MENU_ACTIVE', false)
        this.$store.dispatch('updateVerticalNavMenuWidth', 'no-nav-menu')
      } else {
        this.$store.commit('TOGGLE_IS_VERTICAL_NAV_MENU_ACTIVE', true)
      }
    },
    toggleHideScrollToTop (val) {
      this.hideScrollToTop = val
    },
    reload(e){
      this.getBannerData();
      this.getDevelopmentBanner()
        this.getDevelopmentMsgBanner()


    },
    toTasks(){
      this.$router.push('/task');
    }
  },
    mounted(){
        this.getDadataSettingsArr();
      this.getNavMenuItems();
      this.getDataStatuss();
      this.getStatussDebtorArrAndAll();
      this.getArchBankReturnSasList();
      this.getBannerData();
      this.getDevelopmentBanner()
      this.getDevelopmentMsgBanner()
      this.getDataUser();
      this.channel.listen(".TaskMess", (e) => this.reload(e));
    },
  created () {
    const color = this.navbarColor === '#fff' && this.isThemeDark ? '#10163a' : this.navbarColor
    this.updateNavbarColor(color)
    this.setNavMenuVisibility(this.$store.state.mainLayoutType)

    // Dynamic Watchers for tour
    // Reason: Once tour is disabled it is not required to enable it.
    // So, watcher is required for just disabling it.
    this.dynamicWatchers.windowWidth = this.$watch('$store.state.windowWidth', (val) => {
      if (val < 1200) {
        this.disableThemeTour = true
        this.dynamicWatchers.windowWidth()
      }
    })

    this.dynamicWatchers.verticalNavMenuWidth = this.$watch('$store.state.verticalNavMenuWidth', () => {
      this.disableThemeTour = true
      this.dynamicWatchers.verticalNavMenuWidth()
    })

    this.dynamicWatchers.rtl = this.$watch('$vs.rtl', () => {
      this.disableThemeTour = true
      this.dynamicWatchers.rtl()
    })
  },
  beforeDestroy () {
    Object.keys(this.dynamicWatchers).map(i => {
      this.dynamicWatchers[i]()
      delete this.dynamicWatchers[i]
    })
  }
}

</script>

<style lang="scss">
  .vs-sidebar-group.vs-sidebar-group-open > ul,
  .vs-sidebar-group.vs-sidebar-group-active > ul,
  .vuesax-app-is-ltr .vs-sidebar-group.vs-sidebar-group-open>ul{
    padding-left: 20px!important;
  }
    .truncate{
      white-space: pre-wrap!important;
    }
    .ag-root.ag-unselectable.ag-layout-normal{
      border-radius: 5px;
    }
  .ag-row{
    height: 23px!important;

    padding: 0px!important; margin: 0px!important;
  }
  .ag-cell{

    padding: 0px!important; margin: 0px!important;

  }
  .ag-header-row{
    height: 26px!important;
  }
  .ag-theme-material .ag-cell {
    line-height: 20px !important;
        padding: 0 5px!important;
  }
  .ag-cell {
    /*text-align: center;*/
  }
  .ag-header-cell.ag-header-cell-sortable{
    padding-left: 0;
  }


    .err_vyn11q {
      display: table;
      background-color: red;
      margin-bottom: 10px;
      border-radius: 5px 0px 0px 5px;
      text-align: center;
      width: 40px;
      font-size: 40px;
    }
    .err_vyn22q {
      display: table;
      background-color: #FCEEE0;
      margin-bottom: 10px;
      border-radius: 0px 5px 5px 0px;
      padding: 10px;
      padding-left: 20px;
      width: 100%;
    }
    .msg_development11 {
      display: table;
      background-color: red;
      margin-bottom: 10px;
      border-radius: 5px 0px 0px 5px;
      text-align: center;
      width: 40px;
      font-size: 20px;
    }
    .msg_development22 {
      display: table;
      background-color: #FCEEE0;
      margin-bottom: 10px;
      border-radius: 0px 5px 5px 0px;
      padding: 10px;
      padding-left: 20px;
      width: 100%;
    }
</style>

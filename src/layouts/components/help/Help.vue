
<template>
  <div id="help-customizer">

    <!-- Open Customizer Button -->
    <vs-button
      @click.stop="changeAct"
      color="primary"
      style="margin-top: 40px;"
      type="filled"
      class="customizer-btn"
      icon-pack="feather"
      icon="icon-help-circle" />

    <!-- Customizer Content -->
    <vs-sidebar
      click-not-close
      hidden-background
      position-right
      v-model="active"
      class="items-no-padding">
      <div class="h-full">

        <div class="customizer-header mt-6 flex items-center justify-between px-6">
          <div>
            <h4>Помощь</h4>

          </div>
          <feather-icon icon="XIcon" @click.stop="active = false" class="cursor-pointer"></feather-icon>
        </div>

        <vs-divider class="mb-0" />

        <div>
          <template>
            <vue-iframe
                    :src="src"
                    allow="camera *; geolocation *; microphone *; autoplay *"
                    frame-id="my-ifram"
                    name="my-frame"
                    style="height: 92vh; width: 100%;"
                    width="800px"
                    height="200px"
            />
        </template>
            <!-- <iframe src="https://707529-ce42995.tmweb.ru/" title="Help" style="width: 100%; height: 95vh;"></iframe>
            <div style=" text-align: right;">
              <span style="color: red;cursor: pointer" @click="edit">Редактировать</span>
              <span style="color: red;cursor: pointer" @click="save">Сохранить</span>
            </div>


          <vue-editor :class="{ active: act}"
                      v-model="data_faq.body"
                      :editorOptions="editorSettings"
                      :customModules="customModulesForEditor"
                      style="height: 600px"
          ></vue-editor>
          <vue-editor :class="{ active: editEd}"
                      :disabled="act"
                      :editor-toolbar="customToolbar"
                      v-model="data_faq.body"


          ></vue-editor>-->
        </div>
      </div>
    </vs-sidebar>
  </div>
</template>


<script>
import VueIframe from 'vue-iframes'
import VuePerfectScrollbar from 'vue-perfect-scrollbar'
import { mapActions,mapGetters } from 'vuex'
import r from '../../../route';
import axios from '../../../axios'
import { VueEditor, Quill } from "vue2-editor";
import ImageResize from 'quill-image-resize-vue';
Quill.register("modules/imageResize", ImageResize);
import Vue from 'vue';
Vue.use(VueIframe);
export default {

  props: {
    footerType       : { type: String,  required: true },
    hideScrollToTop  : { type: Boolean, required: true },
    navbarType       : { type: String,  required: true },
    navbarColor      : { type: String,  required: true, default: '#fff' },
    routerTransition : { type: String,  required: true }
  },
  data () {
    return {
        src:"https://help.bv-pravezh.ru/?v=2",
        customModulesForEditor: [
            { alias: 'imageResize', module: ImageResize }
        ],
        editorSettings: {
            modules: {
                imageResize: {}
            }
        },
        customToolbar: [
            [{ color: "color-picker" }]
        ],
        data_faq: {
            id:0,
            title: '',
            type: 0,
            popularity: 0,
            body: ''
        },
        showV:true,
        editEd:false,
        act:true,
        active             : false,
        customPrimaryColor : '#3DC9B3',
        customNavbarColor  : '#3DC9B3',
        routerTransitionsList: [
          { text: 'Zoom Fade',   value: 'zoom-fade'   },
          { text: 'Slide Fade',  value: 'slide-fade'  },
          { text: 'Fade Bottom', value: 'fade-bottom' },
          { text: 'Fade',        value: 'fade'        },
          { text: 'Zoom Out',    value: 'zoom-out'    },
          { text: 'None',        value: 'none'        }
        ],
        settings: {
          maxScrollbarLength : 60,
          wheelSpeed         : .60
        },
        themeColors: ['#7367F0', '#28C76F', '#EA5455', '#FF9F43', '#1E1E1E']
    }
  },
  watch: {
    layoutType (val) {

      // Reset unsupported options
      if (val === 'horizontal') {
        if (this.themeMode === 'semi-dark') this.themeMode = 'light'
        if (this.navbarType === 'hidden')   this.navbarTypeLocal = 'floating'
        this.$emit('updateNavbarColor', '#fff')
      }
    }
  },
  computed: {
    ...mapGetters([
       'User'

    ]),


    rtl: {
      get ()    { return this.$vs.rtl },
      set (val) { this.$vs.rtl = val  }
    },
    themeMode: {
      get ()    { return this.$store.state.theme },
      set (val) { this.$store.dispatch('updateTheme', val) }
    },
    scrollbarTag () { return this.$store.state.is_touch_device ? 'div' : 'VuePerfectScrollbar' },
    windowWidth () {
      return this.$store.state.windowWidth
    }
  },
    mounted(){
        this.getFsspOtdelsArr();
        this.getDataJudicialAreasForSug()
        this.getVidRecoverInDebtorCreditArr()
        this.getPaymentsType()



    },
  methods: {
      ...mapActions([
          'getFsspOtdelsArr','getDataJudicialAreasForSug','getVidRecoverInDebtorCreditArr','getPaymentsType'
      ]),
        save(){
            axios.post(r("helpPage.index"), {
                params: {
                    method: 'saveDataHelpHintRoute',
                    param:  this.data_faq
                }
            }).then((response) => {
                if(response.data.result) {
                    this.$vs.notify({
                        title: 'Сообщение',
                        text: 'Сохранено!!!',
                        color: 'success',
                        position: 'top-center'
                    })
                }
                else
                    {
                        this.$vs.notify({
                            title: 'Сообщение',
                            text: 'Сохранить не удалось !!',
                            color: 'danger',
                            position: 'top-center'
                        })
                    }
            })
        },
        edit(){
            if(this.data_faq.id==0){
                axios.post(r("helpPage.index"), {
                    params: {
                        method: 'newDataHelpHintRoute',
                        param: this.$route.name
                    }
                }).then((response) => {
                    if(response.data.result){
                        this.data_faq=response.data.data
                        this.act=false
                        this.editEd=true;
                    }
                })
            }else{
                this.act=false
                this.editEd=true;
            }


        },
        getData(){
            axios.get(r("helpPage.index"), {
                params: {
                    method: 'getDataHelpHintRoute',
                    param: this.$route.name
                }
            }).then((response) => {
                if(response.data.result){
                    this.data_faq=response.data.data
                }else{
                    this.data_faq= {
                        id:0,
                            title: '',
                            type: 0,
                            popularity: 0,
                            body: ''
                    }
                }
            })
        },
        changeAct(){
            this.active=!this.active
            if(this.active){
                this.getData()
            }
        },

      ...mapActions([
       'setDataUser',
      ]),
  },
  components: {
    VuePerfectScrollbar,VueEditor
  }
}

</script>


<style lang="scss">
  .ql-editor.ql-blank {
    max-height: 80vh;
  }
  .active{
    display: none;
  }
#help-customizer {
  .vs-sidebar {
    position: fixed;
    z-index: 52000;
    max-width: 90vw;
    // @apply shadow-lg;
    box-shadow: 0 15px 30px 0 rgba(0,0,0,0.11), 0 5px 15px 0 rgba(0,0,0,0.08);
  }
}

.customizer-btn {
  position: fixed;
  top: 50%;
  right: 0;
  border-top-right-radius: 0;
  border-bottom-right-radius: 0;
  z-index: 50000;

  .vs-icon {
    animation: spin 1.5s linear infinite;
  }
}

.scroll-area--customizer {
  height: calc(100% - 5rem);

  &:not(.ps) {
    overflow-y: auto;
  }
}
</style>


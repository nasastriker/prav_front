
<template>
  <div id="help-customizer">

    <!-- Open Customizer Button -->
    <vs-button
      @click.stop="changeAct"
      color="primary"
      style="margin-top: 80px;"
      type="filled"
      class="customizer-btn"
      icon-pack="feather"
      icon="icon-italic" />

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
            <h4>Обновления</h4>

          </div>
          <feather-icon icon="XIcon" @click.stop="active = false" class="cursor-pointer"></feather-icon>
        </div>

        <vs-divider class="mb-0" />

        <div class="px-6">
          <ul style="margin-top: 40px;">
            <li v-for="item in arr" >
              <span style="color: brown;">{{ item.date}}</span>
              <span style="    color: black;">{{ item.text}}</span>

            </li>
          </ul>








        </div>
      </div>
    </vs-sidebar>
  </div>
</template>


<script>
import VuePerfectScrollbar from 'vue-perfect-scrollbar'
import { mapActions,mapGetters } from 'vuex'
import r from '../../../route';
import axios from '../../../axios'
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

      arr:[],

        showV:true,
        editEd:false,
        act:true,
      active             : false,


    }
  },

  computed: {
    ...mapGetters([
       'User'

    ]),




  },
    mounted(){



    },
  methods: {

      changeAct(){
          this.active=!this.active
          if(this.active){
              this.getData()
          }
      },

        getData(){
            axios.get(r("system.index"), {
                params: {
                    method: 'updateCodeData',
                    param:''
                }
            }).then((response) => {
                if(response.data.result){
                    this.arr=response.data.data
                }
            })
        },


      ...mapActions([
       'setDataUser',
      ]),
  },
  components: {
    VuePerfectScrollbar,
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


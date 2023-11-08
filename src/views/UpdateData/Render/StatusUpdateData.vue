<template>
  <div>
    <vs-chip style="    margin-top: 10px;" class="ag-grid-cell-chip" :color="chipColor(params.value)">
      {{parName}}
    </vs-chip>
    <span v-if="User.email=='amitx@list.ru'">
            <feather-icon icon="Edit3Icon" svgClasses="h-5 w-5 mr-4 hover:text-primary cursor-pointer" @click="showError" />
        </span>
    <span v-if="params.data.file!=null">
            <feather-icon icon="DownloadCloudIcon" svgClasses="h-5 w-5 mr-4 hover:text-primary cursor-pointer" @click="downloadDocument"/>
    </span>
  </div>

</template>

<script>
    import { mapGetters } from 'vuex'
    export default {

        data () {
            return {
                pop:false,
            }
        },

        computed: {
            ...mapGetters([
                'User'

            ]),
            parName(){

                if( this.params.value==0){
                    return  'В очереди'
                }
                if( this.params.value==2){
                    return  'Формируется'
                }
                if( this.params.value==3){
                    return  'Выполнено'
                }
                if( this.params.value==4){
                    return  'Ошибка'
                }

            },
            chipColor () {
                return (value) => {
                    if (value == 4) return 'warning'
                    return 'success'
                }
            }
        },
        methods: {
            downloadDocument() {
              let url='download/update_date/'+this.params.data.file
              axios.get(url, { responseType: 'blob' })
                  .then(response => {
                    const blob = new Blob([response.data], { type: 'application/xls' })
                    const link = document.createElement('a')
                    link.href = URL.createObjectURL(blob)
                    link.download = this.params.data.file
                    link.click()
                    URL.revokeObjectURL(link.href)
                  }).catch(console.error)


            },
            showError(){
                this.params.showPop(this.params.data.error);

            }
        },
    }
</script>

<style lang="scss" scpoped>
    .ag-grid-cell-chip {
    &.vs-chip-success {
         background: rgba(var(--vs-success),.15);
         color: rgba(var(--vs-success),1) !important;
         font-weight: 500;
     }
    &.vs-chip-warning {
         background: rgba(var(--vs-warning),.15);
         color: rgba(var(--vs-warning),1) !important;
         font-weight: 500;
     }
    &.vs-chip-danger {
         background: rgba(var(--vs-danger),.15);
         color: rgba(var(--vs-danger),1) !important;
         font-weight: 500;
     }
    }
</style>

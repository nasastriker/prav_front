<template>
    <div >
        <feather-icon icon="DownloadCloudIcon" svgClasses="h-5 w-5 mr-4 hover:text-primary cursor-pointer"
                      @click="downloadDocument"/>
    </div>
</template>

<script>
    import Vue from 'vue'
    import { mapActions,mapGetters } from 'vuex'
    export default {
        data () {
            return {
            }
        },

        computed: {
        },
        methods: {
            downloadDocument() {
                let url='download/data_control/'+this.params.data.id
                axios.get(url, { responseType: 'blob' })
                    .then(response => {
                        const blob = new Blob([response.data], { type: 'application/xls' })
                        const link = document.createElement('a')
                        link.href = URL.createObjectURL(blob)
                        link.download = 'отчет_'+this.params.data.id+'.xlsx'
                        link.click()
                        URL.revokeObjectURL(link.href)
                    }).catch(console.error)


            },


        }
    }
</script>

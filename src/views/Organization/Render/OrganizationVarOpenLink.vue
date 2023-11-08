<template>
    <div >
        <feather-icon icon="Edit3Icon" svgClasses="h-5 w-5 mr-4 hover:text-primary cursor-pointer" @click="editValue" />
        <feather-icon v-if="params.data.type==='Изображение'&&params.data.value==='загруженное изображение'" icon="DownloadIcon" svgClasses="h-5 w-5 hover:text-danger cursor-pointer" @click="downloadImage" />

    </div>
</template>

<script>
    import Vue from 'vue'
    import r from '../../../route';
    import axios from '../../../axios'
    import { mapActions,mapGetters } from 'vuex'
    export default {
        data(){
            return{
                // dataVar:{},
            }
        },
        methods: {
            ...mapActions([
                '',
            ]),
            downloadImage(){
                axios.get(r('organizationVar.index'),{
                        responseType: 'arraybuffer',
                        params: {
                            method: 'getImageFile',
                            param: {
                                id_orgn: this.$route.params.id,
                                id_recover:0,
                                var:this.params.data.name,
                            }
                        }
                    }
                ).then((response) => {
                    const blob = new Blob([response.data],{type: "image/jpg"})
                    const link = document.createElement('a')
                    link.download = this.params.data.name.slice(9,this.params.data.name.length)+'.jpeg'
                    link.href = URL.createObjectURL(blob)

                    link.click()
                    URL.revokeObjectURL(link.href)

                    /*

                    console.log(response.data)
                    const url = window.URL.createObjectURL(new File([(response.data)], { type: 'application/jpg;' }));
                    let filename=response.headers['content-disposition'].replace('attachment; filename=', '');
                    const link = document.createElement('a');
                  //  link.src='data:'+response.headers['content-type']+';base64,'+btoa(response)
                    link.href = url;
                    link.setAttribute('download',this.params.data.name.slice(9,this.params.data.name.length)+'.jpeg');
                    document.body.appendChild(link);
                    link.click();
                    */




                })
            },
            editValue () {
                this.params.editValue(this.params.data)
            },
            
        }
    }
</script>

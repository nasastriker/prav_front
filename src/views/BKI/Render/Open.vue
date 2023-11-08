<template>
    <div>


        <feather-icon icon="CompassIcon" svgClasses="h-5 w-5 hover:text-danger cursor-pointer"
                      @click="EditRecord"/>
        <feather-icon icon="ArrowUpCircleIcon" svgClasses="h-5 w-5 hover:text-danger cursor-pointer"
                      @click="LoadAnswere"/>
        <feather-icon icon="Trash2Icon" svgClasses="h-5 w-5 hover:text-danger cursor-pointer"
                          @click="confirmDeleteRecord"/>


        <vs-input id="AnswereInput" multiple type="file" ref="AnswereInput" class="w-full mb-base" label-placeholder="file" v-on:change="saveDocument($event)" style="display: none" />
    </div>
</template>

<script>
    import Vue from 'vue'
    import r from '../../../route';
    import axios from '../../../axios';
    import {mapActions, mapGetters} from 'vuex'

    export default {
        components: {


        },
        computed: {


            ...mapGetters([
                'User'

            ]),


        },
        methods: {
            ...mapActions([
                'getBkiReestrArr',
            ]),
            EditRecord(){
                this.$router.push('/bki_load/'+this.params.value)
            },
            confirmDeleteRecord() {
                this.$vs.dialog({
                    type: 'confirm',
                    color: 'danger',
                    title: 'Удаление',
                    text: `Вы действительно хотите удалить ? `,
                    accept: this.deleteRecord,
                    acceptText: 'Удалить',
                    cancelText: 'Отмена'
                })
            },
            deleteRecord() {
                axios.post(r("bki_reestr.update"), {
                    params: {
                        method: 'deleteBkiReestr',
                        param: this.params.value
                    }
                }).then(res=>{
                    if(res.data.result){
                        this.getBkiReestrArr()
                        this.$vs.notify({
                                                         title: 'Успешно',
                                                         text: 'Реестр удален!!!',
                                                         color: 'success',
                                                         position: 'top-center'
                                                     })
                    }
                    else {
                        this.$vs.notify({
                                                        title: 'Ошибка',
                                                        text: 'Ошибка !!!',
                                                        color: 'danger',
                                                        position: 'top-center'
                                                    })
                    }
                }).catch(error=>{
                    this.$vs.notify({
                                                    title: 'Ошибка',
                                                    text: 'Ошибка !!! '+error.message,
                                                    color: 'danger',
                                                    position: 'top-center'
                                                })
                })
            },

            LoadAnswere(){
                document.getElementById("AnswereInput").click()
            },
            saveDocument(event){
                // console.log(321)
                let formData = new FormData();
                formData.append('filename',this.params.data.filename)
                formData.append('id_bkireestr',this.params.data.id)
                event.target.files.forEach(file=>{
                    formData.append('files[]', file)
                })

                axios.defaults.headers.common['Authorization'] = `Bearer ${localStorage.getItem('accessToken')}`;
                axios.post('/bki_reestr/post-bki',
                    formData,
                    {
                        headers: {
                            'Content-Type': 'multipart/form-data'
                        }
                    }
                ).then((response) => {
                    if(response.data.result){
                         this.$vs.notify({
                                                         title: 'Успешно',
                                                         text: 'Успешно!!!',
                                                         color: 'success',
                                                         position: 'top-center'
                                                     })
                    }
                    else {
                        this.$vs.notify({
                                                        title: 'Ошибка',
                                                        text: 'Ошибка !!! '+response.data.error,
                                                        color: 'danger',
                                                        position: 'top-center'
                                                    })
                    }
                }).catch(e=>{
                    this.$vs.notify({
                                                    title: 'Ошибка',
                                                    text: 'Ошибка !!! '+e.getMessage(),
                                                    color: 'danger',
                                                    position: 'top-center'
                                                })
                })
            },

        }
    }
</script>

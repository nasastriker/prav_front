<template>
    <div style="display: flex">
        <template v-if="params.data.type==0">
            <vs-col>
            <vs-checkbox style="margin-right: 5px;margin-bottom: 20px" v-model="myvalue">
             <template v-if="params.data.value==0">Неактивно</template>
             <template v-else>Активно</template>
            </vs-checkbox>
            </vs-col>
            <vs-col>
            <feather-icon icon="Edit3Icon" svgClasses="h-5 w-5 mr-4 hover:text-primary cursor-pointer" style="margin-left: 30px;" @click="editValue" />
            <feather-icon icon="Trash2Icon" svgClasses="h-5 w-5 hover:text-danger cursor-pointer" @click="confirmDeleteRecord" />
            </vs-col>
        </template>
        <template v-if="params.data.type!==0">
            <vs-col>{{this.params.data.value}} </vs-col>
            <vs-col>
                <feather-icon icon="Edit3Icon" svgClasses="h-5 w-5 mr-4 hover:text-primary cursor-pointer" style="margin-left: 30px;" @click="editValue" />
                <feather-icon icon="Trash2Icon" svgClasses="h-5 w-5 hover:text-danger cursor-pointer" @click="confirmDeleteRecord" />
            </vs-col>
        </template>


    </div>

</template>

<script>
    import Vue from 'vue'
    import { mapActions,mapGetters } from 'vuex'
    import axios from '../../../../axios'
    import r from '../../../../route'
    export default {
        data() {
            return {
                intStrValue:'',
                pop:false,
            }
        },
        computed: {
            myvalue: {
                get() { return (this.params.data.value==1) },
                set(value) { this.changeStatus(value) },
            },
        },
        methods: {
            ...mapActions([
                'changeSettingBoolean','getSettingsAllTable','getSettingsChapterList'
            ]),
            editValue(){
                this.params.editValue(this.params.data)
                //  console.log(this.params.data)
            },
            changeStatus(value){
              //  this.params.data.value=value
                this.changeSettingBoolean ({id: this.params.data.id, value: value}).then((response) => {
                    if (response) {
                        this.getSettingsAllTable();
                    } else {
                        this.$vs.notify({  title:'Сообщение', text: 'Ошибка!!!', color: 'danger', position: 'top-center' })
                    }
                }).catch(error => {
                    this.$vs.notify({
                        title: 'Ошибка',
                        text: error.message,
                        color: 'danger',
                        position: 'top-center'
                    })

                });
            },
            confirmDeleteRecord () {
                this.$vs.dialog({
                    type: 'confirm',
                    color: 'danger',
                    title: 'Удаление',
                    text: `Вы действительно хотите удалить? `,
                    accept: this.deleteRecord,
                    acceptText: 'Удалить',
                    cancelText: 'Отмена'
                })
            },
            deleteRecord () {
                console.log(this.params.data.id)
                axios.post(r('setting.update'), {
                    params: {
                        method: 'deleteSetting',
                        param: this.params.data.id
                    }
                }).then((value)=> {
                    this.getSettingsChapterList()
                    this.getSettingsAllTable()
                    if(value){
                        this.showDeleteSuccess()
                    }
                    else{
                        this.showDeleteDanger()

                    }
                });

            },
            showDeleteSuccess () {
                this.$vs.notify({
                    color: 'success',
                    title: 'Сообщение',
                    text: 'Удален!!!',
                    position: 'top-center'
                })
            },
            showDeleteDanger () {
                this.$vs.notify({
                    color: 'danger',
                    title: 'Сообщение',
                    text: 'Удалить не удалось!!!',
                    position: 'top-center'
                })
            }
                  },

        mounted (){
            if(this.params.type!==0)this.intStrValue=this.params.value
        }
    }
</script>

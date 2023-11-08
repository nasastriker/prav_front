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
            </vs-col>
        </template>
        <template v-if="params.data.type!==0">
            <vs-col>{{this.params.data.value}} </vs-col>
            <vs-col>
                <feather-icon icon="Edit3Icon" svgClasses="h-5 w-5 mr-4 hover:text-primary cursor-pointer" style="margin-left: 30px;" @click="editValue" />
            </vs-col>
        </template>


    </div>

</template>

<script>
    import Vue from 'vue'
    import { mapActions,mapGetters } from 'vuex'
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
                'changeSettingBooleanFssp','getSettingsFsspTable'
            ]),
            editValue(){
                this.params.editValue(this.params.data)
                //  console.log(this.params.data)
            },
            changeStatus(value){
              //  this.params.data.value=value
                this.changeSettingBooleanFssp ({id: this.params.data.id, value: value}).then((response) => {
                    if (response) {
                        this.getSettingsFsspTable();
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

                  },

        mounted (){
            if(this.params.type!==0)this.intStrValue=this.params.value
        }
    }
</script>

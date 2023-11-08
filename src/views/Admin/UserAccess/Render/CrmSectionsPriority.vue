<template>
    <div>
    <span class="my-radio-btn-span-yes-nothing" @click="clickUp">
        <chevron-up-icon size="1.5x" class="custom-class"></chevron-up-icon>
    </span>
    <span class="my-radio-btn-span-no-nothing" @click="clickDown">
        <chevron-down-icon size="1.5x" class="custom-class"></chevron-down-icon>
    </span>
    <feather-icon icon="Trash2Icon" svgClasses="h-5 w-5 hover:text-danger cursor-pointer" @click="confirmDeleteRecord" />

    </div>
</template>

<script>
import {mapActions, mapGetters} from 'vuex'
import { ChevronUpIcon, ChevronDownIcon } from 'vue-feather-icons'

export default {
    name: 'CrmSectionsPriority',
    components: {
        ChevronUpIcon,
        ChevronDownIcon
    },
    data() {
        return {}
    },
    mounted() {

    },
    computed: {
        ...mapGetters([
        ]),
    },
    methods: {
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
            /* Below two lines are just for demo purpose */
            this.delCrmSection(this.params.data.id).then((value)=> {
                this.getCrmSectionsAlls();
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
                text: 'Раздел удален!!!',
                position: 'top-center'
            })
        },
        showDeleteDanger () {
            this.$vs.notify({
                color: 'danger',
                title: 'Сообщение',
                text: 'Раздел удалить не удалось!!!',
                position: 'top-center'
            })
        },
        clickUp() {
            this.moveUpCrmSection(this.params.data.id).then ((response)=> {
                if (response.result) {
                    this.$vs.notify({
                        color: 'success',
                        title: 'Сообщение',
                        text: 'Удачно!!!',
                        position: 'top-center'
                    })
                }
                else {
                    this.$vs.notify({
                        color: 'danger',
                        title: 'Сообщение',
                        text: 'Не получилось!!!',
                        position: 'top-center'
                    })
                }
                this.getCrmSectionsAlls()
            })
        },
        clickDown() {
            this.moveDownCrmSection(this.params.data.id).then ((response)=> {
                if (response.result) {
                    this.$vs.notify({
                        color: 'success',
                        title: 'Сообщение',
                        text: 'Удачно!!!',
                        position: 'top-center'
                    })
                }
                else {
                    this.$vs.notify({
                        color: 'danger',
                        title: 'Сообщение',
                        text: 'Не получилось!!!',
                        position: 'top-center'
                    })
                }
                this.getCrmSectionsAlls()
            })

        },
        ...mapActions([
            'moveUpCrmSection', 'moveDownCrmSection','delCrmSection','getCrmSectionsAlls'
        ]),
    },
}
</script>

<style lang="scss" scoped>
.ag-grid-cell-chip {
    &.vs-chip-success {
        color: rgba(var(--vs-success), 1) !important;
        font-weight: 500;
    }

    &.vs-chip-warning {
        color: rgba(var(--vs-warning), 1) !important;
        font-weight: 500;
    }

    &.vs-chip-danger {
        color: rgba(var(--vs-danger), 1) !important;
        font-weight: 500;
    }
}

.radio-box-acc {
    display: flex;
}

.rb-acc {
    margin-left: 5px;
    padding: 5px;
}

.my-radio-btn-body-yes {
    display: flex;
    height: 20px;
    width: 80px;
    background-color: blueviolet;
    border-radius: 10px;
    padding: 2px;
    cursor: pointer;
}

.my-radio-btn-body-no {
    display: flex;
    height: 20px;
    width: 80px;
    background-color: orangered;
    border-radius: 10px;
    padding: 2px;
    cursor: pointer;
}

.my-radio-btn-body-nothing {
    display: flex;
    height: 20px;
    width: 80px;
    background-color: white;
    border-radius: 10px;
    padding: 2px;
}

.my-radio-btn-cursor-yes {
    height: 16px;
    width: 16px;
    border-radius: 8px;
    background-color: white;
    margin-left: auto;
    cursor: pointer;
}

.my-radio-btn-cursor-no {
    height: 16px;
    width: 16px;
    border-radius: 8px;
    background-color: white;
    margin-right: auto;
    cursor: pointer;
}

.my-radio-btn-span-yes {
    color: white;
    padding-left: 10px;
    margin: auto;
    cursor: pointer;
}

.my-radio-btn-span-no {
    color: white;
    padding-right: 10px;
    margin: auto;
    cursor: pointer;
}

.my-radio-btn-span-yes-nothing {
    color: grey;
    padding-left: 10px;
    margin: auto;
    cursor: pointer;
}

.my-radio-btn-span-what-nothing {
    color: lightgray;
    margin: auto;
}

.my-radio-btn-span-no-nothing {
    color: grey;
    padding-right: 10px;
    margin: auto;
    cursor: pointer;
}
</style>

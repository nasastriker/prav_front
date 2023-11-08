<template>
    <div class="vx-row">
        <div style="width: 100%; padding: 15px">
            <div style="display: flex">
                <vs-input class="mb-4 md:mb-0 mr-4" style="width: 100%" v-model="find_value"
                          @input="getRegSudPrikazsList(find_value)"
                          placeholder="Поиск..."/>
                <vs-button class="mr-4 sm:mb-0 mb-2" style="margin-left: auto" color="success" @click="showAdd()">+
                </vs-button>
            </div>
            <div v-if="addShowed">
                <hr style="margin-bottom: 15px; margin-top: 15px; border: 1px solid #ADD8E6;">
                <vs-input class="w-full mb-base" label-placeholder="Reg" v-model="new_reg.name"></vs-input>
                <div style="display: flex">
                    <v-select class="w-50 " style="width: 100%;margin-top: -15px;margin-right: 10px" :reduce="label => label.name" label="name" :options="TypesRegSudPrikaz"
                              v-model="new_reg.type"></v-select>
                    <vs-button color="success" style="margin-left: auto; margin-top: -15px;" class="mr-4 sm:mb-0 mb-2" type="filled" @click="save()">Сохранить</vs-button>
                </div>
                <hr style="margin-bottom: 15px; margin-top: 15px; border: 1px solid #ADD8E6;">
            </div>
            <ag-grid-vue
                ref="agGridTable"
                class="ag-theme-material w-30 my-4 ag-grid-table"
                :columnDefs="columnDefs"
                :rowData="RegsSudPrikaz"
                rowSelection="multiple"
                @rowClicked="onRowDataChanged"
                colResizeDefault="shift"
                :animateRows="true"
                :floatingFilter="false"
                :pagination="true"
                :suppressPaginationPanel="true"
                @rowDoubleClicked=""
                :enableRtl="$vs.rtl">
            </ag-grid-vue>
            <div style="padding: 15px">
                <h5>{{ p_reg }}</h5>
            </div>
        </div>
    </div>

</template>

<script>
import {VueCsvImport} from 'vue-csv-import';
import { AgGridVue } from 'ag-grid-vue'
import vSelect from 'vue-select'
import {mapActions, mapGetters} from 'vuex'
import {SpinnerLoader} from 'vue-spinners-css';
import r from '../../route';
import axios from '../../axios'

export default {
    components: {
        AgGridVue,
        vSelect,
        VueCsvImport,
    },
    data() {
        return {
            p_reg: '',
            find_value: '',
            new_reg: {
                name: '',
                type: '',
            },
            addShowed: false,
            columnDefs: [
                {
                    headerName: 'Reg',
                    field: 'name',
                    filter: true,
                    width: 400,
                },
                {
                    headerName: 'Тип',
                    field: 'type',
                    filter: true,
                    width: 100,
                },
            ],
        }
    },
    computed: {
        ...mapGetters([
            'RegsSudPrikaz', 'TypesRegSudPrikaz'
        ]),
    },
    methods: {
        onRowDataChanged(event) {
            this.p_reg = event.data.name;
        },
        showAdd() {
            this.addShowed = !this.addShowed;
            if (this.addShowed) {
                this.getTypesRegSudPrikaz();
            }
        },
        save() {
            this.saveTypeRegSudPrikaz(this.new_reg).then((response) => {
                if (response.result){
                    this.getRegSudPrikazsList('');
                    this.addShowed = !this.addShowed;
                    this.find_value = '';
                    this.$vs.notify({
                        title: 'Сообщение',
                        text: 'Сохранено',
                        color: 'success',
                        position: 'top-center'
                    })
                } else {
                    this.$vs.notify({
                        title: 'Ошибка',
                        text: response.message,
                        color: 'success',
                        position: 'top-center'
                    })
                }
            }).catch(error => {
                this.$vs.loading.close()
                this.$vs.notify({
                    title: 'Ошибка',
                    text: error.message,
                    color: 'danger',
                    position: 'top-center'
                })
            });
        },
        ...mapActions([
            'getRegSudPrikazsList', 'getTypesRegSudPrikaz', 'saveTypeRegSudPrikaz'
        ]),
    },
    mounted() {

    }
}

</script>

<style lang="scss">
#page-user-list {
    .user-list-filters {
        .vs__actions {
            position: absolute;
            right: 0;
            top: 50%;
            transform: translateY(-58%);
        }
    }
}

.err_mess {
    color: red;
}

.succs_mess {
    color: green;
}

.tab {
    overflow: hidden;
    border: 1px solid #ccc;
    background-color: #f1f1f1;
}

/* Style the buttons that are used to open the tab content */
.tab button {
    background-color: inherit;
    float: left;
    border: none;
    outline: none;
    cursor: pointer;
    padding: 14px 16px;
    transition: 0.3s;
}

/* Change background color of buttons on hover */
.tab button:hover {
    background-color: #ddd;
}

/* Style the tab content */
.tabcontent {
    display: none;
    padding: 6px 12px;
    border: 1px solid #ccc;
    border-top: none;
}

.tabcontent {
    animation: fadeEffect 1s; /* Fading effect takes 1 second */
}

/* Go from zero to full opacity */
@keyframes fadeEffect {
    from {
        opacity: 0;
    }
    to {
        opacity: 1;
    }
}
</style>

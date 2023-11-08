<template>
    <div class="vx-row">
        <div class="vx-col">
            <div v-if="showVar < 2" style="display: flex">
                <h5 style="margin-right: 20px"><b>Текущий участок:</b> {{ NowJud }}</h5>
                <div style="margin-right: 10px" class="hover:text-primary cursor-pointer" @click="clickEdit(NowJudId)">
                    <edit-icon size="1.5x" class="custom-class"></edit-icon>
                </div>
                <span style="max-width: 40px;margin-left: auto">
                    <img src="/loading.gif" v-if="JudFindFlag" style="max-width: 40px; margin-top: 5px;">
                    <div v-else style="width: 40px"></div>
                </span>
            </div>


            <div v-if="showVar == 1"  style="margin-top: 20px">
                <h4 style="text-align: center">Вы действительно хотите привязать к заемщику данный судебный участок:</h4>
                <h4 style="text-align: center;margin-top: 10px"><b> {{ choosed_jud_name }} </b>?</h4>
                <br>
                <div style="text-align: center;">
                    <vs-button color="danger" class="pull-right mr-4" type="filled" @click="setYes">Да</vs-button>
                    <vs-button color="success" class="pull-right" type="filled" @click="setNo">Нет</vs-button>
                </div>
            </div>

            <div v-else-if="showVar == 0">
                <div class="hover:text-primary cursor-pointer" @click="showAdresses" style="margin-top: 30px">
                    <div v-if="show_adresses">
                        Скрыть адреса
                    </div>
                    <div v-else>
                        Показать адреса
                    </div>
                </div>
                <vs-input style="min-width: 500px;"  v-model="User.pag.judicial.find" @input="updateSearchQuery" placeholder="Поиск..." />
                <img src="/loading.gif" v-if="JudFindFlag" style="max-width: 40px; margin-top: 5px;">

                <div style="margin-top: 10px;" v-for="(jud, index) in JudicialsArr" class="hover:text-primary cursor-pointer">
                    <div style="display:flex;">
                        <div @click="clickJud(jud.id)">
                    <div>{{ jud.number }} - {{ jud.name }}
                    </div>



                    </div>
                    <div style="margin-left: auto" class="hover:text-primary cursor-pointer" @click="clickEdit(jud.id)">
                        <edit-icon size="1x" class="custom-class"></edit-icon>
                    </div>
                    </div>
                    <hr style="margin-bottom: 5px; margin-top: 5px; border: 0.5px solid #7367f0;">
                </div>
            </div>

            <div v-if="showVar == 2" style="margin-top: 5px;width: 800px">
                <JudicialID :id_jud="jud_for_edit.id" @save="saveJud"> </JudicialID>

            </div>
        </div>
    </div>
</template>

<script>
import {VueCsvImport} from 'vue-csv-import';
import {mapActions, mapGetters} from 'vuex'
import JudicialID from '../Handbook/JudicialID.vue'
import { EditIcon } from 'vue-feather-icons'

export default {
    components: {
        VueCsvImport,
        EditIcon,
        JudicialID
    },
    data() {
        return {
            findFlag:false,
            showVar: 0,
            show_adresses: false,
            area_jud_id: 0,
            choosed_jud_id: 0,
            choosed_jud_name: '',
            choosed_jud_number: '',
            jud_for_edit: {}
        }
    },
    computed: {
        ...mapGetters([
            'JudicialsArr','TotalJudicials','User'

        ]),
        ...mapGetters([
            'NowJud', 'ResetJudArr', 'AreaJudArr', 'JudFindFlag', 'Deb', 'NowJudId'
        ]),
    },
    methods: {
        saveJud(){
          //  this.setJudicialRecord(this.jud_for_edit).then(() => {
                this.getJudicialsListForReset(this.Deb.debtor.id);
                this.showVar = 0;
            //});
        },
        cancelJud(){
            this.jud_for_edit.number = '';
            this.jud_for_edit.name = '';
            this.jud_for_edit.address = '';
            this.showVar = 0;
        },
        clickEdit(id){
            this.getJudicial(id).then((response) => {
                if (response.result){
                    this.jud_for_edit = response.data;
                    this.showVar = 2;
                }
            })
        },
        updateSearchQuery (val) {
            this.User.pag.judicial.find=val

            this.getJudicialsByName(this.User.pag.judicial).then((response) => {

            });

        },
        showAdresses(){
            this.show_adresses = !this.show_adresses;
        },
        setYes(){
            this.Deb.debtor.jud_number = this.choosed_jud_number;
            this.Deb.debtorCredit.jud_number = this.choosed_jud_number;
            this.showVar = 0;
            this.$emit('reSetJud');
            this.changeDeb().then((response) => {
                this.getJurisName(this.Deb.debtorCredit.id);
            })
        },
        setNo(){
            this.showVar = 0;
        },
        clickJud(jud_id) {
            this.getJudicial(jud_id).then((response) => {
                if (response.result){
                    this.choosed_jud_name = response.data.number + ' ' + response.data.name;
                    this.choosed_jud_number = response.data.number;
                    this.showVar = 1;
                }
            })
        },
        changeAreaJud() {
            this.getNewJudicialsListForReset(this.area_jud_id)
        },
        ...mapActions([
            'getJudicial', 'getNewJudicialsListForReset', 'setJudicialRecord', 'getJudicialsListForReset','getJudicialsByName','changeDeb','getJurisName'
        ]),
    },
    mounted() {
        var that=this
        setTimeout(function(){
            that.updateSearchQuery(that.NowJud)
        },5000);
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

.elem {

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

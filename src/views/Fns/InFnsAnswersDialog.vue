<template>
    <div class="vx-row">
        <div class="vx-col">
            <div v-if="fnsData.length > 0">
            <template v-if="what_from === 'fromCredit'">
                <div class="tab">
                    <button v-for="dataItem in fnsData" class="tablinks" :id="dataItem.id*10" @click="openInfo(event, dataItem.id)">
                        {{ dataItem.p_file_data.file_date }}
                    </button>
                </div>

                <div v-for="dataItem in fnsData" :id="dataItem.id" class="tabcontent">
                    <OneFnsAnswer :dataItem="dataItem" :correctState="correctState"></OneFnsAnswer>
                </div>
            </template>
            <template v-else-if="what_from === 'fromAnswers'">
                <OneFnsAnswer :dataItem="fnsData[0]" :correctState="correctState" @refreshAfterSet="onRefreshAfterSet"></OneFnsAnswer>
            </template>
            </div>
            <div v-else>
                <template v-if="what_from === 'fromCredit'">
                    <h5>По данному заемщику не было ответов от ФНС</h5>
                </template>
            </div>
        </div>
    </div>

</template>

<script>
import {VueCsvImport} from 'vue-csv-import';
import {mapActions, mapGetters} from 'vuex'
import OneFnsAnswer from "./OneFnsAnswer.vue";

export default {
    components: {
        VueCsvImport,
        OneFnsAnswer
    },
    props: {
        fnsData: {},
        what_from: '',
    },
    data() {
        return {
            correctState: 0,
            last_btn_id: 0
        }
    },
    computed: {
        ...mapGetters([]),
    },
    methods: {
        onRefreshAfterSet(par_vals){
            this.$emit('refreshAfterSet', par_vals);
        },
        openInfo(evt, tab_id) {
            var i, tabcontent, tablinks, btn_id;

            // Get all elements with class="tabcontent" and hide them
            tabcontent = document.getElementsByClassName("tabcontent");
            for (i = 0; i < tabcontent.length; i++) {
                tabcontent[i].style.display = "none";
            }

            // Get all elements with class="tablinks" and remove the class "active"
            tablinks = document.getElementsByClassName("tablinks");
            for (i = 0; i < tablinks.length; i++) {
                tablinks[i].className = "tablinks";
                tablinks[i].style.backgroundColor = "#ddd";
            }
            btn_id = tab_id * 10;
            // Show the current tab, and add an "active" class to the button that opened the tab
            document.getElementById(tab_id).style.display = "block";
            document.getElementById(btn_id).style.backgroundColor = "#ccc"
        },
        ...mapActions([]),
    },
    mounted() {
        if (this.fnsData.length > 0) {
            this.last_btn_id = this.fnsData[0].id;
            document.getElementById(this.last_btn_id).style.display = "block";
        }
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

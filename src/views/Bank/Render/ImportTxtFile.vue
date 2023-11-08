<template>
<span>
      <feather-icon icon="ArrowUpCircleIcon" svgClasses="h-5 w-5 mr-4 hover:text-primary cursor-pointer"
                    @click="goImport"/>
    <input type="file" ref="fileTxtInput" class="hidden" accept=".txt" @change="changeFileTxt($event)">
</span>

</template>

<script>
import {mapActions} from 'vuex'
import vSelect from 'vue-select'

export default {
    components: {
        'v-select': vSelect,
    },
    props: {
        dataid: {},
        onSuccess: {
            type: Function,
            required: true
        },
        url: '',
    },
    data() {
        return {
            id_recover: 0,
            status: 2,

            count: 1,
            txtFileData: {
                id_recover: 0,
                results: [],
                status: 0
            }
        }
    },
    computed: {},
    mounted() {

    },
    methods: {

        ...mapActions([
            'getDataArchBanks', 'saveFileForImportServ'
        ]),
        goImport() {
            this.$refs.fileTxtInput.click()
        },
        changeFileTxt(evt) {
            this.saveFileForImportServ({files: evt.target.files}).then((response) => {
                if (response.result) {
                    this.$refs['fileTxtInput'].value = null
                    this.generateData(response)
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
        generateData (response) {
            this.txtFileData.results = response
            this.txtFileData.id_recover = this.id_recover;
            this.txtFileData.status = this.status;
            if (this.onSuccess) this.onSuccess(this.txtFileData)
        },
    }
}
</script>
<style lang="scss">

.vs-popup--content {
    min-height: 100px !important;
    margin-top: 20px;
}

.dropdown-button-container {
    display: flex;
    align-items: center;

    .btnx {
        border-radius: 5px 0px 0px 5px;
    }

    .btn-drop {
        border-radius: 0px 5px 5px 0px;
        border-left: 1px solid rgba(255, 255, 255, .2);
    }
}
</style>

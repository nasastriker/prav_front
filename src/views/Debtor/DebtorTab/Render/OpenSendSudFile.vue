<template>
    <div>
        <div v-if="params.value || params.data.file_to_path">
            <download-icon size="1.5x" class="hover:text-primary cursor-pointer" @click="downloadDocument"></download-icon>
        </div>
    </div>
</template>

<script>
import Vue from 'vue';
import r from '../../../../route';
import {mapActions, mapGetters} from 'vuex';
import {DownloadIcon} from 'vue-feather-icons';
import axios from "../../../../axios";

export default {
    components: {
        DownloadIcon
    },
    name: 'OpenSendSudFile',
    methods: {
        ...mapActions([

        ]),
        downloadDocument(){
            this.$vs.loading({color: '#ff8000'})
            axios.get(r("shablonDocument.index"), {
                responseType: 'arraybuffer',
                params: {
                    method: 'getSendFileIskDoc',
                    param:this.params.data.id
                }
            }).then((response) => {
                const url = window.URL.createObjectURL(new File([(response.data)], { type: 'application/pdf;charset=UTF-8;' }));
                const link = document.createElement('a');
                link.href = url;
                if (this.params.data.file_to_path == null) {
                  link.setAttribute('download', this.params.value);
                } else {
                  link.setAttribute('download', 'file.pdf');
                }
                document.body.appendChild(link);
                link.click();
                this.$vs.loading.close()
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
    },
}
</script>

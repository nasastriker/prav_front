<template>
    <div>
        <div v-if="params.value">
            <file-text-icon size="1.5x" class="hover:text-primary cursor-pointer" @click="downloadDocument"></file-text-icon>
        </div>
    </div>
</template>

<script>
import Vue from 'vue';
import r from '../../../route';
import {mapActions, mapGetters} from 'vuex';
import {FileTextIcon} from 'vue-feather-icons';
import axios from "../../../axios";

export default {
    components: {
        FileTextIcon
    },
    name: 'InstructionFile',
    methods: {
        ...mapActions([

        ]),
        downloadDocument(){
            this.$vs.loading({color: '#ff8000'})
            axios.get(r("workActions.index"), {
                responseType: 'arraybuffer',
                params: {
                    method: 'getInstructionFileByPath',
                    param:this.params.value.id
                }
            }).then((response) => {
                const url = window.URL.createObjectURL(new File([(response.data)], { type: 'application/pdf;charset=UTF-8;' }));
                const link = document.createElement('a');
                link.href = url;
                link.setAttribute('download', this.params.value.file);
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

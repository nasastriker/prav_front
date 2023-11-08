<template>
    <vx-card>
        <div style="display: flex">
            <Back></Back>
            <span class="text-primary cursor-default" style="margin-left: auto;margin-right: 20px"><trash-2-icon
                size="1.5x" class="custom-class" @click="hintDelete"
                style="cursor: pointer"></trash-2-icon></span>
        </div>
        <div style="margin-left: 15px">
            <h2 style="margin-top: 10px" class="text-primary">{{ data_faq.title }}
                <span style="max-width: 40px;margin-left: 10px">
                    <img src="/loading.gif" v-if="HelpHintFindFlag" style="max-width: 40px; margin-top: 5px;">
                    <div v-else style="width: 40px"></div>
                </span>
            </h2>
            <div>Просмотров: {{ data_faq.popularity }}</div>
            <div v-if="data_faq.type == 1" style="margin-top: 10px">
                <video :src="video_url" controls
                       style="max-width: 1000px; margin-top: 5px;"></video>
            </div>
            <div v-else-if="data_faq.type == 2" style="margin-top: 10px">

                <vue-editor  :disabled="act" :editor-toolbar="customToolbar" v-model="data_faq.body"></vue-editor>
            </div>
        </div>
    </vx-card>
</template>

<script>
import {mapActions, mapGetters} from 'vuex'
import r from '../../route';
import axios from '../../axios'
import {Trash2Icon} from 'vue-feather-icons'
import Back from '../../components/Back.vue'
import { VueEditor } from "vue2-editor";
export default {
    components: {
        Back, Trash2Icon,VueEditor
    },
    data() {
        return {
            act:true,
            customToolbar: [
                [{ color: "color-picker" }]
            ],
            video_url: '',
            data_faq: {
                title: '',
                type: 0,
                popularity: 0,
                body: ''
            }
        }
    },
    computed: {
        ...mapGetters([
            'HelpHintData', 'HelpHintFindFlag'
        ]),
    },
    methods: {
        getVideoUrl() {
            this.getFileResponse(this.$route.params.id).then((response) => {
                const url = window.URL.createObjectURL(new File([(response)], {type: 'video/mp4;charset=UTF-8;'}));
                this.video_url = url;
            }).catch(error => {
                this.$vs.notify({
                    title: 'Ошибка',
                    text: error.message,
                    color: 'danger',
                    position: 'top-center'
                })

            });
        },
        hintDelete() {
            this.$vs.dialog({
                type: 'confirm',
                color: 'danger',
                title: 'Удаление',
                text: `Вы действительно хотите удалить инструкцию? `,
                accept: this.deleteRecord,
                acceptText: 'Удалить',
                cancelText: 'Отмена'
            })
        },
        deleteRecord() {
            this.deleteHint(this.$route.params.id).then(() => {
                this.$router.push('/help_page');
            });
        },
        ...mapActions([
            'getDataHelpHint', 'deleteHint', 'getFileResponse'
        ]),
    },

    mounted() {
        this.getDataHelpHint(this.$route.params.id).then((data_hint) => {
                this.data_faq = data_hint;
                if (this.data_faq.type == 1){
                    this.getVideoUrl();
                }
        });
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
</style>

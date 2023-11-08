<template>
    <div>
        <vx-card>
            <div style="display: flex;margin-bottom: 20px;">
                <h2 class="text-primary">Помощь</h2>
<!--                <span style="margin-left: 20px" @click="go_test">Test</span>-->
                <plus-square-icon size="2x" class="hover:text-primary cursor-pointer" style="margin-left: auto"
                                  @click="addHintShow"></plus-square-icon>
            </div>
            <span>Введите ключевые слова для поиска</span>
            <vs-input class="w-full mb-base" label-placeholder="Поиск" v-model="search_words"
                      @input="searchHints"></vs-input>
            <div v-if="show_popular">
                <h4 style="color: #1f2b7b;">Популярные запросы</h4>
                <div v-if="!is_empty">
                    <div v-for="hint in hints">
                        <HelpPageOneEl :hint="hint"></HelpPageOneEl>
                    </div>
                </div>
            </div>
            <div v-else>
                <div v-if="!is_empty">
                    <div v-for="hint in hints">
                        <HelpPageOneEl :hint="hint"></HelpPageOneEl>
                    </div>
                </div>
                <div v-else>
                    <span>По запросу "{{ search_words }}" ничего не найдено...</span>
                </div>
            </div>
        </vx-card>

        <vs-popup title="Добавление новой инструкции" :active.sync="showAddHint">

            <vs-input class="w-full mb-base" label-placeholder="Название" v-model="new_hint.title"></vs-input>
            <div>
                <div>
                    <vs-radio v-model="hint_type" vs-value="0" vs-name="imp_type" @input="impTypeClick">Видео</vs-radio>
                    <vs-radio v-model="hint_type" vs-value="1" vs-name="imp_type" @input="impTypeClick">Текст</vs-radio>
                </div>
                <div v-if="show_text_area">
                    <vue-editor v-model="hint_text"></vue-editor>
                    <!--<vs-textarea v-model="hint_text" placeholder="введите текст инструкции" class="w-full mb-base" height="400px" style="margin-top: 15px"></vs-textarea>-->
                </div>
                <div style="display: flex">
                    <vs-button style="margin-left: auto" color="success" class="pull-right" type="filled"
                               @click="addHint">Добавить
                    </vs-button>
                </div>
            </div>
            <input type="file" ref="fileDirInput" class="hidden" accept=".mp4" @change="changeFileDir($event)">
        </vs-popup>

    </div>
</template>

<script>
import {mapActions, mapGetters} from 'vuex'
import r from '../../route';
import axios from '../../axios'
import {PlusSquareIcon} from 'vue-feather-icons'
import HelpPageOneEl from "./HelpPageOneEl.vue";
import { VueEditor } from "vue2-editor";
export default {
    components: {
        PlusSquareIcon, HelpPageOneEl,VueEditor
    },
    data() {
        return {
            content: "<h3>Initial Content</h3>",
            show_text_area: true,
            search_words: '',
            show_popular: true,
            hints: [],
            is_empty: false,
            showAddHint: false,
            new_hint: {
                title: ''
            },
            hint_type: 0,
            hint_text: ''
        }
    },
    computed: {
        ...mapGetters([]),
    },
    methods: {
        go_test(){
            this.goTest()
        },
        impTypeClick() {
            if (this.hint_type == 1) {
                this.show_text_area = true;
            } else {
                this.show_text_area = false;
                this.hint_text = '';
            }
        },
        addHintShow() {
            this.new_hint.title = '';
            this.showAddHint = true;
        },
        addHint() {
            console.log(this.hint_text);
            if (this.new_hint.title == '') {
                this.$vs.notify({
                    title: 'Сообщение',
                    text: 'Поле Название не заполнено!',
                    color: 'primary',
                    position: 'top-center'
                })
            } else {
                if (this.hint_type == 0) {
                    this.$refs.fileDirInput.click()
                }
                if (this.hint_type == 1) {
                    this.addHelpHint({title: this.new_hint.title, text_hint: this.hint_text}).then(() => {
                        this.showAddHint = false;
                        this.getHints(1, '');
                    });
                }
            }
        },
        getHints(type, key_words) {
            this.getHelpHints({type: type, key_words: key_words}).then((response) => {
                if (response.hints.length > 0) {
                    this.is_empty = false;
                    this.hints = response.hints;
                } else {
                    this.is_empty = true;
                }
            });
        },
        searchHints() {
            if (this.search_words === '') {
                this.show_popular = true;
                this.getHints(1, '');
            } else {
                this.show_popular = false;
                this.getHints(2, this.search_words);
            }
        },
        changeFileDir(evt) {
            this.showAddHint = false;
            this.saveFileForImportServDir({files: evt.target.files, dir: 'app/videos/'}).then((response) => {
                if (response.result) {
                    this.$refs['fileDirInput'].value = null
                    this.addHelpHint({response: response, title: this.new_hint.title}).then(() => {
                        this.getHints(1, '');
                    });
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
            'getHelpHints', 'saveFileForImportServDir', 'addHelpHint','goTest','getCrmSectionsAlls'
        ]),
    },

    mounted() {
        this.getCrmSectionsAlls();
        this.getHints(1, '');
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

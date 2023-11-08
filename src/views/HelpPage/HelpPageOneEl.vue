<template>
    <div @click="hintClick(hint.id)" class="one-hint">
        <div style="display: flex">
            <div>
            <div v-if="hint.type == 1" style="display: table;padding: 10px;">
                <video-icon size="3x" class="custom-class" style="margin-left: 5px;display: table-cell;vertical-align: middle;"></video-icon>
            </div>
            <div v-else-if="hint.type == 2" style="display: table;padding: 10px;">
                <file-text-icon size="3x" class="custom-class" style="display: table-cell;vertical-align: middle;"></file-text-icon>
            </div>
            </div>
            <div style="margin-left: 20px; font-size: 16px;display: table;">
                <div style="display: table-cell;vertical-align: middle;">{{ hint.title }}</div>
            </div>
            <div style="padding: 5px;margin-left: auto;">
                <div style="margin-right: 10px;text-align: right;font-size: 10px">
                    <eye-icon size="1x"></eye-icon> {{ hint.popularity }}
                </div>
            </div>
        </div>
    </div>
</template>

<script>
import {mapActions, mapGetters} from 'vuex'
import r from '../../route';
import axios from '../../axios'
import {VideoIcon, FileTextIcon, EyeIcon} from 'vue-feather-icons'

export default {
    components: {
        VideoIcon, FileTextIcon, EyeIcon
    },
    props: {
        hint: {}
    },
    data() {
        return {

        }
    },
    computed: {
        ...mapGetters([
            'HelpHintData'
        ]),
    },
    methods: {
        hintClick(id){
            this.$router.push('/help_page/'+id)
        },
        hintDelete(){

        },
        ...mapActions([
            'getDataHelpHint'
        ]),
    },

    mounted() {
        this.getDataHelpHint(this.$route.params.id);
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

.one-hint {
    background-color: #EEDDFF;
    cursor: pointer;
    margin-top: 20px;
    border-radius: 5px;
    color: #1f2b7b;
}
.one-hint:hover {
    background-color: #7922CC;
    color: white;
}
</style>

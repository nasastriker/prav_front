<template>
    <div>
        <div v-if="params.value">
            <check-square-icon size="1.5x" class="custom-class"></check-square-icon>
        </div>
    </div>
</template>

<script>
import Vue from 'vue'
import r from '../../../route';
import {mapActions, mapGetters} from 'vuex'
import {CheckSquareIcon} from 'vue-feather-icons'

export default {
    components: {
        CheckSquareIcon
    },
    name: 'UploadFunc',
    methods: {
        ...mapActions([]),
    }
}
</script>

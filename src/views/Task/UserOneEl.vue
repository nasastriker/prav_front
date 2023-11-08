<template>
    <div @click="userClick(one_user)" class="one-hint-warn" v-if="one_user.stats.warn === 1">
        <div style="display: flex">
            <div>
                <div style="display: table;padding: 10px;">
<!--                    <video-icon size="3x" class="custom-class" style="margin-left: 5px;display: table-cell;vertical-align: middle;"></video-icon>-->
                    <div>
                        <UserAvatar :user_initials="one_user.inits"></UserAvatar>
                    </div>
                </div>
            </div>
            <div style="margin-left: 20px; font-size: 16px;display: table;">
                <div style="display: table-cell;vertical-align: middle;">{{ one_user.fio }}</div>
                <div style="display: table-cell;vertical-align: middle;">
                    <div style="margin-left: 50px">
                        <div><b>Важное сообщение:</b></div>
                        <div>{{ one_user.stats.warn_message }}</div>
                    </div>
                </div>
            </div>
        </div>
    </div>
    <div @click="userClick(one_user)" class="one-hint" v-else>
        <div style="display: flex">
            <div>
            <div style="display: table;padding: 10px;">
<!--                <video-icon size="3x" class="custom-class" style="margin-left: 5px;display: table-cell;vertical-align: middle;"></video-icon>-->
                    <div>
                        <UserAvatar :user_initials="one_user.inits"></UserAvatar>
                    </div>
            </div>
            </div>
            <div style="margin-left: 20px; font-size: 16px;display: table;">
                <div style="display: table-cell;vertical-align: middle;">{{ one_user.fio }}</div>
            </div>
        </div>
    </div>
</template>

<script>
import {mapActions, mapGetters} from 'vuex'
import UserAvatar from "../Avatar/UserAvatar.vue";
import r from '../../route';
import axios from '../../axios'
import {VideoIcon} from 'vue-feather-icons'

export default {
    components: {
        VideoIcon,
        UserAvatar
    },
    props: {
        one_user: {}
    },
    data() {
        return {

        }
    },
    computed: {
        ...mapGetters([
        ]),
    },
    methods: {
        userClick(one_user){
            this.$emit('clickToUser',
                {
                    fio: one_user.fio,
                    id: one_user.id
                });
        },
        ...mapActions([
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

.one-hint-warn {
    background-color: #FCEEE0;
    cursor: pointer;
    margin-top: 20px;
    border-radius: 5px;
    color: #FF6000;
}
.one-hint-warn:hover {
    background-color: #FF6000;
    color: white;
}
.user-info-avatar {
    border-radius: 15px;
}
</style>

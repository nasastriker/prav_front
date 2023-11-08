<template>
    <div class="vx-card p-6">
        <vs-tabs>
            <vs-tab label="Доступы пользователей">
                <UserCrmSectionAccess></UserCrmSectionAccess>
            </vs-tab>
            <vs-tab label="Разделы СРМ">
                <CrmSectionsManage></CrmSectionsManage>
            </vs-tab>
        </vs-tabs>
    </div>
</template>

<script>
import {mapActions, mapGetters} from 'vuex'
import CrmSectionsManage from "./CrmSectionsManage.vue";
import UserCrmSectionAccess from "./UserCrmSectionAccess.vue";

export default {
    components: {
        CrmSectionsManage,
        UserCrmSectionAccess,
    },
}

</script>

<style>
</style>

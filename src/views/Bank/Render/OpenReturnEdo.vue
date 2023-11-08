<template>
    <div >
        <span title="Удаление реестра">
          <feather-icon icon="Trash2Icon" svgClasses="h-5 w-5 hover:text-danger cursor-pointer" @click="confirmDeleteRecord" />
        </span>
    </div>
</template>

<script>
    export default {
        data () {
            return {
            }
        },
        methods: {
            confirmDeleteRecord () {
                this.params.deleteArch(this.params.value);
            },
        }
    }
</script>

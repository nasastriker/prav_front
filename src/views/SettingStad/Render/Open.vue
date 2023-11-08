<template>
    <div >
        <feather-icon icon="Trash2Icon" svgClasses="h-5 w-5 hover:text-danger cursor-pointer" @click="confirmDeleteRecord" />

    </div>
</template>

<script>
    export default {
        methods: {

            confirmDeleteRecord () {
              this.params.delete_var(this.params.data.id)
            },


        }
    }
</script>

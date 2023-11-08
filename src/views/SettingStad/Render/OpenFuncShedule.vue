<template>
    <div >
        <feather-icon icon="Trash2Icon" svgClasses="h-5 w-5 hover:text-danger cursor-pointer" @click="confirmDeleteRecord" />
        <vs-button
                size="small"
                color="green"
                @click="start"
                style="margin-bottom: 5px"
        >Запустить</vs-button>
    </div>
</template>

<script>
    export default {
        methods: {
            start(){
              this.params.start(this.params.data.id)
            },
            confirmDeleteRecord () {
              this.params.delete_var(this.params.data.id)
            },


        }
    }
</script>

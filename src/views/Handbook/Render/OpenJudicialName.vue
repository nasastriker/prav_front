<template>
    <div >

        {{this.params.value}}

    </div>
</template>

<script>
    import Vue from 'vue'
    export default {
        methods: {
            editRecord () {
                console.log(this.params)
                this.$router.push(`/handbook/judicial/`+this.params.value).catch(() => {})

                /*
                 Below line will be sssfor actual product
                 Currently it's commented due to demo purpose - Above url is for demo purpose

                 this.$router.push("/apps/user/user-edit/" + this.params.data.id).catch(() => {})
                 */
            },
        }
    }
</script>

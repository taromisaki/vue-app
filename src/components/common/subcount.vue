<template>
    
</template>
<style lang="less" scoped>

</style>
<script>
import {subcount} from '@/api/getData'
export default {
    methods: {
        async getSubcount (){
            
            let par = {'uid':'515731832'}
            let result = await subcount(par)
            console.log(result)
        }
    },
    created: function() {
        this.getSubcount()
    }
}
</script>

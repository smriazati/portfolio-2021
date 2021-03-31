<template>
    <div class="item-comp" :class="showDesc ? 'open' : 'closed'">
        <div v-if="item.fields" class="text-wrapper">
            <!-- <img v-show="showDesc" class="tnail" v-if="item.fields.Thumbnail" :src="item.fields.Thumbnail[0].thumbnails.full.url" alt=""> -->
            <h2 class="btn" role="button" @click="toggleShow">{{ item.fields.Name }}</h2>
            <p v-show="showDesc" :class="showDesc ? 'fade-in' : 'hide-desc'"> {{ item.fields.Description }} <a class="link-btn" :href="item.fields.linkURL" target="_blank">{{ item.fields.linkText }}</a></p>
        </div>
    </div>
</template>


<script>
export default {
    data: function() {
        return {
            showDesc: false
        }
    },
    props: ['item'],
    methods: {
        toggleShow: function() {
            this.showDesc = !this.showDesc;
        }
    }
}
</script>
<style lang="scss">

</style>
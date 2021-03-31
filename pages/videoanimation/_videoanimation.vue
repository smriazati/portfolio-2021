<template>
    <div class="videoanimation-page wrapper">
        <WorkModal :activeItem="activeItem"/>
    </div>
</template>



<script>
import WorkModal from '@/components/WorkModal.vue';

export default {
    head() {
        return {
            title: this.metaInfo.title + this.$store.state.metadata.generalTitle,
            meta: [
                {
                    hid: 'description',
                    name: 'description',
                    content: this.metaInfo.description
                },
                {
                    property: 'og:title',
                    content: this.metaInfo.title
                },
                {
                    property: 'og:description',
                    content: this.metaInfo.description
                },
                {
                    property: 'og:image',
                    content: this.metaInfo.image
                }
            ]
        }
    },
    components: {
        WorkModal
    },
    layout: 'video',
    asyncData({ params, $axios }) {
        return $axios
        .get(`/VideoAnimation?view=ItemsAPIView`)
        .then(res => {
            return { items: res.data.records }
        })
        .catch(e => {
            error({ statusCode: 404, message: 'Post not found' })
        })
    },
    computed: {
        currentRoute() {
            return this.$route.path.split("/").pop().split("/").pop();
        },
        metaInfo: function() {
            let data = {
                'title': '',
                'description': '',
                'image': ''
            }
            if (this.activeItem) {
                data.title = this.activeItem.fields.Name;
                data.description = this.activeItem.fields.Description;
                data.image = this.activeItem.fields.Thumbnail[0].thumbnails.large.url;
            } 
            return data;
        },
        activeItem() {
            if (this.items !== "") {
                const items = this.items;
                let currentItem = null;
                items.forEach(item => {
                    if (item.fields.urlslug === this.currentRoute) {
                        currentItem = item;
                    }
                });
                if (currentItem) {
                    return currentItem;
                } else {
                    return `Oops! There's no project here!`;
                }
            } else {
                return false;
            }
        }
    }
}
</script>
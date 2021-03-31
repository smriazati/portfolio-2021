<template>
    <div class="wrapper">
        <MainNav />
        <header>
            <h1>Course List</h1>
        </header>

        <main>
            <div class="items-list" v-if="items">
                <div v-for="item in items" :key="item.id" class="item">
                    <h2 v-if="item.fields.Name">{{ item.fields.Name }}</h2>
                    <h3 v-if="item.fields.Institution">{{ item.fields.Institution }}</h3>
                    <h4 v-if="item.fields.Department">{{ item.fields.Department }}</h4>
                    <p v-if="item.fields.Types">{{ item.fields.Types[0] }}</p>
                    <p v-if="item.fields.Terms">
                        <span v-for="(term, index) in item.fields.Terms" :key="index">{{ term }}</span>
                    </p>
                    <p>{{ item.fields.Description }}</p>
                    <a targret="_blank" v-if="item.fields.linkText" :href="item.fields.linkURL">{{ item.fields.linkText }}</a>
                    <!-- <nuxt-link :to="slug + '/' + item.fields.urlslug">Link</nuxt-link> -->
                </div>
            </div>
        </main>
    
    </div>   
</template>

<script>
import MainNav from '@/components/MainNav'

export default {
    head() {
        return {
            title: this.$store.state.metadata.teaching.title + this.$store.state.metadata.generalTitle,
            meta: [
                {
                    hid: 'description',
                    name: 'description',
                    content: this.$store.state.metadata.teaching.description
                },
                {
                    property: 'og:title',
                    content: this.$store.state.metadata.teaching.title
                },
                {
                    property: 'og:description',
                    content: this.$store.state.metadata.teaching.description
                },
                {
                    property: 'og:image',
                    content: this.$store.state.metadata.teaching.ogImage
                }
            ],
            script: [
                {
                    src: 'https://cdnjs.cloudflare.com/ajax/libs/gsap/3.4.2/gsap.min.js'
                },
                {
                    src: 'https://cdnjs.cloudflare.com/ajax/libs/gsap/3.4.2/CSSRulePlugin.min.js'
                },
                {
                    src: 'https://cdnjs.cloudflare.com/ajax/libs/gsap/3.4.2/ScrollTrigger.min.js'
                }
            ]
        }
    },
    layout: 'teaching',
    components: {
        MainNav
    },
    asyncData({ params, $axios }) {
        return $axios
        .get(`/Teaching?view=ItemsAPIView`)
        .then(res => {
            let items = res.data.records;
            items.sort((a, b) => parseFloat(a.fields.SortOrder) - parseFloat(b.fields.SortOrder));
            return { items: items }
        })
        .catch(e => {
            error({ statusCode: 404, message: 'Post not found' })
        })
    },
    data: function() {
        return {
            menuOpen: false,
            initialOpen: true,
            isMounted: false,
            slug: 'teaching',
        }
    },
    mounted() {
        this.isMounted = true; // hack for gsap https://stackoverflow.com/questions/43531755/using-refs-in-a-computed-property
    },
    watch: {
        // ADD REF STUFF HERE 
        isMounted: function() {
            if (this.isMounted) {

            }
        }
    },
    methods: {
       menuToggle: function() {
            this.menuOpen = !this.menuOpen
        },
        setAnimation: function() {
            if (!process.client) return;
            // YOU CAN ASSUME ALL REFS ARE DEFINED PAST HERE
            
            // gsap.to(.....)
        },
        
    }
}
</script>

<style lang="scss">

</style>
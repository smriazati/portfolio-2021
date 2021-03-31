<template>
    <div class="video">
        <MainNav />
        <header class="banner-header">
            <h1>Video &amp; Animation</h1>
        </header>

        <main>
            <div class="items-list" v-if="items" ref="itemsList">
                <nuxt-link v-for="item in filteredItems" :key="item.id" class="item" :to="'/videoanimation/' + item.fields.urlslug" :id="item.fields.urlslug" ref="item">
                    <div v-if="item.fields.Thumbnail" class="item-image" ref="img"><img :src="item.fields.Thumbnail[0].thumbnails.large.url" alt=""></div>
                    <div v-else class="image-none"></div>
                    <div class="item-text">
                        <h2>{{ item.fields.Name }}</h2>
                    </div>
                </nuxt-link>
            </div>
        </main>
    
    </div>   
</template>

<script>
import MainNav from '@/components/MainNav'

export default {
    head() {
        return {
            title: this.$store.state.metadata.video.title + this.$store.state.metadata.generalTitle,
            meta: [
                {
                    hid: 'description',
                    name: 'description',
                    content: this.$store.state.metadata.video.description
                },
                {
                    property: 'og:title',
                    content: this.$store.state.metadata.video.title
                },
                {
                    property: 'og:description',
                    content: this.$store.state.metadata.video.description
                },
                {
                    property: 'og:image',
                    content: this.$store.state.metadata.video.ogImage
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
    layout: 'video',
    components: {
        MainNav
    },
    asyncData({ params, $axios }) {
        return $axios
        .get(`/VideoAnimation?view=ItemsAPIView`)
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
            slug: 'video-and-animation',
            isFiltered: false,
            activeFilter: ''
        }
    },
    mounted() {
        this.isMounted = true; // hack for gsap https://stackoverflow.com/questions/43531755/using-refs-in-a-computed-property
    },
    computed: {
        filteredItems: function() {
            if (this.isFiltered) {
                let ref2 = this.items;
                let arr2 = [];
                ref2.forEach( item => {
                    let tags = item.fields.Tag;
                    tags.forEach(tag => {
                        if (tag === this.activeFilter) {
                            arr2.push(item)
                        }
                    })
                    // if (item.fields.Tag === this.activeFilter) {
                    //     
                    // }
                })
                return arr2;
            } else {
                return this.items; // return filtered items
            }
        }
    },
    watch: {
        // ADD REF STUFF HERE 
        isMounted: function() {
            if (this.isMounted) {
                if (gsap) {
                    this.setAnimation();
                }
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
            let refs = [...this.$refs.item];
    
            if (refs) {
                refs.forEach(ref => {
                    // console.log(ref.$el);
                    let el = ref.$el;

                    gsap.from(el, {
                        scrollTrigger: {
                            trigger: el,
                            start: 'top bottom',
                            end: '+=100px',
                            scrub: 0.5
                        },
                        opacity: 0
                    });

                    let img = el.querySelector('img');
                    // img.style.translateY = '0';
                    gsap.from(img, {
                        scrollTrigger: {
                            trigger: el,
                            start: 'top bottom',
                            end: '+=100px',
                            scrub: 0.1,
                        },
                        y: 100
                    })                  
                })
            }
        },
        filterList: function(payload) {
            let filter = payload;
            if (filter) {
                // console.log(payload);
                this.isFiltered = true;
                this.activeFilter = payload;
            } else {
                this.isFiltered = false;
            }
        }
    }
}
</script>

<style lang="scss">

</style>
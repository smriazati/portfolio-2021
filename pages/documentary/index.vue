<template>
    <div class="wrapper" ref="wrapper">
        <MainNav />
        <div class="hero-vid" ref="vidContainer">
            <video @click="startVid" preload="auto" ref="video" class="btn">
                <source src="/media/documentary.mp4" type="video/mp4">
            </video>
            <h2>Animated Artist Statement</h2>
            <div v-scroll-to="'#main'" ref="scrollDown" class="scroll-down btn">
                <p>↓</p>
            </div>
        </div>
        <header>
            <!-- <h1>Statement</h1>
            <p>{{ $store.state.portfolio.documentary.statement }}</p> -->
        </header>

        <main id="main">
            <section class="recent-work" ref="recent">
                <h2>Recent work</h2>
                <div v-if="recentItems" class="work-items">
                    <div class="work-item" v-for="item in recentItems" :key="item.id" :id="item.fields.urlslug">
                        <div class="work-item-text">
                            <nuxt-link v-if="item.fields.Thumbnail" class="work-item-image" :to="slug + '/' + item.fields.urlslug">
                                <img :src="item.fields.Thumbnail[0].thumbnails.large.url" :alt="'poster image for ' + item.fields.Name"/>
                            </nuxt-link>
                            <h3 v-if="item.fields.Name">{{ item.fields.Name }}</h3>
                            <p v-if="item.fields.DescriptionShort">
                                {{ item.fields.DescriptionShort }}  
                            </p>
                            <nuxt-link class="btn spaced" :to="'/'+slug+'/'+item.fields.urlslug">View more →</nuxt-link>
                            
                        </div>
                    </div>
                </div>
                <div v-else>
                    <p>Loading...</p>
                </div>
            </section>
            <section class="archive-work" ref="archive">
                <div class="intro-text">
                    <!-- <h2>Archives</h2> -->
                    <p class="btn" @click="toggleArchives" v-scroll-to="'#archives'">View archives (2011-2017)</p>
                </div>
                <div id="archives">
                <ul v-if="archiveItems && archivesOpen" class="work-items" id="item.fields.urlslug">
                    <nuxt-link class="archive-item" v-for="item in archiveItems" :key="item.id" :to="slug + '/' + item.fields.urlslug" :id="item.fields.urlslug">
                        <li>
                            <span v-if="item.fields.Thumbnail" class="archive-image">
                                <img :src="item.fields.Thumbnail[0].thumbnails.large.url" :alt="'poster image for ' + item.fields.Name"/>
                            </span>
                            <span class="archive-text">
                                <h4 v-if="item.fields.Name">{{ item.fields.Name }} </h4>
                                <p v-if="item.fields.DescriptionShort">{{ item.fields.DescriptionShort }} </p>
                            </span>
                        </li>
                    </nuxt-link>
                </ul>
                </div>
            </section>
        </main>
    </div>   
</template>

<script>
import MainNav from '@/components/MainNav'

export default {
    head() {
        return {
            title: this.$store.state.metadata.documentary.title + this.$store.state.metadata.generalTitle,
            meta: [
                {
                    hid: 'description',
                    name: 'description',
                    content: this.$store.state.metadata.documentary.description
                },
                {
                    property: 'og:title',
                    content: this.$store.state.metadata.documentary.title
                },
                {
                    property: 'og:description',
                    content: this.$store.state.metadata.documentary.description
                },
                {
                    property: 'og:image',
                    content: this.$store.state.metadata.documentary.ogImage
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
    layout: 'documentary',
    transition: 'documentary',
    components: {
        MainNav
    },
    asyncData({ params, $axios }) {
        return $axios
        .get(`/Documentary?view=ItemsAPIView`)
        .then(res => {
            return { items: res.data.records }
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
            slug: 'documentary',
            archivesOpen: false
        }
    },
    mounted() {
        this.isMounted = true; 
    },
    computed: {
        recentItems: function() {
            let slug = 'recent';
            if (!this.items) {
                return;
            } else {
                let ref = this.items;
                let arr = [];
                let check = slug;
                ref.forEach( item => {
                    let tags = item.fields.Tag;
                    tags.forEach (tag => {
                        if (tag === check) {
                            arr.push(item)
                        }
                    })
                })
                arr.sort((a, b) => { a.fields.SortOrder - b.SortOrder});
                return arr;
            }
        }, 
        archiveItems: function() {
            let slug = 'archive';
            if (!this.items) {
                return;
            } else {
                let ref = this.items;
                let arr = [];
                let check = slug;
                ref.forEach( item => {
                    let tags = item.fields.Tag;
                    tags.forEach (tag => {
                        if (tag === check) {
                            arr.push(item)
                        }
                    })
                })
                return arr;
            }
        }
    },
    watch: {
        isMounted: function() {
            if (this.isMounted) {
                if (gsap) {
                    this.introAnimation();
                    this.scrollingAnimation();
                }

                let vid = this.$refs.video;
                if (vid) {
                    if (vid.autoplay === false) {
                        vid.autoplay = true;
                    }
                    if (vid.loop === false) {
                        vid.loop = true;
                    }
                    vid.load();
                }
            }
            // open archives if coming from an archive page 
            if (this.$route.hash) {
                const current = this.$route.hash.split('#').pop();
                const archiveItems = this.archiveItems;
                archiveItems.forEach(item => {
                    const slug = item.fields.urlslug
                    if (slug) {
                        // console.log(current, slug);
                        if (current === slug) {
                            this.archivesOpen = true;
                        }
                    }
                })
                
            }
        }
    },
    methods: {
        toggleArchives: function() {
            this.archivesOpen = !this.archivesOpen;
        },
        menuToggle: function() {
            this.menuOpen = !this.menuOpen
        },
        vidLoad: function() {
            let vid = this.$refs.video;
            vid.load();
        },
        startVid: function() {
            let vid = this.$refs.video;
            if (vid.paused) {
                vid.play()
                // console.log(vid.playbackRate);
            } else {
                vid.pause()
            }
        },
        introAnimation: function() {
            if (!process.client) return;

            let ref = this.$refs.vidContainer;
            let ref2 = this.$refs.scrollDown;

            if (gsap) {
                gsap.from(ref, {
                    opacity: 0,
                    scale: 0,
                    duration: .8
                })

                if (window.scrollY < 5) {
                    gsap.from(ref2, {
                        opacity: 0,
                        y: 500,
                        duration: .5,
                        delay: .5
                    })
                }
            }
        },
        scrollingAnimation: function() {
            let ref = this.$refs.scrollDown;
            if (gsap) {
                gsap.to(ref, {
                    scrollTrigger: {
                        trigger: ref,
                        toggleActions: 'play pause resume reset',
                        start: 1,
                        // markers: true
                    },
                    opacity: 0,
                    duration: 0.1
                })
            }
        }
    }
}
</script>

<style lang="scss">

</style>
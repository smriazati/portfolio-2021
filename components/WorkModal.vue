<template>
    <div class="root WorkModal">
        <nav class="menu-button">
            <nuxt-link class="btn" :to="`/${currentSlug}#${currentRoute}`">✕</nuxt-link>
        </nav>

        <div v-if="activeItem.fields" class="content-wrapper" ref="contentWrapper">
            <header>
                <h1 v-if="activeItem.fields.Name">{{ activeItem.fields.Name}}</h1>
            </header>

            <main>
                <p v-if="activeItem.fields.Description">
                    {{ activeItem.fields.Description }}
                </p>
                <p v-if="activeItem.fields.linkURL" class="btn link-btn">
                    <a :href="activeItem.fields.linkURL" target="_blank">
                        <span v-if="activeItem.fields.linkText"> {{ activeItem.fields.linkText }}</span>
                        <span v-else>View work</span>
                    </a>
                </p>
                <div v-if="activeItem.fields.embed" class="embed-container">
                    <div v-html="activeItem.fields.embed"></div>
                </div>
                <div v-if="activeItem.fields.Gallery" class="gallery-container">
                    <div class="gallery-image" v-for="(item, index) in activeItem.fields.Gallery" :key="index">
                        <img :src="item.thumbnails.large.url">
                    </div>
                </div>
            </main>

        </div>
    </div>
</template>


<script>

export default {
    head: {
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
    },
    props: ['activeItem'],
    data: function() {
        return {
            isMounted: false
        }
    },
    mounted() {
        this.isMounted = true;
    },
    computed: {
        currentRoute() {
            return this.$route.path.split("/").pop().split("/").pop();
        },
        currentSlug() {
            return this.$route.path.split("/")[1];
        }
    },
    watch: {
        isMounted: function() {
            if (gsap) {
                this.setAnimation();
            }
        }
    },
    methods: {
        setAnimation: function() {
            // get refs to animation
            let ref = this.$refs.contentWrapper;
            if (ref) {
                // console.log(ref);
                gsap.from( ref, {
                    opacity: 0,
                    duration: 3
                })

                let emb = ref.querySelector('iframe');
                gsap.from( emb, {
                    y: '100%',
                    duration: 2.5,
                    delay: 0.5
                })
            }
            // gsap.from()
        }
    }
}
</script>

<style lang="scss">
$collapse-bp: 998px;

.embed-container {
    position: relative;
    div {
        position: relative;
        padding-bottom: 56.25%; /* 16:9 */
        height: 0;
        iframe {
            position: absolute;
            top: 0;
            left: 0;
            width: 100%;
            height: 100%;
        }
    }
}
.WorkModal {
    max-width: 100%;
    overflow: hidden;

    background: black;
    color: white;
    min-height: 100vh;
    display: flex;
    flex-direction: column;
    justify-content: center;
    main {
        background: black;
        color: white;
    }
    header {
        text-align: center;
        margin: 22px 0;
        @media (max-width: $collapse-bp) {
            h1 {
                font-size: 1.5rem;
                line-height: 1.75rem;
            }
        }
    }
    .content-wrapper {
        padding: 33px 100px;
        max-width: $collapse-bp;
        
        @media (max-width: $collapse-bp) {
            padding-left: 11px;
            padding-right: 11px;
            padding-top: 100px;
            max-width: 100%;
        }
        margin: 0 auto;
        p, ul, ol {
            display: block;
            max-width: 55ch;
            margin: 0 auto;  
            font-family: Arial, sans-serif;
            @media (max-width: $collapse-bp) {
                font-size: 90%;          
            }
        }
        main {
            > * {
                margin-bottom: 33px;
            }
        }

        .gallery-container {
            text-align: center;
            > * {
                margin-bottom: 33px;
            }
        }
    }
}
</style>



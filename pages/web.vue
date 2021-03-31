<template>
    <div class="wrapper">
        <div class="hero-image" ref="heroImage">
            <img src="/media/bio-big.jpg" alt="collage of screenshots of a picture of Sarah standing in front of the ocean">
        </div>
        <nav class="secondary secondary-fixed" ref="navSecondaryFixed">
            <div @click="menuToggle" class="btn-wrapper btn">
                <p class="btn close-btn" :class="menuOpen ? 'open' : ''" role="button">+</p>
            </div>
            <ul :class="menuOpen ? 'show-menu' : 'hide-menu'">
                <li v-if="services" v-scroll-to="'#services'">Services</li>
                <li v-if="items" v-scroll-to="'#work'">Work</li>
                <li v-if="bio" v-scroll-to="'#about'">About</li>
                <li v-scroll-to="'#contact'">Contact</li>
            </ul>
        </nav>
        <div class="content-wrapper" ref="contentWrapper">

                <header ref="header">
                    <div class="section-wrapper">
                        <h1>Hi, I&rsquo;m Sarah!</h1>
                        <h2>I'm a freelance UX designer and front-end web developer.</h2>
                        <!-- <h2 class="dynamic">I make websites that are <span class="loveText" ref="loveText">{{ desc[currentDescIndex] }}</span></h2> -->
                    </div>
                </header>

                <nav class="secondary secondary-inline" ref="navSecondary">
                    <div @click="menuToggle" class="btn-wrapper btn">
                        <p class="btn close-btn" :class="menuOpen ? 'open' : ''" role="button">+</p>
                    </div>
                    <ul :class="menuOpen ? 'show-menu' : 'hide-menu'">
                        <li v-if="services" v-scroll-to="'#services'">Services</li>
                        <li v-if="items" v-scroll-to="'#work'">Work</li>
                        <li v-if="bio" v-scroll-to="'#about'">About</li>
                        <li v-scroll-to="'#contact'">Contact</li>
                    </ul>
                </nav>
                <main ref="scrollingContainer">

                <section id="services" v-if="services" class="services" ref="services">
                    <div class="section-wrapper">
                        <h1>Services</h1>
                        <div class="items-list">
                            <div v-for="(item, index) in services" :key="index" class="item">
                                <h2 v-if="item.title"><span v-html="item.title"></span></h2>
                            </div>
                        </div>
                    </div>
                </section>
                <section id="work" class="work" ref="work">
                    <div class="section-wrapper">
                        <h1>Recent Projects</h1>
                        <div v-if="items" class="items-list items-list-hover">
                            <div v-for="item in items" :key="item.id" class="item">
                                <WebWorkItem :item="item"/>
                            </div>
                        </div>
                        <div v-else>
                            <p>Loading projects...</p>
                        </div>
                    </div>
                </section>
                <section v-if="bio" id="about" class="about" ref="about">
                    <div class="section-wrapper">
                        <div class="text-wrapper">
                            <img class="icon" src="/media/web-profile.jpg" alt="sarah profile picture" />
                            <h1>About Sarah</h1>
                            <p class="lead">I've been writing HTML &amp; CSS ever since I wanted to make MySpace look more *~me~*.</p>
                            <p>Things have surely changed a lot since then! One thing that hasn't changed is how much I like to code. I love collaborating with clients to build web presences that are <strong>super fast</strong>, <strong>easy to use</strong>, <strong>easy to maintain</strong>, <strong>accessible to all users</strong>, and <strong>beautiful across all devices</strong>.</p>
                            <!-- <p>In addition to building websites, I make films, create animations, and teach college courses in digital media production. <nuxt-link to="/about" class="btn">Learn more about my work &#8594;</nuxt-link></p> -->
                        </div>
                    </div>
                </section>
                <section id="cta" class="cta" ref="cta">
                    <div class="section-wrapper">
                        <div class="cta">
                            <h2>Looking for a friendly &amp; experienced web developer with an eye for design? You're in the right place 😉</h2>
                        </div>
                    </div>
                    </section>
                <section id="contact" class="contact" ref="contact">
                    <div class="section-wrapper">
                        <div class="text-wrapper">
                            <h1>Let's work together!</h1>
                            <p>Reach out directly at <a href="mailto:sarahriazati@gmail.com" target="_blank">sarahriazati (@) gmail.com</a>.</p>
                        </div>
                        
                        <ContactForm />
                    </div>
                </section>
                <!-- <footer>
                    <div class="section-wrapper">
                        <h1>Where next?</h1>
                        <nav>
                            <ul>
                                <li><nuxt-link to="/video-and-animation">Video &amp; animation</nuxt-link></li>
                                <li><nuxt-link to="/documentary">Documentary projects</nuxt-link></li>
                                <li><nuxt-link to="/teaching">College teaching</nuxt-link></li>
                                <li><nuxt-link to="/about">About + Contact</nuxt-link></li>
                            </ul>
                        </nav>
                    </div>
                </footer> -->
            </main>
        </div> <!-- / .content-wrapper -->
    </div> <!-- / .wrapper -->
</template>

<script>
import WebWorkItem from '@/components/WebWorkItem.vue'
import ContactForm from '@/components/ContactForm.vue'

export default {
    head() {
        return {
            title: this.$store.state.metadata.web.title + this.$store.state.metadata.generalTitle,
            meta: [
                {
                    hid: 'description',
                    name: 'description',
                    content: this.$store.state.metadata.web.description
                },
                {
                    property: 'og:title',
                    content: this.$store.state.metadata.web.title
                },
                {
                    property: 'og:description',
                    content: this.$store.state.metadata.web.description
                },
                {
                    property: 'og:image',
                    content: this.$store.state.metadata.web.ogImage
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
    components: {
        WebWorkItem, ContactForm
    },
    layout: 'web',
    asyncData({ params, $axios }) {
        return $axios
        .get(`/WebUX?view=ItemsAPIView`)
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
            isMounted: false,
            slug: 'ux-and-web-development',
            currentDescIndex: 0,
            thisInt: 3,
            timer: '',
            desc: ['super fast', 'maintainable', 'easy to use', 'accessible', 'beautiful']
        }
    },
    mounted() {
        this.isMounted = true; // hack for gsap https://stackoverflow.com/questions/43531755/using-refs-in-a-computed-property
    },
    computed: {
        services: function() {
            return this.$store.state.portfolio.web.services
        },
        bio: function() {
            return this.$store.state.portfolio.web.statement;
        }
    },
    watch: {
        // ADD REF STUFF HERE 
        isMounted: function() {
            if (this.isMounted) {
                // START ANIMATION
                if (gsap) {
                    this.setTimedAnimation();
                    this.introAnimation();
                    this.scrollingAnimation();
                }

                this.timer = setInterval(function(){
                    //console.log('adding', this.currentDescIndex);
                    if (this.currentDescIndex < this.desc.length-1) {
                        this.currentDescIndex++
                    } else {
                        this.currentDescIndex = 0;
                    }
                }.bind(this), this.thisInt*1000)
            }
        },
        currentDescIndex: function() {
            if (gsap) {
                this.setTimedAnimation(); // reset animation each time the index changes
            }
        } 
    },
    beforeDestroy () {
       clearInterval(this.timer)
    },
    methods: {
        menuToggle: function() {
            this.menuOpen = !this.menuOpen
        },
        scrollingAnimation: function() {
            if (window.innerWidth > 998) {

                let hero = this.$refs.heroImage;

                hero.style.translateY = 0;
                let wrapper = this.$refs.contentWrapper;
                // console.log(wrapper.offsetHeight)
                gsap.to(hero, {
                    scrollTrigger: {
                        trigger: wrapper,
                        scrub: 1,
                        toggleActions: 'play pause resume reset',
                        start: 'top top',
                        end: `${wrapper.offsetHeight}px`
                    },
                    // y: window.innerHeight - hero.offsetHeight,
                    y: 100,
                    ease: 'none'
                })

                let heroPic = hero.querySelector('img');
                gsap.to(heroPic, {
                    scrollTrigger: {
                        trigger: wrapper,
                        scrub: 1,
                        toggleActions: 'play pause resume reset',
                        start: 'top top',
                        end: `${wrapper.offsetHeight}px`
                    },
                    // y: window.innerHeight - hero.offsetHeight,
                    opacity: 0,
                    ease: 'none'
                })

                // content sections 
                let container = this.$refs.scrollingContainer;
                if (container) {
                    let sections = [...container.children]; 
                    sections.forEach( section => {
                        section.style.opacity = 0;
                        gsap.to(section, {
                            scrollTrigger: {
                                trigger: section,
                                // markers: true,
                                toggleActions: 'play pause resume reset',
                                start: 0, 
                                end: '+=300px', 
                                scrub: .1,
                            },
                            opacity: 1,
                            width: window.innerWidth/1.5,
                            x: '-30%',
                        })
                    })
                }

            }

            let nav = this.$refs.navSecondaryFixed;
            let trigger = this.$refs.header;
            nav.style.opacity = 0;
            gsap.to(nav, {
                scrollTrigger: {
                    trigger: trigger,
                    start: 'bottom top',
                    end: '+=200px',
                    toggleActions: 'play pause resume reset',
                    scrub: true
                },
                opacity: 1
            })
        },
        introAnimation: function() {
            // refs
            let header = this.$refs.header;
            let nav = this.$refs.navSecondary;
            let content = this.$refs.contentWrapper;
            let pic = this.$refs.heroImage;


            gsap.from(content, {
                x: '50vh',
                duration: 1,
                ease: "power2.out",
                delay: 0.03
            })
            gsap.from(pic, {
                x: '-50vw',
                ease: "power2.out",
                duration: 1,
                delay: .03
            }) 

            // set initial positioning so first section is off screen
            if (window.innerWidth > 998) {
                let contentOffset = (window.innerHeight * .2); // 20% vh
                let navOgHeight = nav.offsetHeight;
                let initContentHeight = header.offsetHeight + navOgHeight + contentOffset;
                let navExtra = window.innerHeight - initContentHeight;
                nav.style.height = `${navOgHeight + navExtra}px`
            }
        },
        setTimedAnimation: function() {
            // if (!process.client) return;
 
            // let ref = this.$refs.loveText;  
            // ref.style.color = 'pink' ;
            // gsap.from(ref, {
            //     color: '#64d0dc',
            //     opacity: 0,
            //     duration: this.thisInt / 2
            // });
        }
    }
}
</script>

<style lang="scss">
.loveText {
    display: inline-block;
}


main {
    background: black;
    display: flex;
    flex-wrap: wrap;
    > * {
        flex: 0 0 100%;
    }
}





</style>
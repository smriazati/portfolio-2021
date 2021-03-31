<template>
  <div>
    <div
      :class="pageLoaded ? 'page-loaded' : 'page-loading'"
      class="wrapper home page"
    >
      <!-- <LoadingMessage /> -->

      <div class="vid-container" ref="vidContainer">
        <video @click="startVid" preload="auto" ref="video" class="btn">
          <source src="/media/input.mp4" type="video/mp4" />
        </video>
      </div>

      <div class="headers">
        <div class="header" v-for="num in headerCount" :key="num" ref="slider">
          <h1>www.sarahriazati.com</h1>
        </div>
      </div>

      <MainNav />
    </div>
  </div>
</template>

<script>
import MainNav from "@/components/MainNav.vue";
export default {
  head() {
    return {
      title:
        this.$store.state.metadata.home.title +
        this.$store.state.metadata.generalTitle,
      meta: [
        {
          hid: "description",
          name: "description",
          content: this.$store.state.metadata.home.description,
        },
        {
          hid: "og:title",
          property: "og:title",
          content: this.$store.state.metadata.home.title,
        },
        {
          hid: "og:description",
          property: "og:description",
          content: this.$store.state.metadata.home.description,
        },
        {
          hid: "og:image",
          property: "og:image",
          content: this.$store.state.metadata.home.ogImage,
        },
      ],
      script: [
        {
          src: "https://cdnjs.cloudflare.com/ajax/libs/gsap/3.4.2/gsap.min.js",
        },
        {
          src:
            "https://cdnjs.cloudflare.com/ajax/libs/gsap/3.4.2/CSSRulePlugin.min.js",
        },
        {
          src:
            "https://cdnjs.cloudflare.com/ajax/libs/gsap/3.4.2/ScrollTrigger.min.js",
        },
      ],
    };
  },
  layout: "default",
  data: function () {
    return {
      menuOpen: false,
      initialOpen: true,
      headerCount: 8,
      isMounted: false,
      navSpeed: 0.3,
      pageLoaded: false,
    };
  },
  components: {
    MainNav,
  },
  mounted() {
    this.isMounted = true; // hack for gsap https://stackoverflow.com/questions/43531755/using-refs-in-a-computed-property
    let loopCount = 0;
    let sliderCount = this.headerCount;
    let incrementer = Math.floor(window.innerHeight / sliderCount);
    let ref = this.$refs.slider;
    // console.log('ref', ref);
    if (ref) {
      let sliders = ref.forEach((slider) => {
        let posBottom = loopCount * incrementer;
        // console.log(posBottom);
        if (slider) {
          slider.style.bottom = `${posBottom}px`;
        }
        loopCount++;
      });
    }

    if (this.routeSetsMenuStatus) {
      this.menuOpen = true;
    }
  },
  watch: {
    // ADD REF STUFF HERE
    isMounted: function () {
      if (this.isMounted) {
        // VIDEO PROPERTIES
        let vid = this.$refs.video;
        if (vid) {
          if (vid.autoplay === false) {
            vid.autoplay = true;
          }
          if (vid.loop === false) {
            vid.loop = true;
          }
          if (vid.muted === false) {
            vid.muted = true;
          }
          vid.load();
        }

        // START ANIMATION
        if (gsap) {
          this.setAnimation();
        }

        this.pageLoaded = true;
      }
    },
    menuOpen: function () {
      // console.log(this.menuOpen);
      let vidContainer = this.$refs.vidContainer;
      let mobileTranslate = 350;
      let navBp = 998;
      if (window.innerWidth < navBp) {
        mobileTranslate = window.innerWidth / 4;
      }
      if (this.menuOpen) {
        gsap.to(vidContainer, {
          scale: 0.5,
          x: mobileTranslate,
          duration: 1,
          ease: "back.out(1.7)",
        });
      } else {
        gsap.to(vidContainer, {
          scale: 1,
          duration: 1,
          ease: "back.out(1.7)",
        });
      }

      let navContainer = this.$refs.navContainer;
      let navYStartPos = window.innerHeight * 1;
      if (this.initialOpen) {
        if (navContainer) {
          navContainer.style.opacity = 1;
          navContainer.style.transform = `translateY(${navYStartPos}px)`;
        }
        this.initialOpen = false;
      }

      let navDuration = this.navSpeed;

      if (this.menuOpen) {
        gsap.to(navContainer, {
          y: 0,
          opacity: 1,
          duration: navDuration,
          ease: "none",
        });
      } else {
        gsap.to(navContainer, {
          y: navYStartPos,
          duration: navDuration,
          ease: "none",
        });
      }
    },
  },
  computed: {
    routeSetsMenuStatus() {
      if (
        this.$store.state.route.from.path === "/web" ||
        this.$store.state.route.from.path === "/documentary" ||
        this.$store.state.route.from.path === "/video" ||
        this.$store.state.route.from.path === "/teaching"
      ) {
        return true;
      } else {
        return false;
      }
    },
  },
  methods: {
    menuToggle: function () {
      this.menuOpen = !this.menuOpen;
    },
    setAnimation: function () {
      if (!process.client) {
        return;
      }
      // ASSUME ALL REFS ARE DEFINED PAST HERE

      let sliders = this.$refs.slider;
      let slideDelay = 0;
      let slideDelayMult = 3;
      if (sliders) {
        sliders.forEach((item) => {
          let w = item.clientWidth;
          // console.log('clientWidth', w, item);
          let tl = gsap.timeline({
            repeat: -1,
            delay: slideDelay * slideDelayMult,
          });
          tl.fromTo(
            item,
            {
              x: w * -1,
            },
            {
              duration: 30,
              ease: "none",
              x: w,
            }
          );
          slideDelay++;
        });
      }
    },
    vidLoad: function () {
      let vid = this.$refs.video;
      vid.load();
    },
    startVid: function () {
      let vid = this.$refs.video;
      if (vid.paused) {
        vid.play();
        vid.playbackRate = (Math.random() * 1.4 + 0.8).toFixed(1);
        // console.log(vid.playbackRate);
      } else {
        vid.pause();
      }
    },
  },
};
</script>

<style lang="scss">
</style>
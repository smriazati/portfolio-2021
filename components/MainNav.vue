<template>
  <div class="MainNav">
    <div v-if="!menuOpen" class="menu-button btn">
      <div @click="menuToggle" role="button">{{ openMessage }}</div>
    </div>
    <div v-else class="menu-button btn">
      <div @click="menuToggle" role="button">Close menu</div>
    </div>

    <nav
      :class="menuOpen ? 'menu-open' : 'menu-closed'"
      class="navContainer"
      ref="navContainer"
    >
      <div class="text-wrapper">
        <nuxt-link @click="closeMenu" to="/"
          ><p>www.sarahriazati.com</p></nuxt-link
        >
      </div>
      <ul>
        <li>
          <nuxt-link @click="closeMenu" to="/web"
            >UX &amp; web development</nuxt-link
          >
        </li>
        <li>
          <nuxt-link @click="closeMenu" to="/videoanimation"
            >Video &amp; animation</nuxt-link
          >
        </li>
        <li>
          <nuxt-link @click="closeMenu" to="/documentary"
            >Documentary projects</nuxt-link
          >
        </li>
        <li>
          <nuxt-link @click="closeMenu" to="/teaching"
            >College teaching</nuxt-link
          >
        </li>
        <li>
          <nuxt-link @click="closeMenu" to="/about">About + Contact</nuxt-link>
        </li>
      </ul>
    </nav>
  </div>
</template>

<script>
export default {
  head: {
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
  },
  data: function () {
    return {
      menuOpen: false,
      initialOpen: true,
      navSpeed: 0.3,
    };
  },
  computed: {
    openMessage: function () {
      const pageMessage = "←";
      const homeMessage = "Where to?";
      if (this.$route.path === "/" || this.$route.path === "/about") {
        return homeMessage;
      } else {
        return pageMessage;
      }
    },
  },
  watch: {
    menuOpen: function () {
      //console.log(this.menuOpen);
      let mobileTranslate = 350;
      let navBp = 998;
      if (window.innerWidth < navBp) {
        mobileTranslate = window.innerWidth / 4;
      }

      let navContainer = this.$refs.navContainer;
      let navYStartPos = window.innerHeight * 1;
      if (this.initialOpen) {
        navContainer.style.opacity = 1;
        navContainer.style.transform = `translateY(${navYStartPos}px)`;
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
  methods: {
    closeMenu: function () {
      this.menuOpen = false;
    },
    menuToggle: function () {
      this.menuOpen = !this.menuOpen;
    },
  },
};
</script>


<style lang="scss">
$header-sans-serif: roc-grotesk, sans-serif;
$font-family-sans-serif: roc-grotesk, sans-serif;
$transition: 0.3s ease all;

$green: #4eaab6;
$pink: rgb(252, 156, 209);

$nav-bp: 998px;
$collapse-bp: 998px;
$lg-bp: 1200px;
$spacer: 11px;

$dark: rgb(50, 50, 10);
$light: rgb(255, 255, 255);
$highlight: rgb(151, 255, 210);

$link-color: darken($highlight, 50);
$bg-color: $light;

@keyframes colorHover {
  from {
    color: $green;
  }
  to {
    color: $pink;
  }
}

@mixin colorHover {
  animation: colorHover 0.8s alternate infinite;
}

@mixin boldFont() {
}

@mixin bodyFont() {
  text-transform: uppercase;
  font-family: roc-grotesk, sans-serif !important;
  font-style: normal;
  font-weight: 500;
  letter-spacing: 0.3rem;
}

.MainNav {
  @include bodyFont();
  h1,
  h2,
  h3,
  h4,
  h5,
  h6,
  p,
  .site-nav,
  .btn,
  form {
    @include bodyFont();
  }
  position: absolute;
  top: 0;
  z-index: 1000;
  width: 100%;

  .menu-button {
    position: fixed;
    top: 0;
    left: 0;
    z-index: 10000;
    background: black;
    color: white;
    width: auto;
    display: flex;
    justify-content: flex-start;
    align-items: center;
    // width: 100%;
    > div {
      @include boldFont();
      padding: 33px 11px;
      @media (max-width: $collapse-bp) {
        padding: 11px;
      }
      display: block;
      width: 100%;
    }
    transition: 1s ease all;
    opacity: 1;
    &:hover {
      cursor: pointer;
      opacity: 0.8;
    }
  }

  nav {
    &.navContainer {
      opacity: 0; // on initial page load, edited in gsap animation
    }
    .close {
      color: white;
      display: block;
      padding: 11px;
    }

    background: rgba(0, 0, 0, 0.956);
    color: white;
    position: fixed;
    top: 0;
    left: 0;
    height: 100vh;
    width: 100vw;
    z-index: 8;
    display: flex;
    flex-direction: column;
    justify-content: center;

    &.menu-closed {
      display: none;
    }
    > * {
      padding: 0 11px;
    }
    // transition: 1s ease all;

    .menu-open,
    .menu-closed {
      display: flex;
      flex-direction: column;
      white-space: nowrap;
    }

    .text-wrapper {
      max-width: 350px;
      max-width: 50ch;
      margin-bottom: 22px;
      @media (max-width: $collapse-bp) {
        text-align: center;
      }
    }
    ul {
      display: flex;
      flex-wrap: wrap;
      flex-direction: column;
      margin-right: auto;
      justify-content: center;
      align-items: flex-start;
      @media (max-width: $collapse-bp) {
        align-items: center;
      }
      li {
        a {
          display: inline-block;
          color: white;
          @media (min-width: $collapse-bp) {
            font-size: 2.5rem;
            line-height: 3rem;
            padding: 22px 0;
          }

          @media (max-width: $collapse-bp) {
            font-size: 1.5rem;
            line-height: 1.75rem;
            padding: 11px 0;
            text-align: center;
          }

          &:hover {
            @include colorHover;
          }
        }
      }
    }
  }

  .nuxt-link-exact-active {
    @include colorHover;
    &:hover {
      cursor: default;
    }
  }
}
</style>
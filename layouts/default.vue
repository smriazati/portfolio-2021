<template>
  <div class="default_layout">
    <LoadingMessage v-if="isLoading" />
    <nuxt class="content-loader" ref="test" />
  </div>
</template>

<script>
// import firebase from "firebase";
// import {fireAnalytics} from '~/plugins/firebase.js'

import LoadingMessage from "@/components/LoadingMessage.vue";

export default {
  components: {
    LoadingMessage,
  },
  data: function () {
    return {
      isMounted: false,
      isLoading: true,
    };
  },
  mounted() {
    this.isLoading = false;
    this.isMounted = true;
  },
  watch: {
    isMounted: function () {
      if (this.isMounted) {
        let content = this.$refs.test.$el;
        content.style.opacity = 1;
      }
    },
  },
};
</script>


<style lang="scss">
$header-sans-serif: roc-grotesk, sans-serif;
$font-family-sans-serif: roc-grotesk, sans-serif;
$transition: 0.3s ease all;

$teal: #4eaab6;
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

html,
body {
  width: 100%;
  max-width: 100vw;
  overflow-x: hidden;
}

// .content-loader {
//   opacity: 0;
// }

@mixin boldFont() {
  text-transform: uppercase;
  font-family: roc-grotesk, sans-serif;
  font-style: normal;
  font-weight: 500;
  letter-spacing: 0.3rem;
}

@keyframes fadeIn {
  from {
    opacity: 0;
  }
  to {
    opacity: 1;
  }
}

@keyframes colorHover {
  from {
    color: $teal;
  }
  to {
    color: $pink;
  }
}

@mixin colorHover {
  animation: colorHover 0.8s alternate infinite;
}

// general
* {
  margin: 0;
  padding: 0;
  box-sizing: border-box;
}

html {
  scroll-behavior: smooth;
}

html,
body {
  width: 100%;
}

body {
  background: $light;
}
img {
  max-width: 100%;
}

nav ul {
  list-style: none;
  padding: 0;
}

p {
  line-height: 150%;
}

.sr-only {
  display: none;
}

.fadeIn {
  animation: fadeIn 0.5s ease forwards;
}
a {
  text-decoration: none;
  transition: $transition;
}

.btn {
  &:hover {
    cursor: pointer;
  }
}

video,
img {
  max-width: 100%;
}

.align-right {
  text-align: right;
}

nav ul {
  padding: 0;
}
.spaced {
  display: inline-block;
  margin: 22px 0;
}

// loading....

.loading-page-wrapper {
  .page-loaded & {
    display: none;
  }
  .page-loading & {
    display: block;
  }
}

.page-loaded {
  > *:not(.loading-page-wrapper) {
    animation: fadeIn 0.5s ease forwards;
  }
}

// HOME & ABOUT STYLES

.default_layout {
  background: white;
}

.page {
  width: 100%;
  width: 100vw;
  height: 100%;
  height: 100vh;
  overflow: hidden;
  position: relative;

  @include boldFont();

  h1,
  h2,
  h3,
  h4,
  h5,
  h6,
  .site-nav,
  .btn,
  form {
    @include boldFont();
  }
}

.page.home {
  .headers {
    z-index: 10;
    text-align: right;
    .header {
      position: absolute;
      bottom: 10%;
      bottom: 10vh;
      h1 {
        text-transform: uppercase;
        font-size: 8rem;
        line-height: 8rem;
        letter-spacing: 0.1em;
        display: block;
      }
    }
  }

  .vid-container {
    z-index: 100;
    position: relative;
    @media (max-width: 1080px) {
      width: 100%;
      width: 100vw;
    }
    @media (min-width: 1081px) {
      width: 1080px;
      margin-left: auto;
    }
    @media (max-height: 1080px) {
      height: 100%;
      height: 100vh;
    }
    @media (min-height: 1081px) {
      height: 1080px;
    }

    overflow: hidden;
    display: flex;
    justify-content: center;
    video {
      object-fit: contain;
      height: 100%;
      width: 100%;
      object-position: 50% 50%;
      @media (min-width: $collapse-bp) {
        clip-path: circle(40%);
      }
      @media (max-width: $collapse-bp) {
        object-fit: cover;
        opacity: 0.8;
      }
    }
  }
}

.page.about {
  padding-top: 100px;
  height: auto;
  header {
    padding: 10vh 0 33px 0;
  }
  header,
  main {
    max-width: 80ch;
    margin: 0 auto;
    background: white;
    p,
    ul,
    ol {
      font-family: Arial, sans-serif;
      letter-spacing: 0;
      text-transform: none;
    }
    p + p {
      margin-top: $spacer;
    }
    .contact-form {
      background: #eaeaea;
      color: black;
      padding: $spacer * 3;
      margin: $spacer * 3 0;
    }
  }

  .bio-wrapper {
    display: flex;
    > * {
      @media (min-width: $collapse-bp) {
        flex: 0 0 50%;
      }
      &:first-child {
        padding-right: 11px;
      }
    }
  }
}
</style>
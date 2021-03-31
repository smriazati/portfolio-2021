<template>
  <div class="web_layout">
    <MainNav />
    <nuxt />
  </div>
</template>


<script>
import MainNav from "@/components/MainNav.vue";

export default {
  components: {
    MainNav,
  },
};
</script>

<style lang="scss">
$collapse-bp: 998px;
$header-sans-serif: roc-grotesk, sans-serif;
$font-family-sans-serif: roc-grotesk, sans-serif;
$transition: 0.3s ease all;

$purple: #5c07c7;
$teal: #64d0dc;

$big-text: 1.5rem;

@mixin boldFont() {
  text-transform: uppercase;
  font-family: roc-grotesk, sans-serif;
  font-style: normal;
  font-weight: 500;
  letter-spacing: 0.3rem;
}

@mixin bodyFont() {
  text-transform: uppercase;
  font-family: roc-grotesk, sans-serif;
  font-style: normal;
  font-weight: 500;
  letter-spacing: 0.3rem;
  line-height: 150%;
}

// .layout-enter-active, .layout-leave-active {
//   transition: opacity .5s
// }
// .layout-enter, .layout-leave-active {
//   opacity: 0
// }

/* basics */
body {
  @include bodyFont;
  text-transform: none;
  letter-spacing: 0;
  font-size: 18px;
  background: $teal;
}

a,
a:visited {
  color: white;
}

/* back to home button */
.menu-button {
  position: fixed;
  top: 0;
  z-index: 900;
  background: black;
  color: white;
  transition: $transition;
  width: auto;
  display: flex;
  justify-content: flex-start;
  align-items: center;
  // width: 100%;
  > a {
    @include boldFont();
    padding: 33px;
    display: block;
    width: 100%;
  }
}

/* web layout */

.web_layout {
  // wrap around most of it

  // typography
  p {
    // @include bodyFont();
    font-family: Arial, sans-serif;
    text-transform: none;
    letter-spacing: 0;
    line-height: 180%;
    + p {
      margin-top: 22px;
    }
  }

  a {
    color: white;
    &:hover {
      color: $teal;
    }
  }

  h1,
  h2,
  h3,
  h4 {
    @include bodyFont();
  }

  h1 {
    @media (min-width: $collapse-bp) {
      font-size: 60px;
    }
  }

  h1,
  h2 {
    text-transform: none;
    letter-spacing: 0.03em;
  }

  strong {
    font-weight: 500;
    color: $teal;
  }

  // special FX
  img {
    // clip-path: circle(50%);
    filter: grayscale(1) contrast(1);
    transition: 1s ease all;
    &:hover {
      // cursor: pointer;
      filter: grayscale(0);
    }
  }

  // layout

  $content-offset-left-px: 40%;
  $content-offset-left-vw: 40vw;

  $content-margin-top-px: 35%;
  $content-margin-top-vh: 35vh;

  .wrapper {
    position: relative;
    width: 100%;
    width: 100vw;
    min-height: 100%;
    min-height: 100vh;
  }

  // page nav set up
  nav.secondary {
    @include bodyFont();
    z-index: 100000;
    background: black;
    color: white;
    .close-btn {
      padding: 33px;
      @media (max-width: $collapse-bp) {
        padding: 11px;
      }
      color: $teal;
      font-size: 2rem;
      margin: 0;
      line-height: 0;
      display: inline-block;
      transform: none;
      transition: $transition;
      &.open {
        transform: rotate(45deg) translateY(5px) translateX(5px);
      }
    }
    ul {
      display: flex;
      flex-wrap: wrap;
      transition: $transition;
      &.hide-menu {
        opacity: 0;
        @media (max-width: $collapse-bp) {
          height: 11px;
          width: 0;
        }
      }
      &.show-menu {
        opacity: 1;
        @media (max-width: $collapse-bp) {
          height: auto;
          width: auto;
        }
      }
      > * {
        transition: $transition;
        &:hover {
          cursor: pointer;
          color: $teal;
        }
      }
    }
    @media (max-width: $collapse-bp) {
      display: flex;
      align-items: flex-start;
      ul {
        flex-direction: column;
        padding-bottom: 33px;
        > *:first-child {
          padding-top: 6px;
        }
      }
    }
  }

  // hero image
  .hero-image {
    position: fixed;
    left: 0;
    width: 50%;
    width: 50vw;
    z-index: 9;
    text-align: center;
    background: pink;
    img {
      display: block;
    }
  }

  // all the content lives in here
  .content-wrapper {
    position: absolute;
    left: $content-offset-left-px;
    left: $content-offset-left-vw;
    width: 100 - $content-offset-left-px;
    width: 100 - $content-offset-left-vw;
  }

  // each section's content styling in a column
  .section-wrapper {
    height: 100%;
    width: 100%;
    display: flex;
    flex-direction: column;
    justify-content: flex-start;

    > * {
      padding: 33px;
      @media (max-width: $collapse-bp) {
        padding: 11px;
        &:first-child {
          padding-bottom: 0;
        }
      }
    }

    form {
      flex: 1;
    }
  }

  // the nav that lives in the header content
  nav.secondary-inline {
    ul {
      > * {
        padding: 11px 33px;
      }
    }
  }

  // the nav that floats at the side
  nav.secondary-fixed {
    position: fixed;
    z-index: 900;
    left: 0;
    top: 100px;
    ul {
      flex-direction: column;
      height: 0;
      width: 0;
      overflow: hidden;
      @media (min-width: $collapse-bp) {
        &.show-menu {
          height: 300px;
          width: auto;
        }
      }

      > * {
        padding: 22px;
      }
    }

    @media (max-width: $collapse-bp) {
      left: unset;
      top: 0;
      right: 0;
      flex-direction: column;
      background: white;
      align-items: flex-end;
      padding: 11px;
      height: auto;
      ul {
        padding-top: 11px;
        padding-bottom: 0;
        text-align: right;
        height: auto;
        > * {
          padding: 6px;
          color: black;
        }
        &.hide-menu {
          display: none;
        }
      }
    }
  }

  .content-wrapper {
    background: transparent;
    color: white;
    transform: scale(1);
    z-index: 100;
    @media (min-width: $collapse-bp) {
      margin-top: $content-margin-top-px;
      margin-top: $content-margin-top-vh;
    }
  }

  // collapse to 1 column on small screens
  @media (max-width: $collapse-bp) {
    .hero-image,
    .content-wrapper {
      position: relative;
      left: 0;
      width: 100%;
      width: 100vw;
    }
    .hero-image {
      max-height: 50%;
      max-height: 50vh;
    }
  }

  // first section
  header {
    font-size: 1.5em;
    line-height: 2em;
    @media (max-width: $collapse-bp) {
      font-size: 1em;
      min-height: 40vh;
    }
    background: black;
    .section-wrapper {
      justify-content: flex-start;
    }
    h2.dynamic {
      display: flex;
      flex-wrap: wrap;
      > span {
        display: block;
        flex: 0 0 100%;
      }
    }
  }

  // animation sections
  main {
    background: transparent;
    > section {
      padding: 55px 0;
      height: auto;
      min-height: auto;
      background: black;
      margin: 33px 0;
      display: flex;
      align-items: center;
      @media (min-width: $collapse-bp) {
        margin-top: 22px;
      }
    }
  }

  // recent projects section
  .work {
    .items-list {
      max-width: 1100px;
      display: flex;
      flex-wrap: wrap;
      align-items: flex-start;
      .text-wrapper {
        padding: 0;
      }
    }
  }

  .items-list {
    > * {
      padding: 22px 0;
      margin-right: 22px;
    }
  }

  .items-list-hover {
    > * {
      background: transparent;
      transition: $transition;
      color: white;
      padding: 22px;
      &:hover {
        background: $teal;
        color: black;
        a {
          color: black;
          text-decoration: none;
          &:hover {
            color: $purple;
          }
        }
        border-radius: 0.5px;
      }
      @media (max-width: $collapse-bp) {
        padding: 11px;
        margin: 0;
      }
    }
  }

  // work items
  .item-comp {
    h2:before {
      display: inline-block;
      width: 33px;
      transition: 0.3s ease transform;
      content: "+";
      transform: rotate(0deg);
    }
    &.open h2:before {
      transform: rotate(45deg) translateY(5px) translateX(5px);
    }
    p {
      margin-top: 11px;
      line-height: 1.8rem;
      padding-left: 33px;
    }
  }

  // about section
  .about {
    text-transform: none;
    letter-spacing: 0;
    img.icon {
      clip-path: circle(50%);
      shape-outside: circle(50%);
      float: right;
      margin-left: 22px;
      width: 300px;
      @media (max-width: $collapse-bp) {
        width: 100px;
      }
    }
    p {
      margin-top: 11px;
    }
  }

  // cta section
  .cta {
    padding: 0;
    .cta {
      background: pink;
      padding: 33px;
      > h2,
      h3,
      p {
        color: black;
        @media (min-width: $collapse-bp) {
          font-size: 2.5rem;
          line-height: 3.5rem;
        }
        @media (max-width: $collapse-bp) {
          font-size: 1rem;
          line-height: 1.35rem;
        }
      }
    }
  }

  // contact form
  .contact {
    h1 {
      margin-bottom: 11px;
    }
    .text-wrapper,
    form {
      display: flex;
      flex-direction: column;
      justify-content: flex-end;
    }
  }

  @media (max-width: $collapse-bp) {
    section {
      h2 {
        font-size: 1.3rem;
        line-height: 1.55rem;
      }
    }
  }
} // web_layout
</style>
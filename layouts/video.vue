<template>
  <div class="video_layout">
    <nuxt />
  </div>
</template>

<script>
export default {
  transition: "video",
};
</script>

<style lang="scss">
.video-enter-active,
.video-leave-active {
  transition: 0.3s ease all;
}
.video-enter {
  opacity: 1;
}

.video-leave-active {
  opacity: 0;
}

$collapse-bp: 998px;
$lg-bp: 1200px;
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

body {
  background: black;
}

.video_layout {
  background: black;
  h1,
  h2,
  h3,
  h4 {
    @include bodyFont;
  }
  a {
    color: white;
  }
  header {
    padding: 33px;
    display: flex;
    width: 100%;
    justify-content: center;
    flex-direction: column;
    text-align: center;
  }
  .filters {
    // display: none;
    width: 100%;
    padding: 33px 0;
    color: white;
    ul {
      @include bodyFont;
      display: flex;
      justify-content: center;
      list-style: none;
      > * {
        padding: 11px;
      }
    }
  }

  .items-list {
    display: flex;
    flex-wrap: wrap;
    justify-content: center;
    > * {
      display: block;
      flex: 100%;
      @media (min-width: $collapse-bp) {
        flex: 0 0 33%;
      }
      // @media (min-width: $lg-bp) {
      //     flex: 0 0 18%;
      // }
    }
  }

  .item {
    img {
      filter: grayscale(1) contrast(1.5);
      transition: 0.8s ease all;
    }
    &:hover {
      img {
        filter: grayscale(0) contrast(1);
      }
    }
    .image-none {
      background: black;
    }

    display: grid;
    grid-template-columns: repeat(4, 1fr);
    grid-template-rows: 1fr 1fr 1fr;
    max-height: 350px;
    .item-image {
      grid-row-start: 1;
      grid-row-end: 4;
      grid-column-start: 1;
      grid-column-end: 5;
      overflow: hidden;
      img {
        min-height: 100%;
        min-width: 100%;
        object-fit: cover;
        object-position: 50% 50%;
        display: block;
      }
    }
    .item-text {
      grid-column-start: 2;
      grid-column-end: 5;
      grid-row-start: 3;
      grid-row-end: 4;
      padding: 11px;
      text-transform: uppercase;
      display: flex;
      z-index: 10;
      flex-direction: column;
      justify-content: center;
      align-items: center;
      text-align: center;
      > * {
        color: white;
      }
      h2 {
        background: rgb(0, 0, 0, 0.9);
        font-size: 1rem;
        font-weight: 400;
        padding: 3px;
      }
    }
  }
}

.video .banner-header {
  padding: 10vh 11px;
  background: black;
  color: white;
}
</style>
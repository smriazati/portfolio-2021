<template>
    <div class="documentary_layout">
        <nuxt />
    </div>      
</template>

<script>
export default {
    transition: 'documentary'
}
</script>
<style lang="scss">

$lg-bp: 1000px;

.documentary-enter-active, .documentary-leave-active {
    transform: translateX(0);
    transition: .3s ease all;
}
.documentary-enter {
    opacity: 1;
}

.documentary-leave-active {
    opacity: 0;
}

.documentary_layout {
    background: white;
    .wrapper header,
    .wrapper main {
        * {
            font-family: Arial, sans-serif !important;
            letter-spacing: 0 !important;
        }
    }
    .wrapper {
        max-width: 100%;
        max-width: 100vw;
        min-height: 100%;
        min-height: 100vh;
        overflow: hidden;
        position: relative;
    }

    // manifesto video
    // always full screen
    .hero-vid {
        max-width: 100%;
        max-width: 100vw;
        max-height: 100vh;
        min-height: 100vh;
        overflow: hidden;
        padding: 15%;
        padding: 15vw;
        // @media (max-width: $lg-bp) {
        //     padding: 25%;
        //     padding: 25vw;
        // }
        height: 100%;
        background: black;
        display: flex;
        flex-direction: column;
        justify-content: center;
        align-items: center;
        position: relative;
        z-index: 9;
        > * {
            flex: 100%;
        }
        > video {
            min-height: 100%;
            object-fit: contain;
        }

        h2 {
            margin-top: 11px;
            font-size: 1rem;
            color: rgba(255,255,255,0.5);
            font-weight: 400;
            font-style: italic;
        }
    }

    .scroll-down {
        height: 10%;
        height: 10vh;
        position: absolute;
        z-index: 1000;
        bottom: 0;
        left: 0;
        width: 100%;
        text-align: center;
        color: white;
        font-size: 2rem;
        // background: black;
        // color: white;
        display: flex;
        align-items: center;
        justify-content: center;
    }

    main {
        background: white;
        color: black;
        @media (min-width: $lg-bp) {
            width: 60vw;
        }
        padding: 11px;
        margin: 0 auto;
        a {
            color: black;
        }
    }


    .work-items {
        display: flex;
        flex-direction: column;
        flex-wrap: wrap;
    }

    .work-item {
        display: flex;
        margin: 33px 0;
        h3 {
            // text-align: center;
            width: 100%;
            margin: 11px 0;
        }
        p {
            max-width: 65ch;
        } 
        a.spaced {
            margin-top: 11px;
            display: inline-block;
        }
    }

    section ul {
        padding: 0;
        list-style: none;
        > * {
            margin: 11px 0;
        }
    }

    section {
        margin-top: 55px;
        .intro-text {
            h2 {
                margin-bottom: 11px;
            }
            p {
                margin-bottom: 22px;
            }
        }
    }

    ul.work-items {
        //flex-direction: row;
        > * {
            margin: 11px 11px 11px 0;
        }
        li {
            display: flex;
            > * {
                display: inline-block;
                margin-right: 11px;
            }
        }
        .archive-item {
            display: block;
            margin: 22px 0;
        }
    }

    .archive-image {
        flex: 0 0 250px;
        img {
            min-height: 100%;
            object-fit: cover;
        }
    }
    
    .archive-text {
        p {
            font-size: 80%;
            line-height: 150%;
        }
    }

}

</style>
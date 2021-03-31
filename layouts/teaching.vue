<template>
    <div class="teaching_layout">
        <nuxt />
    </div>      
</template>

<script>
export default {
    transition: 'teaching'
}
</script>

<style lang="scss">
body {
    background: white;
}

$collapse-bp: 998px;

.teaching_layout {
    .wrapper main,
    .wrapper header {
        * {
            font-family: Arial, sans-serif !important;
            letter-spacing: 0 !important;
        }
    }
    background: white;

    @media (min-width: $collapse-bp) {
        .wrapper {
            padding: 100px;
        }
    }
    @media (max-width: $collapse-bp) {
        .wrapper {
            padding: 11px;
            padding-top: 100px;
        }
    }


    main {
        max-width: 960px;
        background: white;
        h2, p {
            font-size: 1rem;
            font-weight: 400;
            max-width: 65ch;
        }
    }
    header { 
        h1 {
            font-weight: 400;
            text-transform: uppercase;
            letter-spacing: 0.03rem;
        }
    }

    .items-list {
        margin-top: 33px;
        > * {
            margin: 11px 0;
        }
        .item {
            margin-top: 33px;
            background: #eaeaea;
            padding: 33px;
            > * {
                margin-bottom: 11px;
            }
            a {
                color: black;
                text-decoration: underline;
                &:hover {
                    color: #0000FF;
                }
            }
            h2 {
                font-size: 1.3rem;
                line-height: 1.8rem;
            }
            h3, h4, ul, p {
                font-weight: 400;
                font-size: 1rem;
                line-height: 1.5rem;
            }
            ul {
                padding-left: 33px;
            }
            p {
                > span {
                   background: white;
                   display: inline-block;
                   padding: 3px;
                   margin-right: 11px;
                }
            }
        }
    }

}

</style>
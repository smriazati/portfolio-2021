<template>
<div class="wrapper about page">
    <MainNav />

    <header>
        <h1>About Sarah Riazati</h1>
    </header>
    <main>
        <section class="bio-wrapper">
            <div class="bio-text">
                <p v-if="items[0].fields.Bio1">{{ items[0].fields.Bio1 }}</p>
                <p v-if="items[0].fields.Bio2">{{ items[0].fields.Bio2 }}</p>
                <p v-if="items[0].fields.Bio3">{{ items[0].fields.Bio3 }}</p>
                <p v-if="items[0].fields.Bio4">{{ items[0].fields.Bio4 }}</p>
            </div>
            <div class="bio-image">
                <img src="/media/about.jpg" />
            </div>
        </section>
        <section class="contact-form">
            <ContactForm />
        </section>
    </main>

</div>   <!-- / wrapper / page -->
</template>


<script>
import ContactForm from '@/components/ContactForm.vue';
import MainNav from '@/components/MainNav.vue';

export default {
    head() {
        return {
            title: this.$store.state.metadata.about.title + this.$store.state.metadata.generalTitle,
            meta: [
                {
                    hid: 'description',
                    name: 'description',
                    content: this.$store.state.metadata.about.description
                },
                {
                    property: 'og:title',
                    content: this.$store.state.metadata.about.title
                },
                {
                    property: 'og:description',
                    content: this.$store.state.metadata.about.description
                },
                {
                    property: 'og:image',
                    content: this.$store.state.metadata.about.ogImage
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
    asyncData({ params, $axios }) {
        return $axios
        .get(`/About?view=ItemsAPIView`)
        .then(res => {
            return { items: res.data.records }
        })
        .catch(e => {
            error({ statusCode: 404, message: 'Post not found' })
        })
    },
    components: {
        ContactForm, MainNav
    },
    title: 'About'
}
</script>
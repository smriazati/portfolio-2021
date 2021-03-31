<template>
  <div>
    <form
      v-if="!writeSuccessful"
      ref="form"
      method="POST"
      name="contactForm"
      data-netlify="true"
    >
      <label class="sr-only" for="email">Email</label>
      <input
        type="text"
        name="email"
        placeholder="Your Email"
        v-model="message.email"
        id="email"
        ref="email"
      />

      <label class="sr-only" for="name">Name</label>
      <input
        type="text"
        name="name"
        placeholder="Your Name"
        v-model="message.name"
        id="name"
        ref="name"
      />

      <label for="message">Your message</label>
      <textarea
        v-model="message.message"
        name="message"
        id="message"
        cols="30"
        rows="10"
      ></textarea>

      <!-- <recaptcha @error="onError" @success="onSuccess" @expired="onExpired" /> -->

      <label class="sr-only" for="submit">Submit</label>
      <button
        v-show="!formValidator"
        @click.prevent="invalidForm"
        class="disabled"
        name="submit"
        id="submit"
        type="submit"
      >
        Submit
      </button>
      <button v-show="formValidator" name="submit" id="submit" type="submit">
        Submit
      </button>

      <p v-if="error" class="error">{{ error }}</p>
    </form>
    <div v-else class="success">
      <p>Thank you for reaching out! You will be hearing from me soon :)</p>
      <p>
        <a @click="submitAgain" class="btn" role="button"
          >Send another message.</a
        >
      </p>
    </div>
  </div>
</template>

<script>
// import firebase from 'firebase'
// import db from '@/plugins/db.js';
// import {fireDb} from '~/plugins/firebase.js'

export default {
  data: function () {
    return {
      writeSuccessful: false,
      error: null,
      submissionError: null,
      message: {
        email: "",
        name: "",
        message: "",
      },
    };
  },
  computed: {
    isEmailValid: function () {
      if (
        ~this.message.email.indexOf("@") &&
        ~this.message.email.indexOf(".")
      ) {
        return true;
      } else {
        return false;
      }
    },
    isNameValid: function () {
      if (this.message.name !== "") {
        return true;
      } else {
        return false;
      }
    },
    isMessageValid: function () {
      if (this.message.message !== "") {
        return true;
      } else {
        return false;
      }
    },
    formValidator: function () {
      let isEmailValid = this.isEmailValid;
      let isNameValid = this.isNameValid;
      let isMessageValid = this.isMessageValid;

      if (isEmailValid && isNameValid && isMessageValid) {
        return true;
      } else {
        return false;
      }
    },
    timeStamp: function () {
      var currentDate = new Date();
      var date = currentDate.getDate();
      var month = currentDate.getMonth();
      var year = currentDate.getFullYear();

      var monthDateYear = month + 1 + "/" + date + "/" + year;

      return monthDateYear;
    },
  },
  methods: {
    // onError(error) {
    //   console.log("Error happened:", error);
    // },
    // async onSubmit() {
    //   try {
    //     const token = await this.$recaptcha.getResponse();
    //     // console.log('ReCaptcha token:', token)
    //     await this.$recaptcha.reset();
    //   } catch (error) {
    //     // eslint-disable-next-line no-console
    //     console.log("Login error:", error);
    //   }
    // },
    // onSuccess(token) {
    //   // console.log('Succeeded:', token)
    //   // here you submit the form
    //   // this.$refs.form.submit()
    //   this.submitForm();
    // },
    // onExpired() {
    //   console.log("Expired");
    // },
    // async submitForm() {
    //   const ref = fireDb.collection("contactform");
    //   const document = {
    //     name: this.message.name,
    //     email: this.message.email,
    //     message: this.message.message,
    //     created: this.timeStamp,
    //     // createdAt: fireDb.firestore.FieldValue.serverTimestamp()
    //   };
    //   try {
    //     await ref.add(document);
    //   } catch (e) {
    //     // TODO: error handling
    //     this.error = e;
    //   }
    //   this.writeSuccessful = true;
    //   // console.log('i submitted this data', document)
    // },
    invalidForm: function () {
      this.error = "Please fill in all of the fields above.";
    },
    submitAgain: function () {
      this.message.name = "";
      this.message.email = "";
      this.message.message = "";
      this.writeSuccessful = false;
    },
  },
};
</script>

<style lang="scss">
@mixin bodyFont {
  font-size: 1rem;
}

$big-text: 1.5rem;
$collapse-bp: 998px;
$header-sans-serif: roc-grotesk, sans-serif;
$font-family-sans-serif: roc-grotesk, sans-serif;
$transition: 0.3s ease all;

$purple: #5c07c7;
$teal: #64d0dc;

$big-text: 1.5rem;
$transition: 0.3s ease all;

form {
  display: flex;
  flex-direction: column;
  width: 100%;
  > * {
    margin: 11px 0;
  }

  button,
  input,
  textarea,
  label {
    @include bodyFont;
  }

  button,
  input,
  textarea {
    padding: 22px 11px;
    margin: 0;
    border-radius: 0;
    outline: 0;
    border: none;
  }
  button,
  input {
    margin-top: 11px;
  }

  label:not(.sr-only) {
    margin-top: 33px;
    margin-bottom: 11px;
  }

  button {
    background: white;
    color: black;
    font-size: $big-text;
    transition: $transition;
    &:not(.disabled):hover {
      cursor: pointer;
      background: $teal;
      color: black;
    }
  }

  .error {
    color: white;
    background: #b39660;
    padding: 33px 11px;
  }
}

.success {
  color: white;
  background: $teal;
  padding: 33px 11px;
}
</style>
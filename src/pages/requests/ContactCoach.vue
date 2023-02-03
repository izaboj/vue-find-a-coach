<template>
  <form @submit.prevent="submitForm">
    <div class="form-control">
      <label for="email">Email</label>
      <input v-model="email" type="email" id="email" />
    </div>
    <div class="form-control">
      <label for="message">Message</label>
      <textarea
        v-model="message"
        rows="5"
        type="text"
        name="message"
        id="message"
      />
    </div>
    <p v-if="!formIsValid" class="errors">
      Please input valid message and valid email
    </p>
    <div class="actions">
      <base-button>Send Message</base-button>
    </div>
  </form>
</template>

<script>
export default {
  data() {
    return {
      email: '',
      message: '',
      isRequestSent: false,
      formIsValid: true,
    };
  },
  methods: {
    async submitForm() {
      this.formIsValid = true;
      if (
        this.email === '' ||
        !this.email.includes('@') ||
        this.message === ''
      ) {
        this.formIsValid = false;
        return;
      }

      const formData = {
        coachId: this.$route.params.id,
        email: this.email,
        message: this.message,
      };
      try {
        await this.$store.dispatch('requestN/addRequest', formData);
      } catch (e) {
        // hendle error
      }
      this.$router.replace('/requests');
    },
  },
};
</script>

<style scoped>
form {
  margin: 1rem;
  border: 1px solid #ccc;
  border-radius: 12px;
  padding: 1rem;
}

.form-control {
  margin: 0.5rem 0;
}

label {
  font-weight: bold;
  margin-bottom: 0.5rem;
  display: block;
}

input,
textarea {
  display: block;
  width: 100%;
  font: inherit;
  border: 1px solid #ccc;
  padding: 0.15rem;
}

input:focus,
textarea:focus {
  border-color: #3d008d;
  background-color: #faf6ff;
  outline: none;
}

.errors {
  font-weight: bold;
  color: red;
}

.actions {
  text-align: center;
}
</style>

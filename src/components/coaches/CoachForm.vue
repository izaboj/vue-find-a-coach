<template>
  <form @submit.prevent="submitForm">
    <div class="form-control" :class="{ invalid: !firstName.isValid }">
      <label for="fname">First name:</label>
      <input
        type="text"
        id="fname"
        name="fname"
        v-model.trim="firstName.val"
        @blur="clearValidity('firstName')"
      /><br />
      <p v-if="!firstName.isValid">First name must not be empty</p>
    </div>
    <div class="form-control" :class="{ invalid: !lastName.isValid }">
      <label for="lname">Last name:</label>
      <input
        type="text"
        id="lname"
        name="lname"
        v-model.trim="lastName.val"
        @blur="clearValidity('lastName')"
      />
      <p v-if="!lastName.isValid">Last name must not be empty</p>
    </div>
    <div class="form-control" :class="{ invalid: !description.isValid }">
      <label for="description">Description:</label>
      <textarea
        type="text"
        id="description"
        name="description"
        v-model.trim="description.val"
        @blur="clearValidity('description')"
      />
      <p v-if="!description.isValid">Description must not be empty</p>
    </div>
    <div class="form-control" :class="{ invalid: !hourlyRate.isValid }">
      <label for="rate">Rate per hour:</label>
      <input
        type="number"
        id="rate"
        name="rate"
        v-model.number="hourlyRate.val"
        @blur="clearValidity('hourlyRate')"
      />
      <p v-if="!hourlyRate.isValid">rate must be greater than 0</p>
    </div>
    <div class="form-control" :class="{ invalid: !areas.isValid }">
      <h3>Areas of expertise:</h3>
      <div>
        <input
          type="checkbox"
          id="frontend"
          value="frontend"
          name="frontend"
          v-model="areas.val"
          @blur="clearValidity('areas')"
        />
        <label for="frontend">Frontend</label>
      </div>
      <div>
        <input
          type="checkbox"
          id="backend"
          value="backend"
          name="backend"
          v-model="areas.val"
          @blur="clearValidity('areas')"
        />
        <label for="backend">Backend</label>
      </div>
      <div>
        <input
          type="checkbox"
          id="career"
          value="career"
          name="career"
          v-model="areas.val"
          @blur="clearValidity('areas')"
        />
        <label for="career">Career</label>
      </div>
      <p v-if="!areas.isValid">At least one expertise must be selected</p>
    </div>
    <p v-if="!formIsValid">Please fix form</p>
    <base-button>Register</base-button>
  </form>
</template>

<script>
export default {
  emits: ['save-da'],
  data() {
    return {
      firstName: {
        val: '',
        isValid: true,
      },
      lastName: {
        val: '',
        isValid: true,
      },
      description: {
        val: '',
        isValid: true,
      },
      hourlyRate: {
        val: null,
        isValid: true,
      },
      areas: {
        val: [],
        isValid: true,
      },
      formIsValid: true,
    };
  },
  methods: {
    validateForm() {
      this.formIsValid = true;

      if (this.firstName.val === '') {
        this.firstName.isValid = false;
        this.formIsValid = false;
      }
      if (this.lastName.val === '') {
        this.lastName.isValid = false;
        this.formIsValid = false;
      }
      if (this.description.val === '') {
        this.description.isValid = false;
        this.formIsValid = false;
      }
      if (!this.hourlyRate.val || this.hourlyRate.val < 0) {
        this.hourlyRate.isValid = false;
        this.formIsValid = false;
      }
      if (this.areas.val.length === 0) {
        this.areas.isValid = false;
        this.formIsValid = false;
      }
    },
    clearValidity(name) {
      this[name].isValid = true;
    },
    submitForm() {
      this.validateForm();

      if (!this.formIsValid) {
        return;
      }
      const dataForm = {
        first: this.firstName.val,
        last: this.lastName.val,
        desc: this.description.val,
        rate: this.hourlyRate.val,
        areas: this.areas.val,
      };
      this.$emit('save-data', dataForm);
    },
  },
};
</script>

<style scoped>
.form-control {
  margin: 0.5rem 0;
}

label {
  font-weight: bold;
  display: block;
  margin-bottom: 0.5rem;
}

input[type='checkbox'] + label {
  font-weight: normal;
  display: inline;
  margin: 0 0 0 0.5rem;
}

input,
textarea {
  display: block;
  width: 100%;
  border: 1px solid #ccc;
  font: inherit;
}

input:focus,
textarea:focus {
  background-color: #f0e6fd;
  outline: none;
  border-color: #3d008d;
}

input[type='checkbox'] {
  display: inline;
  width: auto;
  border: none;
}

input[type='checkbox']:focus {
  outline: #3d008d solid 1px;
}

h3 {
  margin: 0.5rem 0;
  font-size: 1rem;
}

.invalid label {
  color: red;
}

.invalid input,
.invalid textarea {
  border: 1px solid red;
}
</style>

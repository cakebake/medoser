<template>
  <div class="container">
    <div>
      <logo />
      <h1 class="title">
        medoser
      </h1>
      <h2 class="subtitle">
        Media Download Server ({{ status.message }})
      </h2>
      <b-form @submit="onSubmit" @reset="onReset" v-if="showForm">
        <div class="d-none">
          <b-form-input
            id="input-bot"
            v-model="form.bot"
            type="text"
          />
        </div>
        <b-form-group
          id="input-group-1"
          label="Email address:"
          label-for="input-1"
          description="We'll never share your email with anyone else."
        >
          <b-form-input
            id="input-1"
            v-model="form.email"
            type="email"
            required
            placeholder="Enter email"
            size="lg"
            autofocus
          />
        </b-form-group>
        <b-form-group id="input-group-2" label="Your Name:" label-for="input-2">
          <b-form-input
            id="input-2"
            v-model="form.name"
            required
            placeholder="Enter name"
          />
        </b-form-group>
        <b-form-group id="input-group-3" label="Food:" label-for="input-3">
          <b-form-select
            id="input-3"
            v-model="form.food"
            :options="foods"
            required
          />
        </b-form-group>
        <b-form-group id="input-group-4">
          <b-form-checkbox-group id="checkboxes-4" v-model="form.checked">
            <b-form-checkbox value="me">
              Check me out
            </b-form-checkbox>
            <b-form-checkbox value="that">
              Check that out
            </b-form-checkbox>
          </b-form-checkbox-group>
        </b-form-group>
        <b-button type="submit" variant="primary">
          Submit
        </b-button>
        <b-button type="reset" variant="danger">
          Reset
        </b-button>
      </b-form>
      <div class="row">
        <div class="col-sm">
          <b-card class="mt-3" header="Form Data">
            <pre class="m-0">{{ form }}</pre>
          </b-card>
        </div>
        <div class="col-sm">
          <b-card class="mt-3" header="Server Response" v-if="response">
            <pre class="m-0">{{ response }}</pre>
          </b-card>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import Logo from '~/components/Logo.vue'

export default {
  components: {
    Logo
  },
  data () {
    return {
      status: {
        message: 'offline'
      },
      form: {
        email: '',
        name: '',
        food: null,
        checked: [],
        bot: null
      },
      foods: [{ text: 'Select One', value: null }, 'Carrots', 'Beans', 'Tomatoes', 'Corn'],
      showForm: true,
      response: null
    }
  },
  async asyncData ({ $axios }) {
    return {
      status: await $axios.$get('/api/status')
    }
  },
  methods: {
    async onSubmit (e) {
      e.preventDefault()
      if (this.form.bot !== null) {
        throw new Error('Maybe you are not human at all?')
      }
      this.response = await this.$axios.$post('/api', this.form)
    },
    onReset (e) {
      e.preventDefault()
      this.response = null
      // Reset our form values
      this.form.email = ''
      this.form.name = ''
      this.form.food = null
      this.form.checked = []
      this.form.bot = null
      // Trick to reset/clear native browser form validation state
      this.showForm = false
      this.$nextTick(() => {
        this.showForm = true
      })
    }
  }
}
</script>

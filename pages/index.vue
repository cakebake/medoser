<template>
  <div class="container-fluid">
    <div>
      <b-alert v-model="!status.online && status.message" variant="danger">
        {{ status.message }}
      </b-alert>
      <h1 class="subtitle">
        Media Download Server
        <span v-if="status.online">(online)</span>
        <span v-else>(offline)</span>
      </h1>
      <b-form @submit="onSubmit" @reset="onReset" v-if="showForm && status.online">
        <div class="d-none">
          <b-form-input id="input-bot" v-model="honeypot" type="text" />
        </div>
        <b-form-group id="url" label="Download URL" label-for="url-input">
          <b-form-input
            id="url-input"
            v-model="form.url"
            type="text"
            required
            placeholder="Enter download URL"
            size="lg"
            autofocus
          />
        </b-form-group>
        <b-button type="submit" variant="primary">
          Submit
        </b-button>
        <b-button type="reset" variant="danger">
          Reset
        </b-button>
      </b-form>
      <div v-if="showForm && status.online" class="row">
        <div class="col-sm">
          <b-card class="mt-3" header="Form Data">
            <pre class="m-0">{{ form }}</pre>
          </b-card>
        </div>
        <div class="col-sm">
          <b-card v-if="response" class="mt-3" header="Server Response">
            <pre class="m-0">{{ response }}</pre>
          </b-card>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data () {
    return {
      form: {
        url: ''
      },
      honeypot: '',
      showForm: true,
      response: null
    }
  },
  computed: {
    status () {
      return this.$store.getters['api/status']
    }
  },
  async fetch ({ store, params }) {
    await store.dispatch('api/fetchStatus')
  },
  methods: {
    async onSubmit (e) {
      e.preventDefault()
      if (this.honeypot !== '') {
        throw new Error('Maybe you are not human at all?')
      }
      this.response = await this.$axios.$post('/api', this.form)
    },
    onReset (e) {
      e.preventDefault()
      this.response = null
      // reset form values
      this.form.url = ''
      this.honeypot = ''
      // trick to reset/clear native browser form validation state
      this.showForm = false
      this.$nextTick(() => {
        this.showForm = true
      })
    }
  }
}
</script>

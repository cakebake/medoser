<template>
  <b-form @submit="submit" @reset="reset" v-if="show">
    <div class="d-none">
      <b-form-input id="input-bot" v-model="honeypot" type="text" />
    </div>
    <b-form-group id="url" label="Download URL" label-for="url-input">
      <b-form-input
        id="url-input"
        v-model="url"
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
</template>

<script>
export default {
  computed: {
    url: {
      get () {
        return this.$store.state.api.form.url
      },
      set (value) {
        this.$store.commit('api/form/url', value)
      }
    },
    honeypot: {
      get () {
        return this.$store.state.api.form.honeypot
      },
      set (value) {
        this.$store.commit('api/form/honeypot', value)
      }
    },
    show: {
      get () {
        return this.$store.state.api.form.show
      },
      set (value) {
        this.$store.commit('api/form/show', value)
      }
    }
  },
  methods: {
    async submit (e) {
      e.preventDefault()
      await this.$store.dispatch('api/form/request')
    },
    reset (e) {
      e.preventDefault()
      this.$store.dispatch('api/form/reset')
      // trick to reset/clear native browser form validation state
      this.show = false
      this.$nextTick(() => {
        this.show = true
      })
    }
  }
}
</script>

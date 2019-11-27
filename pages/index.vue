<template>
  <div class="container-fluid">
    <div>
      <b-alert v-model="!status.online" variant="danger">
        {{ status.message }}
      </b-alert>
      <h1 class="subtitle">
        Media Download Server
      </h1>
      <form-module v-if="status.online" />
      <div v-if="status.online" class="row">
        <div class="col-sm">
          <b-card class="mt-3" header="Form">
            <pre class="m-0">{{ form }}</pre>
          </b-card>
        </div>
        <div class="col-sm">
          <b-card v-if="response" class="mt-3" header="Response">
            <pre class="m-0">{{ response }}</pre>
          </b-card>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import FormModule from '~/components/Form.vue'

export default {
  components: {
    FormModule
  },
  computed: {
    status () {
      return this.$store.state.api.status
    },
    form () {
      return {
        url: this.$store.state.api.form.url,
        honeypot: this.$store.state.api.form.honeypot
      }
    },
    response () {
      return this.$store.state.api.form.response
    }
  },
  async fetch ({ store, params }) {
    await store.dispatch('api/status/fetch')
  }
}
</script>

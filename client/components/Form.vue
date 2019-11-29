<template>
  <b-form v-if="show" @submit="requestDownload" @reset="resetForm" autocomplete="off">
    <div class="d-none">
      <b-form-input id="input-bot" v-model="honeypot" type="text" />
    </div>
    <b-form-group id="url" label="Download URL" label-for="url-input">
      <b-form-input
        id="url-input"
        v-model="url"
        :disabled="infoLoading"
        type="text"
        required
        placeholder="Enter download URL"
        size="lg"
        autofocus
      />
    </b-form-group>
    <div class="text-right">
      <b-button :disabled="!modified" type="reset" variant="outline-danger">
        <awesome :icon="['fas', 'hand-peace']" />
        Reset
      </b-button>
      <b-button type="submit" variant="outline-primary">
        <awesome :icon="['fas', 'save']" />
        Download
      </b-button>
    </div>
  </b-form>
</template>

<script>
import { isEmpty } from 'lodash'
export default {
  data () {
    return {
      infoTask: 0,
      infoLoading: false
    }
  },
  computed: {
    url: {
      get () {
        return this.$store.state.api.form.url
      },
      set (value) {
        const start = () => {
          this.infoTask = setTimeout(async () => {
            this.infoLoading = true
            await this.$store.dispatch('api/form/requestInfo')
            this.infoLoading = false
            this.infoTask = 0
          }, 2000)
        }
        const cancel = () => {
          if (this.infoTask !== 0) {
            clearTimeout(this.infoTask)
            this.infoTask = 0
            this.infoLoading = false
          }
        }
        this.$store.commit('api/form/url', value)
        cancel()
        if (!isEmpty(value)) {
          start()
        }
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
    },
    modified () {
      return this.$store.state.api.form.modified
    }
  },
  methods: {
    requestDownload (event) {
      event.preventDefault()
      alert('download')
    },
    resetForm (event) {
      event.preventDefault()
      this.$store.dispatch('api/form/reset')
      // trick to reset/clear native browser form validation state
      this.infoLoading = false
      this.infoTask = 0
      this.show = false
      this.$nextTick(() => {
        this.show = true
      })
    }
  }
}
</script>

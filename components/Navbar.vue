<template>
  <b-navbar toggleable="lg" type="dark" variant="primary">
    <b-navbar-brand to="/">
      <awesome :icon="['fas', 'dragon']" />
      <span class="font-italic">medoser</span>
    </b-navbar-brand>
    <b-navbar-toggle target="nav-collapse" />
    <b-collapse id="nav-collapse" class="mr-2" is-nav>
      <b-navbar-nav class="ml-auto">
        <b-nav-item href="#" title="Repository">
          <awesome :icon="['fab', 'github']" />
        </b-nav-item>
        <b-nav-item to="/activity" title="Activity">
          <awesome :icon="['fas', 'tasks']" />
        </b-nav-item>
        <b-nav-item to="/settings" title="Settings">
          <awesome :icon="['fas', 'tools']" />
        </b-nav-item>
      </b-navbar-nav>
    </b-collapse>
    <a v-if="status.online" href="/api" target="_blank" class="badge badge-success" title="API online">online</a>
    <span v-else class="badge badge-danger">Offline</span>
  </b-navbar>
</template>

<script>
export default {
  computed: {
    status () {
      return this.$store.state.api.status
    }
  }
}
</script>

<template>
  <b-navbar toggleable="sm" type="dark" variant="primary">
    <b-navbar-brand to="/">
      <awesome :icon="['fas', 'dragon']" />
      <span class="font-italic">medoser</span>
    </b-navbar-brand>
    <b-navbar-toggle target="nav-collapse" />
    <b-collapse id="nav-collapse" is-nav>
      <b-navbar-nav class="ml-auto">
        <b-nav-item href="https://github.com/cakebake/medoser" title="Repository">
          <awesome :icon="['fab', 'github']" />
          <span class="d-sm-none">Repository</span>
        </b-nav-item>
        <b-nav-item to="/activity" title="Activity">
          <awesome :icon="['fas', 'tasks']" />
          <span class="d-sm-none">Activity</span>
        </b-nav-item>
        <b-nav-item to="/settings" title="Settings">
          <awesome :icon="['fas', 'tools']" />
          <span class="d-sm-none">Settings</span>
        </b-nav-item>
        <b-nav-item :title="status.message" to="/api" target="_blank">
          <awesome :icon="['fas', 'plug']" :class="{ 'text-success': status.online, 'text-danger': !status.online }" />
          <span v-if="status.online" class="d-sm-none">API online</span>
          <span v-else class="d-sm-none">API offline</span>
        </b-nav-item>
      </b-navbar-nav>
    </b-collapse>
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

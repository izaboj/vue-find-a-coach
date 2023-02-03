<template>
  <div>
    <base-dialog :show="!!error" title="An error occurred" @close="handleError">
      <p>{{ error }}</p>
    </base-dialog>
    <section>
      <base-card>
        <header>
          <h3>Requests Received</h3>
        </header>
        <div v-if="isLoading">
          <base-spinner />
        </div>
        <ul v-else-if="hasRequests && !isLoading">
          <request-item
            v-for="req in requests"
            :id="req.id"
            :key="req.id"
            :email="req.email"
            :message="req.message"
          ></request-item>
        </ul>
        <h3 v-else>you have not received requests</h3>
      </base-card>
    </section>
  </div>
</template>

<script>
import requestItem from '../../components/requests/RequestItem.vue';
export default {
  components: {
    requestItem,
  },
  data() {
    return {
      error: null,
      isLoading: false,
    };
  },
  computed: {
    requests() {
      return this.$store.getters['requestN/requests'];
    },
    hasRequests() {
      return this.$store.getters['requestN/hasRequests'];
    },
  },
  created() {
    this.loadRequests();
  },
  methods: {
    async loadRequests() {
      this.isLoading = true;
      try {
        await this.$store.dispatch('requestN/loadRequests');
      } catch (e) {
        this.error = e.message || 'sth failed';
      }
      this.isLoading = false;
    },
    handleError() {
      this.error = null;
    },
  },
};
</script>

<style scoped>
header {
  text-align: center;
}

ul {
  list-style: none;
  margin: 2rem auto;
  padding: 0;
  max-width: 30rem;
}

h3 {
  text-align: center;
}
</style>

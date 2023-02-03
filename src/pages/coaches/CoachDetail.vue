<template>
  <div>
    <section>
      <base-card>
        <h2>{{ fullName }}</h2>
        <h3>${{ selectedCoach.hourlyRate }}/hour</h3>
      </base-card>
    </section>
    <section>
      <base-card>
        <base-badge
          v-for="area in selectedCoach.areas"
          :key="area"
          :title="area"
          :type="area"
        >
        </base-badge>
        <p>{{ selectedCoach.description }}</p>
      </base-card>
    </section>
    <section>
      <base-card>
        <h2>Intrested? Reach out now.</h2>
        <base-button link :to="contactFormLink" mode="outline"
          >Contact</base-button
        >
        <router-view></router-view>
      </base-card>
    </section>
  </div>
</template>

<script>
export default {
  props: ['id'],
  data() {
    return {
      selectedCoach: null,
    };
  },
  computed: {
    fullName() {
      return this.selectedCoach.firstName + ' ' + this.selectedCoach.lastName;
    },
    contactFormLink() {
      return this.$route.path + '/contact';
    },
  },
  created() {
    this.selectedCoach = this.$store.getters['coachesN/coaches'].find(
      (coach) => coach.id === this.id
    );
    console.log(this.selectedCoach, 'COAChes');
  },
};
</script>

<style></style>

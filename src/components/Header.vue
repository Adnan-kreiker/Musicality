<template>
     <!-- Header -->
  <header id="header" class="bg-gray-700">
    <nav class="container mx-auto flex justify-start items-center py-5 px-4">
      <!-- App Name -->
      <router-link :to="{name: 'Home'}" class="text-white font-bold uppercase text-2xl mr-4"
      exact-active-class="no-change"
      >Music
      </router-link>

      <div class="flex flex-grow items-center">
        <!-- Primary Navigation -->
        <ul class="flex flex-row mt-1">
          <!-- Navigation Links -->
          <li>
            <router-link class="px-2 text-white" :to="{ name: 'About'}">About</router-link>
          </li>
          <li v-if="!userLoggedIn">
            <a class="px-2 text-white" href="#" @click.prevent="toggleAuthModal">
            Login / Register</a>
          </li>
          <template v-else>
          <li>
            <router-link class="px-2 text-white" :to="{ name: 'Manage'}">Manage</router-link>
          </li>
          <li>
            <a class="px-2 text-white" href="#" @click.prevent="signout">Logout</a>
          </li>
          </template>
        </ul>
          <ul class="flex flex-row mt-1 ml-auto">
            <select class="px-2 text-white bg-gray-700" @change="switchSelectedLanguage($event)">
              <option value="en">English</option>
              <option value="fr">Français</option>
              <option value="Ar">العربية</option>
            </select>
          </ul>
      </div>
    </nav>
  </header>
</template>

<script>
import { mapMutations, mapState } from 'vuex';

export default {
  name: 'Header',
  data() {
    return {
      selectedLanguage: '',
    };
  },
  computed: {
    ...mapState({
      userLoggedIn: (state) => state.auth.userLoggedIn,
    }),
    currentLocale() {
      return this.$i18n.locale === 'fr' ? 'French' : 'English';
    },
  },
  methods: {
    ...mapMutations(['toggleAuthModal']),
    signout() {
      this.$store.dispatch('signout');

      if (this.$route.name === 'Manage') {
        this.$router.push({ name: 'Home' });
      }
    },
    switchSelectedLanguage(event) {
      this.selectedLanguage = event.target.value;
      this.changeLocale();
    },
    changeLocale() {
      this.$i18n.locale = this.selectedLanguage;
    },
    // toggleAuthModal() {
    // this.$store.commit('toggleAuthModal');  },
  },
};
</script>

<style>

</style>

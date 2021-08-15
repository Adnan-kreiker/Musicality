<template>
     <!-- Header -->
  <header id="header">
    <nav class="container mx-auto flex justify-start items-center py-5 px-4">
      <!-- App Name -->
      <router-link :to="{name: 'Home'}" class="text-white font-bold uppercase text-2xl mr-4"
      exact-active-class="no-change"
      >Musicality
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
            <select class="px-2 text-white lang-bar :hover:text-green-500"
             @change="switchSelectedLanguage($event)">
              <option value="en"><span>English</span></option>
              <option value="fr"><span>Français</span></option>
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

<style scoped>
#header, .lang-bar {
  background: black;
}
.lang-bar:hover{
  cursor: pointer;
}
span:hover {
  color: #20d862 !important;
}

</style>

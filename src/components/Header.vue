<template>
  <!-- Header -->
  <header id="header">
    <nav class="container mx-auto flex justify-start items-center py-5 px-4">
      <!-- App Name -->
      <router-link
        :to="{ name: 'Home' }"
        class="text-white font-bold uppercase text-2xl mr-4"
        exact-active-class="no-change"
        >Musicality
      </router-link>

      <div class="flex flex-grow items-center nav-bar">
        <!-- Primary Navigation -->
        <ul class="flex flex-row mt-1">
          <!-- Navigation Links -->
          <li>
            <router-link class="px-2 text-white" :to="{ name: 'About' }">
              {{ $t('home.about') }}</router-link
            >
          </li>
          <li v-if="!userLoggedIn">
            <a class="px-2 text-white" href="#" @click.prevent="toggleAuthModal">
              {{ $t('home.loginRegister') }}</a
            >
          </li>
          <template v-else>
            <li>
              <router-link class="px-2 text-white" :to="{ name: 'Manage' }">
                {{ $t('home.manage') }}</router-link
              >
            </li>
            <li>
              <a class="px-2 text-white" href="#" @click.prevent="signout">{{
                $t('home.logout')
              }}</a>
            </li>
            <div class="lang hidden">
              <li>
                <a class=" text-white self-end" href="#" @click.prevent="changeLocale">
                  {{ currentLocale }}
                </a>
              </li>
            </div>
          </template>
        </ul>
        <ul class="flex flex-row mt-1 ml-auto">
          <li>
            <a class=" text-white" href="#" @click.prevent="changeLocale">
              {{ currentLocale }}
            </a>
          </li>
        </ul>
      </div>
      <div id="mySidenav" :class="[{ wedth: show }, 'hiden']" class="sidenav">
        <!-- <a href="javascript:void(0)" class="closebtn" @click="closeNav()">&times;</a> -->
        <ul>
          <!-- Navigation Links -->
          <li>
            <router-link class="px-2 text-white" :to="{ name: 'About' }">
              {{ $t('home.about') }}</router-link
            >
          </li>
          <li v-if="!userLoggedIn">
            <a class="px-2 text-white" href="#" @click.prevent="toggleAuthModal">
              {{ $t('home.loginRegister') }}</a
            >
          </li>
          <template v-else>
            <li>
              <router-link class="px-2 text-white" :to="{ name: 'Manage' }">
                {{ $t('home.manage') }}</router-link
              >
            </li>
            <li>
              <a class="px-2 text-white" href="#" @click.prevent="signout">{{
                $t('home.logout')
              }}</a>
            </li>
            <div class="lang">
              <li>
                <a class=" text-white self-end" href="#" @click.prevent="changeLocale">
                  {{ currentLocale }}
                </a>
              </li>
            </div>
          </template>
        </ul>
      </div>
      <span class="burger hidden" style="font-size:30px;cursor:pointer" @click="openNav()"
        >&#9776;</span
      >
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
      show: false,
    };
  },
  computed: {
    ...mapState({
      userLoggedIn: (state) => state.auth.userLoggedIn,
    }),
    currentLocale() {
      return this.$i18n.locale === 'fr' ? 'Fr' : 'En';
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
    changeLocale() {
      this.$i18n.locale = this.$i18n.locale === 'fr' ? 'en' : 'fr';
    },
    openNav() {
      // document.getElementById('mySidenav').style.width = '250px';
      this.show = !this.show;
    },

    closeNav() {
      // document.getElementById('mySidenav').style.width = '0';
    },
    // toggleAuthModal() {
    // this.$store.commit('toggleAuthModal');  },
  },
};
</script>

<style scoped>
.hiden {
  width: 0px;
}
.wedth {
  width: 250px;
}
.burger {
  color: white;
}
#header,
.lang-bar {
  background: black;
}
.lang-bar:hover {
  cursor: pointer;
}
.lang {
  align-self: flex-end;
}
span:hover {
  color: #858a87 !important;
}
@media (max-width: 768px) {
  .burger {
    display: unset;
    position: absolute;
    z-index: 1;
    top: 2%;
    right: 2%;
  }
  .nav-bar {
    display: none;
  }
}
@media (max-width: 380px) {
  select {
    padding: 0px !important ;
  }
}
.sidenav {
  height: 100%;
  /* width: 0; */
  position: fixed;
  z-index: 1;
  top: 0;
  right: 0;
  background-color: #111;
  overflow-x: hidden;
  transition: 0.5s;
  padding-top: 60px;
}

.sidenav a {
  padding: 8px 8px 8px 32px;
  text-decoration: none;
  font-size: 25px;
  color: #818181;
  display: block;
  transition: 0.3s;
}

.sidenav a:hover {
  color: #f1f1f1;
}

.sidenav .closebtn {
  position: absolute;
  top: 0;
  left: 0;
  font-size: 36px;
}

@media screen and (max-height: 450px) {
  .sidenav {
    padding-top: 15px;
  }
  .sidenav a {
    font-size: 18px;
  }
}
</style>

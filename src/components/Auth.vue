<template>
  <!-- Auth Modal  :class="{ hidden: !authModalShow }"-->
  <transition
    name="fade"
    mode="out-in"
  >
    <div
      v-if="authModalShow"
      id="modal"
      class="fixed z-10 inset-0 overflow-y-auto "
    >
      <div
        class="flex items-end justify-center min-h-screen pt-4 px-4 pb-20 text-center
      sm:block sm:p-0"
      >
        <div class="fixed inset-0 transition-opacity">
          <div class="absolute inset-0 bg-gray-800 opacity-75" />
        </div>

        <!-- This element is to trick the browser into centering the modal contents. -->
        <span class="hidden sm:inline-block sm:align-middle sm:h-screen">&#8203;</span>

        <div
          class="inline-block align-bottom auth-modal rounded-lg text-left overflow-hidden
        shadow-xl transform transition-all sm:my-8 sm:align-middle sm:max-w-lg sm:w-full"
        >
          <!-- Add margin if you want to see some of the overlay behind the modal-->
          <div class="py-4 text-left px-6">
            <!--Title-->
            <div class="flex justify-between items-center pb-4">
              <p class="text-2xl text-white font-bold">
                {{ $t('login.yourAccount') }}
              </p>
              <!-- Modal Close Button -->
              <div
                class="modal-close cursor-pointer z-50"
                @click.prevent="toggleAuthModal"
              >
                <i class="fas fa-times text-gray-600" />
              </div>
            </div>

            <!-- Tabs -->
            <ul class="flex flex-wrap mb-4">
              <li class="flex-auto text-center">
                <a
                  class="block rounded py-3 px-4 transition"
                  href="#"
                  :class="{
                    'hover:text-white text-white bg-gray-600': tab == ('login' || 'Connexion'),
                    'hover:text-green-600 text-white': tab == ('register' || 'Enregistrer'),
                  }"
                  @click.prevent="tab = 'login'"
                >{{ $t('login.login') }}</a>
              </li>
              <li class="flex-auto text-center">
                <a
                  class="block rounded py-3 px-4 transition"
                  href="#"
                  :class="{
                    'hover:text-white text-white bg-gray-600': tab == ('register' || 'Enregistrer'),
                    'hover:text-green-600 text-white ': tab == ('login' || 'Connexion'),
                  }"
                  @click.prevent="tab = 'register'"
                >{{ $t('login.register') }}</a>
              </li>
            </ul>

            <app-login-form v-if="tab == 'login'" />
            <app-register-from v-else />
          </div>
        </div>
      </div>
    </div>
  </transition>
</template>

<script>
import { mapMutations, mapState } from 'vuex';
import AppLoginForm from './LoginForm.vue';
import AppRegisterFrom from './RegisterForm.vue';

export default {
  name: 'Auth',
  components: {
    AppLoginForm,
    AppRegisterFrom,
  },
  data() {
    return {
      tab: 'login',
    };
  },
  computed: {
    ...mapState({
      authModalShow: (state) => state.auth.authModalShow,
    }),
  },
  methods: {
    ...mapMutations(['toggleAuthModal']),
  },
};
</script>

<style scoped>
.auth-modal {
  background: #212121;
}
.fade-enter-from {
  opacity: 0;
}

.fade-enter-active {
  transition: all 0.5s linear;
}

.fade-leave-to {
  transition: all 0.5s linear;
  opacity: 0;
}
</style>

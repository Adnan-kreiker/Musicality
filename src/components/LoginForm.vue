<template>
  <main>
    <!-- Login Form -->
    <div
      class="text-white text-center font-bold p-4 mb-4"
      v-if="login_show_alert"
      :class="login_alert_variant"
    >
      {{ login_alert_message }}
    </div>
    <vee-form :validation-schema="schema" @submit="login">
      <!-- Email -->
      <div class="mb-3">
        <label class="inline-block text-white mb-2">Email</label>
        <vee-field
          type="email"
          name="email"
          class="block input w-full py-1.5 px-3 text-white border border-gray-700 transition
            duration-500 focus:outline-none focus:border-black rounded"
          :placeholder="$t('login.placeholder1')"
        />
        <ErrorMessage class="text-red-600" name="email" />
      </div>
      <!-- Password -->
      <div class="mb-3">
        <label class="inline-block text-white mb-2">{{ $t('login.password') }}</label>
        <vee-field
          type="password"
          name="password"
          class="block input w-full py-1.5 px-3 text-white border border-gray-700 transition
            duration-500 focus:outline-none focus:border-black rounded"
          :placeholder="$t('login.password')"
        />
        <ErrorMessage class="text-red-600" name="password" />
      </div>
      <button
        type="submit"
        :disabled="login_in_submission"
        class="block w-full bg-green-400 text-white py-1.5 px-3 rounded transition
          hover:bg-green-600"
      >
        {{ $t('login.submit') }}
      </button>
    </vee-form>
  </main>
</template>

<script>
export default {
  name: 'LoginForm',
  data() {
    return {
      schema: {
        email: 'required|min:3|max:100|email',
        password: 'required|min:3|max:100',
      },
      login_in_submission: false,
      login_show_alert: false,
      login_alert_variant: 'bg-blue-500',
      login_alert_message: 'Please wait! We are logging you in!',
    };
  },
  methods: {
    async login(values) {
      this.login_in_submission = true;
      this.login_show_alert = true;
      this.login_alert_variant = 'bg-blue-500';
      this.login_alert_message = 'Please wait! We are logging you in!';

      try {
        await this.$store.dispatch('login', values);
      } catch (error) {
        this.login_in_submission = false;
        this.login_alert_variant = 'bg-red-500';
        this.login_alert_message = error.message;
        return;
      }

      this.login_alert_variant = 'bg-green-500';
      this.login_alert_message = 'Success! You are now logged in!';
      window.location.reload();
    },
  },
};
</script>

<style scoped>
.input {
  background: #121212;
}
</style>

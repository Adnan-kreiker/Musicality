<template>
  <main>
    <!-- Registration Form -->
    <div
      class="text-white text-center font-bold p-5 mb-4"
      v-if="reg_show_alert"
      :class="reg_alert_variant"
    >
      {{ reg_alert_message }}
    </div>
    <vee-form :validation-schema="schema" @submit="register" :initial-values="userData">
      <!-- Name -->
      <div class="mb-3">
        <label class="inline-block text-white mb-2">{{ $t('login.name') }}</label>
        <vee-field
          type="text"
          name="name"
          class="block w-full py-1.5 px-3 text-white border border-gray-300 transition
            duration-500 focus:outline-none focus:border-black rounded"
          placeholder="Enter Name"
        />
        <ErrorMessage class="text-red-600" name="name" />
      </div>
      <!-- Email -->
      <div class="mb-3">
        <label class="inline-block text-white mb-2">Email</label>
        <vee-field
          type="email"
          name="email"
          class="block w-full py-1.5 px-3 text-white border border-gray-300 transition
            duration-500 focus:outline-none focus:border-black rounded"
          placeholder="Enter Email"
        />
        <ErrorMessage name="email" class="text-red-600" />
      </div>
      <!-- Age -->
      <div class="mb-3">
        <label class="inline-block text-white mb-2">{{ $t('login.age') }}</label>
        <vee-field
          type="number"
          name="age"
          class="block w-full py-1.5 px-3 text-white border border-gray-300 transition
            duration-500 focus:outline-none focus:border-black rounded"
        />
        <ErrorMessage class="text-red-600" name="age" />
      </div>
      <!-- Password -->
      <div class="mb-3">
        <label class="inline-block text-white mb-2">{{ $t('login.password') }}</label>
        <vee-field name="password" :bails="false" v-slot="{ field, errors }">
          <input
            class="block w-full py-1.5 px-3 text-white border
            border-gray-300 transition duration-500 focus:outline-none
            focus:border-black rounded"
            type="password"
            placeholder="Password"
            v-bind="field"
          />
          <div class="text-red-600" v-for="error in errors" :key="error">
            <p>{{ error }}</p>
          </div>
        </vee-field>
      </div>
      <!-- Confirm Password -->
      <div class="mb-3">
        <label class="inline-block text-white mb-2">{{ $t('login.confirmPassword') }}</label>
        <vee-field
          type="password"
          name="confirm_password"
          class="block w-full py-1.5 px-3 text-white border border-gray-300 transition
            duration-500 focus:outline-none focus:border-black rounded"
          placeholder="Confirm Password"
        />
        <ErrorMessage name="confirm_password" class="text-red-600" />
      </div>
      <!-- Country -->
      <div class="mb-3">
        <label class="inline-block text-white mb-2">{{ $t('login.country') }}</label>
        <vee-field
          as="select"
          name="country"
          class="block w-full py-1.5 px-3 text-white border border-gray-300 transition
            duration-500 focus:outline-none focus:border-black rounded"
        >
          <option value="USA">USA</option>
          <option value="Mexico">Mexico</option>
          <option value="Germany">Germany</option>
          <option value="Antarctica">Antarctica</option>
        </vee-field>
        <ErrorMessage name="country" class="text-red-600" />
      </div>
      <!-- TOS -->
      <div class="mb-3 pl-6">
        <vee-field
          name="tos"
          value="1"
          type="checkbox"
          class="w-4 h-4 float-left -ml-6 mt-1 rounded"
        />
        <i18n-t class="inline-block text-white" keypath="register.accept" tag="label" for="tos">
          <a href="#" class=" text-white"> {{ $t('register.TOS') }}</a>
        </i18n-t>
        <ErrorMessage name="tos" class="text-red-600" />
      </div>
      <button
        type="submit"
        :disabled="reg_in_submission"
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
        name: 'required|min:3|max:100|alpha_spaces',
        email: 'required|min:3|max:100|email',
        age: 'required|min_value:18|max_value:100',
        password: 'required|min:3|max:100',
        confirm_password: 'passwords_mismatch:@password',
        country: 'required|country_excluded:Antarctica',
        tos: 'tos',
      },
      userData: {
        country: 'USA',
      },
      reg_in_submission: false,
      reg_show_alert: false,
      reg_alert_variant: 'bg-blue-500',
      reg_alert_message: 'Please wait! your account is being created!',
    };
  },
  methods: {
    async register(values) {
      this.reg_in_submission = true;
      this.reg_show_alert = true;
      this.reg_alert_variant = 'bg-blue-500';
      this.reg_alert_message = 'Please wait! your account is being created!';

      try {
        await this.$store.dispatch('register', values);
      } catch (error) {
        const err = error;
        this.reg_in_submission = false;
        this.reg_alert_variant = 'bg-red-500';
        this.reg_alert_message = error.message;
        console.log(err);
        return;
      }

      this.reg_alert_variant = 'bg-green-500';
      this.reg_alert_message = 'Success! Your account has been created.';
      window.location.reload();
    },
  },
};
</script>
<style scoped>
input,
select {
  background: #121212;
}
</style>

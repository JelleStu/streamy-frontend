<template>
  <div class="loginForm">
    <h1 class="form_title justify-center align-center align-content-center">
      Sign in
    </h1>
    <validation-observer ref="observer">
      <v-form
        ref="form"
        lazy-validation
        @submit.prevent="validateForm"
        data-cy="loginForm"
      >
        <validation-provider
          v-slot="{ errors }"
          name="Email"
          rules="required|email"
        >
          <v-text-field
            v-model="user.username"
            label="Email"
            data-cy="username"
          >
          </v-text-field>
          <p class="red--text">{{ errors[0] }}</p>
        </validation-provider>

        <validation-provider
          v-slot="{ errors }"
          name="Password"
          rules="required"
        >
          <v-text-field
            v-model="user.password"
            label="Password"
            type="password"
            data-cy="password"
          ></v-text-field>
          <p class="red--text">{{ errors[0] }}</p>
        </validation-provider>
        <div class="formButtonColumn">
          <v-btn
            class="mr-4 submitButtonLogin"
            type="submit"
            data-cy="loginButton"
          >
            Login
          </v-btn>
          <v-btn class="registerButton" @click="goToSignUp">Sign Up</v-btn>
        </div>
      </v-form>
    </validation-observer>
  </div>
</template>

<script>
import router from "@/router";
import { required, email } from "vee-validate/dist/rules";
import { extend, ValidationObserver, ValidationProvider } from "vee-validate";
extend("required", {
  ...required,
  message: "{_field_} can not be empty",
});

extend("email", email);

export default {
  name: "LoginForm",
  components: {
    ValidationProvider,
    ValidationObserver,
  },
  data: () => ({
    user: {
      username: "",
      password: "",
    },
  }),

  methods: {
    handleLogin() {
      this.$store
        .dispatch("auth/login", this.user)
        .then(() => {
          router.push("/movies").catch(() => {});
        })
        .catch(() => {
          this.$toast.error("Invalid credentials!");
        });
    },
    goToSignUp() {
      router.push("/register").catch(() => {});
    },
    validateForm() {
      this.$refs.observer.validate().then((result) => {
        if (result) {
          this.handleLogin();
        } else {
          this.$toast.error("Please check the form errors.");
        }
      });
    },
  },
};
</script>

<style scoped>
.form_title {
  padding-top: 1rem;
  text-align: center;
}

.loginForm {
  background-color: rgba(255, 255, 255, 0.75) !important;
  color: black;
}

.submitButtonLogin {
  display: flex;
  background-color: lightgreen !important;
  align-self: center;
}
.registerButton {
  display: flex;
  background-color: lightcoral !important;
  align-self: center;
  margin: 1em 0 1em 0;
}

.formButtonColumn {
  display: flex;
  flex-direction: column;
  justify-content: center;
  justify-items: center;
  align-content: center;
}
</style>

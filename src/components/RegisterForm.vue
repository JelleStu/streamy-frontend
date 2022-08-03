<template>
  <div class="registerForm">
    <h1 class="form_title justify-center align-center align-content-center">
      Register here!
    </h1>
    <validation-observer ref="observer">
      <v-form
        ref="registerForm"
        lazy-validation
        @submit.prevent="handleRegister"
        data-cy="registerForm"
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
          name="NormalName"
          rules="required"
        >
          <v-text-field v-model="user.name" label="Name"></v-text-field>
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

        <validation-provider
          v-slot="{ errors }"
          name="iban"
          rules="required|min:18"
        >
          <v-text-field
            v-model="user.iban"
            label="Iban"
            type="text"
            data-cy="ibannumber"
          ></v-text-field>
          <p class="red--text">{{ errors[0] }}</p>
        </validation-provider>

        <div class="formButtonColumn">
          <v-btn class="registerConfirmButton" type="submit">Sign Up</v-btn>

          <v-btn
            class="mr-4 backToLoginButton"
            data-cy="loginButton"
            @click="goToLogin"
          >
            Back to login
          </v-btn>
        </div>
      </v-form>
    </validation-observer>
  </div>
</template>

<script>
import router from "@/router";
import { extend, ValidationObserver, ValidationProvider } from "vee-validate";
import { required, email } from "vee-validate/dist/rules";
import RegisterService from "@/services/register.service";
extend("required", {
  ...required,
  message: "{_field_} can not be empty",
});
extend("email", email);

extend("min", {
  validate(value, args) {
    if (value.length >= args.length) return true;
    else return "Iban is minimaal 18 karakters lang.";
  },
  params: ["length"],
});

export default {
  name: "RegisterForm",
  components: {
    ValidationProvider,
    ValidationObserver,
  },
  data: () => ({
    user: {
      username: "",
      name: "",
      password: "",
      iban: "",
    },
  }),
  methods: {
    goToLogin() {
      router.push("/").catch(() => {});
    },
    handleRegister() {
      this.$refs.observer.validate().then((result) => {
        if (result) {
          RegisterService.register(this.user);
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

.registerForm {
  background-color: rgba(255, 255, 255, 0.75) !important;
  color: black;
}

.backToLoginButton {
  display: flex;
  background-color: lightcoral !important;
  align-self: center;
  margin: 1em 0 1em 0;
}
.registerConfirmButton {
  display: flex;
  background-color: lightgreen !important;
  align-self: center;
}
.formButtonColumn {
  display: flex;
  flex-direction: column;
  justify-content: center;
  justify-items: center;
  align-content: center;
}
</style>

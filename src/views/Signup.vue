<template>
  <v-container class="loginContainer" style="height: 100vh;" fluid>
    <v-layout fill-height>
      <v-row align="center" justify="center" dense>
        <v-col cols="12" sm="8" md="6" lg="4" style="margin: auto">
          <div class="registerform">
            <register-form></register-form>
          </div>
        </v-col>
      </v-row>
    </v-layout>
  </v-container>
</template>

<script>
import RegisterForm from "@/components/RegisterForm";
export default {
  name: "Signup",
  components: {RegisterForm},
};
</script>

<style scoped></style>

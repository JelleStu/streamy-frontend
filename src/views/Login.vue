<template>
  <v-container class="loginContainer" style="height: 100vh" fluid>
    <v-layout fill-height>
      <v-row align="center" justify="center" dense>
        <v-col cols="12" sm="8" md="3" lg="3" style="margin: auto">
          <div class="loginform">
            <login-form />
          </div>
        </v-col>
      </v-row>
    </v-layout>
  </v-container>
</template>

<script>
import LoginForm from "@/components/LoginForm";

export default {
  name: "Login.vue",
  components: { LoginForm },
};
</script>

<style>
.loginform {
  width: 350px;
  box-shadow: 0 14px 80px rgba(34, 35, 58, 0.2);
  border-radius: 15px;
  transition: all 0.3s;
}
.loginContainer {
  display: flex;
  justify-content: center;
  flex-direction: column;
}
.loginContainer {
  background: url("../../src/assets/background-login.png") no-repeat center
    center fixed;
  -webkit-background-size: cover;
  -moz-background-size: cover;
  -o-background-size: cover;
  background-size: cover;
  overflow: hidden;
}
</style>

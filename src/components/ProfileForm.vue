<template>
  <div id="profileForm">
    <div>
      <v-btn tile color="success" @click="changeEditMode">
        <v-icon left> mdi-pencil </v-icon>
        Edit
      </v-btn>
    </div>
    <div>
      <validation-observer ref="observer">
        <v-form class="profileform" @submit.prevent="validateForm">
          <validation-provider
            v-slot="{ errors }"
            name="Email"
            rules="required"
          >
            <v-text-field
              v-model="user.name"
              label="Name"
              clearable
              :disabled="!isEditMode"
              required
            >
            </v-text-field>
            <p class="red--text">{{ errors[0] }}</p>
          </validation-provider>
          <validation-provider
            v-slot="{ errors }"
            name="Email"
            rules="required|email"
          >
            <v-text-field
              v-model="user.email"
              label="Email"
              clearable
              :disabled="!isEditMode"
            ></v-text-field>
            <p class="red--text">{{ errors[0] }}</p>
          </validation-provider>
          <v-text-field
            v-model="user.password"
            label="password"
            type="password"
            :disabled="true"
          >
          </v-text-field>
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
              :disabled="!isEditMode"
            ></v-text-field>
            <p class="red--text">{{ errors[0] }}</p>
          </validation-provider>
          <v-row>
            <v-btn type="submit" :disabled="!submitMode">Submit edit!</v-btn>
            <v-dialog v-model="dialog" persistent max-width="290">
              <template v-slot:activator="{ on, attrs }">
                <v-btn
                  class="deleteButton"
                  color="error"
                  dark
                  v-bind="attrs"
                  v-on="on"
                >
                  Delete your account
                </v-btn>
              </template>
              <v-card>
                <v-card-title class="text-h5"> Are you sure? </v-card-title>
                <v-card-text
                  >If you delete your account everything will be deleted.
                </v-card-text>
                <v-card-actions>
                  <v-spacer></v-spacer>
                  <v-btn color="green darken-1" text @click="dialog = false">
                    Disagree
                  </v-btn>
                  <v-btn color="green darken-1" text @click="deleteAccount">
                    Agree
                  </v-btn>
                </v-card-actions>
              </v-card>
            </v-dialog>
          </v-row>
        </v-form>
      </validation-observer>
    </div>
  </div>
</template>

<script>
import UserService from "@/services/user.service";
import userService from "@/services/user.service";
import AuthService from "@/services/auth.service";
import SubscriptionService from "@/services/subscription.service";
import { extend, ValidationObserver, ValidationProvider } from "vee-validate";
import { required, email } from "vee-validate/dist/rules";
extend("required", {
  ...required,
  message: "{_field_} can not be empty",
});
extend("email", email);

export default {
  name: "ProfileForm",
  components: {
    ValidationProvider,
    ValidationObserver,
  },
  data: () => ({
    user: {
      id: "",
      email: "",
      name: "",
      password: "",
      iban: "",
    },
    isEditMode: false,
    submitMode: false,
    dialog: false,
  }),
  beforeMount() {
    this.getUserDetails();
  },
  methods: {
    getUserDetails() {
      UserService.getUser().then((responseUser) => {
        console.log(responseUser);
        this.user.id = responseUser.id;
        this.user.name = responseUser.name;
        this.user.email = responseUser.email;
        this.user.password = responseUser.password;
        SubscriptionService.getSubscription(this.user.id).then(
          (responseIban) => {
            console.log("asking for subscription");
            console.log(responseIban.data);
            this.user.iban = responseIban.data.ibanNumber;
          }
        );
      });
    },
    changeEditMode() {
      this.isEditMode = !this.isEditMode;
      console.log(this.isEditMode);
      if (this.submitMode === false) {
        this.submitMode = true;
      }
    },
    submitEdit() {
      userService.updateUser(this.user).then((response) => {
        if (response.status === 200) {
          this.$toast.success(response.data);
          this.getUserDetails();
        } else {
          this.$toast.error("Please try again later!");
        }
      });
    },
    deleteAccount() {
      userService.deleteUser(this.user).then((response) => {
        if (response.status === 200) {
          this.$toast.success("You account is deleted!");
          AuthService.logout();
          this.$router.push({ name: "Login" }).catch(() => {});
        } else {
          this.$toast.error(
            "We could not delete your account, please try again later!"
          );
        }
      });
    },
    validateForm() {
      this.$refs.observer.validate().then((result) => {
        if (result) {
          this.submitEdit();
        } else {
          this.$toast.error("Please check the form errors.");
        }
      });
    },
  },
};
</script>

<style scoped>
#profileForm {
  display: flex;
  flex-direction: row-reverse;
}
.profileform {
  width: 500px;
}

.deleteButton {
  margin-left: 10rem;
}
</style>

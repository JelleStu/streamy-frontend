<template>
  <div>
    <nav-bar />
    <div class="profileformcontainer flex-column">
      <div style="margin: 0">
        <h1 style="font-weight: 400; size: 3rem; text-align: center">Your profile</h1>
      </div>
      <profile-form />
    </div>
  </div>
</template>
<script>
import NavBar from "@/components/NavBar";
import ProfileForm from "@/components/ProfileForm";
export default {
  name: "Profile",
  components: { ProfileForm, NavBar },
};
</script>

<style scoped>
.profileformcontainer {
  display: flex;
  align-items: center;
  justify-content: center;
  margin: 0;
}
</style>

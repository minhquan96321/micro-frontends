<script setup>
const { user } = window.$stores;
const redirectProfile = () => {
  window.$router.push("/profile");
};
// window.$router.push("/profile");
</script>
<template>
  <div>
    <div class="flex items-center gap-3 px-5 pb-5">
      <img class="w-14 h-14 rounded-full" :src="user.avatar" @click="redirectProfile()" />
      <div class="items-center">
        <div>Xin chào</div>
        <div class="font-semibold text-primary">{{ user.name }}</div>
      </div>
    </div>
  </div>
</template>

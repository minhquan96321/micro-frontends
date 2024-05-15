<script setup>
import { onMounted } from "vue";
import ShowBalance from "@/components/ShowBalance.vue";

const { shop } = window.$stores;

onMounted(() => {
});
</script>

<template>
  <div class="mt-5 bg-primary p-2 rounded-lg">
    <ShowBalance :balance="shop.balance" tabCurrent="statistic" />
  </div>
</template>

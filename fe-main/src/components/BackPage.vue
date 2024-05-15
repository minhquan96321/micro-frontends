<script setup>
const emit = defineEmits(["back-screen"]);
const props = defineProps({
  name: {
    type: String
  },
  icon: {
    type: String,
    default: "pi pi-angle-left"
  },
  isRouter: {
    type: Boolean,
    default: true
  },
  className: {
    type: String
  }
});

const previousPage = () => {
  if (props.isRouter) {
    window.history.back();
  } else {
    emit("back-screen");
  }
};
</script>

<template>
  <div class="pl-3 pt-notch flex gap-2 items-center pb-2 fixed w-full top-0 z-10" :class="className" @click="previousPage()">
    <i class="pi pi-chevron-left text-white p-1 rounded-full border"></i>
    <span class="text-white font-semibold">{{ name }}123</span>
  </div>
</template>

<style lang="scss" scoped></style>

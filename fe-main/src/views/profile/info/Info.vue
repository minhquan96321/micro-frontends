<script setup>
import backPage from "@/components/BackPage.vue";
import { numberToVnd } from "@/helper/convert.js";
import { formatPhoneRead } from "@/helper/hook.js";

const { user } = window.$stores;
</script>

<template>
  <div class="wrapper-info-wallet">
    <backPage name="Thông tin cá nhân" class="bg-primary" />
    <div class="mt-3 px-3 pt-back">
      <Card class="mt-3">
        <template #content>
          <div>
            <div class="flex justify-between py-3">
              <div class="font-semibold">Tên</div>
              <div>{{ user.name }}</div>
            </div>
            <div class="flex justify-between py-3">
              <div class="font-semibold">Số điện thoại</div>
              <div>{{ formatPhoneRead(user.phone) }}</div>
            </div>
            <div class="flex justify-between py-3">
              <div class="font-semibold">Số dư khả dụng</div>
              <div>{{ numberToVnd(user.balance) }}</div>
            </div>
          </div>
        </template>
      </Card>
    </div>
  </div>
</template>

<style lang="scss" scoped></style>

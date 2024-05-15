<script setup>
import { onMounted, ref } from "vue";
import { numberToVnd } from "@/helper/convert.js";
import { formatPhoneRead } from "@/helper/hook.js";

const { user } = window.$stores;

const balance = ref("loading...")


const info = [
	{ icon: "pi pi-user", label: "Thông tin cá nhân", page: "profile/info" },
	// { icon: "pi pi-credit-card ", label: "Thông tin ngân hàng", page: "profile/bank" },
	{ icon: "pi pi-wallet", label: "Ví của tôi", page: "/profile/wallet" }
];
const infoDifferent = [
	// { icon: "pi pi-book", label: "Hướng dẫn sử dụng", page: "profile/guide" },
	// { icon: "pi pi-question", label: "Liên hệ hỗ trợ", page: "profile/help" },
	// { icon: "pi pi-question", label: "Chuyển sang chế độ người bán", page: "profile/seller" },
  { icon: "pi pi-clone", label: "Preview", page: "profile/preview" }
];

// functions
const previousPage = () => {
	window.$router.go(-1);
};

const redirectPage = (item) => {
	window.$router.push(item.page);
};
onMounted(async () => {
	balance.value = await window.$stores.user.getMoneyProfile();
});


</script>

<template>
	<div class="h-[130px] bg-primary w-full relative pt-notch" style="border-radius: 0 0 25px 25px">
		<div class="backPage pt-6 pl-3" @click="previousPage()">
			<i class="pi pi-chevron-left text-white p-1 rounded-full border"></i>
		</div>
	</div>
	<div class="flex flex-col justify-center items-center absolute"
		style="position: absolute; left: 50%; transform: translateX(-50%); top: 83px">
		<img :src="user?.avatar" alt="" class="w-20 h-20 rounded-full mb-2" />
		<div class="userName text-center font-bold text-lg">{{ user.name }}</div>
		<div v-if="user.phone" class="phone font-semibold opacity-50">{{ formatPhoneRead(user.phone) }}</div>
		<!-- <div v-else class="phone opacity-50 underline" @click="redirectPage({ page: '/permission-phone' })">
			Cập nhật số điện thoại</div> -->
	</div>
	<div class="mt-[100px] flex justify-between px-3 py-2 mx-2 rounded-lg border-primary border">
		<div class="flex gap-2 items-center">
			<i class="pi pi-wallet p-2 bg-primary rounded-full text-white"></i>
			<span v-if="typeof balance === 'number'" class="font-bold">{{ numberToVnd(balance) }}</span>
			<span v-else>Loading...</span>
		</div>
	</div>
	<!-- actions -->
	<div class="block-info p-3">
		<div class="opacity-50 mb-2">Thông tin</div>
		<div v-for="(item, index) in info" :key="index" class="flex gap-2 items-center py-3 border-b border-gray-500"
			@click="redirectPage(item)">
			<i :class="item.icon"></i>
			<span class="font-semibold">{{ item.label }}</span>
		</div>
		<div class="opacity-50 mt-4 mb-3">Khác</div>
		<div v-for="(item, index) in infoDifferent" :key="index"
			class="flex gap-2 items-center py-3 border-b border-gray-500" @click="redirectPage(item)">
			<i :class="item.icon"></i>
			<span class="font-semibold">{{ item.label }}</span>
		</div>
	</div>
</template>
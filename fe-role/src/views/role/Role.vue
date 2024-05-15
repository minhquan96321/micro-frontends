<script setup>
import { onMounted, ref, reactive, computed } from "vue";
import SkeletonFull from "@/components/SkeletonFull.vue";
import AddRole from "./components/AddRole.vue";

const employer = computed(() => window.$stores.shop.employer);
const details = ref();
const roleAddMember = ref("staff");

const state = reactive({ isOpenAdd: false, isLoadingDelete: false });

function customLocaleCompare(a, b) {
  const order = { o: 0, m: 1, s: 2 };
  return order[a] - order[b];
}

const showDetails = () => {
  window.$api.call("user/detailEmployer", { employer: Object.keys(employer.value) }).then((res) => {
    for (const user of res) {
      user.roleShop = employer.value[user._id];
    }
    details.value = res.sort((a, b) => customLocaleCompare(a.roleShop[0], b.roleShop[0]));
  });
};

const deleteRole = (id) => {
  state.isLoadingDelete = id;
  window.$api
    .call("shop/removeRole", { id, role: employer.value[id] })
    .then(async (res) => {
      if (res.success) {
        await window.$stores.shop.info();
        await showDetails();
        window.$toastSuccess("Thành công");
      }
    })
    .finally(() => (state.isLoadingDelete = false));
};

onMounted(() => {
  showDetails();
});
</script>
<template>
  <div v-if="details" class="mt-4 border-t">
    <div v-for="(user, index) in details" :key="user._id">
      <div v-if="user.roleShop !== details[index - 1]?.roleShop" class="font-semibold mt-4">
        {{ user.roleShop === "owner" ? "Chủ" : user.roleShop === "manage" ? "Quản lý" : "Nhân viên" }}
      </div>
      <div class="flex items-center justify-between">
        <div class="flex items-center font-semibold gap-2 mt-2">
          <Avatar class="[&>*]:object-cover [&>*]:w-full [&>*]:h-full" :image="user.avatar" size="large" shape="circle" />
          <div>{{ user.name }}</div>
        </div>
        <span
          v-if="user.roleShop !== 'owner'"
          :class="state.isLoadingDelete && state.isLoadingDelete === user._id ? 'pi pi-spin pi-spinner' : 'pi pi-trash'"
          @click="deleteRole(user._id)"
        ></span>
      </div>
      <Button
        v-if="user.roleShop !== details[index + 1]?.roleShop && user.roleShop !== 'owner'"
        class="text-primary px-3 py-2 w-[150px] rounded-lg mt-4 flex justify-center"
        @click="
          state.isOpenAdd = true;
          roleAddMember = user.roleShop;
        "
      >
        {{ user.roleShop === "manage" ? "Thêm quản lý" : "Thêm nhân viên" }}
      </Button>
    </div>
    <div class="flex flex-col">
      <div v-if="details && !details.some((item) => item.roleShop === 'manage')">
        <div class="font-semibold mt-4">Quản lý</div>
        <Button
          class="text-primary px-3 py-2 rounded-lg mt-4 w-[150px] flex justify-center"
          @click="
            state.isOpenAdd = true;
            roleAddMember = 'manage';
          "
        >
          Thêm quản lý
        </Button>
      </div>
      <div v-if="details && !details.some((item) => item.roleShop === 'staff')">
        <div class="font-semibold mt-4">Nhân viên</div>
        <Button
          class="text-primary px-3 py-2 rounded-lg mt-4 w-[150px] flex justify-center"
          @click="
            state.isOpenAdd = true;
            roleAddMember = 'staff';
          "
        >
          Thêm nhân viên
        </Button>
      </div>
    </div>
  </div>
  <SkeletonFull v-else class="my-4" />
  <Dialog
    v-model:visible="state.isOpenAdd"
    modal
    :header="roleAddMember === 'staff' ? 'Thêm nhân viên' : 'Thêm quản lý'"
    :style="{ width: '25rem', maxWidth: 'calc(100vw - 32px)' }"
  >
    <AddRole
      :role="roleAddMember"
      :closeModal="
        () => {
          state.isOpenAdd = false;
          showDetails();
        }
      "
    />
  </Dialog>
</template>

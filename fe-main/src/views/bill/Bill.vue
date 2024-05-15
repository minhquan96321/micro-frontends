<script setup>
import { ref, onMounted, reactive, watch } from "vue";
import ImgBill from "./imgBill/ImgBill.vue";
import ScanQr from "./qr/ScanQr.vue";
import AddProduct from "./product/AddProduct.vue";
import SelectProduct from "./product/SelectProduct.vue";
import { numberToVnd } from "@/helper/convert.js";
import config from "@/config";
import { uploadSingleImage } from "@/helper/useUploadImage";
import { formatPhoneWrite } from "@/helper/hook";
import BackPage from "@/components/BackPage.vue";

let timerDebounceCalculator = null;
const userCustomer = ref();
const userAffiliater = ref();
let listUserCustomer = [];
let listUserAffiliater = [];

const isLoading = reactive({ isLoadingCalculator: false, isLoadingSubmit: false, isLoadingUpload: false, loadingGetAffiliater: false });
const stateView = reactive({ qr: false, popupProduct: false, qrType: "phoneCustomer", customerNew: false });
const stateBill = reactive({
  amountReceive: { affiliater: 0, customer: 0, customerCash: 0, fee: 0, shopPay: 0, shopPayCash: 0 },
  listImage: [],
  amountBill: undefined,
  rewardByCash: false,
  phoneCustomer: "",
  phoneAffiliater: "",
  totalDiscount: 0,
  customerNeedPay: 0,
  note: "",
  product: []
});

const handleSelectImage = async (e) => {
  isLoading.isLoadingUpload = true;
  for (const file of e.target.files) {
    const url = await uploadSingleImage(file);
    stateBill.listImage.push(url);
  }
  isLoading.isLoadingUpload = false;
};

const removeImage = (index) => stateBill.listImage.splice(index, 1);
const changeState = (params) => (stateView[params] = !stateView[params]);
const navigateToHome = () => window.$router.push("/dashboard");

const calculator = () => {
  isLoading.isLoadingCalculator = true;
  clearTimeout(timerDebounceCalculator);
  timerDebounceCalculator = setTimeout(async () => {
    // need check multi product
    const payload = {
      products: [{ id: "all", amount: stateBill.amountBill }],
      customerId: userCustomer.value._id,
      affiliaterId: userAffiliater.value?._id || ""
    };

    const resultCalculator = await window.$api.call("bill.getBonus", payload);
    isLoading.isLoadingCalculator = false;
    stateBill.totalDiscount = resultCalculator.totalDiscount;
    stateBill.amountReceive = {
      customerCash: 0,
      customer: 0,
      fee: resultCalculator.transactionFee,
      shopPay: stateBill.totalDiscount,
      affiliater: resultCalculator.affiliaterBonus
    };
    if (stateBill.rewardByCash) {
      stateBill.amountReceive.customerCash = resultCalculator.customerBonus;
      stateBill.amountReceive.shopPay = stateBill.totalDiscount - stateBill.amountReceive.customerCash;
    } else stateBill.amountReceive.customer = resultCalculator.customerBonus;
    stateBill.customerNeedPay = stateBill.amountBill - stateBill.amountReceive.customerCash;
  }, 200);
};

watch([() => stateBill.amountBill, () => stateBill.rewardByCash], () => calculator());

const submit = async () => {
  const { listImage, amountBill, rewardByCash, note } = stateBill;

  if (typeof amountBill !== "number" || amountBill < 0) return window.$toastError("Hãy nhập tổng hóa đơn hợp lệ");
  // if (!note) return window.$toastError("Ghi chú không được bỏ trống");

  // if (!userAffiliater.value._id) return window.$toastError("Khách hàng không đủ điều kiện hưởng ưu đãi do không có người giới thiệu");

  // all
  const payload = {
    customerId: userCustomer.value._id,
    affiliaterId: userAffiliater.value._id,
    note,
    images: listImage,
    products: [{ id: "all", amount: stateBill.amountBill }],
    customerPreferCash: rewardByCash
  };

  isLoading.isLoadingSubmit = true;
  window.$api
    .call("bill/create", payload)
    .then((response) => {
      if (response && response.success) {
        window.$router.push("/dashboard");
        window.$toast.add({ severity: "success", summary: "Thành công", life: 3000 });
      } else {
        console.error(response);
      }
    })
    .catch((e) => {
      if (listError[e.message]) {
        window.$toastError(listError[e?.message]);
      } else {
        window.$toastError(JSON.stringify(e));
      }
      console.error(e);
    })
    .finally(() => {
      isLoading.isLoadingSubmit = false;
      window.$stores.shop.info();
    });
};

const listError = {
  "Shop's balance runs out of money": "Số dư tài khoản không đủ!",
  "Reverse introduction": "Không thể giới thiệu ngược nhau!",
  "Invalid affiliater": "Số điện thoại người giới thiệu không được trùng số điện thoại khách hàng!",
  "Affiliater must use service first": "Người giới thiệu phải sử dụng dịch vụ trước!"
};

const qrSuccess = async (value) => {
  changeState("qr");
  const params = new URLSearchParams(value.split("?")[1]);
  if (params.get("phone")) {
    const [user] = await window.$api.call(`user/checkUserByPhone?phone=${formatPhoneWrite(params.get("phone"))}`);
    stateBill[stateView.qrType] = `${user.name} - ${user.phone}`;
    if (stateView.qrType === "phoneCustomer") {
      listUserCustomer = [{ phone: user.phone, _id: params.get("user") }];
      doneCustomer({ value: stateBill[stateView.qrType] });
    } else {
      listUserAffiliater = [{ phone: user.phone, _id: params.get("user") }];
      doneAffiliater({ value: stateBill[stateView.qrType] });
    }
  }
};

const items = ref([]);

const search = async () => {
  items.value = await window.$api.call(`user/checkUserByPhone?phone=${formatPhoneWrite(stateBill.phoneCustomer)}`).then((list) => {
    listUserCustomer = list;
    return list.map((user) => `${user.name} - ${user.phone}`);
  });
};

const searchAff = async () => {
  items.value = await window.$api.call(`user/checkUserByPhone?phone=${formatPhoneWrite(stateBill.phoneAffiliater)}`).then((list) => {
    listUserAffiliater = list;
    return list.map((user) => `${user.name} - ${user.phone}`);
  });
};

const doneCustomer = async (event) => {
  const phone = event.value.substring(event.value.lastIndexOf("-") + 1).trim();
  userCustomer.value = listUserCustomer.find((item) => item.phone === phone);
  isLoading.loadingGetAffiliater = true;
  stateView.customerNew = false;
  userAffiliater.value = await window.$api.call(`relationship/getInfoAff?customerId=${userCustomer.value._id}`).finally(() => {
    isLoading.loadingGetAffiliater = false;
    calculator();
  });

  if (userAffiliater.value._id) {
    stateBill.phoneAffiliater = `${userAffiliater.value.name} - ${userAffiliater.value.phone}`;
  } else {
    stateView.customerNew = true;
    stateBill.phoneAffiliater = "";
  }
};

const doneAffiliater = (event) => {
  const phone = event.value.substring(event.value.lastIndexOf("-") + 1).trim();
  userAffiliater.value = listUserAffiliater.find((item) => item.phone === phone);
  calculator();
};
</script>

<template>
  <div>
    <div v-if="!stateView.qr">
      <BackPage className="bg-primary" name="Tạo đơn hàng mới" />
      <div class="px-5 pb-[100px] pt-back">
        <div class="border-gray-300 pb-3">
          <div class="flex flex-col pb-2 pt-4">
            <div class="mb-1 font-semibold">Khách hàng</div>
            <div class="border border-gray-300 h-10 w-full rounded-lg flex items-center">
              <AutoComplete
                v-model="stateBill.phoneCustomer"
                placeholder="Nhập số điện thoại khách hàng"
                class="border-0 [&>*]:outline-none [&>*]:bg-transparent [&>*]:flex-1 flex-1 h-full pl-2"
                :suggestions="items"
                emptySearchMessage="không tìm thấy dữ liệu "
                @item-select="doneCustomer"
                @complete="search"
              />

              <div class="w-[30px] flex justify-center items-center" @click="(stateView.qr = true) && (stateView.qrType = 'phoneCustomer')">
                <span class="pi pi-qrcode" />
              </div>
            </div>
          </div>
          <div class="flex flex-col pt-2 border-b pb-4">
            <div class="mb-1 font-semibold">Người giới thiệu</div>
            <div :class="!stateView.customerNew && 'bg-gray-300'" class="border border-gray-300 h-10 w-full rounded-lg flex items-center">
              <AutoComplete
                v-model="stateBill.phoneAffiliater"
                placeholder="Nhập số điện thoại người giới thiệu"
                class="border-0 [&>*]:outline-none [&>*]:bg-transparent [&>*]:flex-1 flex-1 h-full pl-2"
                :suggestions="items"
                :disabled="!stateView.customerNew"
                @item-select="doneAffiliater"
                @complete="searchAff"
              />

              <div
                class="w-[30px] flex justify-center items-center"
                @click="stateView.customerNew ? (stateView.qr = true) && (stateView.qrType = 'phoneAffiliater') : null"
              >
                <span :class="isLoading.loadingGetAffiliater ? 'pi pi-spin pi-spinner' : 'pi pi-qrcode'" />
              </div>
            </div>
          </div>
          <!-- <AddProduct :changeState="changeState" /> -->
          <div class="flex flex-col pt-4 pb-2">
            <div class="mb-1 font-semibold">Tổng hóa đơn</div>
            <div class="border border-gray-300 h-10 w-full rounded-lg flex items-center">
              <div class="w-[30px] flex justify-center items-center">
                <span class="pi pi-dollar" />
              </div>
              <input
                v-model="stateBill.amountBill"
                class="w-[calc(100%-30px)] pr-2 shadow-none outline-none bg-transparent"
                placeholder="Nhập tổng giá trị hóa đơn"
                type="number"
                @change="(e) => (stateBill.amountBill = Number(e.target.value))"
              />
            </div>
          </div>
          <ImgBill
            :removeImage="removeImage"
            :listImage="stateBill.listImage"
            :handleSelectImage="handleSelectImage"
            :isLoadingUpload="isLoading.isLoadingUpload"
          />
          <div class="flex flex-col py-2">
            <div class="font-semibold mt-2 mb-1">Ghi chú</div>
            <textarea
              v-model="stateBill.note"
              rows="1"
              class="border border-gray-300 p-2 outline-none bg-transparent rounded-lg"
              placeholder="Nhập ghi chú đơn hàng (nếu có)"
            />
          </div>
          <div class="pt-2">
            <div class="flex justify-between mb-4 border-t border-b py-3">
              <div>Tổng tiền thưởng</div>
              <div>{{ stateBill.totalDiscount % 1 !== 0 ? stateBill.totalDiscount + "đ" : numberToVnd(stateBill.totalDiscount) }}</div>
            </div>
            <div class="flex justify-between">
              <div>Thưởng cho khách hàng</div>
              <div>
                {{ numberToVnd(stateBill.amountReceive.customer + stateBill.amountReceive.customerCash) }}
              </div>
            </div>
            <div class="flex items-center">
              <div class="h-10 w-full ml-1 rounded-lg flex items-center">
                <input id="ingredient1" v-model="stateBill.rewardByCash" class="mb-[2px]" type="checkbox" />
                <label for="ingredient1" class="ml-2 text-xs"> Giảm trực tiếp vào hóa đơn </label>
              </div>
            </div>
            <div class="flex justify-between mb-4 border-b pb-2">
              <div class="font-semibold">Khách cần thanh toán</div>
              <div v-if="stateBill.amountBill">{{ stateBill.customerNeedPay ? numberToVnd(stateBill.customerNeedPay) : 0 }}</div>
              <div v-else>0</div>
            </div>
            <div class="flex justify-between mb-3">
              <div>Thưởng cho người giới thiệu</div>
              <div>
                {{ numberToVnd(stateBill.amountReceive.affiliater) }}
              </div>
            </div>
            <div class="flex justify-between">
              <div>
                Phí nền tảng <span>{{ config.fee }}</span> %
              </div>
              <div>
                {{ numberToVnd(stateBill.amountReceive.fee) }}
              </div>
            </div>
            <div class="shadow-footer flex justify-center fixed bottom-0 w-full bg-white left-0 py-8 rounded-tl-2xl rounded-tr-2xl">
              <div class="border-r-2 pr-2 mr-2 flex flex-col items-end">
                <div>Ví cửa hàng phải trả</div>
                <div class="font-bold text-primary">{{ numberToVnd(stateBill.amountReceive.shopPay) }}</div>
              </div>
              <Button
                :disable="isLoading.isLoadingCalculator || isLoading.isLoadingSubmit"
                :class="(isLoading.isLoadingCalculator || isLoading.isLoadingSubmit) && 'opacity-50'"
                class="bg-primary text-white font-semibold border-none px-4 py-2 gap-2"
                @click="submit"
                ><span v-if="isLoading.isLoadingSubmit" class="pi pi-spin pi-spinner" />Tạo đơn</Button
              >
            </div>
          </div>
        </div>
      </div>
    </div>
    <ScanQr v-else :changeState="changeState" :qrSuccess="qrSuccess" />
  </div>

  <Dialog
    v-model:visible="stateView.popupProduct"
    modal
    header="Thêm sản phẩm"
    :style="{ width: '50rem' }"
    :breakpoints="{ '1199px': '75vw', '575px': '90vw' }"
  >
    <SelectProduct />
  </Dialog>
</template>

export default {
  moleculerServer: import.meta.env.VITE_API_URL,
  shopId: window.shopId || import.meta.env.VITE_SHOP_ID,
  uploadUrl: import.meta.env.VITE_UPLOAD_URL,
  fee: Number(import.meta.env.VITE_FEE),
  bankAccountNumber: import.meta.env.VITE_BANK_NUMBER,
  bankCode: import.meta.env.VITE_BANK_CODE,
  bankOwner: import.meta.env.VITE_BANK_OWNER,
};
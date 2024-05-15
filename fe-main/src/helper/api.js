import config from "@/config";

class ApiServer {
  async call(cmd, args = {}, method = "") {
    if (!method) method = Object.keys(args).length === 0 ? "GET" : "POST";
    let url = `${config.moleculerServer}/${cmd}`;
    if (Object.keys(args).length && method === "GET") {
      url += `?${new URLSearchParams(args).toString()}`;
    }
    const token = await localStorage.getItem("token");
    const shopId = window.$stores?.shop?._id;
    const headers = {};
    if (token) headers.token = token;
    if (shopId) headers.shop = shopId;
    const options =
      method === "GET"
        ? { headers }
        : {
            method,
            headers: {
              ...headers,
              Accept: "application/json",
              "Content-Type": "application/json"
            },
            body: JSON.stringify(args)
          };
    return fetch(url, options)
      .then((res) => res.json())
      .then((res) => {
        if (res.error) throw res.error;
        return res;
      })
      .catch((e) => {
        if (e.code === 404 || e.code === 500)
          window.$toast.add({
            severity: "error",
            summary: e.message,
            life: 3000
          });
        throw e;
      });
  }

  async currentUser(user) {
    user.shopId = config.shopId;
    return this.call("user/info", user)
      .then((res) => {
        if (res.token) localStorage.setItem("token", res.token);
        return res;
      })
      .catch((e) => {
        localStorage.removeItem("token");
        console.error(e);
      });
  }

  // async uploadFile(formData) {
  //   let url = config.moleculerServer + "/file/upload";
  //   const token = await localStorage.getItem("token");
  //   return fetch(url, {
  //     method: "POST",
  //     headers: {
  //       token
  //     },
  //     body: formData
  //   })
  //     .then((res) => res.json())
  //     .then((res) => {
  //       if (res.error) throw res.error;
  //       return res;
  //     })
  //     .catch((e) => {
  //       window.$toast.add({
  //         severity: "info",
  //         summary: "Có lỗi xảy ra",
  //         detail: e.message,
  //         life: 3000
  //       });
  //       throw e;
  //     });
  // }
}

export default {
  install: (app, options) => {
    window.$api = new ApiServer();
    app.config.globalProperties.$api = window.$api;
  }
};

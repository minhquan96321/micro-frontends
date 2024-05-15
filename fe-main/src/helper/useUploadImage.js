import axios from "axios";
import config from "@/config";

const getTokenM3dia = async () => {
  try {
    let token = localStorage.getItem("tokenM3dia");
    if (!token) {
      const response = await axios.get("https://api.streammix.co/api/media/getTokenM3dia");
      localStorage.setItem("tokenM3dia", response.data);
      token = response.data;
    }
    return token;
  } catch (e) {
    console.error(e, "get token error");
  }
};

const uploadImage = async (file, token) => {
  const Form = new FormData();
  Form.append("media", file);
  Form.append("is_convert", false);

  const configUpload = {
    method: "POST",
    maxContentLength: Infinity,
    maxBodyLength: Infinity,
    timeout: 3600000, // Milliseconds
    url: `https://s3-m3dia.gostream.co/v2/files/upload`,
    headers: {
      Authorization: `Bearer ${token}`
    },
    data: Form
  };
  const response = await axios(configUpload);
  return response;
};

const uploadSingleImage = async (file, size = 5120000) => {
  if (file.size > size) {
    return { error: "MAX_SIZE" };
  }

  // const response = await uploadMoleculer(file);
  // if (response && response.success) {
  //   return response.url;
  // }
  // return "";

  const token = await getTokenM3dia();
  const url = await uploadImage(file, token);
  const linkUrlImage = url.data[0]?.url;

  if (linkUrlImage) {
    return await checkImageOk(linkUrlImage);
  }
  return "";
};

// const uploadMoleculer = async (file) => {
//   const Form = new FormData();
//   Form.append("media", file);
//   Form.append("is_convert", false);

//   const configUpload = {
//     method: "POST",
//     maxContentLength: Infinity,
//     maxBodyLength: Infinity,
//     timeout: 3600000, // Milliseconds
//     url: `${config.moleculerServer}/file/upload`,
//     headers: {
//       token: localStorage.getItem("token")
//     },
//     data: Form
//   };
//   console.log("size:", file.size)
//   console.log({ configUpload });

//   const response = await axios(configUpload).catch((e) => {
//     console.error(e);
//     return e;
//   });
//   return response.data;
// };

const checkImageOk = async (linkUrlImage) => {
  let done = false;
  let response;
  let loop = 0;
  while (!done) {
    response = await fetch(linkUrlImage).catch((e) => e);
    // await new Promise((resolve) => setTimeout(resolve, 10000));
    if (response.url) done = true;
    else {
      await new Promise((resolve) => setTimeout(resolve, 1000));
      loop += 1;
      if (loop > 20) done = true;
    }
  }
  return response?.url || linkUrlImage;
};

const uploadMultiImage = () => {};

export { uploadSingleImage, uploadMultiImage };

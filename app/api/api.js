import axios from "axios";
import Cookies from "js-cookie";

const generateCustomerToken = () => {
  return "device_" + Math.random().toString(12) + Date.now();
};

const getCustomerToken = () => {
  let token = Cookies.get("customer_token");
  if (!token) {
    token = generateCustomerToken();
    Cookies.set("customer_token", token, { expires: 365 });
    Cookies.set("device_token", token, { expires: 365 });
  }
  return token;
};
const makeRequest = async (method, path, payload) => {
  const customer_token = getCustomerToken();
  try {
    const response = await axios({
      method: method,
      url: process.env.API_URL + path.replace(/^\//, ""),
      headers: {
        "customer-token": customer_token,
        device_token: customer_token,
      },
      data: payload,
    });

    return response.data;
  } catch (error) {
    console.error(error);
    return error.response.data;
  }
};

export const get = async (path) => {
  return makeRequest("GET", path);
};

export const put = async (path, payload) => {
  return makeRequest("PUT", path, payload);
};

export const post = async (path, payload) => {
  return makeRequest("POST", path, payload);
};

export const list = async (path, payload, id) => {
  return makeRequest("LIST", path, { ...payload, id });
};

export const deleteMethod = async (path) => {
  return makeRequest("DELETE", path);
};

export const apiHandler = () => {
  let token = Cookies.get("token");
  if (!token) {
    token = generateCustomerToken();
    Cookies.set("token", token, { expires: 365 });
  }
};

import store from "@/store";
import axios from "axios";
import functions from "./videoconference-api";

const defaults = {
  baseURL: store.state.applicationConfiguration.baseUrl
};

function Api(config) {
  const instance = axios.create(Object.assign({}, defaults, config));
  Object.assign(instance, functions);
  return instance;
}

export { Api };
export default new Api();

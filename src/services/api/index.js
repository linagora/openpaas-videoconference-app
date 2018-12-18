import Axios from "axios";
import store from "@/store";
import functions from "./videoconference-api";

const defaults = {
  baseURL: store.state.applicationConfiguration.baseUrl
};

function Api(config) {
  const instance = Axios.create(Object.assign({}, defaults, config));
  Object.assign(instance, functions);
  return instance;
}

export { Api };
export default new Api();

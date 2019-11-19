import Vue from "vue";
import { applicationInit, getApplication } from "@/application-init";

import "@/main.styl";

(async () => {
  const VueInstance = await applicationInit(Vue);

  window.Application = getApplication(VueInstance);
})();

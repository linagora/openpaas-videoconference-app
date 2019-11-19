import store from "@/store";
import router from "@/router";

function configure() {
  store.subscribeAction({
    after: action => {
      if (action.type === "session/logout") {
        router.go();
      }
    }
  });
}

export default { configure };

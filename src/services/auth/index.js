import ApplicationSettings from "../../settings";

const getAuth = (auth = "basic") => import(`./${auth}`);

async function init(Vue) {
  const auth = await getAuth(ApplicationSettings.VUE_APP_AUTH);

  auth.init(Vue);
}

export default { init };

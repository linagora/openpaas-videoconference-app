const getAuth = (auth = "basic") => import(`./${auth}`);

async function init(Vue) {
  const auth = await getAuth(process.env.VUE_APP_AUTH);

  auth.init(Vue);
}

export default { init };

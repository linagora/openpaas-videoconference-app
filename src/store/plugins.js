import createLogger from "vuex/dist/logger";

export default (process.env.NODE_ENV !== "production" && process.env.NODE_ENV !== "test" ? [createLogger()] : []);

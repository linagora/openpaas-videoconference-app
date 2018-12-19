import _isString from "lodash/isString";

/**
 * This function searches throught the user's configuration for a specific value and returns it if found
 * or returns undefined otherwise.
 *
 * Example:
 *
 *     > const configurations = [
 *     .   {name: "linagora.esn.james", configurations: {}},
 *     .   {
 *     .     name: "linagora.esn.videoconference",
 *     .     configurations: [
 *     .       {name: "baseUrl", "http://janus.hubl.in"}
 *     .     ]
 *     .   }
 *     . ]
 *     > configurationRecursiveSearch(configurations, "linagora.esn.videoconference:baseUrl")
 *     "http://janus.hubl.in"
 *
 * @param configurations The configuration tree to search.
 *    An object of the form Array<ConfigurationTree | Configuration> with
 *        ConfigurationTree: Object{name: String, configurations: ConfigurationTree} and
 *        Configuration: Object{name: String, value: String}
 * @param keys A string containing the keys separated by `:`
 * @returns {String|undefined}
 */
function configurationRecursiveSearch(configurations = [], keys = "") {
  keys = keys.split(":");
  if (keys.length === 0) {
    return undefined;
  }

  const targetConfig = configurations.filter(item => item.name === keys[0]);

  if (targetConfig.length === 0) {
    return undefined;
  }

  const newKeys = keys.slice(1);

  if (newKeys.length === 0) {
    return targetConfig[0].value ? targetConfig[0].value : targetConfig[0].configurations;
  }

  // Tail-call optimization FTW \o/
  return configurationRecursiveSearch(targetConfig[0].configurations, newKeys.join(":"));
}

function stripProtocol(urlString) {
  if (!_isString(urlString)) {
    return "";
  }

  return /:\/\//.test(urlString) ? urlString.replace(`${new URL(urlString).protocol}//`, "") : urlString;
}

export { configurationRecursiveSearch, stripProtocol };

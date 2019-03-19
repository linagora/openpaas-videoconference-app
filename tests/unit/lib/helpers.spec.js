import { configurationRecursiveSearch } from "@/lib/helpers";

describe("configurationRecursiveSearch", () => {
  const configurations = [
    {
      name: "linagora.esn.james",
      configurations: [{ name: "webadminApiFrontend", value: "http://localhost:8000" }]
    },
    {
      name: "core",
      configurations: [
        {
          name: "davserver",
          value: { backend: { url: "http://localhost:8001" } }
        },
        {
          name: "features",
          value: {
            "header:user-notification": true,
            "control-center:invitation": false,
            "control-center:members": false,
            "control-center:password": true,
            "application-menu:invitation": false,
            "application-menu:members": false,
            "application-menu:jobqueue": false
          }
        },
        { name: "homePage", value: "unifiedinbox" },
        {
          name: "businessHours",
          value: [{ end: "18:00", start: "09:00", daysOfWeek: [1, 2, 3, 4, 5] }]
        },
        { name: "datetime", value: { timeZone: "GMT", use24hourFormat: false } },
        {
          name: "language",
          value: "en"
        }
      ]
    },
    {
      name: "linagora.esn.videoconference",
      configurations: [
        {
          name: "jitsiInstanceUrl",
          value: "http://janus.hubl.in"
        },
        { name: "openPaasVideoconferenceAppUrl", value: "http://localhost:8080/#/videoconference" }
      ]
    },
    {
      name: "linagora.esn.unifiedinbox",
      configurations: [
        { name: "api", value: "http://localhost:1080/jmap" },
        {
          name: "uploadUrl",
          value: "http://localhost:1080/upload"
        },
        {
          name: "downloadUrl",
          value: "http://localhost:1080/download/{blobId}/{name}"
        },
        { name: "isJmapSendingEnabled", value: true },
        {
          name: "isSaveDraftBeforeSendingEnabled",
          value: false
        },
        { name: "composer.attachments", value: true },
        {
          name: "maxSizeUpload",
          value: 20971520
        },
        {
          name: "numberItemsPerPageOnBulkReadOperations",
          value: 30
        },
        {
          name: "numberItemsPerPageOnBulkDeleteOperations",
          value: 30
        },
        { name: "numberItemsPerPageOnBulkUpdateOperations", value: 30 },
        {
          name: "drafts",
          value: true
        },
        { name: "view", value: "messages" },
        {
          name: "swipeRightAction",
          value: "markAsRead"
        },
        { name: "forwarding", value: true },
        {
          name: "isLocalCopyEnabled",
          value: true
        },
        { name: "useEmailLinks", value: true }
      ]
    }
  ];

  test("should return `undefined` on empty keys string", () => {
    expect(configurationRecursiveSearch(configurations, "")).toBeUndefined();
  });

  test("should return `undefined` on non-existent key", () => {
    expect(configurationRecursiveSearch(configurations, "linagora.esn.calendar")).toBeUndefined();
  });

  test("should return `undefined` with default values", () => {
    expect(configurationRecursiveSearch()).toBeUndefined();
  });

  test("should return the configuration when found", () => {
    expect(configurationRecursiveSearch(configurations, "linagora.esn.videoconference:jitsiInstanceUrl")).toBe(
      "http://janus.hubl.in"
    );
  });
});

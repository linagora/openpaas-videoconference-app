async function getJitsiMeetExternalAPI() {
  const JitsiMeetExternalAPI = await import("../../public/jitsi-meet-external-api");
  if (JitsiMeetExternalAPI.prototype && JitsiMeetExternalAPI.prototype.constructor) {
    return JitsiMeetExternalAPI;
  } else if (window.JitsiMeetExternalAPI) {
    return window.JitsiMeetExternalAPI;
  }

  throw new Error("JitsiMeetExternalAPI was not imported correctly");
}

export default getJitsiMeetExternalAPI;

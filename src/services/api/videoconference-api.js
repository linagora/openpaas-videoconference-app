export default {
  getConferenceByPublicId(publicId) {
    return this.get(`/videoconference/api/conference/${publicId}`);
  },
  createConference(conferenceName, type = "public") {
    return this.put("/videoconference/api/conference/", { conferenceName, type });
  }
};

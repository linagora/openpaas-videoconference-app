import { shallowMount } from "@vue/test-utils";
import { createLocalVue } from "%utils";
import i18n from "@/i18n";
import store from "@/store";
import VideoConference from "@/components/VideoConference";

describe("The VideoConference component", () => {
  beforeEach(() => {
    jest.useFakeTimers();
  });

  test("startCountdown", async function() {
    const localVue = await createLocalVue();
    const target = shallowMount(VideoConference, {
      localVue,
      store,
      i18n: i18n(localVue),
      propsData: {
        roomName: "OpenPaas",
        jitsiInstanceUrl: "http://localhost/"
      },
      methods: { openConference: () => Promise.resolve() }
    });

    await localVue.nextTick();

    expect(target.vm.conferenceState).toEqual("LOADING");

    const [firstPromise, secondPromise] = target.vm.startCountdown();

    jest.runOnlyPendingTimers();

    await firstPromise.then(() => localVue.nextTick());
    expect(target.vm.conferenceState).toEqual("TAKING_TIME");

    jest.runOnlyPendingTimers();

    await secondPromise.then(() => localVue.nextTick());
    expect(target.vm.conferenceState).toEqual("TIMED_OUT");
  });
});

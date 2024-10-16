import { test as myTest } from "@playwright/test"

type myFixture = {
  userName: string
  textProject: string,
  obsProject: string,
  audioProject: string,
  syncName: string,
  doorUser: string,
  doorPassword: string,
  flavorText: string,
  flavorObs: string
  textUnderscore: string,
  obsUnderscore: string,
  customTextProject: string,
  customObsProject: string,
  customAudioProject: string,
  projectTextType: string,
  projectObsType: string,
  projectAudioType: string,
  description: string,
  textAbbreviation: string,
  obsAbbreviation: string,
  AudioAbbreviation: string,
  starProject: string,
  unstarProject: string,
  currentLicense: string,
  newLicense: string,
  customTextLanguage: string,
  customObsLanguage: string,
  customAudioLanguage: string,
  english: string,
  hindi: string,
  russian: string,
  farsi: string,
  arabic: string
}
const myFixtureTest = myTest.extend<myFixture>({
  userName: "Playwright user",
  textProject: "Playwright text translation project",
  obsProject: "Playwright obs translation project",
  audioProject: "Playwright audio translation project",
  projectTextType: "Bible Translation",
  projectObsType: "OBS",
  projectAudioType: "Audio",
  description: "test description",
  textAbbreviation: "pttp",
  obsAbbreviation: "potp",
  AudioAbbreviation: "patp",
  starProject: "star-project",
  unstarProject: "unstar-project",
  currentLicense: "CC BY-SA",
  newLicense: "CC BY",
  customTextProject: "Custom text transaltion project",
  customObsProject: "Custom obs project",
  customAudioProject: "Custom audio project",
  customTextLanguage: "custom text translation language",
  customObsLanguage: "custom obs project language",
  customAudioLanguage: "custom audio project language",
  english: "English",
  hindi: "Hindi",
  russian: "Russian",
  farsi: "Farsi",
  arabic: "Arabic",
  textUnderscore: "Translation_test_project",
  obsUnderscore: "Obs_test_project",
  syncName: "Sync_Collab_Test",
  doorUser: "bobby",
  doorPassword: "Bobby@123",
  flavorText: "textTranslation",
  flavorObs: "textStories",
})

export const test = myFixtureTest;
export { expect } from '@playwright/test';
import { createContext, useContext } from 'react'

import { NotifierStore } from 'features/notifier/store/notifier.store'
import { OnboardingStore } from 'features/onboarding/store/onboarding.store'
import { ProjectsStore } from 'features/projects/store/projects.store'

const store = {
  notifierStore: new NotifierStore(),
  onboardingStore: new OnboardingStore(),
  projectsStore: new ProjectsStore(),
}

export const useStore = () => {
  return useContext(createContext(store))
}

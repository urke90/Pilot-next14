// keep track of User onboarding stage (changed from 1,2,3,4 to Enum do to better understanding and clarity)
export enum EOnboardingStep {
  BASIC_INFORMATION = 1,
  LEARNING_GOALS = 2,
  KNOWLEDGE_LEVEL = 3,
  SCHEDULE_AND_AVAILABILITY = 4,
  FINISHED_ONBOARDING = 5,
}

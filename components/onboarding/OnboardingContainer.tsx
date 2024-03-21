'use client';

import BasicInformation from '@/components/onboarding/BasicInformations';
import KnowledgeLevel from '@/components/onboarding/KnowledgeLevel';
import LearningGoals from '@/components/onboarding/LearningGoals';
import ScheduleAndAvailability from '@/components/onboarding/ScheduleAndAvailability';
import Stepper from '@/components/shared/Stepper';
import { Form } from '@/components/ui/form';
import {
  updateUser,
  updateUserOnboardingStep,
} from '@/lib/actions/user-actions';
import {
  onboardingSchema,
  type IUserOnboarding,
} from '@/lib/zod/onboarding-schema';
import { EOnboardingStep } from '@/types/onboarding-step';
import { zodResolver } from '@hookform/resolvers/zod';
import type { User } from 'next-auth';
import Image from 'next/image';
import { useState } from 'react';
import { SubmitHandler, useForm } from 'react-hook-form';

// ----------------------------------------------------------------

/**
 * Kako da handlujem situaciju sa onboardingom ??? sta ako nema session? ako nema email? kada update step u mongoDB-u???
 * napraviti onboarding wrapper page gde se fetchuje session i prosledjuje ovom trenutnom Onboarding page-u
 * izbaciti toast na submit ako je bad request
 * ubaciti ENUM
 */

const {
  BASIC_INFORMATION,
  KNOWLEDGE_LEVEL,
  LEARNING_GOALS,
  SCHEDULE_AND_AVAILABILITY,
  FINISHED_ONBOARDING,
} = EOnboardingStep;

const generateTitleBasedOnStep = (step: EOnboardingStep) => {
  switch (step) {
    case BASIC_INFORMATION:
      return 'Basic Information';
    case LEARNING_GOALS:
      return 'Add your learning goals';
    case KNOWLEDGE_LEVEL:
      return 'Add your knowledge level';
    case SCHEDULE_AND_AVAILABILITY:
      return 'Schedule & availability';
    default:
      return 'Basic Information';
  }
};

interface IOnboardingContainer {
  user: User;
}

const OnboardingContainer: React.FC<IOnboardingContainer> = ({ user }) => {
  const [step, setStep] = useState<EOnboardingStep>(BASIC_INFORMATION);
  const handleChangeStep = async (newStep: EOnboardingStep) => {
    if (!user.id) return;

    await updateUserOnboardingStep(user?.id, newStep);
    setStep(newStep);
  };

  const onboardingForm = useForm<IUserOnboarding>({
    resolver: zodResolver(onboardingSchema),
    defaultValues: {
      fullName: user.name || '',
      portfolioUrl: '',
      avatarImg: user.image || '',
      learningGoals: [],
      knowledgeLevel: [],
      techStack: '',
      startDate: undefined,
      endDate: undefined,
      onboardingStep: step,
    },
  });

  const onSubmit: SubmitHandler<IUserOnboarding> = async (data) => {
    data.onboardingStep = FINISHED_ONBOARDING;

    console.log('data U SUBMIT', data);

    try {
      if (!user.id) return;
      const response = await updateUser(user.id, data);
      console.log('response', response);
    } catch (error) {
      console.log('Error in submit onboarding user info', error);
    }
  };

  return (
    <section className="h-screen px-5">
      <div className="m-auto max-w-[600px]">
        <Image
          src="/assets/images/Logo.svg"
          alt="Logo"
          width={156}
          height={36}
          className="m-auto my-16"
        />
        <div className="m-auto rounded-xl bg-black-800 px-5 py-8 sm:px-8">
          <div className="mb-6">
            <Stepper currentStep={step} />
          </div>
          <h2 className="h2-bold mb-6">{generateTitleBasedOnStep(step)}</h2>
          <article>
            <Form {...onboardingForm}>
              <form onSubmit={onboardingForm.handleSubmit(onSubmit)}>
                {step === BASIC_INFORMATION && (
                  <BasicInformation handleChangeStep={handleChangeStep} />
                )}
                {step === LEARNING_GOALS && (
                  <LearningGoals handleChangeStep={handleChangeStep} />
                )}
                {step === KNOWLEDGE_LEVEL && (
                  <KnowledgeLevel handleChangeStep={handleChangeStep} />
                )}
                {step === SCHEDULE_AND_AVAILABILITY && (
                  <ScheduleAndAvailability />
                )}
              </form>
            </Form>
          </article>
        </div>
      </div>
    </section>
  );
};

export default OnboardingContainer;

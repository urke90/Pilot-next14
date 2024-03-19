'use client';

import { useState, useEffect } from 'react';
import { useForm, SubmitHandler } from 'react-hook-form';
import Image from 'next/image';
import { Form } from '@/components/ui/form';

import Stepper from '@/components/shared/Stepper';
import BasicInformation from '@/components/onboarding/BasicInformations';
import LearningGoals from '@/components/onboarding/LearningGoals';
import KnowledgeLevel from '@/components/onboarding/KnowledgeLevel';
import ScheduleAndAvailability from '@/components/onboarding/ScheduleAndAvailability';
import type { IUser } from '@/models/User';

import z from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import { Button } from '@/components/ui/button';

// ----------------------------------------------------------------

// ubaciti step da se user redirektuje osim ako nije zavrsio ceo onboarding;

const learningGoalsSchema = z.object({
  isChecked: z.boolean(),
  goal: z.string().trim().min(1, 'Please enter your goal!'),
});

const onboardingSchema = z.object({
  fullName: z.string().min(3, 'Full Name must be at least 3 characters long!'),
  portfolioUrl: z.string().url().trim().optional(),
  avatarImg: z.string().optional(),
  learningGoals: z
    .array(learningGoalsSchema)
    .nonempty('Plase add at lease one goal!'),
  knowledgeLevel: z
    .string()
    .array()
    .nonempty('Please add your expertize level!'),
  techStack: z.string().optional(),
  startDate: z
    .date({ required_error: 'Plase enter start date!' })
    .min(new Date()),
  endDate: z.date({ required_error: 'Plase enter end date!' }).min(new Date()),
});

type IUserOnboarding = z.infer<typeof onboardingSchema>;

const generateTitleBasedOnStep = (step: number) => {
  switch (step) {
    case 1:
      return 'Basic Information';
    case 2:
      return 'Add your learning goals';
    case 3:
      return 'Add your knowledge level';
    case 4:
      return 'Schedule & availability';
    default:
      return 'Basic Information';
  }
};

const Onboarding = () => {
  const onboardingForm = useForm<IUserOnboarding>({
    resolver: zodResolver(onboardingSchema),
    defaultValues: {
      fullName: '',
      portfolioUrl: '',
      avatarImg: '',
      learningGoals: [],
      knowledgeLevel: [],
      techStack: '',
      startDate: new Date(),
      endDate: new Date(),
    },
  });
  const [step, setStep] = useState(1);

  const handleChangeStep = (newStep: number) => {
    setStep(newStep);
  };

  const onSubmit: SubmitHandler<IUserOnboarding> = (data) => {
    console.log('dataaaaa', data);
  };
  console.log('watch', onboardingForm.watch());
  console.log(
    'startDate typeof ',
    onboardingForm.watch().startDate instanceof Date
  );

  useEffect(() => {}, [onboardingForm]);

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
                {step === 1 && (
                  <BasicInformation handleChangeStep={handleChangeStep} />
                )}
                {step === 2 && (
                  <LearningGoals handleChangeStep={handleChangeStep} />
                )}
                {step === 3 && (
                  <KnowledgeLevel handleChangeStep={handleChangeStep} />
                )}
                {step === 4 && <ScheduleAndAvailability />}
              </form>
            </Form>
          </article>
        </div>
      </div>
    </section>
  );
};

export default Onboarding;

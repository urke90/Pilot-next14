'use client';

import { useState } from 'react';
import { useForm, SubmitHandler } from 'react-hook-form';
import z from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import Image from 'next/image';
import { Form } from '@/components/ui/form';
import { useSession } from 'next-auth/react';
import Stepper from '@/components/shared/Stepper';
import BasicInformation from '@/components/onboarding/BasicInformations';
import LearningGoals from '@/components/onboarding/LearningGoals';
import KnowledgeLevel from '@/components/onboarding/KnowledgeLevel';
import ScheduleAndAvailability from '@/components/onboarding/ScheduleAndAvailability';

// ----------------------------------------------------------------

// ubaciti step da se user redirektuje osim ako nije zavrsio ceo onboarding;
/**
 * 1. kako uraditi flow za prelazak na sledeci step sto se tice validacije? Da li dodati za stepper on Click da moze user da se vraca korak napred/nazad ili disable button next????
 * 2. stilizovanj Date-pickera
 * 3. prikazivanje errora? S obziorm da je stepper da li izabaciti neki toast?
 */
/**
 * 1. start adding your knowledge message da bude ako je [].length === 0
 * ******* proveravam svaku Step komponentu za sebe ako tu ima errora user ne moze da ide NEXT dok ne popravi sve errore
 *
 *
 * REQUIRED
 * - fullName
 *
 */

const learningGoalsSchema = z.object({
  isChecked: z.boolean(),
  goal: z.string().trim().min(1, 'Please enter your goal!'),
});

const onboardingSchema = z.object({
  fullName: z.string().min(3, 'Please enter your Name!'),
  portfolioUrl: z.union([z.string().url().nullish(), z.literal('')]),
  avatarImg: z.string().trim().optional(),
  learningGoals: z
    .array(learningGoalsSchema)
    .nonempty('Please add at lease one goal!'),
  knowledgeLevel: z
    .array(z.string().min(3, 'Experise must contain at least 3 characters!'))
    .nonempty('Please add your expertise level!'),
  techStack: z.string().trim(),
  startDate: z
    .date({ required_error: 'Plase enter start date!' })
    .min(new Date())
    .optional(),
  endDate: z
    .date({ required_error: 'Please enter end date!' })
    .min(new Date())
    .optional(),
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
  const { data: session } = useSession();
  const onboardingForm = useForm<IUserOnboarding>({
    resolver: zodResolver(onboardingSchema),
    defaultValues: {
      fullName: session?.user?.name || '',
      portfolioUrl: '',
      avatarImg: session?.user?.image || '',
      learningGoals: [],
      knowledgeLevel: [],
      techStack: '',
      startDate: undefined,
      endDate: undefined,
    },
  });
  const [step, setStep] = useState(1);

  const handleChangeStep = (newStep: number) => {
    setStep(newStep);
  };

  const onSubmit: SubmitHandler<IUserOnboarding> = (data) => {
    console.log('dataaaaa COMPLETED', data);
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

'use client';

import { useState, useEffect } from 'react';
import { useForm, useFieldArray, SubmitHandler } from 'react-hook-form';
import Image from 'next/image';
import { Form } from '@/components/ui/form';

import Stepper from '@/components/shared/Stepper';
import BasicInformationStep from '@/components/onboarding/BasicInformationStep';
import LearningGoalsStep from '@/components/onboarding/LearningGoalsStep';
import KnowledgeLevelStep from '@/components/onboarding/KnowledgeLevelStep';
import type { IUser } from '@/models/User';

import z from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import { Button } from '@/components/ui/button';

// ----------------------------------------------------------------

// ubaciti step da se user redirektuje osim ako nije zavrsio ceo onboarding;
/**
 * 1. Pitati za Typography ako je  u FIGMMI Display/Display 2 Bold  da li to odmah znaci i da je h2 u pitanju ----> da
 * 2. Da li prosledim func handleChangeStep ili samo setter state func? Da li i kako se onda nazivaju props koje prosledjujem (onStepChange, handleStepChange....) ????
 * 3. Da li interface za componentu nazivmo samo IProps ili IImeComponentProps (npr) ?
 * 4. Za SEO I pravilini HTML ----> Ako vec imam <seciont> tag kao ovde wrapper, da li onda mora prvo <article> da mu bude childe, pa onda opet mogu nov <section> da radim
 * 5. objasnjavnje rada sa upload-om, konkretno sta je blob, buffer etc.
 * 6. Da li da downloadujem ikonice ili da koristim react-lucide ? Kao sto je za onboarding add goal
 * 7. Prodiskutovati o RHF inputima i dodavnje goals i knowledgde. Da li koristiti RHF inpute, da li u childu gde mi je lista goals napraviti novi useForm gde vec imam useFieldArray, i u tom useFormu da cuvam state za dodavanje novog goala ili da koristim regular shadcn Input i Checkbox?
 */

// 1. kada mi treba flexibilnost onda renderujem SVG preko JSX-a kao sto je react-lucide a ako mi treba optimizacija onda Image iz Next-a
// 2. gledam da bude lakse da se passuje prop iz parent u child
// 3. semantic HTML istraziti jos
// 4. images/files (bilo) koj externi servise Cloundinary a u bazi samo referencu
// 5. da radim trenutno sa cloudinary

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
    },
  });
  const [step, setStep] = useState(1);

  const handleChangeStep = (newStep: number) => {
    setStep(newStep);
  };

  const onSubmit: SubmitHandler<IUserOnboarding> = (data) => {
    console.log('dataaaaa', data);
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
                {/* <BasicInformationStep handleChangeStep={handleChangeStep} />
              <LearningGoalsStep handleChangeStep={handleChangeStep} /> */}
                <KnowledgeLevelStep handleChangeStep={handleChangeStep} />
              </form>
            </Form>
          </article>
        </div>
      </div>
    </section>
  );
};

export default Onboarding;

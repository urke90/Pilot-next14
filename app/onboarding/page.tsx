'use client';

import { useState } from 'react';
import { useForm } from 'react-hook-form';
import Image from 'next/image';
import { Form } from '@/components/ui/form';

import Stepper from '@/components/shared/Stepper';
import BasicInformationStep from '@/components/onboarding/BasicInformationStep';
import type { IUser } from '@/models/User';

import z from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';

// ----------------------------------------------------------------

// ubaciti step da se user redirektuje osim ako nije zavrsio ceo onboarding;
/**
 * 1. Pitati za Typography ako je  u FIGMMI Display/Display 2 Bold  da li to odmah znaci i da je h2 u pitanju
 * 2. Da li prosledim func handleChangeStep ili samo setter state func? Da li i kako se onda nazivaju props koje prosledjujem (onStepChange, handleStepChange....) ????
 * 3. Da li interface za componentu nazivmo samo IProps ili IImeComponentProps (npr) ?
 * 4. Za SEO I pravilini HTML ----> Ako vec imam <seciont> tag kao ovde wrapper, da li onda mora prvo <article> da mu bude childe, pa onda opet mogu nov <section> da radim
 * 5. objasnjavnje rada sa upload-om, konkretno sta je blob, buffer etc.
 */

const onboardingSchema = z.object({
  fullName: z.string().min(3, 'Full Name must be at least 3 characters long!'),
  portfolioUrl: z.string().url().trim().optional(),
  avatarImg: z.string().optional(),
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
    },
  });
  const [step, setStep] = useState(1);

  const handleChangeStep = () => {
    setStep((prevStep) => prevStep + 1);
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
              <BasicInformationStep handleChangeStep={handleChangeStep} />
            </Form>
          </article>
        </div>
      </div>
    </section>
  );
};

export default Onboarding;

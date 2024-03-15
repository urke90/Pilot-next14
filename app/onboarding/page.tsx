'use client';

import Image from 'next/image';

import Stepper from '@/components/shared/Stepper';
import { useState } from 'react';

// ----------------------------------------------------------------

// ubaciti step da se user redirektuje osim ako nije zavrsio ceo onboarding;

const Onboarding = () => {
  const [step, setStep] = useState(4);

  return (
    <section className="h-screen  px-5">
      <div className=" max-w-[600px]">
        <Image
          src="/assets/images/Logo.svg"
          alt="Logo"
          width={156}
          height={36}
          // layout="responsive"
          className="m-auto my-16"
        />
        <div className="rounded-xl bg-black-800 px-5 py-8 sm:px-8">
          <div className="mb-6">
            <Stepper currentStep={step} />
          </div>
          <div>CONTENT</div>
        </div>
      </div>
    </section>
  );
};

export default Onboarding;

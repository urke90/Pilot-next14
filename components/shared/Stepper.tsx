import { cn } from '@/lib/utils';
import Image from 'next/image';
import { EOnboardingStep } from '@/types/onboarding-step';

// ----------------------------------------------------------------

interface IStepperStyleDetails {
  className: string;
  icon: string;
}

interface IStepperStyles {
  default: IStepperStyleDetails;
  current: IStepperStyleDetails;
  completed: IStepperStyleDetails;
}

const stepperStyles: IStepperStyles = {
  default: {
    className: 'bg-black-600',
    icon: 'dot',
  },
  current: {
    className: 'bg-primary-500 ring-8 ring-black-600',
    icon: 'dot',
  },
  completed: {
    className: 'bg-primary-500',
    icon: 'check',
  },
};

interface IStepperProps {
  currentStep: number;
}

/**
 * step 1 width 0
 * step 2 width 33%
 * step 3 width 66%
 * step 4 width 100%
 *
 */
/**
 * 1.  (1 - 1) / x * 100 = 0%
 * 2.  (2 - 1) / x  * 100 = 33%
 * 3.  (3 - 1) / x * 100 = 66%
 */

const Stepper: React.FC<IStepperProps> = ({ currentStep }) => {
  const completedLineWidth = Math.round(((currentStep - 1) / 3) * 100);

  return (
    <div className="relative z-30 flex  justify-between">
      <div className="absolute inset-x-0 top-1/2 h-1 -translate-y-1/2 bg-black-600">
        <div
          className="h-1 bg-primary-500"
          style={{ width: `${completedLineWidth}%` }}
        />
      </div>
      {[1, 2, 3, 4].map((step) => {
        switch (true) {
          case step === currentStep:
            return <Step key={step} currentStyle={stepperStyles.current} />;
          case step < currentStep:
            return <Step key={step} currentStyle={stepperStyles.completed} />;
          case step > currentStep:
            return <Step key={step} currentStyle={stepperStyles.default} />;
          default:
            return <Step key={step} currentStyle={stepperStyles.default} />;
        }
      })}
    </div>
  );
};

const Step = ({ currentStyle }: { currentStyle: IStepperStyleDetails }) => {
  return (
    <div
      className={cn(
        'flex-center z-10 min-w-8 rounded-[6px]',
        currentStyle.className
      )}
    >
      <Image
        src={`/assets/images/${currentStyle.icon}.svg`}
        alt="Finished Step"
        width={32}
        height={32}
      />
    </div>
  );
};

export default Stepper;

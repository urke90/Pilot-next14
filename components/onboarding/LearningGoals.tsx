'use client';

import { Plus, X } from 'lucide-react';
import { useFieldArray, useFormContext } from 'react-hook-form';
import { Button } from '../ui/button';
import RHFCheckbox from '../RHFInputs/RHFCheckbox';
import RHFInput from '../RHFInputs/RHFInput';
import { EOnboardingStep } from '@/types/onboarding-step';
import { IUserOnboarding } from '@/lib/zod/onboarding-schema';

// ----------------------------------------------------------------

interface ILearningGoalsProps {
  handleChangeStep: (
    data: Partial<IUserOnboarding>,
    newStep: EOnboardingStep
  ) => void;
}

const LearningGoals: React.FC<ILearningGoalsProps> = ({ handleChangeStep }) => {
  const { KNOWLEDGE_LEVEL } = EOnboardingStep;
  const {
    trigger,
    formState: { errors },
    getValues,
  } = useFormContext();
  const { fields, append, remove } = useFieldArray({ name: 'learningGoals' });
  const validateAndChangeStep = async () => {
    const validInputs = await trigger('learningGoals');

    if (!validInputs) return;

    const learningGoals = getValues('learningGoals');

    await handleChangeStep(
      { learningGoals, onboardingStep: KNOWLEDGE_LEVEL },
      KNOWLEDGE_LEVEL
    );
  };

  return (
    <div>
      <p className="p3-medium">Learning goals</p>
      <div className="mb-6">
        <ul>
          {fields.length > 0 ? (
            fields?.map((field, index) => (
              <li
                key={field.id}
                className="flex-between my-2 rounded  bg-black-700 px-3 py-1"
              >
                <div className="flex flex-1 items-center">
                  <RHFCheckbox
                    name={`learningGoals.${index}.isChecked`}
                    className="mr-0 pr-0"
                  />
                  <RHFInput
                    name={`learningGoals.${index}.goal`}
                    placeholder="Enter a learning goal"
                    className="pl-0"
                  />
                </div>
                <X
                  className="cursor-pointer text-white-500"
                  onClick={() => remove(index)}
                />
              </li>
            ))
          ) : (
            <li
              className={`my-2 rounded  px-3 py-2 text-center ${errors.learningGoals ? 'text-red-500' : ''}`}
            >
              {errors.learningGoals
                ? errors.learningGoals?.message?.toString()
                : 'Add your learning goals...'}
            </li>
          )}
        </ul>
        <Button
          type="button"
          onClick={() => append({ isChecked: false, goal: '' })}
          variant="secondary"
          className={`${fields.length === 0 ? 'mt-2' : ''}`}
        >
          <Plus className="size-[16px] rounded bg-primary-500 text-black-600" />
          Add goal checkbox
        </Button>
      </div>
      <Button type="button" onClick={validateAndChangeStep}>
        Next
      </Button>
    </div>
  );
};

export default LearningGoals;

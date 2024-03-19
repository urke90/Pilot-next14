'use client';

import { Plus, X } from 'lucide-react';
import { useFieldArray } from 'react-hook-form';
// import GoalsAndKnowledgeRow, {
//   GoalsAndKnowledgeInputRow,
// } from '../shared/learning-goals/GoalsAndKnowledgeRow';
import { Button } from '../ui/button';
import RHFCheckbox from '../RHFInputs/RHFCheckbox';
import RHFInput from '../RHFInputs/RHFInput';

// ----------------------------------------------------------------

interface ILearningGoalsProps {
  handleChangeStep: (newStep: number) => void;
}

const LearningGoals: React.FC<ILearningGoalsProps> = ({ handleChangeStep }) => {
  const { fields, append, remove } = useFieldArray({ name: 'learningGoals' });

  return (
    <div>
      <p className="p3-medium">Learning goals</p>
      <div className="mb-6">
        <ul>
          {fields?.map((field, index) => (
            <li
              key={field.id}
              className="flex-between my-2 rounded bg-black-700 px-3 py-1"
            >
              <div className="flex items-center">
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
          ))}
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
      <Button
        disabled={fields.length === 0}
        type="button"
        onClick={() => handleChangeStep(3)}
      >
        Next
      </Button>
    </div>
  );
};

export default LearningGoals;

'use client';

import { useEffect, useState } from 'react';
import { X } from 'lucide-react';
import RHFCheckbox from '@/components/RHFInputs/RHFCheckbox';
import { Input } from '@/components/ui/input';
import RHFInput from '@/components/RHFInputs/RHFInput';
import { Checkbox } from '@/components/ui/checkbox';
import { CheckedState } from '@radix-ui/react-checkbox';
// import RHFInput from '@/components/RHFInputs/RHFInput';

// ----------------------------------------------------------------

interface ILearningGoalProps {
  name: string;
  label: string;
  handleDelete?: () => void;
}

const GoalsAndKnowledgeRow: React.FC<ILearningGoalProps> = ({
  name,
  label,
  handleDelete,
}) => {
  return (
    <li className="flex-between my-2 rounded bg-black-700 p-3">
      <RHFCheckbox name={name} label={label} />
      <X
        className="cursor-pointer text-white-500"
        onClick={() => handleDelete?.()}
      />
    </li>
  );
};

interface IGoalsAndKnowledgeRowInput {
  onCheckedChange?: (isChecked: boolean) => void;
  onGoalChange?: (goal: string) => void;
  checked?: boolean;
}

export const GoalsAndKnowledgeInputRow: React.FC<
  IGoalsAndKnowledgeRowInput
> = ({ checked, onCheckedChange, onGoalChange }) => {
  return (
    <li className="flex-between my-2 rounded bg-black-700 px-3 py-1">
      {/* <Checkbox
        checked={checked}
        // onChange={handleChange}
        onCheckedChange={handleChange}
        className="border-2"
      /> */}
      <div className="flex items-center">
        <RHFCheckbox
          name="checkedGoal"
          className="mr-0 pr-0"
          checked={checked}
        />
        <RHFInput
          label=""
          name="goal"
          placeholder="Enter a learning goal"
          className="pl-0"
        />
      </div>
      <X className="cursor-pointer text-white-500" />
    </li>
  );
};

export default GoalsAndKnowledgeRow;

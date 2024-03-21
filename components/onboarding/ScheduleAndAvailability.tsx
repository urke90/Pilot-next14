'use client';

import RHFCheckbox from '../RHFInputs/RHFCheckbox';
import RHFDatePicker from '../RHFInputs/RHFDatePicker';
import { Button } from '../ui/button';

// ----------------------------------------------------------------

const ScheduleAndAvailability: React.FC = () => {
  return (
    <section>
      <RHFCheckbox
        name="projectAvailability"
        label="Are you available for a new project?"
      />
      <div className="mb-6 mt-8 flex flex-wrap gap-6">
        <div className="flex-1">
          <RHFDatePicker
            name="startDate"
            label="Start Date & Time"
            description="The time is in your local timezone"
          />
        </div>
        <div className="flex-1">
          <RHFDatePicker
            name="endDate"
            label="End Date & Time"
            description="The time is in your local timezone"
          />
        </div>
      </div>
      <Button type="submit">Submit</Button>
    </section>
  );
};

export default ScheduleAndAvailability;

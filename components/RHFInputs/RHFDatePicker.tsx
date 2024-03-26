'use client';

import { useFormContext } from 'react-hook-form';
import { CalendarIcon } from 'lucide-react';
import { format } from 'date-fns';
import {
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';
import { Calendar } from '@/components/ui/calendar';
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from '@/components/ui/popover';
import { cn } from '@/lib/utils';
import { Button } from '@/components/ui/button';

// ----------------------------------------------------------------

interface IRHFDatePickerProps {
  name: string;
  label: string;
  buttonVariant?: 'primary' | 'secondary';
  buttonText?: string;
  description?: string;
}

const RHFDatePicker: React.FC<IRHFDatePickerProps> = ({
  name,
  label = '',
  buttonVariant = 'secondary',
  buttonText = 'Select date & time',
  description = '',
}) => {
  const { control } = useFormContext();
  return (
    <FormField
      control={control}
      name={name}
      render={({ field }) => (
        <FormItem className="flex w-full flex-col items-start">
          {label && <FormLabel className="p3-medium">{label}</FormLabel>}
          <Popover>
            <PopoverTrigger asChild>
              <FormControl>
                <Button
                  variant={buttonVariant}
                  className={cn(
                    'bg-black-700 justify-start',
                    !field.value && 'text-muted-foreground'
                  )}
                >
                  <CalendarIcon className="size-4 opacity-50" />
                  {field.value ? (
                    format(field.value, 'PPP')
                  ) : (
                    <p className="p3-regular">{buttonText}</p>
                  )}
                </Button>
              </FormControl>
            </PopoverTrigger>
            <PopoverContent className="w-auto bg-black-900 p-0" align="start">
              <Calendar
                mode="single"
                selected={field.value}
                onSelect={field.onChange}
                disabled={(date) => date < new Date()}
                initialFocus
              />
            </PopoverContent>
          </Popover>
          {description && (
            <FormDescription className="p4-regular">
              {description}
            </FormDescription>
          )}
          <FormMessage className="text-red-500" />
        </FormItem>
      )}
    />
  );
};

export default RHFDatePicker;

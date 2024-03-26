'use client';

import { EOnboardingStep } from '@/types/onboarding-step';
import {
  CldUploadButton,
  CloudinaryUploadWidgetInfo,
  CloudinaryUploadWidgetResults,
} from 'next-cloudinary';
import Image from 'next/image';
import { useState } from 'react';
import { useFormContext } from 'react-hook-form';
import RHFInput from '../RHFInputs/RHFInput';
import { Button } from '../ui/button';
import { Label } from '../ui/label';
import { IUserOnboarding } from '@/lib/zod/onboarding-schema';

// ----------------------------------------------------------------

interface IBasicInformationsProps {
  handleChangeStep: (
    data: Partial<IUserOnboarding>,
    newStep: EOnboardingStep
  ) => void;
}

const BasicInformations: React.FC<IBasicInformationsProps> = ({
  handleChangeStep,
}) => {
  const { LEARNING_GOALS } = EOnboardingStep;
  const { trigger, setValue, getValues } = useFormContext();
  const [uploadedImage, setUploadedImage] = useState('');

  const onSuccessUpload = (
    result: CloudinaryUploadWidgetResults,
    options: any
  ) => {
    console.log('result', result);
    console.log('options', options);

    if (!result || !result?.info) throw new Error('Image not uploaded!');
    setUploadedImage((result.info as CloudinaryUploadWidgetInfo).secure_url);
    setValue(
      'avatarImg',
      (result.info as CloudinaryUploadWidgetInfo).secure_url
    );
  };

  const validateAndChangeStep = async () => {
    const validInputs = await trigger([
      'fullName',
      'portfolioUrl',
      'avatarImg',
    ]);

    if (!validInputs) return;

    const [fullName, portfolioUrl, avatarImg] = getValues([
      'fullName',
      'portfolioUrl',
      'avatarImg',
    ]);

    await handleChangeStep(
      { fullName, portfolioUrl, avatarImg, onboardingStep: LEARNING_GOALS },
      LEARNING_GOALS
    );
  };

  return (
    <section>
      <div className="mb-6 flex flex-row items-center">
        <div>
          <Image
            src={
              uploadedImage ||
              `${'/assets/images/image-upload-placeholder.svg'}`
            }
            alt="Upload Image"
            width={90}
            height={90}
            className="mr-3.5 rounded-[5px]"
          />
        </div>
        {/* <CldImage src={uploadedImage} alt="ja" width="90" height="90" /> */}
        <Label className="flex-center w-[200px] cursor-pointer gap-2 rounded-md bg-black-700 p-2">
          <CldUploadButton
            className="flex items-center gap-2"
            uploadPreset={process.env.NEXT_PUBLIC_CLOUDINARY_PRESET_NAME ?? ''}
            onSuccess={onSuccessUpload}
          >
            <Image
              src="/assets/images/icn-upload-cloud.png"
              alt="Upload Image Cloud"
              width={16}
              height={16}
            />
            <span className="p3-medium">Update Profile Picture</span>
          </CldUploadButton>
        </Label>
      </div>
      <div>
        <div className="mb-4">
          <RHFInput label="Name" name="fullName" placeholder="Edit your Name" />
        </div>
        <div className="mb-4">
          <RHFInput
            label="Portfolio"
            name="portfolioUrl"
            placeholder="Edit portfolio link"
          />
        </div>
        <Button type="button" onClick={validateAndChangeStep}>
          Next
        </Button>
      </div>
    </section>
  );
};

export default BasicInformations;

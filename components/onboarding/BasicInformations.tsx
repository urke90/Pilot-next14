'use client';

import { useState } from 'react';
import { useFormContext } from 'react-hook-form';
import Image from 'next/image';
import {
  CldUploadButton,
  CloudinaryUploadWidgetResults,
  CloudinaryUploadWidgetInfo,
} from 'next-cloudinary';
import { Button } from '../ui/button';
import RHFInput from '../RHFInputs/RHFInput';

import { Label } from '../ui/label';

// ----------------------------------------------------------------

interface IBasicInformationsProps {
  handleChangeStep: (newStep: number) => void;
}

const BasicInformations: React.FC<IBasicInformationsProps> = ({
  handleChangeStep,
}) => {
  const { trigger } = useFormContext();
  const [uploadedImage, setUploadedImage] = useState('');

  const onSuccessUpload = (
    result: CloudinaryUploadWidgetResults,
    options: any
  ) => {
    console.log('result', result);
    console.log('options', options);

    if (!result || !result?.info) throw new Error('Image not uploaded!');
    setUploadedImage((result.info as CloudinaryUploadWidgetInfo).url);
  };

  const validateAndChangeStep = async () => {
    const validInputs = await trigger([
      'fullName',
      'portfolioUrl',
      'avatarImg',
    ]);

    if (validInputs) handleChangeStep(2);
  };

  return (
    <section>
      <div className="mb-6 flex flex-row items-center">
        <Image
          src={
            uploadedImage || `${'/assets/images/image-upload-placeholder.svg'}`
          }
          alt="Upload Image"
          width={90}
          height={90}
          className="mr-3.5 rounded-[5px]"
        />
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

'use client';

import { useEffect, useState } from 'react';
import Image from 'next/image';
import { Button } from '../ui/button';
import RHFInput from '../RHFInputs/RHFInput';
import { Input } from '../ui/input';
import { Label } from '../ui/label';

// ----------------------------------------------------------------

interface IProps {
  handleChangeStep: () => void;
}

const BasicInformation: React.FC<IProps> = ({ handleChangeStep }) => {
  const [uploadedImage, setUploadedImage] = useState('');

  useEffect(() => {
    console.log('uploaded image', uploadedImage);
  }, [uploadedImage]);

  const handleUploadImg = async (files: FileList | null) => {
    if (!files) return;

    const file = files[0];
    console.log('file', file);
    const imageTypes = [
      'image/jpeg',
      'image/png',
      'image/gif',
      'image/webp',
      'image/svg+xml',
    ];
    if (!imageTypes.includes(file.type)) throw new Error('Invalid image!');

    const image = URL.createObjectURL(file);
    console.log('image', image);

    const bytes = await file.arrayBuffer();
    const buffer = Buffer.from(bytes);
    // TODO continue with image upload

    console.log('buffer', buffer);

    setUploadedImage(image);
  };

  return (
    <section>
      <h2 className="h2-bold mb-3">Basic Information</h2>
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
          <Image
            src="/assets/images/icn-upload-cloud.png"
            alt="Upload Image Cloud"
            width={16}
            height={16}
          />
          <span className="p3-medium">Update Profile Picture</span>
          <Input
            type="file"
            accept="image/*"
            onChange={(e) => handleUploadImg(e.target.files)}
            className="hidden"
          />
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
        <Button type="button" onClick={handleChangeStep}>
          Next
        </Button>
      </div>
    </section>
  );
};

export default BasicInformation;

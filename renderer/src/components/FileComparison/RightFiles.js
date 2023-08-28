import { Label } from '@/components/Label/Label';
import { Cog8ToothIcon } from '@heroicons/react/24/outline';
import { labelData } from '@/util/data/labelData';
import { fileData } from '@/util/data/fileData';

export const RightFile = () => (
  <div className="bg-white w-full ml-[265px] border-2 border-Neutral-100 rounded-md">
    <div className="flex justify-between bg-Neutral-100 border border-Neutral-100">
      <div className="flex py-1.5 px-1 gap-2.5">
        {labelData.map((label) => (
          <Label key={label.id} label={label.name} textColor={label.textColor} bgColor={label.bgColor} />
          ))}
      </div>
      <div className="bg-black flex items-center px-2 rounded-tr-md">
        <Cog8ToothIcon className="w-5 h-5 text-white" />
      </div>
    </div>
    <div className="divide-y divide-Neutral-100">
      {fileData.map((file) => (
        <div key={file.label} className="flex px-1.5 py-6">
          <span className="h-fit py-0.5 px-1.5 flex items-center justify-center bg-primary rounded-full text-xs text-white">{file.label}</span>
          <div className="flex flex-col text-sm ml-1.5">
            <span className="pb-2.5 tracking-wide">{file.title}</span>
            <span className="text-success-500 tracking-wide">{file.description}</span>
          </div>
        </div>
     ))}
    </div>
  </div>
  );

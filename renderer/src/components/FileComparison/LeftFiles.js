import { Cog8ToothIcon } from '@heroicons/react/24/outline';
import { Label } from '@/components/Label/Label';

export const LeftFile = () => (
  <div className="fixed bg-white border-2 rounded-md border-black w-64 h-[500px]">
    <div className="flex items-center justify-between bg-black py-1.5 px-2.5">
      <Label bgColor="bg-primary" label="23 files" textColor="text-white" />
      <Cog8ToothIcon className="w-5 h-5 text-white" />
    </div>
    <ul className="text-black text-xs pt-2.5">
      <li className="hover:bg-primary-100 px-5 py-2 cursor-pointer">bible/path/file_number_1.md</li>
      <li className="hover:bg-primary-100 px-5 py-2 cursor-pointer">bible/path/file_number_2.md</li>
    </ul>
  </div>
);

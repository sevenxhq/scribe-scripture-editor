import { TooltipWrapper } from '@/components/Tooltip/index';
import PopupButton from './PopupButton';
import FileIcon from '@/icons/File.svg';
import FootnotesIcon from '@/icons/footnotes.svg';
import CrossReference from '@/icons/crossreference.svg';
import FolderIcon from '@/icons/Folder.svg';

export default function InsertMenu({ handleClick: handleButtonClick, selectedText }) {
  const handleClick = (number, title) => {
    handleButtonClick(number, title);
  };
  return (
    <div className="flex items-center">
      <TooltipWrapper tooltipMessage="Insert Verse">
        <PopupButton
          handleClick={handleClick}
          title="Verse"
          icon={(
            <FileIcon
              aria-label="File-Icon"
              className="h-5 mr-2 w-5 text-white cursor-pointer"
            />
          )}
        />
      </TooltipWrapper>
      <TooltipWrapper tooltipMessage="Insert Chapter">
        <PopupButton
          handleClick={handleClick}
          title="Chapter"
          icon={(
            <FolderIcon
              aria-label="Folder-Icon"
              className="h-5 mr-2 w-5 text-white cursor-pointer"
            />
          )}
        />
      </TooltipWrapper>
      <TooltipWrapper tooltipMessage="Insert Footnote">
        <PopupButton
          handleClick={handleClick}
          title="Footnote"
          selectedText={selectedText}
          icon={(
            <FootnotesIcon
              aria-label="FootNotes-Icon"
              className="h-5 mr-2 w-5 fill-white cursor-pointer"
            />
          )}
        />
      </TooltipWrapper>
      <TooltipWrapper tooltipMessage="Insert Cross Reference">
        <PopupButton
          handleClick={handleClick}
          title="Cross Reference"
          selectedText={selectedText}
          icon={(
            <CrossReference
              aria-label="CrossReference-Icon"
              className="h-5 mr-2 w-5 stroke-white cursor-pointer"
            />
          )}
        />
      </TooltipWrapper>
    </div>
  );
}

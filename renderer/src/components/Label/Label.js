export const Label = ({
 label, textColor, bgColor,
}) => (
  <span className={`${bgColor} px-2.5 py-0.5 font-semibold tracking-wider text-xs ${textColor} uppercase rounded-xl`}>{label}</span>
);

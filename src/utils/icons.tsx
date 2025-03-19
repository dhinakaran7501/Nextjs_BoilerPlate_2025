import { MdVisibility, MdVisibilityOff } from "react-icons/md";
import { IconProps, IconType } from "@/types/utilsTypes";
import { FaChevronDown, FaTimes } from "react-icons/fa";

const iconMap: Record<IconType, React.ElementType> = {
  visibility: MdVisibility,
  visibilityOff: MdVisibilityOff,
  close: FaTimes,
  downArrow: FaChevronDown,
};

export default function Icon({
  name,
  size = 20,
  className,
  onPressClick,
}: IconProps) {
  const IconComponent = iconMap[name];

  if (!IconComponent) return null;

  return (
    <IconComponent size={size} className={className} onClick={onPressClick} />
  );
}

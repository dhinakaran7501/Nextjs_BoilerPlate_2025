export type ToastType = "success" | "error" | "info" | "warning";
export type ErrorResponse = {
  message: string;
  statusCode?: number;
};

export type IconType = "visibility" | "visibilityOff" | "close" | "downArrow";

export type IconProps = {
  name: IconType;
  size?: number;
  className?: string;
  onPressClick?: (event: React.MouseEvent<HTMLSpanElement, MouseEvent>) => void;
};

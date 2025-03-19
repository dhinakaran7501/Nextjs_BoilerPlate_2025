import { CustomInputBoxProps } from "@/types/componentsTypes";
import Icon from "@/utils/icons";
import React, { useState } from "react";

export default function CustomInputBox({
  title = "",
  inputType = "text",
  placeholder = "",
  hintText = "",
  value,
  onPressChange,
  isSecure = false,
  isRequired = false,
  isDisabled = false,
  maxLength,
  icon,
  errText,
}: CustomInputBoxProps) {
  const [showPassword, setShowPassword] = useState(false);

  const getInputType = () => {
    if (isSecure) {
      return showPassword ? "text" : "password";
    }
    return inputType;
  };

  return (
    <div className="flex flex-col text-[var(--primary-text-color)] mb-2">
      {(title || hintText) && (
        <div className="mb-1">
          {title && (
            <label className="font-medium">
              {title}
              {isRequired && (
                <span className="ml-1 text-[var(--danger-color)]">*</span>
              )}
            </label>
          )}
          {hintText && (
            <span className="mb-2 block text-[12px] text-gray-400">
              {hintText}
            </span>
          )}
        </div>
      )}
      {inputType === "textArea" ? (
        <textarea
          className={`p-2 border text-sm rounded-sm outline-none resize-none w-full ${errText ? "border-[var(--danger-color)] focus:border-[var(--danger-color)]" : "border-[var(--primary-border-color)] focus:border-[var(--active-color)]"}`}
          placeholder={placeholder}
          value={value}
          onChange={(event) => {
            if (onPressChange) {
              onPressChange(event.target.value);
            }
          }}
          rows={4}
          disabled={isDisabled}
          maxLength={maxLength}
        />
      ) : (
        <div className="relative">
          <input
            type={getInputType()}
            className={`p-2 border rounded-sm outline-none text-sm w-full pr-10  ${errText ? "border-[var(--danger-color)] focus:border-[var(--danger-color)]" : "border-[var(--primary-border-color)] focus:border-[var(--active-color)]"}`}
            placeholder={placeholder}
            value={value}
            onChange={(event) => {
              if (onPressChange) {
                onPressChange(event.target.value);
              }
            }}
            disabled={isDisabled}
            maxLength={maxLength}
          />

          {inputType === "password" && (
            <button
              type="button"
              onClick={() => setShowPassword((prev) => !prev)}
              className="absolute right-3 top-1/2 transform -translate-y-1/2 text-[var(--primary-border-color)] cursor-pointer"
            >
              <Icon name={showPassword ? "visibilityOff" : "visibility"} />
            </button>
          )}

          {icon && (
            <div className="absolute right-3 top-1/2 transform -translate-y-1/2">
              {icon}
            </div>
          )}
        </div>
      )}
      {errText && (
        <p className="text-sm text-[var(--danger-color)]">
          {errText.toString()}
        </p>
      )}
    </div>
  );
}

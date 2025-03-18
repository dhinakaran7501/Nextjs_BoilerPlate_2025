"use client";

import ToggleSwitch from "@/components/ToggleSwitch";
import { showToast } from "@/utils/helpers";

const Login = () => {
  return (
    <div onClick={() => showToast("success", "Successfully toasted!")}>
      Login
      <ToggleSwitch />
    </div>
  );
};

export default Login;

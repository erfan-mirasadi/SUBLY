"use client";

import Auth from "./Auth";

import { useState } from "react";
import AuthForm from "./AuthForm";

function SignIn() {
  const [isLogin, setIsLogin] = useState(true);

  return (
    <AuthForm
      isLogin={isLogin}
      onSwitchAuthMode={() => setIsLogin((prev) => !prev)}
      onSubmit={(data) => {
        // handle login or signup
        console.log(data);
      }}
    />
    // <div className="p-22 ">
    //   <Auth list={loginFields} rounded="xl" />
    // </div>
  );
}

export default SignIn;

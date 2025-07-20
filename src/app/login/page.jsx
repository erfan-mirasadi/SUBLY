"use client";
import AuthForm from "@/src/components/auth/AuthForm";
import { useState } from "react";

function LoginPage() {
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

export default LoginPage;

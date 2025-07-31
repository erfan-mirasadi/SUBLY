"use client";
import InputForm from "@/src/components/InputForm";
import Accordion from "@/src/components/Accardion";
import PinField from "react-pin-field";
import { useState } from "react";
import Button from "@/src/components/Button";
import Timer from "@/src/components/ui/Timer";
import { useRouter } from "next/navigation";
import { useSendOtp, useVerifyOtp } from "@/src/hooks/mutate/auth";
export default function LoginPage() {
 const [otp,setOtp] = useState("");
 const [phone,setPhone] = useState("");
 const [step,setStep] = useState(1);
 const { mutate, isPending } = useSendOtp();
 const { mutate: verifyOtp, isPending: isVerifying } = useVerifyOtp();
 const router = useRouter();

  const handleSubmit = (e) => {
    e.preventDefault();
    if(step === 1){
      mutate(phone);
      setStep(2);
    }else{
      verifyOtp({ phone, code: otp });
      router.push("/")
    }
  }

  const changePhone = () => {
    setStep(1);
    setPhone("");
    setOtp("");
  }

  return (
    <div className="w-full min-h-screen py-4 flex justify-center items-center">
      <form onSubmit={handleSubmit} className="w-full max-w-[400px] mx-3 sm:mx-auto my-4 flex flex-col gap-4 shadow-lg border-[1px] border-gray-300/20 shadow-gray-300/10 rounded-md p-4 ">
        <h1 className="text-4xl font-bold font-grotesk mb-10 text-center">SUBLY</h1>
        <InputForm disabled={step === 2} value={phone} onChange={(e)=>setPhone(e.target.value)} placeholder="شماره موبایل" name="phone" />
            <div className="w-full text-right">
            <span onClick={changePhone} className={`text-sm text-gray-500 mt-[-10px] cursor-pointer float-right hover:text-gray-100 duration-300 ${step === 1 ? "opacity-0" : "opacity-100"}`}>تغییر شماره</span>
            </div>
        <Accordion show={step === 2}>
          <div className="my-8 mt-4"><Timer key={step}/></div>
          <div className="w-full flex flex-col my-5">
            <div className="flex gap-2 justify-center items-center">
            <PinField
                className={`outline-none text-[16px] w-[15%] text-center font-code mx-1 h-[48px] rounded-md border-[1px] border-gray-300/20 shadow-gray-300/10`}
                inputMode='numeric'
                length={4}
                onChange={setOtp}
                disabled={false}
                value={otp}
                name="otp"
                />
            </div>
          </div>
        </Accordion>
        <Button type="submit" disabled={step === 1 ? !phone : !otp} loading={isPending || isVerifying}>{step === 1 ? "ارسال کد" : "ورود"}</Button>
      </form>
    </div>
  )
}

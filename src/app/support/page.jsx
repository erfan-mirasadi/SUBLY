"use client";

import React from "react";
import {
  FaPhoneAlt,
  FaClock,
  FaEnvelope,
  FaWhatsapp,
  FaTelegramPlane,
} from "react-icons/fa";
import Link from "next/link";
import Section from "@/src/components/section/Section";

export default function SupportPage() {
  return (
    <Section
      className="pt-[8rem] -mt-[5.25rem]"
      crosses
      crossesOffset="lg:translate-y-[5.25rem]"
      customPaddings
      id="support"
    >
      <div className="min-h-screen bg-gradient-to-b from-black via-[#0E0C15] to-gray-900 text-white p-6">
        <div className="max-w-4xl mx-auto bg-[#0F0E18]/60 backdrop-blur-md rounded-2xl shadow-lg p-8 mt-12">
          <header className="flex items-center justify-between mb-6">
            <h1 className="text-3xl font-extrabold font-vazirmatn">
              پشتیبانی سابلی
            </h1>
            <div className="text-right text-sm opacity-80">
              <div className="flex items-center gap-2">
                <FaClock /> <span>ساعت کاری: 08:00 - 20:00 (هر روز)</span>
              </div>
            </div>
          </header>

          <section className="grid grid-cols-1 md:grid-cols-2 gap-6 items-start">
            <div className="space-y-6">
              <p className="text-lg text-[#D6D4E0]">
                تیم پشتیبانی ما همیشه در دسترس است تا به شما کمک کند. از طریق
                تلفن، واتساپ، تلگرام یا ایمیل می‌توانید با ما تماس بگیرید.
              </p>

              <div className="flex flex-col gap-4">
                <div className="flex items-center gap-3">
                  <span className="p-3 bg-white/10 rounded-full">
                    <FaPhoneAlt />
                  </span>
                  <div>
                    <div className="text-sm opacity-60">تلفن تماس</div>
                    <a href="tel:+989121099103" className="text-lg font-bold">
                      09121099103
                    </a>
                  </div>
                </div>

                <div className="flex items-center gap-3">
                  <span className="p-3 bg-white/10 rounded-full">
                    <FaWhatsapp />
                  </span>
                  <div>
                    <div className="text-sm opacity-60">واتساپ</div>
                    <a
                      href="https://wa.me/00905073542097"
                      target="_blank"
                      rel="noreferrer"
                      className="text-lg font-bold"
                    >
                      پیام در واتساپ
                    </a>
                  </div>
                </div>

                <div className="flex items-center gap-3">
                  <span className="p-3 bg-white/10 rounded-full">
                    <FaTelegramPlane />
                  </span>
                  <div>
                    <div className="text-sm opacity-60">تلگرام</div>
                    <a
                      href="https://t.me/+00905073542097"
                      target="_blank"
                      rel="noreferrer"
                      className="text-lg font-bold"
                    >
                      پیام در تلگرام
                    </a>
                  </div>
                </div>

                <div className="flex items-center gap-3">
                  <span className="p-3 bg-white/10 rounded-full">
                    <FaEnvelope />
                  </span>
                  <div>
                    <div className="text-sm opacity-60">ایمیل</div>
                    <a
                      href="mailto:sably@support"
                      className="text-lg font-bold"
                    >
                      sably@support
                    </a>
                  </div>
                </div>
              </div>
            </div>

            <div className="bg-white/5 rounded-xl p-6 flex flex-col items-center justify-center">
              <h3 className="text-2xl font-bold mb-3">
                ما اینجاییم تا کمک کنیم
              </h3>
              <p className="text-center opacity-75 mb-6">
                پاسخ سریع، راه‌حل‌های عملی و همراهی تا حل کامل مشکل شما.
              </p>

              <div className="space-y-3 w-full">
                <div className="p-4 bg-gradient-to-r from-pink-500/20 to-violet-500/20 rounded-lg text-center">
                  <strong className="block">پشتیبانی</strong>
                  <span className="block opacity-70">
                    تیم ما در بازه اعلام شده فعال است اما همیشه تلاش می‌کنیم
                    سریع پاسخ دهیم.
                  </span>
                </div>
                <div className="p-4 bg-gradient-to-r from-green-500/10 to-blue-500/10 rounded-lg text-center">
                  <strong className="block">پاسخ از طریق پیام‌رسان‌ها</strong>
                  <span className="block opacity-70">
                    در واتساپ یا تلگرام می‌توانید تصاویر و اسکرین‌شات ارسال
                    کنید.
                  </span>
                </div>
              </div>

              <div className="mt-6">
                <Link
                  href="/"
                  className="px-4 py-2 bg-white/10 rounded-lg hover:bg-white/20"
                >
                  بازگشت به صفحه اصلی
                </Link>
              </div>
            </div>
          </section>

          {/* <footer className="mt-8 text-center opacity-70">
            <p className="mb-2">همراه شما در مسیر خرید هوشمندانه</p>
            <p className="text-sm">سوشال: @sably_support</p>
          </footer> */}
        </div>
      </div>
    </Section>
  );
}

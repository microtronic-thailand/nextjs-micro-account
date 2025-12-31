"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { useProfile } from "@/hooks/use-profile";
import Link from "next/link";
import { AuthNav } from "@/components/layout/auth-nav";
import { HeroButtons } from "@/components/layout/hero-buttons";
import { disableDemoMode, isDemoMode } from "@/lib/mock-auth";
import { supabase } from "@/lib/supabase";

export default function Home() {
  const { profile, loading } = useProfile();
  const router = useRouter();

  useEffect(() => {
    // When returning to home page, clear demo session
    // This satisfies the requirement "เวลากดย้อนกลับไม่ต้องจดจำการล็อกอิน"
    if (isDemoMode()) {
      disableDemoMode();
      // Optional: force reload or state update if needed
      window.location.reload();
    }

    // Also sign out from Supabase if any real session exists
    // to ensure a completely fresh start on the landing page
    supabase.auth.signOut();
  }, []);

  return (
    <div className="flex min-h-screen flex-col scroll-smooth">
      <header className="flex h-16 items-center justify-between border-b px-6 lg:px-12 bg-white sticky top-0 z-50">
        <div className="text-2xl font-bold text-blue-600">MicroAccount</div>
        <nav className="hidden gap-6 md:flex text-slate-600">
          <Link href="#features" className="text-sm font-medium hover:text-blue-600 transition-colors">คุณสมบัติ</Link>
          <Link href="/pricing-details" className="text-sm font-medium hover:text-blue-600 transition-colors">ราคา</Link>
          <Link href="#contact" className="text-sm font-medium hover:text-blue-600 transition-colors">ติดต่อเรา</Link>
        </nav>
        <AuthNav />
      </header>

      <main className="flex-1">
        {/* Hero Section */}
        <section className="bg-slate-50 py-24 text-center">
          <div className="container mx-auto px-4">
            <h1 className="mb-6 text-5xl font-extrabold tracking-tight lg:text-6xl text-slate-900">
              ระบบบัญชีที่เข้าใจ <span className="text-blue-600">SME ไทย</span> มากที่สุด
            </h1>
            <p className="mx-auto mb-10 max-w-2xl text-xl text-slate-600">
              จัดการใบวางบิล ออกใบเสร็จ และดูงบการเงินได้ง่ายๆ บนคลาวด์ ปลอดภัย รวดเร็ว ครบจบในที่เดียว
            </p>
            <HeroButtons />
          </div>
        </section>

        {/* Features Section */}
        <section id="features" className="py-24 bg-white">
          <div className="container mx-auto px-4">
            <div className="text-center mb-16">
              <h2 className="text-3xl font-bold mb-4">ฟีเจอร์ที่ช่วยให้ธุรกิจคุณเติบโต</h2>
              <p className="text-slate-500 max-w-xl mx-auto">ออกแบบมาให้ใช้งานง่าย ตัดความซับซ้อนของงานบัญชีออกไป</p>
            </div>
            <div className="grid gap-10 md:grid-cols-3">
              <div className="rounded-2xl border p-8 shadow-sm hover:shadow-md transition-shadow bg-slate-50/50">
                <div className="mb-6 h-12 w-12 bg-blue-100 rounded-xl flex items-center justify-center text-2xl">📊</div>
                <h3 className="mb-3 text-xl font-bold text-slate-900">Dashboard อัจฉริยะ</h3>
                <p className="text-slate-600 leading-relaxed">เห็นภาพรวมกระแสเงินสด กำไร-ขาดทุน ได้แบบ Real-time ตัดสินใจธุรกิจได้ทันทีจากปลายนิ้ว</p>
              </div>
              <div className="rounded-2xl border p-8 shadow-sm hover:shadow-md transition-shadow bg-slate-50/50">
                <div className="mb-6 h-12 w-12 bg-orange-100 rounded-xl flex items-center justify-center text-2xl">📑</div>
                <h3 className="mb-3 text-xl font-bold text-slate-900">เอกสารครบครัน</h3>
                <p className="text-slate-600 leading-relaxed">ออกใบเสนอราคา ใบแจ้งหนี้ ใบเสร็จรับเงิน และใบหัก ณ ที่จ่ายถูกต้องตามมาตรฐานกรมสรรพากร</p>
              </div>
              <div className="rounded-2xl border p-8 shadow-sm hover:shadow-md transition-shadow bg-slate-50/50">
                <div className="mb-6 h-12 w-12 bg-green-100 rounded-xl flex items-center justify-center text-2xl">📱</div>
                <h3 className="mb-3 text-xl font-bold text-slate-900">ใช้งานได้ทุกที่</h3>
                <p className="text-slate-600 leading-relaxed">รองรับการใช้งานผ่านมือถือ แท็บเล็ต และคอมพิวเตอร์ ทำงานได้จากทุกมุมโลกผ่านระบบคลาวด์</p>
              </div>
            </div>
          </div>
        </section>

        {/* Pricing Section */}
        <section id="pricing" className="py-24 bg-slate-900 text-white">
          <div className="container mx-auto px-4">
            <div className="text-center mb-16">
              <h2 className="text-3xl font-bold mb-4">แพ็กเกจที่ตอบโจทย์ความมั่นคงทางบัญชี</h2>
              <p className="text-slate-400 max-w-xl mx-auto">ซื้อขาด เป็นเจ้าของระบบ 100% พร้อมบริการดูแลมืออาชีพ</p>
            </div>
            <div className="grid gap-8 md:grid-cols-3 max-w-6xl mx-auto">
              <div className="border border-slate-700 rounded-2xl p-8 bg-slate-800/50">
                <h3 className="text-xl font-bold mb-2">Standard</h3>
                <div className="text-3xl font-bold mb-4">15,000.-</div>
                <ul className="mb-8 space-y-3 text-sm text-slate-300">
                  <li>✔ ได้ Source Code ทั้งหมด</li>
                  <li>✔ ติดตั้งเองถาวร</li>
                  <li>✔ ไม่มีค่ารายเดือน</li>
                </ul>
                <Link href="https://line.me/R/ti/p/@teu8808s" target="_blank" className="block text-center border border-slate-600 text-white py-3 rounded-lg font-bold hover:bg-slate-700 transition-colors">สั่งซื้อเฉพาะ Code</Link>
              </div>
              <div className="border-2 border-blue-500 rounded-2xl p-8 bg-slate-800 shadow-2xl scale-105 relative">
                <div className="bg-blue-600 text-xs font-bold py-1 px-3 rounded-full absolute -top-3 left-1/2 -translate-x-1/2 uppercase">Recommended</div>
                <h3 className="text-xl font-bold mb-2">Professional</h3>
                <div className="text-3xl font-bold mb-4">25,000.-</div>
                <ul className="mb-8 space-y-3 text-sm text-slate-300">
                  <li>✔ บริการติดตั้งให้ฟรี</li>
                  <li>✔ ปรับแก้ข้อมูลเบื้องต้น</li>
                  <li>✔ **รับประกันระบบ 1 เดือน**</li>
                </ul>
                <Link href="https://line.me/R/ti/p/@teu8808s" target="_blank" className="block text-center bg-blue-600 text-white py-3 rounded-lg font-bold hover:bg-blue-700 transition-colors">สั่งซื้อพร้อมติดตั้ง</Link>
              </div>
              <div className="border border-slate-700 rounded-2xl p-8 bg-slate-800/50">
                <h3 className="text-xl font-bold mb-2">Enterprise</h3>
                <div className="text-3xl font-bold mb-4">60,000.-</div>
                <ul className="mb-8 space-y-3 text-sm text-slate-300">
                  <li>✔ Software + ติดตั้งครบวงจร</li>
                  <li>✔ ปรับแก้ข้อมูล & โมดูล</li>
                  <li>✔ **Maintenance ฟรี 1 ปี**</li>
                </ul>
                <Link href="https://line.me/R/ti/p/@teu8808s" target="_blank" className="block text-center bg-slate-700 text-white py-3 rounded-lg font-bold hover:bg-slate-600 transition-colors">เหมาจ่ายรายปี</Link>
              </div>
            </div>
          </div>
        </section>

        {/* Contact Section */}
        <section id="contact" className="py-24 bg-white">
          <div className="container mx-auto px-4 max-w-4xl text-center">
            <h2 className="text-3xl font-bold mb-6">เริ่มยกระดับบัญชีของคุณวันนี้</h2>
            <p className="text-slate-600 mb-10 text-lg">หากมีข้อสงสัย หรือต้องการบริการเสริมติดตั้ง ทีมงานพร้อมดูแลคุณเสมอ</p>
            <div className="flex flex-wrap justify-center gap-8">
              <div className="flex items-center gap-3">
                <div className="h-10 w-10 bg-blue-50 rounded-full flex items-center justify-center text-blue-600">📧</div>
                <div className="text-left font-medium">grids@microtronic.biz</div>
              </div>
              <div className="flex items-center gap-3">
                <div className="h-10 w-10 bg-green-50 rounded-full flex items-center justify-center text-green-600">💬</div>
                <div className="text-left font-medium">Line: @teu8808s</div>
              </div>
            </div>
          </div>
        </section>
      </main>

      <footer className="border-t py-12 text-center text-sm text-slate-500 bg-slate-50">
        <div className="container mx-auto px-4">
          <div className="mb-4 font-bold text-slate-900">MicroAccount</div>
          <p>© {new Date().getFullYear()} MicroAccount by WebShardow. All rights reserved.</p>
        </div>
      </footer>
    </div>
  );
}

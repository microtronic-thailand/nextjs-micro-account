"use client";

import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import {
    Check,
    ArrowRight,
    Zap,
    Shield,
    Crown,
    Server,
    Globe,
    Headphones,
    Code,
    Settings,
    HardDrive,
    GraduationCap,
    Wrench,
    MousePointerClick,
    HelpCircle
} from "lucide-react";
import { AuthNav } from "@/components/layout/auth-nav";

export default function PricingLandingPage() {
    const mainPlans = [
        {
            name: "Standard",
            price: "30,000",
            subtitle: "เหมาะสำหรับทีม IT ที่ต้องการติดตั้งเอง",
            features: [
                "รับ Source Code 100% (Next.js)",
                "สิทธิ์การติดตั้งถาวร",
                "คู่มือการติดตั้ง (Manual)",
                "ไม่มีค่าธรรมเนียมรายเดือน",
                "สิทธิ์การใช้งาน 1 โดเมน"
            ],
            color: "slate",
            icon: <Code className="h-6 w-6" />,
            cta: "สั่งซื้อเฉพาะ Code",
            href: "https://line.me/R/ti/p/@teu8808s"
        },
        {
            name: "Professional",
            price: "50,000",
            subtitle: "แผนยอดนิยมสำหรับ SME พร้อมใช้งาน",
            features: [
                "รวม Software ทุกโมดูล",
                "บริการติดตั้งลง Server ให้ฟรี",
                "ปรับเปลี่ยนข้อมูลบริษัทเบื้องต้น",
                "รับประกันระบบ 1 เดือน",
                "คู่มือการใช้งานแบบละเอียด"
            ],
            color: "blue",
            icon: <Zap className="h-6 w-6" />,
            cta: "สั่งซื้อพร้อมติดตั้ง",
            href: "https://line.me/R/ti/p/@teu8808s",
            popular: true
        },
        {
            name: "Enterprise",
            price: "80,000",
            subtitle: "ดูแลครบวงจรสำหรับองค์กรขนาดกลาง",
            features: [
                "Software + บริการติดตั้งครบวงจร",
                "บริการปรับแก้โมดูลเพิ่มเติม",
                "ฟรี Maintenance ตลอด 1 ปี",
                "ซัพพอร์ตระดับ Priority 24/7",
                "บริการ Backup ข้อมูลรายเดือน"
            ],
            color: "indigo",
            icon: <Crown className="h-6 w-6" />,
            cta: "ติดต่อเหมาจ่ายรายปี",
            href: "https://line.me/R/ti/p/@teu8808s"
        }
    ];

    const services = [
        { name: "อบรมการใช้งาน", price: "3,000", desc: "เทรนนิ่งทีมงานผ่านออนไลน์ 2 ชั่วโมง", icon: <GraduationCap /> },
        { name: "เพิ่ม/แก้ไขโมดูล", price: "3,000", desc: "เพิ่มฟีเจอร์หรือแก้ไขจุดต่างๆ (ต่อจุด)", icon: <Wrench /> },
        { name: "แก้ไขข้อมูล", price: "2,000", desc: "บริการแก้ไขข้อมูลในฐานข้อมูลเชิงลึก", icon: <Settings /> },
        { name: "Maintenance รายครั้ง", price: "2,000", desc: "ตรวจเช็คและแก้ไขปัญหาทางเทคนิค", icon: <Server /> },
        { name: "เช่าโฮสติ้ง (Hosting)", price: "2,000/ปี", desc: "พื้นที่วางระบบความเร็วสูง ปลอดภัย", icon: <HardDrive /> },
        { name: "จดโดเมน (Domain)", price: "1,500/ปี", desc: "จดชื่อเว็บไซต์บริษัทของคุณ (.com, .net)", icon: <Globe /> },
    ];

    return (
        <div className="min-h-screen bg-white font-sans text-slate-900 scroll-smooth">
            {/* Header */}
            <header className="flex h-16 items-center justify-between border-b px-6 lg:px-12 bg-white sticky top-0 z-50">
                <Link href="/" className="text-2xl font-bold text-blue-600">MicroFormula</Link>
                <nav className="hidden gap-6 md:flex items-center text-slate-600">
                    <Link href="https://microtronic.biz" target="_blank" className="text-sm font-medium hover:text-blue-600 transition-colors">Microtronic.biz</Link>
                    <Link href="/#features" className="text-sm font-medium hover:text-blue-600 transition-colors">คุณสมบัติ</Link>
                    <Link href="/pricing-details" className="text-sm font-medium text-blue-600">ราคา</Link>
                    <Link href="/#contact" className="text-sm font-medium hover:text-blue-600 transition-colors">ติดต่อเรา</Link>
                </nav>
                <AuthNav />
            </header>

            <main>
                {/* Hero Section */}
                <section className="relative py-20 lg:py-32 overflow-hidden">
                    <div className="absolute top-0 right-0 -z-10 w-1/3 h-1/2 bg-blue-50 rounded-bl-full opacity-50 blur-3xl animate-pulse" />
                    <div className="absolute bottom-0 left-0 -z-10 w-1/4 h-1/2 bg-indigo-50 rounded-tr-full opacity-50 blur-3xl" />

                    <div className="container mx-auto px-6 text-center">
                        <Badge variant="outline" className="mb-6 px-4 py-1 text-blue-600 border-blue-200 bg-blue-50 animate-bounce">
                            Pricing Plans 2025
                        </Badge>
                        <h1 className="text-5xl lg:text-7xl font-extrabold tracking-tight mb-8 bg-gradient-to-r from-slate-900 via-blue-800 to-slate-900 bg-clip-text text-transparent">
                            ปลดล็อกศักยภาพธุรกิจ <br /> ด้วยแผนราคาที่คุ้มค่า
                        </h1>
                        <p className="text-xl text-slate-600 max-w-2xl mx-auto mb-12">
                            เลือกลงทุนครั้งเดียวเพื่อความเป็นเจ้าของ หรือเลือกแผนดูแลครบวงจรเพื่อให้คุณโฟกัสกับธุรกิจได้อย่างเต็มที่
                        </p>

                        <div className="flex flex-wrap justify-center gap-4">
                            <Link href="#main-pricing">
                                <Button size="lg" className="rounded-full px-8 h-14 text-lg shadow-xl shadow-blue-200 hover:scale-105 transition-transform bg-blue-600">
                                    ดูแพ็กเกจทั้งหมด <ArrowRight className="ml-2 h-5 w-5" />
                                </Button>
                            </Link>
                            <Link href="#add-ons">
                                <Button size="lg" variant="outline" className="rounded-full px-8 h-14 text-lg hover:bg-slate-50 transition-colors">
                                    บริการเสริมอื่น ๆ
                                </Button>
                            </Link>
                        </div>
                    </div>
                </section>

                {/* Main Pricing Cards */}
                <section id="main-pricing" className="py-20 bg-slate-50">
                    <div className="container mx-auto px-6">
                        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 max-w-7xl mx-auto">
                            {mainPlans.map((plan, i) => (
                                <div
                                    key={i}
                                    className={`relative flex flex-col p-8 bg-white rounded-3xl border-2 transition-all duration-300 hover:-translate-y-2 ${plan.popular ? 'border-blue-600 shadow-2xl scale-105 z-10' : 'border-slate-100 shadow-xl'
                                        }`}
                                >
                                    {plan.popular && (
                                        <div className="absolute -top-5 left-1/2 -translate-x-1/2 bg-blue-600 text-white px-6 py-1.5 rounded-full text-sm font-bold uppercase tracking-widest shadow-lg">
                                            Recommended
                                        </div>
                                    )}

                                    <div className={`mb-6 p-4 rounded-2xl w-fit ${plan.color === 'blue' ? 'bg-blue-100 text-blue-600' :
                                        plan.color === 'indigo' ? 'bg-indigo-100 text-indigo-600' : 'bg-slate-100 text-slate-600'
                                        }`}>
                                        {plan.icon}
                                    </div>

                                    <h3 className="text-2xl font-bold mb-2">{plan.name}</h3>
                                    <p className="text-slate-500 text-sm mb-6 h-10">{plan.subtitle}</p>

                                    <div className="mb-8">
                                        <span className="text-5xl font-extrabold text-slate-900 font-mono tracking-tighter">฿{plan.price}</span>
                                        <span className="text-slate-400 font-medium ml-2">บาท</span>
                                    </div>

                                    <ul className="space-y-4 mb-10 flex-1">
                                        {plan.features.map((feature, j) => (
                                            <li key={j} className="flex items-start gap-3">
                                                <div className="mt-1 bg-green-100 rounded-full p-0.5">
                                                    <Check className="h-4 w-4 text-green-600" />
                                                </div>
                                                <span className="text-slate-600 text-sm font-medium">{feature}</span>
                                            </li>
                                        ))}
                                    </ul>

                                    <Link href={plan.href} className="mt-auto">
                                        <Button className={`w-full py-6 rounded-2xl text-lg font-bold transition-all ${plan.popular ? 'bg-blue-600 hover:bg-blue-700 shadow-blue-200' : 'bg-slate-900 hover:bg-slate-800'
                                            }`}>
                                            {plan.cta}
                                        </Button>
                                    </Link>
                                </div>
                            ))}
                        </div>
                    </div>
                </section>

                {/* Additional Services Grid */}
                <section id="add-ons" className="py-24 bg-white">
                    <div className="container mx-auto px-6">
                        <div className="text-center mb-20">
                            <h2 className="text-4xl font-bold mb-4 tracking-tight">บริการเสริมและออนดีมานด์</h2>
                            <p className="text-slate-500 max-w-xl mx-auto text-lg">เราพร้อมดูแลในทุกขั้นตอน ไม่ว่าจะเป็นเรื่องของโฮสติ้ง หรือการปรับแก้ระบบ</p>
                        </div>

                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-6xl mx-auto">
                            {services.map((service, i) => (
                                <div key={i} className="group p-6 rounded-2xl border border-slate-100 bg-slate-50/50 hover:bg-white hover:border-blue-200 hover:shadow-xl hover:shadow-blue-50 transition-all">
                                    <div className="flex items-center justify-between mb-4">
                                        <div className="p-3 bg-white rounded-xl shadow-sm border border-slate-100 text-blue-600 group-hover:scale-110 transition-transform">
                                            {service.icon}
                                        </div>
                                        <div className="text-xl font-bold text-slate-900 italic">
                                            ฿{service.price}
                                        </div>
                                    </div>
                                    <h4 className="text-lg font-bold mb-1 text-slate-800">{service.name}</h4>
                                    <p className="text-slate-500 text-sm">{service.desc}</p>
                                </div>
                            ))}
                        </div>
                    </div>
                </section>

                {/* Comparison Card (Mini) */}
                <section className="py-20 bg-blue-600 relative overflow-hidden">
                    <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/carbon-fibre.png')] opacity-10" />
                    <div className="container mx-auto px-6 text-center relative z-10 text-white">
                        <h2 className="text-4xl font-bold mb-8 italic">"ทำไมต้องเลือก MicroFormula?"</h2>
                        <div className="grid grid-cols-1 md:grid-cols-3 gap-12 max-w-4xl mx-auto uppercase tracking-tighter">
                            <div>
                                <div className="text-4xl font-black mb-2">0.-</div>
                                <p className="text-blue-100 text-sm">ไม่มีค่ารายเดือนแฝง</p>
                            </div>
                            <div>
                                <div className="text-4xl font-black mb-2">100%</div>
                                <p className="text-blue-100 text-sm">เป็นเจ้าของซอร์สโค้ด</p>
                            </div>
                            <div>
                                <div className="text-4xl font-black mb-2">24/7</div>
                                <p className="text-blue-100 text-sm">การซัพพอร์ตระดับมืออาชีพ</p>
                            </div>
                        </div>
                    </div>
                </section>

                {/* FAQ Section */}
                <section className="py-24 bg-slate-50">
                    <div className="container mx-auto px-6 max-w-4xl">
                        <h2 className="text-3xl font-bold text-center mb-12 flex items-center justify-center gap-3">
                            <HelpCircle className="h-8 w-8 text-blue-600" /> คำถามที่พบบ่อย (FAQ)
                        </h2>
                        <div className="space-y-4">
                            {[
                                { q: "ถ้าซื้อแบบ Standard สามารถอัปเกรดภายหลังได้ไหม?", a: "ได้แน่นอนครับ คุณสามารถจ่ายส่วนต่างเพื่อขอรับบริการติดตั้งหรือ Maintenance รายปีเพิ่มได้ทุกเมื่อ" },
                                { q: "การรับประกันระบบ 1 เดือน ครอบคลุมอะไรบ้าง?", a: "ครอบคลุมการแก้ไข Bug หรือข้อผิดพลาดที่เกิดจากโปรแกรมที่ไม่ได้ทำตาม Spec รวมถึงการปรึกษาด้านเทคนิคเบื้องต้นครับ" },
                                { q: "ต้องจ่ายค่าเช้าโฮสต์และโดเมนทุกปีไหม?", a: "ใช่ครับ สำหรับแพ็กเกจที่ให้เราดูแลโฮสต์ให้จะมีค่าต่ออายุรายปี แต่ถ้าลูกค้ามีโฮสต์อยู่แล้วก็ไม่ต้องจ่ายส่วนนี้ครับ" }
                            ].map((item, i) => (
                                <div key={i} className="bg-white p-6 rounded-2xl shadow-sm border border-slate-100">
                                    <h4 className="font-bold text-slate-900 mb-2">{item.q}</h4>
                                    <p className="text-slate-600 text-sm">{item.a}</p>
                                </div>
                            ))}
                        </div>
                    </div>
                </section>

                {/* Final CTA */}
                <section id="contact" className="py-24 bg-white text-center">
                    <div className="container mx-auto px-6 max-w-4xl border-2 border-dashed border-slate-200 rounded-[3rem] py-16 px-8 hover:border-blue-400 transition-colors">
                        <h2 className="text-4xl font-bold mb-6">พร้อมเริ่มงานบัญชีให้ราบรื่นหรือยัง?</h2>
                        <p className="text-slate-500 mb-10 text-lg">ติดต่อเราวันนี้เพื่อรับใบเสนอราคาหรือสอบถามรายละเอียดเพิ่มเติม ทีมงาน WebShardow ยินดีให้บริการ</p>
                        <div className="flex flex-wrap justify-center gap-4">
                            <Link href="https://line.me/R/ti/p/@teu8808s" target="_blank">
                                <Button size="lg" className="rounded-xl px-10 h-16 text-lg bg-green-600 hover:bg-green-700 shadow-lg shadow-green-100">
                                    <MousePointerClick className="mr-2 h-5 w-5" /> ติดต่อเราทาง LINE
                                </Button>
                            </Link>
                            <Link href="mailto:grids@microtronic.biz">
                                <Button size="lg" variant="outline" className="rounded-xl px-10 h-16 text-lg border-2 border-slate-900 hover:bg-slate-900 hover:text-white transition-all">
                                    ส่งอีเมลสอบถาม
                                </Button>
                            </Link>
                        </div>
                        <div className="mt-8 text-slate-400 text-sm">
                            MicroFormula - ระบบบัญชีที่คุณไว้วางใจได้เสมอ
                        </div>
                    </div>
                </section>
            </main>

            {/* Footer */}
            <footer className="bg-slate-900 text-slate-400 py-20 border-t border-slate-800">
                <div className="container mx-auto px-12">
                    <div className="grid grid-cols-1 md:grid-cols-4 gap-12 mb-16">
                        <div className="col-span-2 space-y-4">
                            <h3 className="text-white text-2xl font-bold italic tracking-tighter flex items-center gap-2">
                                <div className="h-6 w-6 bg-blue-600 rounded flex items-center justify-center text-[10px] non-italic">M</div>
                                MicroFormula
                            </h3>
                            <p className="max-w-sm">ซอฟต์แวร์บริหารจัดการบัญชีที่พัฒนาโดยคนไทย เพื่อ SME ไทย ยกระดับธุรกิจของคุณเข้าสู่ยุคดิจิทัลอย่างยั่งยืน</p>
                        </div>
                        <div>
                            <h4 className="text-white font-bold mb-4 uppercase text-xs tracking-widest">เมนูหลัก</h4>
                            <ul className="space-y-2 text-sm">
                                <li><Link href="/" className="hover:text-blue-500">หน้าแรก</Link></li>
                                <li><Link href="/#features" className="hover:text-blue-500">คุณสมบัติ</Link></li>
                                <li><Link href="/pricing-details" className="hover:text-blue-500">แผนราคา</Link></li>
                            </ul>
                        </div>
                        <div>
                            <h4 className="text-white font-bold mb-4 uppercase text-xs tracking-widest">ซัพพอร์ต</h4>
                            <ul className="space-y-2 text-sm">
                                <li><Link href="/manual" className="hover:text-blue-500">คู่มือการใช้งาน</Link></li>
                                <li><Link href="/#contact" className="hover:text-blue-500">การช่วยเหลือ</Link></li>
                                <li><Link href="/privacy" className="hover:text-blue-500">นโยบายความเป็นส่วนตัว</Link></li>
                            </ul>
                        </div>
                    </div>
                    <div className="flex flex-col md:flex-row justify-between items-center pt-8 border-t border-slate-800 gap-4">
                        <p className="text-xs italic underline">© {new Date().getFullYear()} WebShardow. Built with Next.js & Supabase.</p>
                        <div className="flex gap-6">
                            <span className="text-xs uppercase tracking-widest">Thailand 🇹🇭</span>
                        </div>
                    </div>
                </div>
            </footer>
        </div>
    );
}

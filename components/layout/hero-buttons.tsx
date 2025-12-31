"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { useProfile } from "@/hooks/use-profile";
import { enableDemoMode } from "@/lib/mock-auth";
import { toast } from "sonner";

export function HeroButtons() {
    const { profile, loading } = useProfile();
    const router = useRouter();

    const handleDemoMode = () => {
        enableDemoMode();
        toast.success("เข้าสู่โหมดทดลองใช้งาน! 🚀");
        router.push("/dashboard");
    };

    if (loading) {
        return (
            <div className="flex justify-center gap-4">
                <Button size="lg" disabled className="h-12 px-8 text-lg">กำลังโหลด...</Button>
            </div>
        );
    }

    if (profile) {
        return (
            <div className="flex justify-center gap-4">
                <Link href="/dashboard">
                    <Button size="lg" className="h-12 px-8 text-lg">ไปที่แดชบอร์ดของคุณ</Button>
                </Link>
            </div>
        );
    }

    return (
        <div className="flex flex-col sm:flex-row justify-center gap-4">
            <Button
                size="lg"
                className="h-12 px-8 text-lg bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700"
                onClick={handleDemoMode}
            >
                🚀 ทดลองใช้เลย (ไม่ต้อง Login)
            </Button>
            <Link href="/login">
                <Button size="lg" variant="outline" className="h-12 px-8 text-lg border-2">เข้าสู่ระบบ / สมัครสมาชิก</Button>
            </Link>
        </div>
    );
}

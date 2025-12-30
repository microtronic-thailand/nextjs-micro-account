"use client";

import { useEffect, useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { DollarSign, CreditCard, Users, TrendingUp, Loader2 } from "lucide-react";
import { getInvoices, getExpenses } from "@/lib/data-service";
import { Invoice, Expense } from "@/types";
import { format } from "date-fns";
import { th } from "date-fns/locale";

export default function DashboardPage() {
    const [invoices, setInvoices] = useState<Invoice[]>([]);
    const [expenses, setExpenses] = useState<Expense[]>([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        async function loadData() {
            setLoading(true);
            try {
                // Load both in parallel
                const [invData, expData] = await Promise.all([
                    getInvoices(),
                    getExpenses()
                ]);
                setInvoices(invData);
                setExpenses(expData);
            } catch (error) {
                console.error("Dashboard load error", error);
            } finally {
                setLoading(false);
            }
        }
        loadData();
    }, []);

    // --- Calculations ---

    // 1. Total Revenue (รายรับ) - Based on invoices not cancelled
    // Note: In strict accounting, maybe only 'paid', but for overview 'issued' is usually booked revenue (Accrual basis).
    // Let's count 'issued', 'paid', 'overdue'. Exclude 'draft', 'cancelled'.
    const validRevenueInvoices = invoices.filter(i => ['issued', 'paid', 'overdue'].includes(i.status));
    const totalRevenue = validRevenueInvoices.reduce((sum, i) => sum + i.grandTotal, 0);

    // 2. Total Expenses (รายจ่าย)
    const totalExpenses = expenses.reduce((sum, e) => sum + e.amount, 0);

    // 3. Accounts Receivable (ลูกหนี้การค้า) - Waiting for payment
    const pendingInvoices = invoices.filter(i => ['issued', 'overdue'].includes(i.status));
    const totalReceivable = pendingInvoices.reduce((sum, i) => sum + i.grandTotal, 0);

    // 4. Net Profit (กำไรสุทธิ) - Simple calc
    const netProfit = totalRevenue - totalExpenses;

    // Recent Invoices (Top 5)
    // Assuming API sort, but re-sorting here to be safe if API changes
    const recentInvoices = [...invoices]
        .sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime())
        .slice(0, 5);

    if (loading) {
        return (
            <div className="flex h-screen items-center justify-center">
                <Loader2 className="h-8 w-8 animate-spin text-slate-400" />
            </div>
        );
    }

    return (
        <div className="space-y-6 animate-in fade-in duration-500">
            <div>
                <h2 className="text-3xl font-bold tracking-tight">ภาพรวม (Dashboard)</h2>
                <p className="text-muted-foreground">สรุปข้อมูลทางการเงินและสถานะบริษัทของคุณ</p>
            </div>

            <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
                <Card>
                    <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                        <CardTitle className="text-sm font-medium">รายรับรวม (Total Revenue)</CardTitle>
                        <DollarSign className="h-4 w-4 text-green-500" />
                    </CardHeader>
                    <CardContent>
                        <div className="text-2xl font-bold text-green-600">
                            ฿{totalRevenue.toLocaleString(undefined, { minimumFractionDigits: 2 })}
                        </div>
                        <p className="text-xs text-muted-foreground">จากใบแจ้งหนี้ {validRevenueInvoices.length} ใบ</p>
                    </CardContent>
                </Card>
                <Card>
                    <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                        <CardTitle className="text-sm font-medium">ค่าใช้จ่าย (Expenses)</CardTitle>
                        <CreditCard className="h-4 w-4 text-red-500" />
                    </CardHeader>
                    <CardContent>
                        <div className="text-2xl font-bold text-red-600">
                            ฿{totalExpenses.toLocaleString(undefined, { minimumFractionDigits: 2 })}
                        </div>
                        <p className="text-xs text-muted-foreground">บันทึกแล้ว {expenses.length} รายการ</p>
                    </CardContent>
                </Card>
                <Card>
                    <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                        <CardTitle className="text-sm font-medium">ลูกหนี้การค้า (Receivable)</CardTitle>
                        <Users className="h-4 w-4 text-orange-500" />
                    </CardHeader>
                    <CardContent>
                        <div className="text-2xl font-bold text-orange-600">
                            ฿{totalReceivable.toLocaleString(undefined, { minimumFractionDigits: 2 })}
                        </div>
                        <p className="text-xs text-muted-foreground">รอเก็บเงิน {pendingInvoices.length} รายการ</p>
                    </CardContent>
                </Card>
                <Card>
                    <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                        <CardTitle className="text-sm font-medium">กำไรสุทธิ (Net Profit)</CardTitle>
                        <TrendingUp className="h-4 w-4 text-blue-500" />
                    </CardHeader>
                    <CardContent>
                        <div className={`text-2xl font-bold ${netProfit >= 0 ? 'text-blue-600' : 'text-red-600'}`}>
                            ฿{netProfit.toLocaleString(undefined, { minimumFractionDigits: 2 })}
                        </div>
                        <p className="text-xs text-muted-foreground">รายรับ - รายจ่าย</p>
                    </CardContent>
                </Card>
            </div>

            <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-7">
                <Card className="col-span-4">
                    <CardHeader>
                        <CardTitle>ความเคลื่อนไหวล่าสุด (Expenses Overview)</CardTitle>
                    </CardHeader>
                    <CardContent>
                        {expenses.length === 0 ? (
                            <div className="flex flex-col items-center justify-center p-8 text-muted-foreground">
                                <CreditCard className="h-8 w-8 mb-2 opacity-50" />
                                <p>ยังไม่มีรายการค่าใช้จ่าย</p>
                            </div>
                        ) : (
                            <div className="space-y-4">
                                {expenses.slice(0, 5).map((expense) => (
                                    <div key={expense.id} className="flex items-center justify-between border-b pb-2 last:border-0 last:pb-0">
                                        <div>
                                            <div className="font-medium">{expense.description}</div>
                                            <div className="text-xs text-muted-foreground">
                                                {format(new Date(expense.date), "d MMM yyyy", { locale: th })} | {expense.category}
                                            </div>
                                        </div>
                                        <div className="text-right font-medium text-red-600">
                                            -฿{expense.amount.toLocaleString()}
                                        </div>
                                    </div>
                                ))}
                            </div>
                        )}

                    </CardContent>
                </Card>
                <Card className="col-span-3">
                    <CardHeader>
                        <CardTitle>ใบแจ้งหนี้ล่าสุด</CardTitle>
                    </CardHeader>
                    <CardContent>
                        {recentInvoices.length === 0 ? (
                            <div className="flex flex-col items-center justify-center p-8 text-muted-foreground">
                                <DollarSign className="h-8 w-8 mb-2 opacity-50" />
                                <p>ยังไม่มีรายการใบแจ้งหนี้</p>
                            </div>
                        ) : (
                            <div className="space-y-4">
                                {recentInvoices.map((inv) => (
                                    <div key={inv.id} className="flex items-center justify-between border-b pb-2 last:border-0 last:pb-0">
                                        <div>
                                            <div className="font-medium">{inv.number}</div>
                                            <div className="text-xs text-muted-foreground">{inv.customerName}</div>
                                        </div>
                                        <div className="text-right">
                                            <div className="font-medium">฿{inv.grandTotal.toLocaleString()}</div>
                                            <div className={`text-xs ${inv.status === 'paid' ? 'text-green-600' :
                                                    inv.status === 'overdue' ? 'text-red-500' : 'text-orange-500'
                                                }`}>
                                                {inv.status === 'paid' ? 'ชำระแล้ว' :
                                                    inv.status === 'overdue' ? 'เกินกำหนด' : 'รอชำระ'}
                                            </div>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        )}
                    </CardContent>
                </Card>
            </div>
        </div>
    );
}

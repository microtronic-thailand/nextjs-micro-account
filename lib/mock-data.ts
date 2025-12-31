import { Customer, Product, Invoice, Expense, Quotation } from '@/types';

export const MOCK_CUSTOMERS: Customer[] = [
    {
        id: '1',
        name: 'บริษัท เทคโนโลยีสมัยใหม่ จำกัด',
        taxId: '0105558123456',
        address: '123 ถนนสุขุมวิท แขวงคลองเตย เขตคลองเตย กรุงเทพมหานคร 10110',
        email: 'contact@moderntech.co.th',
        phone: '02-123-4567',
        branch: 'สำนักงานใหญ่',
        createdAt: new Date('2024-01-15')
    },
    {
        id: '2',
        name: 'ห้างหุ้นส่วนจำกัด ดิจิทัล โซลูชั่น',
        taxId: '0205559234567',
        address: '456 ถนนพระราม 4 แขวงปทุมวัน เขตปทุมวัน กรุงเทพมหานคร 10330',
        email: 'info@digitalsolutions.com',
        phone: '02-987-6543',
        branch: 'สำนักงานใหญ่',
        createdAt: new Date('2024-02-20')
    },
    {
        id: '3',
        name: 'ร้านกาแฟบ้านสวน',
        taxId: null,
        address: '789/12 ซอยอารีย์ แขวงสามเสนใน เขตพญาไท กรุงเทพมหานคร 10400',
        email: 'cafe@baansuan.com',
        phone: '089-123-4567',
        branch: null,
        createdAt: new Date('2024-03-10')
    }
];

export const MOCK_PRODUCTS: Product[] = [
    {
        id: '1',
        name: 'MacBook Pro 16" M3 Max',
        sku: 'APPLE-MBP16-M3MAX',
        price: 125000,
        unit: 'เครื่อง',
        description: 'MacBook Pro 16 นิ้ว ชิป M3 Max, 36GB RAM, 1TB SSD',
        stockQuantity: 5,
        minStockLevel: 2
    },
    {
        id: '2',
        name: 'Dell UltraSharp 27" 4K Monitor',
        sku: 'DELL-U2723DE',
        price: 28500,
        unit: 'เครื่อง',
        description: 'จอมอนิเตอร์ Dell 27 นิ้ว ความละเอียด 4K IPS',
        stockQuantity: 12,
        minStockLevel: 3
    },
    {
        id: '3',
        name: 'Logitech MX Master 3S',
        sku: 'LOGI-MXMASTER3S',
        price: 3900,
        unit: 'ชิ้น',
        description: 'เมาส์ไร้สาย Logitech MX Master 3S สำหรับมืออาชีพ',
        stockQuantity: 25,
        minStockLevel: 10
    },
    {
        id: '4',
        name: 'Microsoft Office 365 Business Standard',
        sku: 'MS-O365-BIZ',
        price: 8900,
        unit: 'License',
        description: 'Microsoft Office 365 Business Standard (1 ปี)',
        stockQuantity: 100,
        minStockLevel: 20
    },
    {
        id: '5',
        name: 'บริการติดตั้งระบบเครือข่าย',
        sku: 'SVC-NETWORK',
        price: 15000,
        unit: 'งาน',
        description: 'บริการติดตั้งและตั้งค่าระบบเครือข่ายสำหรับสำนักงาน',
        stockQuantity: 0,
        minStockLevel: 0
    }
];

export const MOCK_INVOICES: Invoice[] = [
    {
        id: '1',
        number: 'INV-2024120001',
        date: new Date('2024-12-01'),
        dueDate: new Date('2024-12-31'),
        customerId: '1',
        customerName: 'บริษัท เทคโนโลยีสมัยใหม่ จำกัด',
        customerAddress: '123 ถนนสุขุมวิท แขวงคลองเตย เขตคลองเตย กรุงเทพมหานคร 10110',
        customerTaxId: '0105558123456',
        subtotal: 250000,
        discountTotal: 12500,
        vatTotal: 16625,
        grandTotal: 254125,
        status: 'paid',
        notes: 'ขอบคุณสำหรับการสั่งซื้อ',
        createdAt: new Date('2024-12-01'),
        items: [
            {
                id: '1',
                productId: '1',
                description: 'MacBook Pro 16" M3 Max',
                quantity: 2,
                price: 125000,
                discount: 5,
                vatRate: 7
            }
        ]
    },
    {
        id: '2',
        number: 'INV-2024120002',
        date: new Date('2024-12-15'),
        dueDate: new Date('2025-01-15'),
        customerId: '2',
        customerName: 'ห้างหุ้นส่วนจำกัด ดิจิทัล โซลูชั่น',
        customerAddress: '456 ถนนพระราม 4 แขวงปทุมวัน เขตปทุมวัน กรุงเทพมหานคร 10330',
        customerTaxId: '0205559234567',
        subtotal: 142500,
        discountTotal: 0,
        vatTotal: 9975,
        grandTotal: 152475,
        status: 'issued',
        notes: null,
        createdAt: new Date('2024-12-15'),
        items: [
            {
                id: '2',
                productId: '2',
                description: 'Dell UltraSharp 27" 4K Monitor',
                quantity: 5,
                price: 28500,
                discount: 0,
                vatRate: 7
            }
        ]
    }
];

export const MOCK_EXPENSES: Expense[] = [
    {
        id: '1',
        description: 'ค่าเช่าสำนักงาน เดือนธันวาคม 2024',
        amount: 35000,
        isVat: false,
        vatAmount: 0,
        category: 'rent',
        date: new Date('2024-12-01'),
        recipient: 'บริษัท อาคารสำนักงาน จำกัด',
        receiptUrl: null,
        paymentStatus: 'paid',
        isReconciled: true,
        whtAmount: 0,
        createdAt: new Date('2024-12-01')
    },
    {
        id: '2',
        description: 'เงินเดือนพนักงาน ประจำเดือนธันวาคม',
        amount: 180000,
        isVat: false,
        vatAmount: 0,
        category: 'salary',
        date: new Date('2024-12-25'),
        recipient: 'พนักงานทุกคน',
        receiptUrl: null,
        paymentStatus: 'paid',
        isReconciled: true,
        whtAmount: 5400,
        createdAt: new Date('2024-12-25')
    },
    {
        id: '3',
        description: 'ค่าไปรษณีย์และขนส่ง',
        amount: 1500,
        isVat: true,
        vatAmount: 105,
        category: 'shipping',
        date: new Date('2024-12-20'),
        recipient: 'Kerry Express',
        receiptUrl: null,
        paymentStatus: 'paid',
        isReconciled: false,
        whtAmount: 0,
        createdAt: new Date('2024-12-20')
    },
    {
        id: '4',
        description: 'ค่าน้ำ-ค่าไฟ เดือนธันวาคม',
        amount: 8500,
        isVat: true,
        vatAmount: 595,
        category: 'utilities',
        date: new Date('2024-12-10'),
        recipient: 'การไฟฟ้านครหลวง',
        receiptUrl: null,
        paymentStatus: 'paid',
        isReconciled: true,
        whtAmount: 0,
        createdAt: new Date('2024-12-10')
    }
];

export const MOCK_QUOTATIONS: Quotation[] = [
    {
        id: '1',
        number: 'QUO-2024120001',
        date: new Date('2024-12-28'),
        dueDate: new Date('2025-01-15'),
        customerId: '3',
        customerName: 'ร้านกาแฟบ้านสวน',
        customerAddress: '789/12 ซอยอารีย์ แขวงสามเสนใน เขตพญาไท กรุงเทพมหานคร 10400',
        customerTaxId: null,
        subtotal: 89000,
        discountTotal: 4450,
        vatTotal: 5918.5,
        grandTotal: 90468.5,
        status: 'pending',
        notes: 'ใบเสนอราคานี้มีอายุ 15 วัน',
        createdAt: new Date('2024-12-28'),
        items: [
            {
                id: '1',
                productId: '4',
                description: 'Microsoft Office 365 Business Standard (1 ปี)',
                quantity: 10,
                price: 8900,
                discount: 5,
                vatRate: 7
            }
        ]
    }
];

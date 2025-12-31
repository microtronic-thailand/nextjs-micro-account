-- Enable UUID extension
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

-- 1. Profiles & RBAC
CREATE TYPE user_role AS ENUM ('user', 'admin', 'super_admin');

CREATE TABLE profiles (
    id UUID REFERENCES auth.users(id) ON DELETE CASCADE PRIMARY KEY,
    email TEXT UNIQUE NOT NULL,
    role user_role DEFAULT 'user' NOT NULL,
    points INTEGER DEFAULT 0,
    must_change_password BOOLEAN DEFAULT false,
    last_activity_at TIMESTAMPTZ DEFAULT timezone('utc'::text, now()),
    created_at TIMESTAMPTZ DEFAULT timezone('utc'::text, now()) NOT NULL,
    updated_at TIMESTAMPTZ DEFAULT timezone('utc'::text, now()) NOT NULL
);

-- 2. Customers Table
CREATE TABLE customers (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    created_at TIMESTAMPTZ DEFAULT timezone('utc'::text, now()) NOT NULL,
    updated_at TIMESTAMPTZ DEFAULT timezone('utc'::text, now()) NOT NULL,
    name TEXT NOT NULL,
    tax_id TEXT,
    branch TEXT,
    address TEXT,
    email TEXT,
    phone TEXT,
    owner_id UUID REFERENCES auth.users(id) DEFAULT auth.uid()
);

-- 3. Products Table
CREATE TABLE products (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    created_at TIMESTAMPTZ DEFAULT timezone('utc'::text, now()) NOT NULL,
    updated_at TIMESTAMPTZ DEFAULT timezone('utc'::text, now()) NOT NULL,
    name TEXT NOT NULL,
    sku TEXT UNIQUE,
    description TEXT,
    price NUMERIC(15, 2) NOT NULL DEFAULT 0,
    unit TEXT DEFAULT 'ชิ้น',
    category TEXT DEFAULT 'general',
    stock_quantity NUMERIC DEFAULT 0,
    min_stock_level NUMERIC DEFAULT 0,
    owner_id UUID REFERENCES auth.users(id) DEFAULT auth.uid()
);

-- 4. Quotations Table
CREATE TABLE quotations (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    created_at TIMESTAMPTZ DEFAULT timezone('utc'::text, now()) NOT NULL,
    updated_at TIMESTAMPTZ DEFAULT timezone('utc'::text, now()) NOT NULL,
    number TEXT NOT NULL,
    date DATE NOT NULL,
    due_date DATE NOT NULL,
    status TEXT NOT NULL DEFAULT 'draft', -- draft, sent, accepted, rejected, invoiced, expired
    notes TEXT,
    
    -- Customer Snapshot
    customer_id UUID REFERENCES customers(id),
    customer_name TEXT NOT NULL,
    customer_address TEXT,
    customer_tax_id TEXT,
    
    -- Totals
    subtotal NUMERIC(15, 2) NOT NULL DEFAULT 0,
    discount_total NUMERIC(15, 2) NOT NULL DEFAULT 0,
    vat_total NUMERIC(15, 2) NOT NULL DEFAULT 0,
    grand_total NUMERIC(15, 2) NOT NULL DEFAULT 0,
    
    owner_id UUID REFERENCES auth.users(id) DEFAULT auth.uid()
);

-- 5. Quotation Items Table
CREATE TABLE quotation_items (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    quotation_id UUID REFERENCES quotations(id) ON DELETE CASCADE,
    product_id UUID REFERENCES products(id),
    description TEXT NOT NULL,
    quantity NUMERIC(15, 2) NOT NULL DEFAULT 1,
    price NUMERIC(15, 2) NOT NULL DEFAULT 0,
    discount NUMERIC(15, 2) DEFAULT 0,
    vat_rate NUMERIC(5, 2) DEFAULT 7
);

-- 6. Invoices Table
CREATE TABLE invoices (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    created_at TIMESTAMPTZ DEFAULT timezone('utc'::text, now()) NOT NULL,
    updated_at TIMESTAMPTZ DEFAULT timezone('utc'::text, now()) NOT NULL,
    number TEXT NOT NULL,
    date DATE NOT NULL,
    due_date DATE NOT NULL,
    status TEXT NOT NULL DEFAULT 'draft', -- draft, issued, paid, overdue, cancelled
    notes TEXT,
    
    -- Links
    customer_id UUID REFERENCES customers(id),
    quotation_id UUID REFERENCES quotations(id),
    
    -- Customer Snapshot
    customer_name TEXT NOT NULL,
    customer_address TEXT,
    customer_tax_id TEXT,
    
    -- Totals
    subtotal NUMERIC(15, 2) NOT NULL DEFAULT 0,
    discount_total NUMERIC(15, 2) NOT NULL DEFAULT 0,
    vat_total NUMERIC(15, 2) NOT NULL DEFAULT 0,
    grand_total NUMERIC(15, 2) NOT NULL DEFAULT 0,
    wht_total NUMERIC(15, 2) DEFAULT 0,
    
    owner_id UUID REFERENCES auth.users(id) DEFAULT auth.uid()
);

-- 7. Invoice Items Table
CREATE TABLE invoice_items (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    invoice_id UUID REFERENCES invoices(id) ON DELETE CASCADE,
    product_id UUID REFERENCES products(id),
    description TEXT NOT NULL,
    quantity NUMERIC(15, 2) NOT NULL DEFAULT 1,
    price NUMERIC(15, 2) NOT NULL DEFAULT 0,
    discount NUMERIC(15, 2) DEFAULT 0,
    vat_rate NUMERIC(5, 2) DEFAULT 7
);

-- 8. Expenses Table
CREATE TABLE expenses (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    created_at TIMESTAMPTZ DEFAULT timezone('utc'::text, now()) NOT NULL,
    updated_at TIMESTAMPTZ DEFAULT timezone('utc'::text, now()) NOT NULL,
    description TEXT NOT NULL,
    amount NUMERIC(15, 2) NOT NULL DEFAULT 0,
    is_vat BOOLEAN DEFAULT false,
    vat_amount NUMERIC(15, 2) DEFAULT 0,
    category TEXT DEFAULT 'general',
    date DATE NOT NULL,
    recipient TEXT,
    owner_id UUID REFERENCES auth.users(id) DEFAULT auth.uid()
);

-- 9. Stock Movements Table
CREATE TABLE stock_movements (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    created_at TIMESTAMPTZ DEFAULT timezone('utc'::text, now()) NOT NULL,
    product_id UUID REFERENCES products(id) ON DELETE CASCADE,
    type TEXT NOT NULL, -- 'in', 'out', 'adjustment'
    quantity NUMERIC NOT NULL,
    reference_id UUID, -- invoice_id or other transaction id
    notes TEXT,
    owner_id UUID REFERENCES auth.users(id) DEFAULT auth.uid()
);

-- 10. Settings & Announcements
CREATE TABLE settings (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    key TEXT UNIQUE NOT NULL,
    value TEXT,
    updated_at TIMESTAMPTZ DEFAULT timezone('utc'::text, now()) NOT NULL
);

CREATE TABLE announcements (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    title TEXT NOT NULL,
    content TEXT NOT NULL,
    is_active BOOLEAN DEFAULT true,
    created_at TIMESTAMPTZ DEFAULT timezone('utc'::text, now()) NOT NULL,
    author_id UUID REFERENCES auth.users(id)
);

-- FUNCTIONS & TRIGGERS

-- Helper function to check if user is admin or super_admin
CREATE OR REPLACE FUNCTION public.is_admin()
RETURNS BOOLEAN AS $$
BEGIN
    RETURN EXISTS (
        SELECT 1 FROM public.profiles 
        WHERE id = auth.uid() AND role IN ('admin', 'super_admin')
    );
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- Trigger to create profile on signup
CREATE OR REPLACE FUNCTION public.handle_new_user()
RETURNS TRIGGER AS $$
BEGIN
    INSERT INTO public.profiles (id, email, role)
    VALUES (
        new.id, 
        new.email, 
        CASE 
            WHEN (SELECT COUNT(*) FROM public.profiles) = 0 THEN 'super_admin'::user_role
            ELSE 'user'::user_role
        END
    );
    RETURN NEW;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

CREATE TRIGGER on_auth_user_created
    AFTER INSERT ON auth.users
    FOR EACH ROW EXECUTE FUNCTION public.handle_new_user();

-- RPC for atomic stock updates
CREATE OR REPLACE FUNCTION increment_stock(row_id UUID, count NUMERIC)
RETURNS VOID AS $$
BEGIN
  UPDATE products
  SET stock_quantity = stock_quantity + count
  WHERE id = row_id;
END;
$$ LANGUAGE plpgsql;

-- RLS POLICIES

-- Profiles
ALTER TABLE profiles ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Public profiles are viewable by everyone" ON profiles FOR SELECT USING (true);
CREATE POLICY "Users can update their own profiles" ON profiles FOR UPDATE USING (auth.uid() = id);

-- Settings (Everyone can read, only super_admin can update)
ALTER TABLE settings ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Allow public read settings" ON settings FOR SELECT USING (true);
CREATE POLICY "Allow admins to manage settings" ON settings FOR ALL USING (public.is_admin());

-- Announcements (Everyone can read active, admins can manage)
ALTER TABLE announcements ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Allow public read active announcements" ON announcements FOR SELECT USING (is_active = true);
CREATE POLICY "Allow admins to manage announcements" ON announcements FOR ALL USING (public.is_admin());

-- Business Tables (Customers, Products, Invoices, Quotations, Expenses, Stock Movements)
ALTER TABLE customers ENABLE ROW LEVEL SECURITY;
ALTER TABLE products ENABLE ROW LEVEL SECURITY;
ALTER TABLE invoices ENABLE ROW LEVEL SECURITY;
ALTER TABLE invoice_items ENABLE ROW LEVEL SECURITY;
ALTER TABLE quotations ENABLE ROW LEVEL SECURITY;
ALTER TABLE quotation_items ENABLE ROW LEVEL SECURITY;
ALTER TABLE expenses ENABLE ROW LEVEL SECURITY;
ALTER TABLE stock_movements ENABLE ROW LEVEL SECURITY;

-- Generic Policy for Owner or Admin
CREATE POLICY "Users can manage their own customers" ON customers FOR ALL USING (auth.uid() = owner_id OR public.is_admin());
CREATE POLICY "Anyone can view products" ON products FOR SELECT USING (true);
CREATE POLICY "Admins can manage products" ON products FOR ALL USING (public.is_admin());
CREATE POLICY "Users can manage their own invoices" ON invoices FOR ALL USING (auth.uid() = owner_id OR public.is_admin());
CREATE POLICY "Users can manage their own invoice items" ON invoice_items FOR ALL USING (EXISTS (SELECT 1 FROM invoices WHERE invoices.id = invoice_items.invoice_id AND (invoices.owner_id = auth.uid() OR public.is_admin())));
CREATE POLICY "Users can manage their own quotations" ON quotations FOR ALL USING (auth.uid() = owner_id OR public.is_admin());
CREATE POLICY "Users can manage their own quotation items" ON quotation_items FOR ALL USING (EXISTS (SELECT 1 FROM quotations WHERE quotations.id = quotation_items.quotation_id AND (quotations.owner_id = auth.uid() OR public.is_admin())));
CREATE POLICY "Users can manage their own expenses" ON expenses FOR ALL USING (auth.uid() = owner_id OR public.is_admin());
CREATE POLICY "Users can manage their own stock movements" ON stock_movements FOR ALL USING (auth.uid() = owner_id OR public.is_admin());

-- INITIAL DATA
INSERT INTO settings (key, value) VALUES 
('company_name', 'Microtronic Account'),
('company_logo_url', '')
ON CONFLICT (key) DO NOTHING;

-- INDEXES
CREATE INDEX idx_customers_owner ON customers(owner_id);
CREATE INDEX idx_invoices_owner ON invoices(owner_id);
CREATE INDEX idx_invoices_customer ON invoices(customer_id);
CREATE INDEX idx_quotations_owner ON quotations(owner_id);
CREATE INDEX idx_quotations_customer ON quotations(customer_id);
CREATE INDEX idx_products_sku ON products(sku);
CREATE INDEX idx_stock_product ON stock_movements(product_id);

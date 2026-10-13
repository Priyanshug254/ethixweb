-- ====================================================================
-- ETHIXWEB INDIA — LEADS SCHEMA MIGRATION
-- Migration: 20261014_create_leads_table.sql
-- Description: Production-grade schema for enquiry submissions, 
--              Row Level Security, role checks, and audit timestamps.
-- ====================================================================

-- 1. Create table
CREATE TABLE IF NOT EXISTS public.leads (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    full_name TEXT NOT NULL CHECK (char_length(trim(full_name)) >= 2 AND char_length(full_name) <= 100),
    email TEXT NOT NULL CHECK (email ~* '^[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Za-z]{2,}$'),
    phone TEXT CHECK (phone IS NULL OR char_length(phone) <= 25),
    company TEXT CHECK (company IS NULL OR char_length(company) <= 120),
    service TEXT NOT NULL CHECK (char_length(trim(service)) >= 2 AND char_length(service) <= 80),
    budget TEXT CHECK (budget IS NULL OR char_length(budget) <= 80),
    message TEXT NOT NULL CHECK (char_length(trim(message)) >= 10 AND char_length(message) <= 3000),
    consent BOOLEAN NOT NULL DEFAULT false CHECK (consent = true),
    status TEXT NOT NULL DEFAULT 'new' CHECK (status IN ('new', 'contacted', 'qualified', 'closed', 'archived')),
    ip_hash TEXT,
    created_at TIMESTAMPTZ NOT NULL DEFAULT timezone('utc'::text, now()),
    updated_at TIMESTAMPTZ NOT NULL DEFAULT timezone('utc'::text, now())
);

-- 2. Indexes for efficient administrative querying and filtering
CREATE INDEX IF NOT EXISTS idx_leads_created_at ON public.leads (created_at DESC);
CREATE INDEX IF NOT EXISTS idx_leads_status ON public.leads (status);
CREATE INDEX IF NOT EXISTS idx_leads_email ON public.leads (email);

-- 3. Automatic updated_at trigger function
CREATE OR REPLACE FUNCTION public.set_current_timestamp_updated_at()
RETURNS TRIGGER AS $$
BEGIN
    NEW.updated_at = timezone('utc'::text, now());
    RETURN NEW;
END;
$$ LANGUAGE plpgsql;

DROP TRIGGER IF EXISTS trg_leads_updated_at ON public.leads;
CREATE TRIGGER trg_leads_updated_at
    BEFORE UPDATE ON public.leads
    FOR EACH ROW
    EXECUTE FUNCTION public.set_current_timestamp_updated_at();

-- 4. Enable Row Level Security (RLS)
ALTER TABLE public.leads ENABLE ROW LEVEL SECURITY;

-- 5. RLS Policies:
-- Allow authenticated users (logged-in administrators) to view leads
CREATE POLICY "Allow authenticated admins to read leads"
    ON public.leads
    FOR SELECT
    TO authenticated
    USING (true);

-- Allow authenticated admins to update lead status/fields
CREATE POLICY "Allow authenticated admins to update leads"
    ON public.leads
    FOR UPDATE
    TO authenticated
    USING (true)
    WITH CHECK (true);

-- Allow authenticated admins to delete leads
CREATE POLICY "Allow authenticated admins to delete leads"
    ON public.leads
    FOR DELETE
    TO authenticated
    USING (true);

-- Allow server API / service_role full access (service_role bypasses RLS by default in Supabase)
-- Public / Anon INSERT policy: permits validated new lead insertions with status 'new'
CREATE POLICY "Allow public insert of valid new leads"
    ON public.leads
    FOR INSERT
    TO anon, authenticated
    WITH CHECK (
        status = 'new' AND 
        consent = true AND
        char_length(trim(full_name)) >= 2 AND
        char_length(trim(message)) >= 10
    );

COMMENT ON TABLE public.leads IS 'Enquiry leads collected via Ethixweb India website';

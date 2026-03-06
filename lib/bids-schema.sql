-- EZLY Bid Management System - Database Schema

-- Projects Table (homeowner projects)
CREATE TABLE IF NOT EXISTS projects (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  homeowner_id uuid NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
  title text NOT NULL,
  description text,
  category text NOT NULL, -- 'kitchen', 'bathroom', 'roofing', etc.
  budget_min decimal(10,2),
  budget_max decimal(10,2),
  timeline text, -- '1-2 weeks', '1 month', etc.
  status text DEFAULT 'open' CHECK (status IN ('open', 'in_progress', 'completed', 'cancelled')),
  location text,
  images jsonb DEFAULT '[]'::jsonb, -- Array of image URLs
  created_at timestamp DEFAULT now(),
  updated_at timestamp DEFAULT now()
);

-- Bids Table (contractor bids on projects)
CREATE TABLE IF NOT EXISTS bids (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  project_id uuid NOT NULL REFERENCES projects(id) ON DELETE CASCADE,
  contractor_id uuid NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
  amount decimal(10,2) NOT NULL,
  timeline text, -- '4-6 weeks', etc.
  message text,
  status text DEFAULT 'pending' CHECK (status IN ('pending', 'accepted', 'rejected', 'withdrawn')),
  details jsonb DEFAULT '{}'::jsonb, -- {startDate, completionDate, laborCost, materialsCost, warranty}
  submitted_at timestamp DEFAULT now(),
  updated_at timestamp DEFAULT now()
);

-- Contracts Table (accepted bids that become contracts)
CREATE TABLE IF NOT EXISTS contracts (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  bid_id uuid NOT NULL REFERENCES bids(id) ON DELETE CASCADE UNIQUE,
  project_id uuid NOT NULL REFERENCES projects(id) ON DELETE CASCADE,
  homeowner_id uuid NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
  contractor_id uuid NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
  amount decimal(10,2) NOT NULL,
  start_date date,
  completion_date date,
  status text DEFAULT 'pending' CHECK (status IN ('pending', 'active', 'completed', 'cancelled')),
  contract_document_url text, -- PDF URL
  created_at timestamp DEFAULT now(),
  updated_at timestamp DEFAULT now()
);

-- Create Indexes for Performance
CREATE INDEX IF NOT EXISTS idx_projects_homeowner ON projects(homeowner_id);
CREATE INDEX IF NOT EXISTS idx_projects_status ON projects(status);
CREATE INDEX IF NOT EXISTS idx_projects_category ON projects(category);
CREATE INDEX IF NOT EXISTS idx_bids_project ON bids(project_id);
CREATE INDEX IF NOT EXISTS idx_bids_contractor ON bids(contractor_id);
CREATE INDEX IF NOT EXISTS idx_bids_status ON bids(status);
CREATE INDEX IF NOT EXISTS idx_contracts_homeowner ON contracts(homeowner_id);
CREATE INDEX IF NOT EXISTS idx_contracts_contractor ON contracts(contractor_id);
CREATE INDEX IF NOT EXISTS idx_contracts_status ON contracts(status);

-- Enable Row Level Security
ALTER TABLE projects ENABLE ROW LEVEL SECURITY;
ALTER TABLE bids ENABLE ROW LEVEL SECURITY;
ALTER TABLE contracts ENABLE ROW LEVEL SECURITY;

-- RLS Policies: Projects
CREATE POLICY "Homeowners can read own projects"
  ON projects FOR SELECT
  USING (homeowner_id = auth.uid());

CREATE POLICY "Homeowners can create projects"
  ON projects FOR INSERT
  WITH CHECK (homeowner_id = auth.uid());

CREATE POLICY "Homeowners can update own projects"
  ON projects FOR UPDATE
  USING (homeowner_id = auth.uid());

CREATE POLICY "Contractors can read public projects"
  ON projects FOR SELECT
  USING (status = 'open');

-- RLS Policies: Bids
CREATE POLICY "Homeowners can read bids on own projects"
  ON bids FOR SELECT
  USING (
    project_id IN (
      SELECT id FROM projects WHERE homeowner_id = auth.uid()
    )
  );

CREATE POLICY "Contractors can read own bids"
  ON bids FOR SELECT
  USING (contractor_id = auth.uid());

CREATE POLICY "Contractors can create bids"
  ON bids FOR INSERT
  WITH CHECK (contractor_id = auth.uid());

CREATE POLICY "Contractors can update own bids"
  ON bids FOR UPDATE
  USING (contractor_id = auth.uid());

CREATE POLICY "Homeowners can update bids on own projects"
  ON bids FOR UPDATE
  USING (
    project_id IN (
      SELECT id FROM projects WHERE homeowner_id = auth.uid()
    )
  );

-- RLS Policies: Contracts
CREATE POLICY "Homeowners can read own contracts"
  ON contracts FOR SELECT
  USING (homeowner_id = auth.uid());

CREATE POLICY "Contractors can read own contracts"
  ON contracts FOR SELECT
  USING (contractor_id = auth.uid());

CREATE POLICY "Homeowners can create contracts"
  ON contracts FOR INSERT
  WITH CHECK (homeowner_id = auth.uid());

CREATE POLICY "Homeowners can update own contracts"
  ON contracts FOR UPDATE
  USING (homeowner_id = auth.uid());

-- Seed Sample Data for Testing
INSERT INTO projects (homeowner_id, title, description, category, budget_min, budget_max, timeline, status, location)
SELECT
  u.id,
  'Kitchen Remodel - Complete Renovation',
  'Full kitchen renovation including new cabinets, countertops, appliances, and flooring. Looking for high-quality work with references.',
  'kitchen',
  25000,
  35000,
  '6-8 weeks',
  'open',
  'Salt Lake City, UT'
FROM auth.users u
WHERE u.email = 'homeowner@example.com'
ON CONFLICT DO NOTHING;

-- Note: Seed bids separately after contractors are set up

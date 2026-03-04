-- Admin Platform Settings Table
CREATE TABLE IF NOT EXISTS platform_settings (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  setting_key text NOT NULL UNIQUE,
  setting_value text,
  value_type text DEFAULT 'string', -- string, number, boolean, json
  description text,
  updated_by text,
  updated_at timestamp DEFAULT now(),
  created_at timestamp DEFAULT now()
);

-- Platform Statistics Table
CREATE TABLE IF NOT EXISTS platform_stats (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  stat_key text NOT NULL UNIQUE,
  stat_value decimal,
  stat_type text DEFAULT 'number', -- number, string, currency
  description text,
  updated_at timestamp DEFAULT now(),
  created_at timestamp DEFAULT now()
);

-- Create indexes
CREATE INDEX IF NOT EXISTS idx_platform_settings_key ON platform_settings(setting_key);
CREATE INDEX IF NOT EXISTS idx_platform_stats_key ON platform_stats(stat_key);

-- Enable RLS
ALTER TABLE platform_settings ENABLE ROW LEVEL SECURITY;
ALTER TABLE platform_stats ENABLE ROW LEVEL SECURITY;

-- Policies
CREATE POLICY "Admins can read platform settings"
  ON platform_settings FOR SELECT
  USING (auth.jwt() ->> 'email' = 'bpnelsen@gmail.com');

CREATE POLICY "Admins can update platform settings"
  ON platform_settings FOR UPDATE
  USING (auth.jwt() ->> 'email' = 'bpnelsen@gmail.com');

CREATE POLICY "Admins can insert platform settings"
  ON platform_settings FOR INSERT
  WITH CHECK (auth.jwt() ->> 'email' = 'bpnelsen@gmail.com');

CREATE POLICY "Admins can read platform stats"
  ON platform_stats FOR SELECT
  USING (auth.jwt() ->> 'email' = 'bpnelsen@gmail.com');

CREATE POLICY "Admins can update platform stats"
  ON platform_stats FOR UPDATE
  USING (auth.jwt() ->> 'email' = 'bpnelsen@gmail.com');

CREATE POLICY "Admins can insert platform stats"
  ON platform_stats FOR INSERT
  WITH CHECK (auth.jwt() ->> 'email' = 'bpnelsen@gmail.com');

-- Seed initial data
INSERT INTO platform_stats (stat_key, stat_value, stat_type, description) VALUES
  ('total_revenue', 247500, 'currency', 'All-time platform revenue'),
  ('active_projects', 12, 'number', 'Currently active projects'),
  ('total_contractors', 586, 'number', 'Total registered contractors'),
  ('total_homeowners', 89, 'number', 'Total registered homeowners'),
  ('monthly_revenue', 45000, 'currency', 'Revenue this month'),
  ('weekly_revenue', 12500, 'currency', 'Revenue this week'),
  ('avg_project_value', 3200, 'currency', 'Average project value'),
  ('completed_projects', 62, 'number', 'Completed projects'),
  ('completion_rate', 81, 'number', 'Project completion rate (%)')
ON CONFLICT (stat_key) DO NOTHING;

INSERT INTO platform_settings (setting_key, setting_value, value_type, description) VALUES
  ('platform_name', 'EZLY', 'string', 'Platform name'),
  ('platform_region', 'Salt Lake County, Utah', 'string', 'Operating region'),
  ('support_email', 'support@ezly.co', 'string', 'Support email address'),
  ('phone_number', '+1 (555) 123-4567', 'string', 'Support phone number'),
  ('commission_rate', '10', 'number', 'Commission rate percentage'),
  ('min_project_value', '2500', 'number', 'Minimum project value'),
  ('max_project_value', '100000', 'number', 'Maximum project value')
ON CONFLICT (setting_key) DO NOTHING;

#!/usr/bin/env node

/**
 * Homebuilder Platform Phase 3 Deployment
 * Uses Supabase JS client to create tables and insert data
 */

const { createClient } = require('@supabase/supabase-js');

const SUPABASE_URL = 'https://rrpkokhjomvlumreknuq.supabase.co';
const SERVICE_KEY = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InJycGtva2hqb212bHVtcmVrbnVxIiwicm9sZSI6InNlcnZpY2Vfcm9sZSIsImlhdCI6MTc3MTkwOTU5MSwiZXhwIjoyMDg3NDg1NTkxfQ.kFTdS-I7SnPPkgqYu0amlzLQgnGJppb4ZKkfIyCy0JA';

const supabase = createClient(SUPABASE_URL, SERVICE_KEY);

async function deploy() {
  console.log('🚀 DEPLOYING HOMEBUILDER PLATFORM - PHASE 3\n');

  try {
    // 1. Insert builders
    console.log('📥 Inserting builders...');
    const { data: builders, error: builderError } = await supabase
      .from('builders')
      .insert([
        {
          ticker: 'KBH',
          name: 'KB Home',
          description: 'Leading homebuilder focused on first-time and move-up buyers',
          ir_url: 'https://investor.kbhome.com/'
        },
        {
          ticker: 'TOL',
          name: 'Toll Brothers',
          description: 'Premier luxury homebuilder with premium positioning',
          ir_url: 'https://investors.tollbrothers.com/'
        },
        {
          ticker: 'PHM',
          name: 'PulteGroup',
          description: 'Diversified homebuilder with strong lot pipeline',
          ir_url: 'https://pultegroupinc.com/'
        }
      ])
      .select();

    if (builderError) throw builderError;
    console.log(`  ✅ Inserted ${builders.length} builders\n`);

    // 2. Get builder IDs for foreign keys
    const { data: allBuilders } = await supabase
      .from('builders')
      .select('id, ticker');

    const builderMap = {};
    allBuilders.forEach(b => {
      builderMap[b.ticker] = b.id;
    });

    // 3. Insert presentations
    console.log('📄 Inserting presentations...');
    const presentations = [
      {
        builder_id: builderMap['KBH'],
        title: 'Q4 2025 Investor Presentation',
        presentation_date: '2026-01-30',
        pdf_url: 'https://investor.kbhome.com/files/doc_financials/2025/q4/Q4-2025-KBH-IR-Presentation.pdf',
        source: 'KB Home Investor Relations'
      },
      {
        builder_id: builderMap['KBH'],
        title: 'Annual Report (10-K) 2025',
        presentation_date: '2026-01-23',
        pdf_url: 'https://investor.kbhome.com/files/doc_financials/2025/q4/Q4-2025-10K-2026-01-23-Final.pdf',
        source: 'SEC Filing'
      },
      {
        builder_id: builderMap['TOL'],
        title: 'Q1 2026 Company Overview',
        presentation_date: '2026-01-28',
        pdf_url: 'https://investors.tollbrothers.com/documents/presentations/presentation-20260128.pdf',
        source: 'Toll Brothers IR'
      },
      {
        builder_id: builderMap['TOL'],
        title: 'Q1 2026 Earnings Release',
        presentation_date: '2026-01-28',
        pdf_url: 'https://investors.tollbrothers.com/documents/press-releases/tol-q1-2026-earnings.pdf',
        source: 'Press Release'
      },
      {
        builder_id: builderMap['PHM'],
        title: 'Raymond James Investor Presentation',
        presentation_date: '2026-03-02',
        pdf_url: 'https://s204.q4cdn.com/680895981/files/doc_presentations/2026/Mar/02/PHM-Investor-Presentation-Raymond-James.pdf',
        source: 'Raymond James Conference'
      }
    ];

    const { data: insertedPres, error: presError } = await supabase
      .from('investor_presentations')
      .insert(presentations)
      .select();

    if (presError) throw presError;
    console.log(`  ✅ Inserted ${insertedPres.length} presentations\n`);

    // 4. Insert metrics
    console.log('📊 Inserting metrics...');
    const metrics = [
      // KB Home
      { builder_id: builderMap['KBH'], metric_name: 'Revenue (TTM)', metric_value: '1,690', metric_unit: 'Million USD', time_period: 'Q4 2025' },
      { builder_id: builderMap['KBH'], metric_name: 'Net Income', metric_value: '101.5', metric_unit: 'Million USD', time_period: 'Q4 2025' },
      { builder_id: builderMap['KBH'], metric_name: 'Gross Margin', metric_value: '17.0', metric_unit: 'Percent', time_period: 'Q4 2025' },
      { builder_id: builderMap['KBH'], metric_name: 'Homes Closed', metric_value: '2,403', metric_unit: 'Units', time_period: 'Q4 2025' },
      { builder_id: builderMap['KBH'], metric_name: 'Backlog', metric_value: '3,128', metric_unit: 'Units', time_period: 'Q4 2025' },
      // Toll Brothers
      { builder_id: builderMap['TOL'], metric_name: 'Gross Margin', metric_value: '30', metric_unit: 'Percent', time_period: 'Q1 2026' },
      { builder_id: builderMap['TOL'], metric_name: 'Homes Closed', metric_value: '10,700', metric_unit: 'Units', time_period: 'Q1 2026' },
      { builder_id: builderMap['TOL'], metric_name: 'Luxury Segment', metric_value: '50', metric_unit: 'Percent', time_period: 'Q1 2026' },
      { builder_id: builderMap['TOL'], metric_name: 'Move-up Segment', metric_value: '35', metric_unit: 'Percent', time_period: 'Q1 2026' },
      { builder_id: builderMap['TOL'], metric_name: 'Active Adult Segment', metric_value: '15', metric_unit: 'Percent', time_period: 'Q1 2026' },
      // PulteGroup
      { builder_id: builderMap['PHM'], metric_name: 'Lot Pipeline', metric_value: '235,000', metric_unit: 'Units', time_period: 'Q1 2026' },
      { builder_id: builderMap['PHM'], metric_name: 'Gross Margin Target', metric_value: '24-26', metric_unit: 'Percent', time_period: 'Q1 2026' },
      { builder_id: builderMap['PHM'], metric_name: 'Liquidity', metric_value: '2,900', metric_unit: 'Million USD', time_period: 'Q4 2025' },
      { builder_id: builderMap['PHM'], metric_name: 'Debt-to-Capital Ratio', metric_value: '11.2', metric_unit: 'Percent', time_period: 'Q4 2025' },
      { builder_id: builderMap['PHM'], metric_name: 'FTB Buyer Mix', metric_value: '38', metric_unit: 'Percent', time_period: 'Q1 2026' }
    ];

    const { data: insertedMetrics, error: metricsError } = await supabase
      .from('builder_metrics')
      .insert(metrics)
      .select();

    if (metricsError) throw metricsError;
    console.log(`  ✅ Inserted ${insertedMetrics.length} metrics\n`);

    // 5. Insert analyses
    console.log('📝 Inserting analyses...');
    const analyses = [
      {
        builder_id: builderMap['KBH'],
        analysis_type: 'Financial Research Summary',
        content: 'KB Home is a mid-sized national homebuilder (#5-7 by volume) with strong expertise in first-time buyer segment. Revenue of $1.69B with 17% gross margin, balanced by cost discipline and geographic diversification.',
        tailwinds: ['Strong demand in housing shortage', 'Operational efficiency improving', 'Geographic diversification', 'Strong capital position'],
        headwinds: ['Interest rate sensitivity (FTB critical)', 'Supply chain & labor costs', 'Regulatory restrictions', 'Large project execution risk'],
        bull_thesis: 'Housing shortage supports prices. Demographic tailwinds from millennials. Margin expansion possible through operational leverage.',
        bear_thesis: 'Rate increase crushes FTB demand. Recession reduces sales. Tariff/inflation compresses margins.',
        outlook_2026: 'Success depends on rate environment, housing demand resilience, input cost management, and lot strategy.'
      },
      {
        builder_id: builderMap['TOL'],
        analysis_type: 'Financial Research Summary',
        content: 'Toll Brothers is the premier luxury homebuilder with exceptional 30% gross margins (vs 18-20% industry avg). Operating at luxury level with affluent buyer base, less sensitive to rates. 10,700 homes closed Q1 2026.',
        tailwinds: ['Luxury market strength', 'Exceptional 30% margins', 'Affluent buyer focus', 'Strong capital position', 'Active adult growth'],
        headwinds: ['Luxury market cyclicality', 'Wealth effect sensitivity', 'Interest rate impact', 'Execution risks', 'Luxury competition'],
        bull_thesis: 'Luxury market likely strong. 30% margins cushion. Active adult segment growth runway. Less rate-sensitive.',
        bear_thesis: 'Economic downturn reduces luxury demand. 50% concentration risk. Stock correction impacts HNW sentiment.',
        outlook_2026: 'Success depends on wealth creation, luxury demand, execution, and 30% margin sustainability.'
      },
      {
        builder_id: builderMap['PHM'],
        analysis_type: 'Financial Research Summary',
        content: 'PulteGroup is diversified homebuilder with 235,000 lot pipeline (43% owned, 57% optioned). Strong balance sheet: $2.9B liquidity, 11.2% debt-to-capital. Balanced buyer mix reduces concentration.',
        tailwinds: ['Balanced buyer mix reduces risk', 'Strong lot pipeline visibility', 'Healthy balance sheet', 'Disciplined capital allocation', 'Multiple platforms'],
        headwinds: ['Interest rate sensitivity (FTB 38%)', 'Integration & execution risk', 'Lot optionality risk', 'Regional economic variation', 'Margin pressure'],
        bull_thesis: 'Lot pipeline provides 5+ year visibility. Balanced mix resilient. Strong balance sheet for investments.',
        bear_thesis: 'Rate increase impacts FTB (38%). Lot write-downs in downturn. Integration complexity.',
        outlook_2026: 'Success depends on rates, demand resilience, lot economics, and platform consistency.'
      }
    ];

    const { data: insertedAnalysis, error: analysisError } = await supabase
      .from('builder_analysis')
      .insert(analyses)
      .select();

    if (analysisError) throw analysisError;
    console.log(`  ✅ Inserted ${insertedAnalysis.length} analyses\n`);

    // 6. Verification
    console.log('✅ PHASE 3 DEPLOYMENT SUCCESSFUL!\n');
    console.log('Summary:');
    console.log(`  • 3 builders inserted (KBH, TOL, PHM)`);
    console.log(`  • 5 presentations inserted`);
    console.log(`  • 15 metrics inserted`);
    console.log(`  • 3 analyses inserted`);
    console.log('\n🚀 Database is ready for Vercel deployment!\n');

  } catch (error) {
    console.error('❌ Deployment failed:', error.message);
    process.exit(1);
  }
}

deploy();

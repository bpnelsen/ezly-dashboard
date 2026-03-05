#!/usr/bin/env node
/**
 * Update Market Intelligence Data Monthly
 * Runs via GitHub Actions on schedule
 * Updates Supabase with latest market data
 * Triggers Vercel deployment
 */

const { createClient } = require('@supabase/supabase-js');
const marketData = require('../market-intelligence/data/homeadvisor-slc.json');

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
const supabaseKey = process.env.SUPABASE_SERVICE_KEY;

if (!supabaseUrl || !supabaseKey) {
  console.error('❌ Missing Supabase credentials');
  process.exit(1);
}

const supabase = createClient(supabaseUrl, supabaseKey);

async function updateMarketData() {
  try {
    console.log('🔄 Starting market data update...');
    console.log(`📊 Processing ${marketData.length} data points`);

    // Delete existing data
    const { error: deleteError } = await supabase
      .from('market_intelligence')
      .delete()
      .neq('id', '');

    if (deleteError) {
      console.error('❌ Error deleting old data:', deleteError);
      throw deleteError;
    }

    console.log('✓ Cleared old data');

    // Insert new data
    const { data, error: insertError } = await supabase
      .from('market_intelligence')
      .insert(
        marketData.map(item => ({
          trade: item.trade,
          location: item.location,
          average_low: item.average_low,
          average_high: item.average_high,
          average: item.average,
          seasonal_adjustments: JSON.stringify(item.seasonal_adjustments),
          updated_at: new Date().toISOString(),
        }))
      )
      .select();

    if (insertError) {
      console.error('❌ Error inserting data:', insertError);
      throw insertError;
    }

    console.log(`✓ Updated ${data.length} records`);
    console.log('✅ Market data update complete!');

    // Log for verification
    console.log('\n📋 Update Summary:');
    console.log(`   - Total records: ${data.length}`);
    console.log(`   - Timestamp: ${new Date().toISOString()}`);
    console.log(`   - Status: SUCCESS`);

    return true;
  } catch (error) {
    console.error('❌ Market data update failed:', error);
    process.exit(1);
  }
}

// Run update
updateMarketData();

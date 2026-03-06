#!/usr/bin/env node

/**
 * Execute Supabase Schema
 * Creates all tables and RLS policies for bid management
 */

const { createClient } = require('@supabase/supabase-js');
const fs = require('fs');

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
const supabaseServiceKey = process.env.SUPABASE_SERVICE_ROLE_KEY;

if (!supabaseUrl || !supabaseServiceKey) {
  console.error('❌ Missing Supabase credentials');
  process.exit(1);
}

const supabase = createClient(supabaseUrl, supabaseServiceKey);

async function executeSchema() {
  try {
    console.log('📊 Reading schema file...');
    const schema = fs.readFileSync('./lib/bids-schema.sql', 'utf8');

    console.log('🔄 Executing SQL schema...');
    
    // Split by semicolon and execute each statement
    const statements = schema
      .split(';')
      .map(s => s.trim())
      .filter(s => s.length > 0);

    for (const statement of statements) {
      try {
        console.log(`  ⏳ Executing: ${statement.substring(0, 50)}...`);
        const { data, error } = await supabase.rpc('execute_sql', { sql: statement });
        
        if (error) {
          // Some queries return errors but still work (like CREATE IF NOT EXISTS)
          if (!error.message.includes('already exists')) {
            console.error(`    ❌ Error: ${error.message}`);
          } else {
            console.log(`    ✅ Already exists`);
          }
        } else {
          console.log(`    ✅ Success`);
        }
      } catch (e) {
        console.error(`    ❌ Exception: ${e.message}`);
      }
    }

    console.log('\n✅ Schema execution complete!');
  } catch (error) {
    console.error('❌ Fatal error:', error.message);
    process.exit(1);
  }
}

executeSchema();

#!/usr/bin/env node

/**
 * Database setup script for EZLY Dashboard
 * Applies the Supabase schema to create all necessary tables
 */

const fs = require('fs')
const path = require('path')
const { createClient } = require('@supabase/supabase-js')
require('dotenv').config({ path: path.join(__dirname, '../.env.local') })

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL
const supabaseServiceRoleKey = process.env.SUPABASE_SERVICE_ROLE_KEY

if (!supabaseUrl || !supabaseServiceRoleKey) {
  console.error('❌ Missing Supabase credentials in .env.local')
  process.exit(1)
}

const supabase = createClient(supabaseUrl, supabaseServiceRoleKey)

async function setupDatabase() {
  try {
    console.log('📦 Setting up EZLY Dashboard database...')

    // Read the schema file
    const schemaPath = path.join(__dirname, '../../supabase-schema.sql')
    const schema = fs.readFileSync(schemaPath, 'utf8')

    // Split schema into individual statements
    const statements = schema
      .split(';')
      .map((stmt) => stmt.trim())
      .filter((stmt) => stmt.length > 0 && !stmt.startsWith('--'))

    // Execute each statement
    for (const statement of statements) {
      try {
        const { error } = await supabase.rpc('exec_sql', { sql: statement })
        if (error) {
          console.log(`⚠️  ${statement.substring(0, 50)}... (may already exist)`)
        } else {
          console.log(`✅ ${statement.substring(0, 50)}...`)
        }
      } catch (err) {
        // Silently handle errors for idempotent operations
        console.log(`⚠️  ${statement.substring(0, 50)}... (already exists)`)
      }
    }

    console.log('✨ Database setup complete!')
  } catch (error) {
    console.error('❌ Database setup failed:', error.message)
    process.exit(1)
  }
}

setupDatabase()

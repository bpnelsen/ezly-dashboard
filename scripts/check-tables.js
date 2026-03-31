const { createClient } = require('@supabase/supabase-js');
const fs = require('fs');
const envContent = fs.readFileSync('/data/.openclaw/workspace/prolink-ezly/.env', 'utf8');
const env = envContent.split('\n').reduce((acc, line) => {
    const [key, value] = line.split('=');
    if (key) acc[key.trim()] = value ? value.trim() : '';
    return acc;
}, {});
const supabase = createClient(env.NEXT_PUBLIC_SUPABASE_URL, env.NEXT_PUBLIC_SUPABASE_ANON_KEY);

async function checkTables() {
    // Log the error if we try to access common tables
    const tables = ['profiles', 'users', 'contractors', 'accounts'];
    for (const table of tables) {
        const { data, error } = await supabase.from(table).select('*').limit(1);
        if (error) {
            console.log(table + ': Access Denied or Table missing (' + error.message + ')');
        } else {
            console.log(table + ': Found (' + data.length + ' rows)');
        }
    }
}
checkTables();

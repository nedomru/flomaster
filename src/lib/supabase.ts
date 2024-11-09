import {createClient} from '@supabase/supabase-js';

const supabaseUrl = import.meta.env.PUBLIC_SUPABASE_URL
const supabaseRoleKey = import.meta.env.PUBLIC_SUPABASE_SERVICE_ROLE_KEY

if (!supabaseUrl || !supabaseRoleKey) {
    console.error("[Supabase] There are some configuration missing");
    throw new Error(`Supabase configuration is missing, url: ${supabaseUrl}, key: ${supabaseRoleKey}`);
}else {
    console.info(`supabaseUrl: ${supabaseUrl}, key: ${supabaseRoleKey}`);
}

export const supabase = createClient(supabaseUrl, supabaseRoleKey, {
    auth: {
        autoRefreshToken: true,
        persistSession: true,
        detectSessionInUrl: true
    },
    global: {
        headers: {
            'X-Client-Info': 'supabase-js-v2',
        },
    },
});
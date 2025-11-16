// Conexión a Supabase
const SUPABASE_URL = "https://hrbmstaklleraiacqmky.supabase.co";
const SUPABASE_ANON_KEY = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImhyYm1zdGFrbGxlcmFpYWNxbWt5Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3NjMyMTA2OTQsImV4cCI6MjA3ODc4NjY5NH0.tN00tAjMJpJK_8gnerocbOSzHp93N5yc9KohTBpMeZc";

const supabaseClient = supabase.createClient(SUPABASE_URL, SUPABASE_ANON_KEY);

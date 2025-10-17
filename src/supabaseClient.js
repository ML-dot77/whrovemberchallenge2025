import { createClient } from "@supabase/supabase-js";

// Replace with your actual Supabase URL and anon key
const supabaseUrl = "https://sjsxuggvmvkpugdempcg.supabase.co";
const supabaseKey = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InNqc3h1Z2d2bXZrcHVnZGVtcGNnIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NTc2MjU1OTAsImV4cCI6MjA3MzIwMTU5MH0.TgxrNz2DcPE0qsDFX7OWgQFZNR_ydOGcbk7W3haZWWs";

export const supabase = createClient(supabaseUrl, supabaseKey);

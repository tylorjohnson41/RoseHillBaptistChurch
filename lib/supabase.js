import { createClient } from '@supabase/supabase-js';

const supabaseUrl = 'https://volruottyuwojeiwwidp.supabase.co';
const supabaseAnonKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InZvbHJ1b3R0eXV3b2plaXd3aWRwIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NDcxMDI3MDYsImV4cCI6MjA2MjY3ODcwNn0.CtTVm31OO41QMg4gnLXkuUHxoMnmVUFPgx44xcZAQYU';

export const supabase = createClient(supabaseUrl, supabaseAnonKey);
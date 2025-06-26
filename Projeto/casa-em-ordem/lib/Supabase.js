import { createClient } from '@supabase/supabase-js';

const supabaseUrl = 'https://gfintlrgrfeodjzkivva.supabase.co'; // sua URL
const supabaseAnonKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImdmaW50bHJncmZlb2RqemtpdnZhIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NTA2MTYwNDAsImV4cCI6MjA2NjE5MjA0MH0.DNLzPVq-56s99wdG0xEP7taxvawuDnawm0KvDCQxEGU'; // sua chave

export const supabase = createClient(supabaseUrl, supabaseAnonKey);

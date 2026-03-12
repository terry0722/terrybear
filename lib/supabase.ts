import { createClient } from '@supabase/supabase-js';

// .env.local 파일에 저장한 주소와 키를 불러옵니다.
const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!;
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!;

// 이 명령어로 데이터베이스와 통신할 'supabase' 객체를 생성하여 내보냅니다.
export const supabase = createClient(supabaseUrl, supabaseAnonKey);
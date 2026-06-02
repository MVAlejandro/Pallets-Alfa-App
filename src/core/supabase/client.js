
import { createClient } from "https://esm.sh/@supabase/supabase-js@2";

// Conexión a Supabase
const supabaseUrl = ""
const supabaseKey = ""
const supabase = createClient(supabaseUrl, supabaseKey)

export default supabase
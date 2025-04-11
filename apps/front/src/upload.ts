import { createClient } from '@supabase/supabase-js';

export const uploadThumbnail = async (image: File) => {
  const supabaseUrl = process.env.SUPABASE_URL!;
  const supabaseKey = process.env.SUPABASE_API_KEY!;

  const supabaseClient = createClient(supabaseUrl, supabaseKey);

  const data = await supabaseClient
    .storage.from('blog-turborepo-thumbnails')
    .upload(`${image.name}_${Date.now()}`, image);

  if (!data.data?.path) {
    throw new Error('Failed to upload thumbnail');
  }

  const urlData = await supabaseClient.storage
    .from('blog-turborepo-thumbnails')
    .getPublicUrl(data.data?.path);

  return urlData.data.publicUrl;
};
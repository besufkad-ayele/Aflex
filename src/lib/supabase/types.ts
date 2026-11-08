export type UserRole =
  | 'super_admin'
  | 'editor'
  | 'procurement_officer'
  | 'hr_manager'
  | 'translator'
  | 'viewer'
  | 'academic_director'
  | 'comms_officer'
  | 'hr_procurement_officer'
  | 'editorial_reviewer'
  | 'auditor';

export type ContentStatus =
  | 'draft'
  | 'review_pending'
  | 'in_review'
  | 'approved'
  | 'published'
  | 'archived';

export interface Profile {
  id: string;
  email: string;
  full_name: string;
  role: UserRole;
  department: string | null;
  phone: string | null;
  avatar_url: string | null;
  is_active?: boolean;
  created_at: string;
  updated_at: string;
}

/** Live Supabase schema (OpenAPI) for news_articles */
export interface NewsArticle {
  id: string;
  slug: string;
  title: string;
  excerpt: string;
  content: string | null;
  category: string;
  featured: boolean;
  hero_image_url: string | null;
  hero_caption: string | null;
  read_time_minutes: number | null;
  language_code: string;
  translation_group_id: string | null;
  status: ContentStatus;
  editorial_notes: string | null;
  author_id: string | null;
  reviewed_by: string | null;
  published_at: string | null;
  created_at: string;
  updated_at: string;
  // legacy/compat optional multilingual fields (may not exist in live DB)
  title_en?: string;
  lead_en?: string | null;
  body_en?: string | null;
  title_am?: string | null;
  lead_am?: string | null;
  body_am?: string | null;
  title_om?: string | null;
  lead_om?: string | null;
  body_om?: string | null;
}

export interface Program {
  id: string;
  code: string;
  title: string;
  lead: string | null;
  full_description: string | null;
  format: string | null;
  target_audience: string | null;
  hero_image_url: string | null;
  modules: Array<{ title: string; desc: string }> | string[] | null;
  outcomes: string[] | null;
  structure: Array<{ label: string; value: string }> | string[] | null;
  admissions_note: string | null;
  language_code: string;
  status: ContentStatus;
  updated_by: string | null;
  updated_at: string;
}

export interface Vacancy {
  id: string;
  title: string;
  department: string;
  category: string;
  location: string | null;
  type: string | null;
  experience_level: string | null;
  summary: string | null;
  duties: string | null;
  requirements: string | null;
  compensation: string | null;
  deadline: string;
  status: ContentStatus;
  created_by: string | null;
  created_at: string;
  updated_at: string;
  // legacy aliases used by older admin UI
  reference_no?: string;
  employment_type?: string;
  positions_available?: number;
  responsibilities?: string | null;
  application_url?: string | null;
}

export interface ProcurementTender {
  id: string;
  tender_ref_number: string;
  title: string;
  description: string | null;
  category: string | null;
  document_url: string | null;
  document_size_bytes: number | null;
  bid_bond_amount: number | null;
  submission_deadline: string;
  opening_date: string | null;
  status: ContentStatus;
  created_by: string | null;
  created_at: string;
  updated_at: string;
  // legacy aliases
  tender_no?: string;
  procurement_type?: string;
  closing_date?: string;
  bid_bond_currency?: string;
  tor_document_url?: string | null;
}

export interface MediaAsset {
  id: string;
  filename: string;
  storage_path: string;
  mime_type: string;
  file_size_bytes: number;
  width: number | null;
  height: number | null;
  alt_text: string | null;
  caption: string | null;
  album: string | null;
  uploaded_by: string | null;
  created_at: string;
  // legacy
  file_name?: string;
  bucket_id?: string;
  size_bytes?: number;
}

export interface EmergencyBanner {
  id: string;
  message_en: string;
  message_am: string;
  message_om: string;
  banner_type: string;
  cta_label: string | null;
  cta_url: string | null;
  is_active: boolean;
  updated_by: string | null;
  updated_at: string;
  // legacy
  alert_level?: 'info' | 'warning' | 'urgent';
  expires_at?: string | null;
}

export interface AuditLog {
  id: string;
  user_id: string | null;
  user_email: string | null;
  user_role: string | null;
  action: string;
  entity_type: string;
  entity_id: string | null;
  changes: Record<string, unknown> | null;
  ip_address: string | null;
  created_at: string;
  // legacy
  actor_id?: string | null;
  target_table?: string;
  target_id?: string | null;
  old_data?: Record<string, unknown> | null;
  new_data?: Record<string, unknown> | null;
}

export interface FaqItem {
  id: string;
  category: string;
  question_en: string;
  answer_en: string;
  question_am: string | null;
  answer_am: string | null;
  question_om: string | null;
  answer_om: string | null;
  status: ContentStatus;
  sort_order: number;
  updated_by: string | null;
  created_at: string;
  updated_at: string;
}

export interface AcademyEventRow {
  id: string;
  slug: string;
  title: string;
  summary: string | null;
  location: string | null;
  starts_at: string;
  ends_at: string | null;
  hero_image_url: string | null;
  status: ContentStatus;
  featured: boolean;
  created_by: string | null;
  created_at: string;
  updated_at: string;
}

export interface MediaGalleryItemRow {
  id: string;
  title: string;
  album: string;
  media_type: 'photo' | 'video';
  image_url: string;
  video_url: string | null;
  shape: 'tall' | 'wide' | 'standard';
  caption: string | null;
  status: ContentStatus;
  sort_order: number;
  published_at: string | null;
  created_by: string | null;
  created_at: string;
  updated_at: string;
}

export interface MediaSocialFeedRow {
  id: string;
  platform: 'tiktok' | 'facebook' | 'youtube';
  label: string;
  handle: string | null;
  profile_url: string;
  embed_url: string | null;
  embed_html: string | null;
  is_published: boolean;
  sort_order: number;
  updated_by: string | null;
  updated_at: string;
}

export interface MediaSocialPostRow {
  id: string;
  platform: 'tiktok' | 'facebook' | 'youtube';
  title: string;
  post_url: string;
  embed_url: string;
  external_id: string | null;
  thumbnail_url: string | null;
  caption: string | null;
  is_published: boolean;
  sort_order: number;
  published_at: string | null;
  created_by: string | null;
  created_at: string;
  updated_at: string;
}

export type Database = {
  public: {
    Tables: {
      profiles: {
        Row: Profile;
        Insert: Partial<Profile> & { id: string; email: string; full_name: string };
        Update: Partial<Profile>;
        Relationships: [];
      };
      news_articles: {
        Row: NewsArticle;
        Insert: Partial<NewsArticle> & { slug: string; title: string; excerpt: string };
        Update: Partial<NewsArticle>;
        Relationships: [];
      };
      programs: {
        Row: Program;
        Insert: Partial<Program> & { id: string; code: string; title: string };
        Update: Partial<Program>;
        Relationships: [];
      };
      vacancies: {
        Row: Vacancy;
        Insert: Partial<Vacancy> & { title: string; department: string; category: string; deadline: string };
        Update: Partial<Vacancy>;
        Relationships: [];
      };
      procurement_tenders: {
        Row: ProcurementTender;
        Insert: Partial<ProcurementTender> & { tender_ref_number: string; title: string; submission_deadline: string };
        Update: Partial<ProcurementTender>;
        Relationships: [];
      };
      media_assets: {
        Row: MediaAsset;
        Insert: Partial<MediaAsset> & { filename: string; storage_path: string; mime_type: string; file_size_bytes: number };
        Update: Partial<MediaAsset>;
        Relationships: [];
      };
      emergency_banners: {
        Row: EmergencyBanner;
        Insert: Partial<EmergencyBanner> & { message_en: string; message_am: string; message_om: string };
        Update: Partial<EmergencyBanner>;
        Relationships: [];
      };
      audit_logs: {
        Row: AuditLog;
        Insert: Partial<AuditLog> & { action: string; entity_type: string };
        Update: Partial<AuditLog>;
        Relationships: [];
      };
      faqs: {
        Row: FaqItem;
        Insert: Partial<FaqItem> & { question_en: string; answer_en: string };
        Update: Partial<FaqItem>;
        Relationships: [];
      };
      events: {
        Row: AcademyEventRow;
        Insert: Partial<AcademyEventRow> & { slug: string; title: string; starts_at: string };
        Update: Partial<AcademyEventRow>;
        Relationships: [];
      };
      media_gallery_items: {
        Row: MediaGalleryItemRow;
        Insert: Partial<MediaGalleryItemRow> & { title: string; image_url: string; media_type: 'photo' | 'video' };
        Update: Partial<MediaGalleryItemRow>;
        Relationships: [];
      };
      media_social_feeds: {
        Row: MediaSocialFeedRow;
        Insert: Partial<MediaSocialFeedRow> & { platform: 'tiktok' | 'facebook' | 'youtube'; label: string; profile_url: string };
        Update: Partial<MediaSocialFeedRow>;
        Relationships: [];
      };
      media_social_posts: {
        Row: MediaSocialPostRow;
        Insert: Partial<MediaSocialPostRow> & { platform: 'tiktok' | 'facebook' | 'youtube'; title: string; post_url: string; embed_url: string };
        Update: Partial<MediaSocialPostRow>;
        Relationships: [];
      };
    };
    Views: {
      [_ in never]: never;
    };
    Functions: {
      [_ in never]: never;
    };
    Enums: {
      user_role: UserRole;
      content_status: ContentStatus;
    };
    CompositeTypes: {
      [_ in never]: never;
    };
  };
};

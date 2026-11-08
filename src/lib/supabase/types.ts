export type UserRole =
  | 'super_admin'
  | 'editor'
  | 'procurement_officer'
  | 'hr_manager'
  | 'translator'
  | 'viewer';

export type ContentStatus = 'draft' | 'review_pending' | 'published' | 'archived';

export interface Profile {
  id: string;
  email: string;
  full_name: string;
  role: UserRole;
  department: string | null;
  phone: string | null;
  avatar_url: string | null;
  created_at: string;
  updated_at: string;
}

export interface NewsArticle {
  id: string;
  slug: string;
  category: string;
  published_at: string;
  hero_image_url: string | null;
  featured: boolean;
  status: ContentStatus;
  title_en: string;
  lead_en: string | null;
  body_en: string | null;
  title_am: string | null;
  lead_am: string | null;
  body_am: string | null;
  title_om: string | null;
  lead_om: string | null;
  body_om: string | null;
  author_id: string | null;
  created_at: string;
  updated_at: string;
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
  modules: Array<{ title: string; desc: string }> | null;
  outcomes: string[] | null;
  structure: Array<{ label: string; value: string }> | null;
  admissions_note: string | null;
  language_code: string;
  status: ContentStatus;
  updated_by: string | null;
  updated_at: string;
}

export interface Vacancy {
  id: string;
  reference_no: string;
  title: string;
  department: string;
  location: string;
  employment_type: string;
  positions_available: number;
  deadline: string;
  requirements: string | null;
  responsibilities: string | null;
  status: ContentStatus;
  application_url: string | null;
  created_by: string | null;
  created_at: string;
  updated_at: string;
}

export interface ProcurementTender {
  id: string;
  tender_no: string;
  title: string;
  procurement_type: string;
  closing_date: string;
  bid_bond_amount: number | null;
  bid_bond_currency: string;
  tor_document_url: string | null;
  status: ContentStatus;
  created_by: string | null;
  created_at: string;
  updated_at: string;
}

export interface MediaAsset {
  id: string;
  file_name: string;
  bucket_id: string;
  storage_path: string;
  mime_type: string;
  size_bytes: number;
  alt_text: string | null;
  uploaded_by: string | null;
  created_at: string;
}

export interface EmergencyBanner {
  id: string;
  message_en: string;
  message_am: string | null;
  message_om: string | null;
  alert_level: 'info' | 'warning' | 'urgent';
  is_active: boolean;
  expires_at: string | null;
  updated_by: string | null;
  updated_at: string;
}

export interface AuditLog {
  id: string;
  actor_id: string | null;
  action: string;
  target_table: string;
  target_id: string | null;
  old_data: Record<string, unknown> | null;
  new_data: Record<string, unknown> | null;
  ip_address: string | null;
  created_at: string;
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
        Insert: Partial<NewsArticle> & { slug: string; title_en: string };
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
        Insert: Partial<Vacancy> & { reference_no: string; title: string; department: string; deadline: string };
        Update: Partial<Vacancy>;
        Relationships: [];
      };
      procurement_tenders: {
        Row: ProcurementTender;
        Insert: Partial<ProcurementTender> & { tender_no: string; title: string; closing_date: string };
        Update: Partial<ProcurementTender>;
        Relationships: [];
      };
      media_assets: {
        Row: MediaAsset;
        Insert: Partial<MediaAsset> & { file_name: string; storage_path: string; mime_type: string; size_bytes: number };
        Update: Partial<MediaAsset>;
        Relationships: [];
      };
      emergency_banners: {
        Row: EmergencyBanner;
        Insert: Partial<EmergencyBanner> & { message_en: string };
        Update: Partial<EmergencyBanner>;
        Relationships: [];
      };
      audit_logs: {
        Row: AuditLog;
        Insert: Partial<AuditLog> & { action: string; target_table: string };
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

export type LeadStatus = "NEW" | "CONTACTED" | "CLOSED";

export type Project = {
  id: string;
  title: string;
  slug: string;
  description: string;
  image_url: string | null;
  tech_stack: string[];
  metrics: Record<string, string | number> | null;
  created_at: string;
};

export type Lead = {
  id: string;
  name: string;
  phone: string;
  agency_name: string | null;
  status: LeadStatus;
  created_at: string;
};

export type Database = {
  public: {
    Tables: {
      projects: {
        Row: Project;
        Insert: Omit<Project, "id" | "created_at"> & {
          id?: string;
          created_at?: string;
        };
        Update: Partial<Omit<Project, "id" | "created_at">>;
        Relationships: [];
      };
      leads: {
        Row: Lead;
        Insert: Omit<Lead, "id" | "created_at" | "status"> & {
          id?: string;
          status?: LeadStatus;
          created_at?: string;
        };
        Update: Partial<Omit<Lead, "id" | "created_at">>;
        Relationships: [];
      };
    };
    Views: Record<never, never>;
    Functions: Record<never, never>;
    Enums: Record<never, never>;
    CompositeTypes: Record<never, never>;
  };
};

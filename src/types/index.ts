export type Page = "home" | "studio" | "work" | "contact" | "project";

export interface Tile {
  slug: string;
  name: string;
  category: string;
  oneliner: string;
  img: string;
  heroImage?: string;
  brief: string;
  approach: string;
  specs: {
    typology?: string;
    location?: string;
    yearCompleted?: string;
    area?: string;
    principal?: string;
    photography?: string;
  };
  galleryImages: string[];
  videoUrl?: string;
  videoDuration?: string;
  testimonial?: {
    text: string;
    author: string;
    role: string;
    project: string;
  };
}

export interface HomeProject {
  name: string;
  location: string;
  img: string;
}

export interface TeamMember {
  name: string;
  role: string;
  img: string;
  bio: string;
}

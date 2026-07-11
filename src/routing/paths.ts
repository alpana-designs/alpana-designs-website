import type { Page } from "@/types";

export const paths = {
  home: "/",
  work: "/work",
  studio: "/studio",
  contact: "/contact",
  project: (slug: string) => `/work/${slug}`,
} as const;

export function pageFromPathname(pathname: string): Page {
  if (pathname === paths.home) return "home";
  if (pathname === paths.studio) return "studio";
  if (pathname === paths.contact) return "contact";
  if (pathname === paths.work || pathname.startsWith(`${paths.work}/`)) return "work";
  return "home";
}

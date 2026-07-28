import type { HomeProject } from "@/types";
import nileshHero from "@/images/NILESH/NileshHeroMain.jpeg";
import anuHero from "@/images/ANUANAND/AnuanandHeroMain.jpeg";
import surekaHero from "@/images/SUREKA/SurekaHero.jpeg";

export const homeProjects: HomeProject[] = [
  {
    name: "Timeless Neo-Classical Elegance",
    slug: "timeless-neo-classical-elegance",
    location: "Mumbai, India",
    img: surekaHero,
  },
  {
    name: "Earthy Elegance",
    slug: "earthy-elegance",
    location: "Mumbai, India",
    img: anuHero,
  },
  {
    name: "A Vanilla Comfort",
    slug: "a-vanilla-comfort",
    location: "Goa, India",
    img: nileshHero,
  },
];

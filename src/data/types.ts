export type ContentType = "movie" | "series" | "book" | "inganzo";
export type AccessLevel = "free" | "premium";

export interface Genre {
  id: string;
  name: string;
}

export interface Creator {
  id: string;
  name: string;
  avatar?: string;
  bio?: string;
}

export interface Movie {
  id: string;
  slug: string;
  title: string;
  tagline?: string;
  description: string;
  poster: string;
  backdrop: string;
  trailer?: string;
  genres: string[];
  year: number;
  duration: number; // minutes
  language: string;
  country: string;
  rating: number;
  ageRating?: string;
  director?: string;
  cast: string[];
  creator?: string;
  access: AccessLevel;
  featured?: boolean;
  trending?: boolean;
  isNew?: boolean;
  isRwandan?: boolean;
  isAfrican?: boolean;
  freeToWatch?: boolean;
  kinyarwandaExplanation?: {
    inkuru: string;
    abakinnyi: string;
    ibyIngenzi: string;
    ubutumwa: string;
    review: string;
  };
}

export interface Series extends Omit<Movie, "duration"> {
  seasons: Season[];
  totalEpisodes: number;
}

export interface Season {
  number: number;
  title: string;
  episodes: Episode[];
}

export interface Episode {
  number: number;
  title: string;
  description: string;
  duration: number;
  thumbnail: string;
}

export interface Book {
  id: string;
  slug: string;
  title: string;
  author: string;
  authorBio?: string;
  authorAvatar?: string;
  cover: string;
  description: string;
  genre: string;
  language: string;
  year: number;
  pages: number;
  rating: number;
  access: AccessLevel;
  featured?: boolean;
  isNew?: boolean;
  isPopular?: boolean;
  isRwandan?: boolean;
  isAfrican?: boolean;
}

export interface Inganzo {
  id: string;
  slug: string;
  title: string;
  author: string;
  authorBio?: string;
  type: "ibisigo" | "imivugo" | "poem" | "short-story" | "literature" | "traditional" | "modern";
  language: string;
  date: string;
  excerpt: string;
  content: string;
  access: AccessLevel;
}

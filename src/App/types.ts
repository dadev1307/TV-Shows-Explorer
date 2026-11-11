export type Show = {
  id: number;
  name: string;
  genres: string[];
  image: { medium: string } | null;
  rating: { average: number | null };
  summary: string | null;
  premiered: string | null;
  url: string;
};

export type GenreFilterProps = {
  genres: string[];
  selectedGenre: string | null;
  onGenreSelect: (genre: string | null) => void;
};

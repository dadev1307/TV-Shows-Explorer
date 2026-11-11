export type SearchBarProps = {
  query: string;
  onQueryChange: (value: string) => void;
  isLoading: boolean;
};

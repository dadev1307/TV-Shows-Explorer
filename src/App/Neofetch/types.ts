export type NeofetchRow = {
  label: string;
  value: string;
  isHighlighted?: boolean;
};

export type NeofetchProps = {
  rows: NeofetchRow[];
};

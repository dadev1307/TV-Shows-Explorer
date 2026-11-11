import type { Show } from '../../types.ts';

const METER_SIZE = 10;
const FILLED_CHAR = '█';
const EMPTY_CHAR = '░';

const stripHtml = (html: string | null): string => {
  if (!html) {
    return 'Описание отсутствует';
  }
  return html.replaceAll(/<[^>]*>/g, '').trim();
};

const buildMeter = (rating: number | null): string => {
  const filled = rating === null ? 0 : Math.round(rating);
  return (
    FILLED_CHAR.repeat(filled) + EMPTY_CHAR.repeat(METER_SIZE - filled)
  );
};

export const usePresenter = (show: Show) => {
  const rating = show.rating.average;

  return {
    summary: stripHtml(show.summary),
    posterUrl: show.image?.medium,
    ratingLabel: rating === null ? 'N/A' : rating.toFixed(1),
    ratingMeter: buildMeter(rating),
    premieredYear: show.premiered ? show.premiered.slice(0, 4) : null,
  };
};

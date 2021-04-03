import Link from 'next/link';
import { IFilm } from '../../types';

import s from './Film.module.scss';

type Props = {
  film_data: IFilm | null;
};

export function Film({ film_data }: Props): JSX.Element {
  return (
    <section className={s.film}>
      <h2 className={s.film__title}>
        {film_data?.title}
      </h2>
      <p>film id: {film_data?.episodeID}</p>
      <div><p>{film_data?.openingCrawl}</p></div>

    </section>
  );
}

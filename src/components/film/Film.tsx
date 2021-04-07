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
      <div className={s.film__box}>
        <div className={s.film__crawl}>
          <pre>{film_data?.openingCrawl}</pre>
        </div>
        <div>
          <h3>Characters</h3>
          <div className={s.film__chars}>
          {film_data?.characterConnection.characters.map((char, i) => (
            <div key={i}>
              <Link href={`/characters/${char.id}`}>{char.name}</Link>
            </div>
          ))}
          </div>
        </div>
      </div>
      <hr></hr>
    </section>
  );
}

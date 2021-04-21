import Link from 'next/link';
import { ICharacter } from '../../types';
import s from './Person.module.scss';

type Props = {
  person: ICharacter;
};

export function Person({ person }: Props): JSX.Element {
  return (
    <div className={s.person}>
      <h1>{person.name}</h1>
      <div>
        <strong>Birth year:</strong>
        <br />
        <p>{person.birthYear}</p>
      </div>
      <div>
        <strong>Eye color:</strong>
        <br />
        <p>{person.eyeColor}</p>
      </div>
      <div>
        <strong>Hair color:</strong>
        <br />
        <p>{person.hairColor}</p>
      </div>
      <div>
        <strong>Height:</strong>
        <br />
        <p>{person.height}</p>
      </div>
      <div>
        <strong>Mass:</strong>
        <br />
        <p>{person.mass}</p>
      </div>

      <Link href="/characters">Back to characters</Link>
    </div>
  );
}

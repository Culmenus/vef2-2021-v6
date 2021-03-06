/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable import/no-cycle */
// leyfi mér þetta því ég er að exporta server breytuna fyrir Characters component
// og veit að þetta virkar á heroku og hér
// vil ekki breyta storka örlögum og breyta kóðanum núna
// og þetta er ekki hræðinlegt import cycle. Ráðlagt beint af netinu.
import React, { useEffect, useState } from 'react';
import Link from 'next/link';
import s from './Characters.module.scss';
import { Button } from '../button/Button';
import {
  IAllPeople, ICharacter, IEdge, IPeopleResponse,
} from '../../types';
import { server } from '../../pages/characters/index';

type Props = {
  data: IAllPeople;
};

/**
 * Hjálpar týpa ef við erum að filtera burt hugsanleg null gildi:
 *
 * const items: T = itemsWithPossiblyNull
 *  .map((item) => {
 *    if (!item) {
 *      return null;
 *    }
 *    return item;
 *  })
 *  .filter((Boolean as unknown) as ExcludesFalse);
 * items verður Array<T> en ekki Array<T | null>
 */
// type ExcludesFalse = <T>(x: T | null | undefined | false) => x is T;

export function Characters({ data }: Props): JSX.Element {
  // TODO meðhöndla loading state, ekki þarf sérstaklega að villu state
  const [loading, setLoading] = useState<boolean>(false);

  // TODO setja grunngögn sem koma frá server
  const [characters, setCharacters] = useState<Array<ICharacter>>([]);
  const [lastCursor, setLastCursor] = useState<string | null>(null);
  const [hasNextPage, setHasNextPage] = useState<boolean | null>(false);

  const nodes = data.edges.map((n) => n.node);
  const hasNextPageud = data.pageInfo.hasNextPage;
  const lcupdate = data.pageInfo.endCursor;

  useEffect(() => {
    setLoading(true);
    setLastCursor(lcupdate);
    setHasNextPage(hasNextPageud);
    setCharacters(nodes);
    setLoading(false);
  }, []);

  const fetchMore = async (): Promise<void> => {
    // TODO sækja gögn frá /pages/api/characters.ts (gegnum /api/characters), ef það eru fleiri
    // (sjá pageInfo.hasNextPage) með cursor úr pageInfo.endCursor
    if (hasNextPage) {
      setLoading(true);
      const out: IPeopleResponse = await fetch(`${server}/api/characters?after=${lastCursor}`, {
        method: 'POST',
        headers: {
          'Content-type': 'application/json',
        },

      })
        .then((res) => res.json())
        .then((json) => json.data);

      const newData: Array<IEdge> = out.allPeople.edges;

      // get ICharacter array from IEdge
      const extNode = newData.map((n) => n.node);
      const update = characters;
      // e-d trash
      extNode.forEach((i) => {
        update.push(i);
      });
      setCharacters(update);

      // update lastCursor and hasNextPage
      const lastCursorUpdate: string = out.allPeople.pageInfo.endCursor;
      setLastCursor(lastCursorUpdate);
      const hasNextPageUpdate: boolean = out.allPeople.pageInfo.hasNextPage;
      setHasNextPage(hasNextPageUpdate);

      setLoading(false);
    }
  };

  return (
    <section className={s.characters}>
      <ul className={s.characters__list}>
        {characters.map((char, i) => (
          <li key={i}>
            <Link href={`/characters/${char.id}`}>{char.name}</Link>
          </li>
        ))}
      </ul>

      <Button disabled={loading || !hasNextPage} onClick={fetchMore}>Fetch more</Button>
    </section>
  );
}

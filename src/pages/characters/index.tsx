/* eslint-disable import/no-cycle */
// leyfi mér þetta því ég er að exporta server breytuna fyrir Characters component
// og veit að þetta virkar á heroku og hér
// vil ekki breyta storka örlögum og breyta kóðanum núna
// og þetta er ekki hræðinlegt import cycle. Ráðlagt beint af netinu.
import { GetServerSideProps, InferGetServerSidePropsType } from 'next';
import Head from 'next/head';
import { Characters } from '../../components/characters/Characters';

import { Layout } from '../../components/layout/Layout';
import { IPeopleResponse } from '../../types';

const dev = process.env.NODE_ENV !== 'production';
export const server = dev ? 'http://localhost:3000' : 'https://vef2-2021-v6-oat3.herokuapp.com';

export type PageProps = {
  peopleResponse: IPeopleResponse; // TODO EKKI any
};

export default function PageComponent(
  data: InferGetServerSidePropsType<typeof getServerSideProps>,
): JSX.Element {
  const { peopleResponse } = data;
  const charactersList = peopleResponse.allPeople;

  return (
    <Layout>
      <Head>
        <title>Star Wars characters</title>
      </Head>
      <h1>Star Wars characters</h1>
      <Characters data={charactersList} />
    </Layout>
  );
}

export const getServerSideProps: GetServerSideProps<PageProps> = async () => {
  // TODO sækja karaktera
  const peopleResponse: IPeopleResponse = await fetch(`${server}/api/characters`, {
    method: 'POST',
    headers: {
      'Content-type': 'application/json',
    },

  })
    .then((res) => res.json())
    .then((json) => json.data);

  return {
    props: {
      peopleResponse,
    },
  };
};

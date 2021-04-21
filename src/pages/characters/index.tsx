import { GetServerSideProps, InferGetServerSidePropsType } from 'next';
import Head from 'next/head';
import { Characters } from '../../components/characters/Characters';

import { Layout } from '../../components/layout/Layout';
import { fetchCharacters } from '../../lib/swapi';
import { IEdge, IPaging, IPeopleResponse } from '../../types';

const dev = process.env.NODE_ENV !== 'production';
export const server = dev ? 'http://localhost:3000' : 'https://vef2-2021-v6-oat3.herokuapp.com';

export type PageProps = {
  peopleResponse: IPeopleResponse; // TODO EKKI any
  //characters__list: Array<IEdge>;
};

export default function PageComponent(
  data: InferGetServerSidePropsType<typeof getServerSideProps>,
): JSX.Element {
  const { peopleResponse } = data;
  const characters__list = peopleResponse.allPeople;
  //console.log("2>>", peopleResponse);
  return (
    <Layout>
      <Head>
        <title>Star Wars characters</title>
      </Head>
      <h1>Star Wars characters</h1>
      <Characters data={characters__list} />
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

  console.log('aaaaaaaaaaaat', peopleResponse);

  return {
    props: {
      peopleResponse,
    },
  };
};

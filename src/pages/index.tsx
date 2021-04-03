import { GetServerSideProps, InferGetServerSidePropsType } from 'next';
import Head from 'next/head';

import { Film } from '../components/film/Film';

import { Layout } from '../components/layout/Layout';
import { characterFragment } from '../graphql/characterFragment';
import { fetchSwapi } from '../lib/swapi';
import { IFilm } from '../types';

export type PageProps = {
  films: Array<IFilm> | null;
};

export default function PageComponent(
  data: InferGetServerSidePropsType<typeof getServerSideProps>,
): JSX.Element {
  //console.log('test2>>', data);
  const { films } = data;
  //console.log('test3>>', films);
  if (!films) {
    return (<p>error</p>);
  }

  return (
    <Layout>
      <Head>
        <title>Star Wars films</title>
      </Head>
      <h1>Star Wars films</h1>
      {films.map((film, i) => (
        <Film film_data={film} key={i} />
      ))}
    </Layout>
  );
}
//# TODO sækja gögn um myndir
const query = `
    {
      allFilms {
        films {
          title
          episodeID
          openingCrawl
        }
      }
    }    
`;

export const getServerSideProps: GetServerSideProps<PageProps> = async () => {
  const data = await fetchSwapi<any>(query); // TODO EKKI any

  //console.log('test1>>', data.allFilms);
  //const films = data.allFilms;
  //console.log('testultima>>', films)
  return {
    props: {
      films: data.allFilms.films,
    },
  };
};

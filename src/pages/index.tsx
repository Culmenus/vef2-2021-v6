import { GetServerSideProps, InferGetServerSidePropsType } from 'next';
import Head from 'next/head';

import { Film } from '../components/film/Film';

import { Layout } from '../components/layout/Layout';
import { fetchSwapi } from '../lib/swapi';
import { IAllFilmsResponse, IFilm } from '../types';

export type PageProps = {
  films: Array<IFilm> | null;
};

export default function PageComponent(
  data: InferGetServerSidePropsType<typeof getServerSideProps>,
): JSX.Element {
  const { films } = data;

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
// # TODO sækja gögn um myndir
const query = `
    {
      allFilms {
        films {
          title
          episodeID
          openingCrawl
          characterConnection {
            characters {
              id
              name
            }
          }
        }
      }
    }    
`;

export const getServerSideProps: GetServerSideProps<PageProps> = async () => {
  const data = await fetchSwapi<IAllFilmsResponse>(query); // TODO EKKI any

  return {
    props: {
      films: data.allFilms.films,
    },
  };
};

// Hér eru þær týpur sem við skilgreinum á móti GraphQL endapunkti

export interface ICharacter {
  id?: string;
  name?: string;
  birthYear?: string;
  eyeColor?: string;
  hairColor?: string;
  height?: number;
  mass?: number;
  // TODO fleiri týpur
}

// TODO hér ættum við að útbúa interface fyrir öll gögn sem við vinnum með (t.d. IFilm, IPaging)
// og svör sem við fáum frá GraphQL endapunkti

export interface IFilm {
  title: string;
  episodeID: number;
  openingCrawl: string;
  characterConnection: ICharCon;
}

export interface ICharCon {
  characters: Array<ICharacter>;
}

export interface IPaging {
  endCursor: string;
  hasNextPage: boolean;
}

export interface IEdge {
  node: ICharacter;
  cursor: string;
}

export interface IPeopleResponse {
  allPeople: IAllPeople;
}

export interface IAllPeople {
  totalCount: number;
  edges: Array<IEdge>;
  pageInfo: IPaging;
}

export interface IPersonResponse {
  person: ICharacter;
}

export interface IAllFilmsResponse {
  allFilms: IFilmWrapper;
}

export interface IFilmWrapper {
  films: Array<IFilm>;
}

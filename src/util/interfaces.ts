export interface IApi {
  [key: string]: string;
}

export interface IRouterProps {
  [key: string]: any;
}

export interface IScreenProps {
  [key: string]: any;
}

export interface IMovie {
  backdrop_path: string;
  poster_path: string;
  id: string;
  title: string;
  overview: string;
  release_date: string;
  vote_average: number;
  vote_count: number;
}

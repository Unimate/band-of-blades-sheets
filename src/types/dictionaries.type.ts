export interface ISquads {
  name: string;
  image: string;
  description: string;
}

export interface IDictionary {
  dictionaries: {
    squads: ISquads[];
  }
}

export interface IUsage {
  current: number;
  max: number;
}
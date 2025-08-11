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
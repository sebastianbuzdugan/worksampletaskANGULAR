export class Crud {
  id!: number;
  name!: string;
  status!: stats;
}

export enum stats{
  Available = 'Available',
  Pending = 'Pending',
  Sold = 'Sold',
}

export interface Column {
  id: 'name' | 'code' | 'population' | 'size' | 'actions';
  label: string;
  minWidth?: number;
  align?: 'right';
  format?: (value: number) => string;
}

export interface Data {
  name: string;
  code: string;
  population: number;
  size: number;
  actions: any;
}
export interface IComment {
  id?: number;
  content?: string;
  type?: string;
}

export const defaultValue: Readonly<IComment> = {};

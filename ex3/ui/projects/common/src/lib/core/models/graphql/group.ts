import { Nodes } from './nodes';

/** Groups response. */
export interface Groups {

  /** All groups. */
  allGroups: Nodes<Group>;
}

/** Group response. */
export interface Group {

  /** Id. */
  id: number;

  /** Name. */
  name: string;
}

/** Group detail by id. */
export interface GroupById {

  /** Group by id. */
  groupById: Group;
}

import { User } from '../user';

/** User profile response. */
export interface GraphQLUserProfile {

  /** User by id response. */
  userProfile: User;
}

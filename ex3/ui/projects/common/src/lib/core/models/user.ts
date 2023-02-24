/**
 * Basic representation of a user.
 */
// export interface User {

//   /**
//    * ID.
//    */
//   readonly id: number;

//   /**
//    * First name.
//    */
//   readonly firstName: string;

//   /**
//    * Last name.
//    */
//   readonly lastName: string;
// }

/** Basic representation of a user. */
export interface User {

  /** Email. */
  email: string;

  /** First name. */
  firstname: string;

  /** Id. */
  id: number;

  /** Is admin. */
  isAdmin: boolean;

  /** Last name. */
  lastname: string;
}

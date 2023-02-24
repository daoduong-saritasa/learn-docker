/** User secret. */
export interface GraphQLUserSecret {

  /** Jwt token. */
  jwtToken: string;
}

/** Authenticate function. */
export interface GraphQLLogin {

  /** Authenticate response. */
  authenticate: GraphQLUserSecret;
}

// /** Login response. */
// export interface GraphQLLogin {

//   /** Login response data. */
//   data: GraphQLAuthenticate;
// }

import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Apollo } from 'apollo-angular';
import { map, Observable } from 'rxjs';

import { User } from '../models/user';

import { GraphQLUserProfile } from '../models/graphql/user';

import { AppUrlsConfig } from './app-urls.config';
import { UserDto } from './mappers/dto/user.dto';
import { UserMapper } from './mappers/user.mapper';

import { USER_PROFILE } from './graphql/queries/user.query';

/** Performs CRUD operations for users. */
@Injectable({
  providedIn: 'root',
})
export class UserApiService {
  public constructor(
    private readonly apiUrls: AppUrlsConfig,
    private readonly httpClient: HttpClient,
    private readonly userMapper: UserMapper,
    private apollo: Apollo,
  ) {}

  /** Returns current user info.*/
  // public getCurrentUser(): Observable<User> {
  //   return this.httpClient
  //     .get<UserDto>(this.apiUrls.user.currentProfile)
  //     .pipe(map(user => this.userMapper.fromDto(user)));
  // }

  /** Returns current user info.*/
  public getCurrentUser(): Observable<User> {
    return this.apollo.watchQuery<GraphQLUserProfile>({
      query: USER_PROFILE,
    }).valueChanges.pipe(
      map(result => {
        const user = result.data.userProfile;
        return user;
      }),
    );
  }
}

import {
  rulesFactory,
  Resource,
  Resources
} from '../projects/anyres/ng-mock-restful/src/public_api';

interface User extends Resource {
  id: number;
  name: string;
}

class Users extends Resources<User> {
  query(options: {
    [key: string]: any;
  } = {}) {
    return {
      results: super.query(options)
    };
  }
}

export const USERS = {
  '/user/test': 'test',
  ...rulesFactory<
    User,
    Users
    >({
      resources: new Users(),
      path: '/user'
    }),
};

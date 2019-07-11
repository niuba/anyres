import {
  rulesFactory,
  Resource,
  Resources
} from '@anyres/ng-mock-restful';

interface Post extends Resource {
  id: number;
  title?: string;
}

class Posts extends Resources<Post> {
  query(options: {
    [key: string]: any;
  } = {}) {
    return {
      results: super.query(options)
    };
  }
}

export const POSTS = {
  ...rulesFactory<
    Post,
    Posts
    >({
      resources: new Posts(),
      path: '/post'
    }),
};

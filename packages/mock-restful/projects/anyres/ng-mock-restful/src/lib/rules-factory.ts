import { MockRequest } from '@delon/mock';
import { Resource, Resources } from './resource';

export function rulesFactory<
  R extends Resource,
  RS extends Resources<R>,
  >(
    options: {
      resources: RS,
      path: string,
    }
  ) {
  const rules: any = {};
  rules[`GET ${options.path}`] = (req: MockRequest) => options.resources.query(req.queryString);
  rules[`POST ${options.path}`] = (req: MockRequest) => options.resources.create({
    id: options.resources.getLength(),
    ...req.body
  });
  rules[`GET ${options.path}/:id`] = (req: MockRequest) => options.resources.get(+req.params.id);
  rules[`PATCH ${options.path}/:id`] = (req: MockRequest) => options.resources.update({
    id: req.params.id,
    ...req.body
  });
  rules[`DELETE ${options.path}/:id`] = (req: MockRequest) => options.resources.delete(+req.params.id);
  return rules;
}

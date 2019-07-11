import { MockStatusError } from '@delon/mock';

export interface Resource {
  id: number;
}

export class Resources<T extends Resource> {
  constructor(public list: T[] = []) { }

  getLength() {
    return this.list.length;
  }

  query(options: {
    [key: string]: any;
  } = {}): any {
    return this.list.filter(e => {
      let flag = true;
      Object.keys(options).forEach(key => {
        if (options[key] !== e[key]) {
          flag = false;
        }
      });
      return flag;
    });
  }

  create(data: T) {
    this.list.push(data);
    return data;
  }

  get(id: number) {
    const index = this.list.findIndex((v) => v.id === id);
    if (index !== -1) {
      return this.list[index];
    } else {
      throw new MockStatusError(404);
    }
  }

  update(data: T) {
    const index = this.list.findIndex((v) => v.id === data.id);
    if (index !== -1) {
      Object.keys(data).forEach((key) => {
        this.list[index][key] = data[key];
      });
      return this.list[index];
    } else {
      throw new MockStatusError(400);
    }
  }

  delete(id: number) {
    const index = this.list.findIndex((v) => v.id === id);
    if (index !== -1) {
      this.list.splice(index, 1);
      return null;
    } else {
      throw new MockStatusError(400);
    }
  }
}

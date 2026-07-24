import { users } from './data/users';

use('data');

db.getCollection('userData').insertMany([
  {
    users
  }
]);
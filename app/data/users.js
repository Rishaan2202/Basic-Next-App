import React from 'react'

class User {
  constructor(id, name, projects, balance) {
    this.id = id;
    this.name = name;
    this.email = `${name.toLowerCase()}@example.com`;
    this.projects = projects;
    this.balance = balance;
  }
}

const users = [
  new User(1, "Rishaan", [{"name": "Project 1", "description": "Description for Project 1"}, {"name": "Project 2", "description": "Description for Project 2"}], 1000),
  new User(2, "John", [{"name": "Project 3", "description": "Description for Project 3"}], 1500),
  new User(3, "Jane", [{"name": "Project 4", "description": "Description for Project 4"}, {"name": "Project 5", "description": "Description for Project 5"}], 2000),
];

export { users };

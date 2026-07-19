import React from 'react'

class User {
  constructor(id, name, projects, balance, email, slackID, verificationStatus, yswsEligible, address) {
    this.id = id;
    this.name = name;
    this.email = email;
    this.projects = projects;
    this.balance = balance;
    this.slackID = slackID;
    this.verificationStatus = verificationStatus;
    this.yswsEligible = yswsEligible;
    this.address = address; // Add address property
    this.purchaseHistory = []; // Initialize purchase history as an empty array
  }
}

const users = [];

export { users };

class User {
  constructor(id, name, projects, balance, email, slackID, verificationStatus, yswsEligible, address, pfp) {
    this.id = id;
    this.name = name;
    this.email = email;
    this.balance = balance;
    this.slackID = slackID;
    this.verificationStatus = verificationStatus;
    this.yswsEligible = yswsEligible;
    this.projects = projects;
    this.address = address; // Add address property
    this.pfp = pfp; // Sync pfp from Slack API
    this.purchaseHistory = []; // Initialize purchase history as an empty array
  }
}

const users = [];

export { users };

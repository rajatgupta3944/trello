const express = require("express");


// username and password | USERS TABLE
// organization | ORGANIZATION TABLE 
// boards | BOARDS TABLE
// issues | ISSUES TABLE

// In memory data

const users = [{
  id: 1,
  username: 'rajat',
  password: '123123'
},{
  id: 2,
  username: 'raman',
  password: '321321'
}];

const organizations = [{
  id: 1,
  title: '100xdevs',
  description: 'Learning coding',
  admin: 1,
  members: [2]
},{
  id: 1,
  title: 'ramansorg',
  description: 'Experimenting',
  admin: 1,
  members: []
}]

const boards = [{
  id: 1,
  title: '100x school website(front-end)',
  organizationId: 1
}];
const issues = [{
  id: 1,
  title: 'Add dark mode',
  boardId: 1
},{
  id: 2,
  title: 'Allow admin to create more courses',
  boardId: 1
}];



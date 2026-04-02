const express = require("express");
const jwt = require("jsonwebtoken");
const {authMiddleware} = require("./middleware.js")

// username and password | USERS TABLE
// organization | ORGANIZATION TABLE 
// boards | BOARDS TABLE
// issues | ISSUES TABLE

// In memory data

let USERS_ID = 1;
let ORGANIZATION_ID = 1;
let BOARD_ID = 1;
let ISSUES_ID = 1;

const USERS = [];

const ORGANIZATIONS = [{
  id: 1,
  title: '100xdevs',
  description: 'Learning coding',
  admin: 1,
  members: [2]
}]

const BOARDS = [{
  id: 1,
  title: '100x school website(front-end)',
  organizationId: 1
}];
const ISSUES = [{
  id: 1,
  title: 'Add dark mode',
  boardId: 1
}];

const app = express();
app.use(express.json());

app.post("/signup", (req, res) => {
  const username = req.body.username;
  const password = req.body.password;

  const userExists = USERS.find(user => user.username === username);
  if(userExists){
    res.status(409).json({
      message: 'user with this username already exists'
    })
    return;
  }
  USERS.push({
    username,
    password,
    id: USERS_ID++,
  })
  res.json({
    message: 'you have signed up successfully, user added!'
  })
})

app.post("/signin", (req, res) => {
  const username = req.body.username;
  const password = req.body.password;
  const userExists = USERS.find(user => user.username === username);
  if(!userExists){
    res.status(403).json({
      message: "Incorrect credentials"
    })
    return;
  }
  const token = jwt.sign({
    userId: userExists.id 
  }, "atlasiansupersecret123password");
  res.json({
    token
  })
})

//Authenticated route - middleware

app.post("/organization", authMiddleware, (req, res) => {
  const userId = req.userId;
  ORGANIZATIONS.push({
    id: ORGANIZATION_ID++,
    title: req.body.title,
    description: req.body.description,
    admin: userId,
    members: []
  })
  res.json({
    message: "Organization created",
    id: ORGANIZATION_ID - 1,
  })
})

app.post("/add-member-to-organization", authMiddleware, (req, res) => {
  const userId = req.userId;
  const organizationId = req.body.organizationId;
  const memberUserName = req.body.memberUserName;

  const organization = ORGANIZATIONS.find(org => org.id === organizationId);

  if(!organization || organization.admin !== userId){
    res.status(411).json({
      message: "Either this organization doesn't exist or you are nat an admin of this organization"
    })
    return;
  }

  const memberUser = USERS.find(u => u.username === memberUserName);

  if(!memberUser){
    res.status(411).json({
      message: "No user with this username exists in our organization"
    })
  }

  organization.members.push(memberUser.id);

  res.json({
    message: "New member is added"
  })

})

app.post("/board", (req, res) => {

})

app.post("/issue", (req, res) => {

})

app.get("/organizations", authMiddleware, (req, res) => {
  const userId = req.userId;
  const organizationId = req.body.organizationId;
  const memberUserName = req.body.memberUserName;

  const organization = ORGANIZATIONS.find(org => org.id === organizationId);

  if(!organization || organization.admin !== userId){
    res.status(411).json({
      message: "Either this organization doesn't exist or you are nat an admin of this organization"
    })
    return;
  }

  res.json({
    organization: {
      ...organization,
      members: organization.members.map(memberId => {
        const user = USERS.find(user => user.id === memberId);
        return {
          id: user.id,
          username: user.username
        }
      })
    }
  })

})

app.get("/boards", (req, res) => {

})

app.get("/issues", (req, res) => {

})

app.put("/issues", (req, res) => {

})

app.delete("/members", authMiddleware, (req, res) => {

  const userId = req.userId;
  const organizationId = req.body.organizationId;
  const memberUserName = req.body.memberUserName;

  const organization = ORGANIZATIONS.find(org => org.id === organizationId);

  if(!organization || organization.admin !== userId){
    res.status(411).json({
      message: "Either this organization doesn't exist or you are nat an admin of this organization"
    })
    return;
  }

  const memberUser = USERS.find(u => u.username === memberUserName);

  if(!memberUser){
    res.status(411).json({
      message: "No user with this username exists in our organization"
    })
  }

  organization.members = organization.members.filter(user => user.id !== memberUser.id)

  res.json({
    message: "New member is added"
  })

})

app.listen(3000);
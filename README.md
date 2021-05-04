# How to use

## Prerequisites
- GIT installed
- NPM installed

## Steps
1. Navigate to and/or create the directory where you want to install the app.
2. In terminal/shell, enter: `git clone git@github.com:MackRoe/slack-clone.git`

3. Then, still in terminal, do: `npm install` to install the needed node modules.
4. To run the app, enter: `npm start` and navigate to `localhost:4000/graphql` in your browser.

## The UI
![The User Interface](UserInterface.png)

Queries are added on the left and the data returned appears on the right. To send a query, click the run [>] button.

## The Queries

**__Subscriptions must be running in seperate tab__**

`subscription NewPost {
	newPost {
		message
		date
	}
}

subscription NewChannel {
  newChannel {
    name
  }
}`

### Display a list of channels
`{
  getChannels {
    name
  }
}`

### Add a new channel

### Subscribe to new channels

// Variables
//   Note: You need to set these as script property.
var slack = {
  token:     PropertiesService.getScriptProperties().getProperty('SLACK_ACCESS_TOKEN'), // Slack's token
  channelId: PropertiesService.getScriptProperties().getProperty('SLACK_CHANNEL_ID'),   // Slack's channel ID (It is not channel name)
  userName:  PropertiesService.getScriptProperties().getProperty('SLACK_BOT_NAME'),     // Bot name
}

// Post message to Slack
function postMessage(postMsg) {
  var slackapp = SlackApp.create(slack.token);
  slackapp.postMessage(slack.channelId, postMsg, {username: slack.userName})
}

// Exit with error message
function exitWithError(errMsg) {
  Logger.log(errMsg);
  postMessage(errMsg);
  throw new Error(errMsg);
}

// Get random number from min to max
//   ref. https://developer.mozilla.org/ja/docs/Web/JavaScript/Reference/Global_Objects/Math/random
function getRandomInt(min, max) {
  return Math.floor( Math.random() * (max - min + 1) ) + min;
}

// main function
function main() {
  // get member list from google speread sheet
  var ss = SpreadsheetApp.openByUrl(PropertiesService.getScriptProperties().getProperty('SPREADSHEET_URL_OF_MEMBER_LIST'));
  if (ss == null) {
    exitWithError("Cannot open SpreadSheet. please set correct URL.");
  }
  var sheet = ss.getSheetByName(PropertiesService.getScriptProperties().getProperty('SPREADSHEET_NAME_OF_MEMBER_LIST'));
  if (sheet == null) {
    exitWithError("Cannot open sheet of member list. please set correct sheet name.");
  }
  
  // assign to housekeeper from member list
  var rangeMemberList = sheet.getRange(1, 1, sheet.getLastRow()); // The number of column is assumed only one.
  var memberList = rangeMemberList.getValues();
  var index = getRandomInt(1, memberList.length);
  var assignee = memberList[index];
  postMessage(assignee + ", it's your turn to take out the garbage.");
}

// Google Apps Script — paste this into your form's Script Editor
// (in the form: Extensions → Apps Script)
//
// Setup:
//   1. Paste this entire file into the Apps Script editor.
//   2. Click "Save", then run installTrigger() once from the editor
//      (Run → Run function → installTrigger).
//   3. Approve the permissions popup.
//   4. Done — every new response fires an email to NOTIFY_EMAIL.

var NOTIFY_EMAIL = "sonyaale05@gmail.com";
var FORM_ID = "1i6aECMbAkbZ9LSa9nLlVrHzHxvLPrO3QMhJ8CBOhfuc";

function onFormSubmit(e) {
  var form = FormApp.openById(FORM_ID);
  var responses = form.getResponses();
  var latest = responses[responses.length - 1];
  var timestamp = latest.getTimestamp().toLocaleString();

  var items = latest.getItemResponses();
  var body = "New LavaLab startup application received at " + timestamp + "\n\n";

  for (var i = 0; i < items.length; i++) {
    var title = items[i].getItem().getTitle();
    var answer = items[i].getResponse();
    body += title + ":\n" + answer + "\n\n";
  }

  body += "---\nRun `node scripts/sync-form.mjs` in the repo to fetch and review this response.";

  MailApp.sendEmail({
    to: NOTIFY_EMAIL,
    subject: "New LavaLab Form Response — " + timestamp,
    body: body,
  });
}

// Run this once from the Apps Script editor to install the trigger.
function installTrigger() {
  // Remove any existing onFormSubmit triggers to avoid duplicates.
  var triggers = ScriptApp.getProjectTriggers();
  for (var i = 0; i < triggers.length; i++) {
    if (triggers[i].getHandlerFunction() === "onFormSubmit") {
      ScriptApp.deleteTrigger(triggers[i]);
    }
  }

  ScriptApp.newTrigger("onFormSubmit")
    .forForm(FORM_ID)
    .onFormSubmit()
    .create();

  Logger.log("Trigger installed successfully.");
}

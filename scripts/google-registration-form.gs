/**
 * Google Apps Script for the /register form.
 *
 * Setup (one time):
 * 1. Open your sheet → Extensions → Apps Script
 * 2. Paste this entire file, Save
 * 3. Deploy → New deployment → Web app
 *    - Execute as: Me
 *    - Who has access: Anyone
 * 4. Copy the Web app URL (ends in /exec) into .env.local:
 *    NEXT_PUBLIC_REGISTRATION_ENDPOINT=https://script.google.com/macros/s/.../exec
 * 5. npm run build and re-upload out/ via FileZilla
 *
 * View submissions:
 * https://docs.google.com/spreadsheets/d/11Be-vKFuXKHImsV-1pIYz7Q6ie7F8Z2GBvW-YYrn_Ro/edit
 */

const SPREADSHEET_ID = "11Be-vKFuXKHImsV-1pIYz7Q6ie7F8Z2GBvW-YYrn_Ro";
const SHEET_NAME = "Registrations";
const NOTIFY_EMAIL = "fahadmunaf66@gmail.com"; // set "" to disable email alerts

function doPost(e) {
  try {
    const data = JSON.parse(e.postData.contents);
    const ss = SpreadsheetApp.openById(SPREADSHEET_ID);
    let sheet = ss.getSheetByName(SHEET_NAME) || ss.insertSheet(SHEET_NAME);

    if (sheet.getLastRow() === 0) {
      sheet.appendRow([
        "Timestamp",
        "First Name",
        "Last Name",
        "Grade",
        "Phone",
        "Email",
      ]);
    }

    sheet.appendRow([
      new Date(),
      data.firstName || "",
      data.lastName || "",
      data.grade || "",
      data.phone || "",
      data.email || "",
    ]);

    if (NOTIFY_EMAIL) {
      MailApp.sendEmail({
        to: NOTIFY_EMAIL,
        subject:
          "New Registration — " +
          (data.firstName || "") +
          " " +
          (data.lastName || ""),
        replyTo: data.email || "",
        body:
          "First name: " + (data.firstName || "") + "\n" +
          "Last name: " + (data.lastName || "") + "\n" +
          "Grade: " + (data.grade || "") + "\n" +
          "Phone: " + (data.phone || "") + "\n" +
          "Email: " + (data.email || ""),
      });
    }

    return ContentService.createTextOutput(
      JSON.stringify({ success: true })
    ).setMimeType(ContentService.MimeType.JSON);
  } catch (err) {
    return ContentService.createTextOutput(
      JSON.stringify({ success: false, error: String(err) })
    ).setMimeType(ContentService.MimeType.JSON);
  }
}

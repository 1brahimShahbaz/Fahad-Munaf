/**
 * Google Apps Script for the Contact page feedback form.
 *
 * SETUP — follow each step in order:
 *
 * 1. Create a NEW Google Sheet (separate from registrations):
 *    Name it e.g. "Website Feedback"
 *
 * 2. Copy the Sheet ID from the URL:
 *    https://docs.google.com/spreadsheets/d/SHEET_ID_HERE/edit
 *    Paste it into SPREADSHEET_ID below.
 *
 * 3. In that sheet: Extensions → Apps Script → paste this file → Save
 *
 * 4. Deploy → New deployment → Web app
 *    - Execute as: Me
 *    - Who has access: Anyone
 *    → Copy the Web app URL (ends in /exec)
 *
 * 5. In your project `.env.local` add:
 *    NEXT_PUBLIC_FEEDBACK_ENDPOINT=https://script.google.com/macros/s/.../exec
 *
 * 6. npm run build → upload out/ via FileZilla
 *
 * View submissions:
 * https://docs.google.com/spreadsheets/d/1EImBZbFFgwZoC7TT5OjzbeetKeBFTb1i7omTx_Ro0lo/edit
 */

const SPREADSHEET_ID = "1EImBZbFFgwZoC7TT5OjzbeetKeBFTb1i7omTx_Ro0lo";
const SHEET_NAME = "Feedback";
const NOTIFY_EMAIL = "fahadmunaf66@gmail.com"; // set "" to disable email alerts

function doPost(e) {
  try {
    const data = JSON.parse(e.postData.contents);
    const ss = SpreadsheetApp.openById(SPREADSHEET_ID);
    let sheet = ss.getSheetByName(SHEET_NAME) || ss.insertSheet(SHEET_NAME);

    if (sheet.getLastRow() === 0) {
      sheet.appendRow(["Timestamp", "Name", "Email", "Message"]);
    }

    sheet.appendRow([
      new Date(),
      data.name || "",
      data.email || "",
      data.message || "",
    ]);

    if (NOTIFY_EMAIL) {
      MailApp.sendEmail({
        to: NOTIFY_EMAIL,
        subject: "New Feedback — " + (data.name || "Website visitor"),
        replyTo: data.email || "",
        body:
          "Name: " + (data.name || "") + "\n" +
          "Email: " + (data.email || "") + "\n\n" +
          "Message:\n" + (data.message || ""),
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

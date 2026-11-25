/**
 * Google Apps Script for Ludarp Civil Tools Hub
 * Connects website download leads directly to this Google Sheet in real-time.
 * 
 * 1-MINUTE SETUP INSTRUCTIONS:
 * 1. Open your Google Sheet (e.g. named "Ludarp Civil Leads").
 * 2. Click Extensions > Apps Script.
 * 3. Delete any default code in Code.gs and paste this entire script.
 * 4. Click Deploy > New deployment.
 * 5. Select type: "Web app" (click the gear icon next to "Select type").
 * 6. Set Description: "Ludarp Leads Webhook".
 * 7. Set Execute as: "Me" (your email).
 * 8. Set Who has access: "Anyone".
 * 9. Click Deploy, Authorize access, and copy the "Web app URL" (ends in /exec).
 * 10. Open Ludarp Civil Hub > Admin Portal > paste the URL into "Google Sheets Live Lead Sync"!
 */

function doPost(e) {
  try {
    var ss = SpreadsheetApp.getActiveSpreadsheet();
    var sheet = ss.getActiveSheet();
    
    // Auto-create header row with styling if sheet is blank
    if (sheet.getLastRow() === 0) {
      var headers = [
        "Timestamp",
        "Full Name",
        "Email",
        "Phone / WhatsApp",
        "Organization / Role",
        "Tool Requested",
        "Delivery Method"
      ];
      sheet.appendRow(headers);
      
      // Style Header
      var headerRange = sheet.getRange(1, 1, 1, headers.length);
      headerRange.setBackground("#0f172a");
      headerRange.setFontColor("#38bdf8");
      headerRange.setFontWeight("bold");
      headerRange.setFontSize(10);
      sheet.setFrozenRows(1);
    }
    
    // Parse incoming JSON payload
    var data = {};
    if (e && e.postData && e.postData.contents) {
      data = JSON.parse(e.postData.contents);
    }
    
    // Append the lead row
    sheet.appendRow([
      data.timestamp ? new Date(data.timestamp).toLocaleString() : new Date().toLocaleString(),
      data.name || "N/A",
      data.email || "N/A",
      data.phone || "N/A",
      data.org || "Independent",
      data.toolTitle || data.toolId || "General Inquiry",
      data.method || "Automated Link"
    ]);
    
    return ContentService.createTextOutput(JSON.stringify({ status: "success" }))
      .setMimeType(ContentService.MimeType.JSON);
      
  } catch (err) {
    return ContentService.createTextOutput(JSON.stringify({ status: "error", message: err.toString() }))
      .setMimeType(ContentService.MimeType.JSON);
  }
}

function doGet(e) {
  return ContentService.createTextOutput(JSON.stringify({
    status: "online",
    service: "Ludarp Civil Leads Sync API",
    activeTime: new Date().toISOString()
  })).setMimeType(ContentService.MimeType.JSON);
}

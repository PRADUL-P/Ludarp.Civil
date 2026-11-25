/**
 * Google Apps Script for Ludarp Civil Tools Hub
 * 
 * FEATURES:
 * 1. Appends every new lead and download request to your Google Sheet in real-time.
 * 2. AUTOMATICALLY emails the user the verified download link & instructions
 *    directly from the admin's Gmail account (Pradul) the instant they submit!
 * 3. Sends an instant alert to the Admin's phone/email with 1-click WhatsApp button.
 * 
 * 1-MINUTE DEPLOYMENT INSTRUCTIONS:
 * 1. Open your Google Sheet (e.g. named "Ludarp Civil Leads").
 * 2. Click Extensions > Apps Script.
 * 3. Replace all code in Code.gs with this file's code.
 * 4. Click "Deploy" > "Manage deployments" (or "New deployment").
 *    - Type: Web app
 *    - Description: "Ludarp Leads & Auto-Mailer"
 *    - Execute as: "Me" (your Google account)
 *    - Who has access: "Anyone"
 * 5. Click "Deploy", grant permissions, and copy the Web App URL (ends in /exec).
 * 6. Paste the URL into the Admin portal on Ludarp Civil Hub!
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
        "Delivery Method",
        "Email Auto-Sent",
        "Download URL"
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
    
    var userEmail = (data.email || "").trim();
    var userName = (data.name || "Colleague").trim();
    var toolTitle = data.toolTitle || data.toolId || "Civil Engineering Automation Tool";
    var downloadUrl = data.downloadUrl || "https://github.com/PRADUL-P";
    var toolUrl = data.toolUrl || "https://pradul-p.github.io/Ludarp.Civil/";
    var command = data.command || "See documentation";
    var phone = (data.phone || "").trim();
    var org = (data.org || "Independent").trim();
    var method = data.method || "Automated Link";
    
    var emailSentStatus = "No Email Provided";
    
    // 1. AUTOMATIC EMAIL FROM ADMIN (PRADUL) TO USER
    if (userEmail && userEmail !== "N/A" && userEmail.indexOf("@") !== -1) {
      try {
        var subject = "⚡ Download Link: " + toolTitle + " — Ludarp Civil";
        
        var htmlBody = '<div style="font-family: -apple-system, BlinkMacSystemFont, \'Segoe UI\', Roboto, Helvetica, Arial, sans-serif; max-width: 600px; margin: 0 auto; background-color: #0f172a; color: #f8fafc; border-radius: 16px; overflow: hidden; border: 1px solid #334155;">' +
          '<div style="background: linear-gradient(135deg, #0284c7, #0f172a); padding: 32px 24px; text-align: center; border-bottom: 1px solid #1e293b;">' +
            '<h1 style="margin: 0; color: #ffffff; font-size: 22px; font-weight: 800; letter-spacing: -0.5px;">LUDARP CIVIL</h1>' +
            '<p style="margin: 6px 0 0 0; color: #38bdf8; font-size: 13px; font-weight: 600; text-transform: uppercase; letter-spacing: 1px;">AEC &amp; Civil Automation Hub</p>' +
          '</div>' +
          '<div style="padding: 28px 24px;">' +
            '<p style="font-size: 16px; color: #e2e8f0; margin-top: 0;">Hello <strong>' + userName + '</strong>,</p>' +
            '<p style="font-size: 14px; color: #94a3b8; line-height: 1.6;">' +
              'Thank you for requesting access to <strong>' + toolTitle + '</strong> from Ludarp Civil. Here is your verified direct download link and instructions:' +
            '</p>' +
            '<div style="background-color: #1e293b; border: 1px solid rgba(56, 189, 248, 0.3); border-radius: 12px; padding: 22px; text-align: center; margin: 24px 0;">' +
              '<div style="font-size: 11px; color: #38bdf8; font-weight: bold; text-transform: uppercase; margin-bottom: 6px;">Verified File Access</div>' +
              '<div style="font-size: 17px; font-weight: bold; color: #ffffff; margin-bottom: 18px;">' + toolTitle + '</div>' +
              '<a href="' + downloadUrl + '" target="_blank" style="display: inline-block; background-color: #38bdf8; color: #0f172a; text-decoration: none; padding: 13px 30px; border-radius: 10px; font-weight: 800; font-size: 14px; text-transform: uppercase; letter-spacing: 0.5px; box-shadow: 0 4px 12px rgba(56, 189, 248, 0.3);">' +
                '📥 Download File Now' +
              '</a>' +
            '</div>' +
            '<div style="background-color: #1e293b; border-radius: 10px; padding: 16px; margin-bottom: 24px;">' +
              '<p style="margin: 0 0 8px 0; font-size: 13px; color: #cbd5e1;"><strong>Command Trigger:</strong> <code style="background-color: #0f172a; color: #38bdf8; padding: 3px 8px; border-radius: 6px; font-family: monospace;">' + command + '</code></p>' +
              '<p style="margin: 0; font-size: 13px; color: #cbd5e1;"><strong>Tool Documentation &amp; Videos:</strong> <a href="' + toolUrl + '" target="_blank" style="color: #38bdf8; text-decoration: underline;">Open Tool Page on Hub</a></p>' +
            '</div>' +
            '<p style="font-size: 13px; color: #94a3b8; line-height: 1.6;">' +
              'If you need assistance or custom AEC automation routines for AutoCAD or Revit, feel free to reply directly to this email.' +
            '</p>' +
            '<div style="margin-top: 28px; padding-top: 20px; border-top: 1px solid #1e293b;">' +
              '<p style="margin: 0; font-size: 14px; font-weight: bold; color: #f1f5f9;">Pradul P</p>' +
              '<p style="margin: 4px 0 0 0; font-size: 12px; color: #64748b;">Civil &amp; Structural Engineer • Creator of Ludarp Civil</p>' +
            '</div>' +
          '</div>' +
          '<div style="background-color: #0b1120; padding: 16px 24px; text-align: center; font-size: 11px; color: #64748b; border-top: 1px solid #1e293b;">' +
            '© Ludarp Civil • Open Source AEC Automation' +
          '</div>' +
        '</div>';
        
        var plainBody = "Hello " + userName + ",\n\n" +
          "Here is your verified download link for " + toolTitle + ":\n" +
          downloadUrl + "\n\n" +
          "Command: " + command + "\n" +
          "Documentation: " + toolUrl + "\n\n" +
          "Best regards,\nPradul P (Ludarp Civil)";
          
        GmailApp.sendEmail(userEmail, subject, plainBody, {
          htmlBody: htmlBody,
          name: "Pradul P | Ludarp Civil"
        });
        
        emailSentStatus = "Sent Automatically to " + userEmail;
      } catch (mailErr) {
        emailSentStatus = "Error: " + mailErr.toString();
      }
    }
    
    // 2. AUTOMATIC PUSH ALERT TO ADMIN (PRADUL)
    try {
      var adminEmail = Session.getActiveUser().getEmail();
      if (adminEmail) {
        var cleanPhone = phone.replace(/[^0-9]/g, '');
        var waLink = cleanPhone ? ("https://wa.me/" + cleanPhone + "?text=" + encodeURIComponent("Hello " + userName + ", thank you for your interest in " + toolTitle + " from Ludarp Civil! Here is your download link: " + downloadUrl)) : "";
        
        var adminNoticeHtml = '<div style="font-family: sans-serif; padding: 20px; background: #0f172a; color: #fff; border-radius: 12px;">' +
          '<h2 style="color: #38bdf8; margin-top: 0;">⚡ New Download Request on Ludarp Civil!</h2>' +
          '<p><strong>Name:</strong> ' + userName + '</p>' +
          '<p><strong>Email:</strong> ' + userEmail + '</p>' +
          '<p><strong>Phone / WhatsApp:</strong> ' + phone + '</p>' +
          '<p><strong>Company/Role:</strong> ' + org + '</p>' +
          '<p><strong>Tool Requested:</strong> ' + toolTitle + '</p>' +
          '<p><strong>Delivery Method:</strong> ' + method + '</p>' +
          '<p><strong>Auto-Email to User:</strong> ' + emailSentStatus + '</p>' +
          (waLink ? '<p style="margin-top: 20px;"><a href="' + waLink + '" target="_blank" style="background: #22c55e; color: #fff; padding: 12px 22px; text-decoration: none; border-radius: 8px; font-weight: bold; display: inline-block;">💬 Message ' + userName + ' on WhatsApp</a></p>' : '') +
        '</div>';
        
        GmailApp.sendEmail(adminEmail, "🔔 New Lead: " + userName + " requested " + toolTitle, "New lead: " + userName + " (" + phone + " / " + userEmail + ")", {
          htmlBody: adminNoticeHtml,
          name: "Ludarp Leads Alert"
        });
      }
    } catch (adminNoticeErr) {}
    
    // 3. APPEND ROW IN SPREADSHEET
    sheet.appendRow([
      data.timestamp ? new Date(data.timestamp).toLocaleString() : new Date().toLocaleString(),
      userName,
      userEmail,
      phone,
      org,
      toolTitle,
      method,
      emailSentStatus,
      downloadUrl
    ]);
    
    return ContentService.createTextOutput(JSON.stringify({
      status: "success",
      emailSent: emailSentStatus
    })).setMimeType(ContentService.MimeType.JSON);
    
  } catch (err) {
    return ContentService.createTextOutput(JSON.stringify({ status: "error", message: err.toString() }))
      .setMimeType(ContentService.MimeType.JSON);
  }
}

function doGet(e) {
  return ContentService.createTextOutput(JSON.stringify({
    status: "online",
    service: "Ludarp Civil Leads Sync & Auto-Mailer API",
    activeTime: new Date().toISOString()
  })).setMimeType(ContentService.MimeType.JSON);
}

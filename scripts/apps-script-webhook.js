// === Route One Funnel — Apps Script Webhook ===
// 
// DEPLOYMENT INSTRUCTIONS:
// 1. Open the Apps Script editor: https://script.google.com/d/1or4fcJce5H-aAA191zNSLuvArhKBkvpMtoOyaoyot8lv7bkwoqN6_onH/edit
// 2. Replace all code with this file's contents
// 3. Run setupSheet() once — this creates the Leads tab and headers
// 4. Deploy → New deployment → Web App
// 5. Execute as: Me
// 6. Who has access: Anyone
// 7. Copy the deployment URL — this is the SHEETS_WEBHOOK_URL
// 8. Add to Vercel env: PUBLIC_SHEETS_WEBHOOK_URL=<deployment_url>
// 9. (Optional) Run testDoPost() to verify

const SHEET_NAME = 'Leads';
const NOTIFICATION_EMAIL = 'dean@routeoneadvisory.com';

// Column headers for the Leads sheet
const HEADERS = [
  'timestamp',
  'submissionType', 
  'firstName',
  'email',
  'company',
  'industry',
  'entityCount',
  'booksStatus',
  'frustration',
  'opportunity',
  'personalTime',
  'tier',
  'painLevel',
  'urgency',
  'maturityScore',
  'caseStudyRoute',
  'industryLabel',
  'bridgeResponses',
  'utmSource',
  'utmMedium',
  'utmCampaign',
  'utmContent',
  'gclid',
  'fbclid',
  'userAgent',
  'referrer'
];

/**
 * RUN THIS FIRST — Sets up the Leads sheet with headers
 * Only needs to run once.
 */
function setupSheet() {
  const ss = SpreadsheetApp.getActiveSpreadsheet();
  let sheet = ss.getSheetByName(SHEET_NAME);
  
  // Create sheet if it doesn't exist
  if (!sheet) {
    // Check if there's a Sheet1 we can rename
    const sheet1 = ss.getSheetByName('Sheet1');
    if (sheet1) {
      sheet1.setName(SHEET_NAME);
      sheet = sheet1;
    } else {
      sheet = ss.insertSheet(SHEET_NAME);
    }
  }
  
  // Clear any existing content in row 1 and set headers
  const headerRange = sheet.getRange(1, 1, 1, HEADERS.length);
  headerRange.setValues([HEADERS]);
  
  // Format header row
  headerRange.setFontWeight('bold');
  headerRange.setBackground('#0F383C');
  headerRange.setFontColor('#E5EBE8');
  
  // Freeze header row
  sheet.setFrozenRows(1);
  
  // Auto-resize columns to fit headers
  for (let i = 1; i <= HEADERS.length; i++) {
    sheet.autoResizeColumn(i);
  }
  
  Logger.log('✅ Sheet "' + SHEET_NAME + '" set up with ' + HEADERS.length + ' columns');
  Logger.log('Next: Deploy → New deployment → Web App');
}

function doPost(e) {
  try {
    const data = JSON.parse(e.postData.contents);
    const sheet = SpreadsheetApp.getActiveSpreadsheet().getSheetByName(SHEET_NAME);

    if (!sheet) {
      return ContentService.createTextOutput(JSON.stringify({ error: 'Sheet not found' }))
        .setMimeType(ContentService.MimeType.JSON);
    }

    // Append row matching schema (A-Z columns)
    sheet.appendRow([
      new Date().toISOString(),                    // A: timestamp
      data.submissionType || 'quiz_complete',       // B: submissionType
      data.firstName || '',                         // C: firstName
      data.email || '',                             // D: email
      data.company || '',                           // E: company
      data.industry || '',                          // F: industry
      data.entityCount || '',                       // G: entityCount
      data.booksStatus || '',                       // H: booksStatus
      data.frustration || '',                       // I: frustration
      data.opportunity || '',                       // J: opportunity
      data.personalTime || '',                      // K: personalTime
      data.tier || '',                              // L: tier
      data.painLevel || '',                         // M: painLevel
      data.urgency || '',                           // N: urgency
      data.maturityScore || '',                     // O: maturityScore
      data.caseStudyRoute || '',                    // P: caseStudyRoute
      data.industryLabel || '',                     // Q: industryLabel
      JSON.stringify(data.bridgeResponses || {}),   // R: bridgeResponses
      data.utmSource || '',                         // S: utmSource
      data.utmMedium || '',                         // T: utmMedium
      data.utmCampaign || '',                       // U: utmCampaign
      data.utmContent || '',                        // V: utmContent
      data.gclid || '',                             // W: gclid
      data.fbclid || '',                            // X: fbclid
      data.userAgent || '',                         // Y: userAgent
      data.referrer || '',                          // Z: referrer
    ]);

    // Send email notification for quiz completions
    if (data.submissionType === 'quiz_complete' && data.email) {
      sendNotification(data);
    }

    return ContentService.createTextOutput(JSON.stringify({ status: 'ok' }))
      .setMimeType(ContentService.MimeType.JSON);

  } catch (error) {
    return ContentService.createTextOutput(JSON.stringify({ error: error.message }))
      .setMimeType(ContentService.MimeType.JSON);
  }
}

function sendNotification(data) {
  const score = data.maturityScore || 'N/A';
  const pain = data.painLevel || 'unknown';
  const urgency = data.urgency || 'unknown';

  const subject = `New Route One Lead: ${data.firstName} @ ${data.company} (Score: ${score})`;

  const body = [
    `New lead from the Route One diagnostic funnel:`,
    ``,
    `Name: ${data.firstName}`,
    `Email: ${data.email}`,
    `Company: ${data.company}`,
    `Industry: ${data.industryLabel || data.industry}`,
    ``,
    `--- Diagnostic Results ---`,
    `Maturity Score: ${score}/100`,
    `Pain Level: ${pain}`,
    `Urgency: ${urgency}`,
    `Tier: ${data.tier}`,
    ``,
    `--- Quiz Answers ---`,
    `Entities: ${data.entityCount}`,
    `Books Status: ${data.booksStatus}`,
    `Biggest Frustration: ${data.frustration}`,
    `Lost Money to This: ${data.opportunity}`,
    `Personal Time on Finance: ${data.personalTime}`,
    ``,
    `--- Attribution ---`,
    `Source: ${data.utmSource || 'direct'}`,
    `Medium: ${data.utmMedium || 'none'}`,
    `Campaign: ${data.utmCampaign || 'none'}`,
    ``,
    `View all leads: https://docs.google.com/spreadsheets/d/1Ox5PtQ5oIAxxbojT2M-_TEb3P4RfdOgBAcaT8LozISI`,
  ].join('\n');

  MailApp.sendEmail({
    to: NOTIFICATION_EMAIL,
    subject: subject,
    body: body,
  });
}

// Test function — run manually to verify setup
function testDoPost() {
  const mockEvent = {
    postData: {
      contents: JSON.stringify({
        submissionType: 'quiz_complete',
        firstName: 'Test',
        email: 'test@example.com',
        company: 'Test Co',
        industry: 'entertainment',
        entityCount: '4-6',
        booksStatus: '6months',
        frustration: 'trust',
        opportunity: 'yes',
        personalTime: 'half-day',
        tier: 'a',
        painLevel: 'high',
        urgency: 'high',
        maturityScore: 28,
        caseStudyRoute: 'vfx',
        industryLabel: 'Entertainment & Media',
        bridgeResponses: { results: 'Too familiar', solution: 'Exactly this' },
        utmSource: 'whatsapp',
        utmMedium: 'social',
        utmCampaign: 'launch-v2',
      })
    }
  };

  const result = doPost(mockEvent);
  Logger.log(result.getContent());
}

// Optional: Function to get the Web App URL after deployment
function getWebAppUrl() {
  const scriptId = ScriptApp.getScriptId();
  Logger.log('Script ID: ' + scriptId);
  Logger.log('To deploy: Deploy → New deployment → Web App');
}

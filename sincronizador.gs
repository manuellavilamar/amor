/**
 * Sincronizador do Nosso Calendário (versão para duas mulheres)
 * Cole este código em Extensões -> Apps Script do seu Google Sheets.
 * Depois: Implantar -> Nova implantação -> Aplicativo da Web
 *   Executar como: Eu (seu email)
 *   Quem pode acessar: Qualquer pessoa
 * Copie a URL gerada e cole no site (engrenagem -> Sincronização).
 */

var SHEET_NAME = 'dados';
var CELL = 'A1';
var SIDES = ['a', 'b'];

function doGet(e) {
  try {
    var sheet = getSheet();
    var raw = sheet.getRange(CELL).getValue();
    var data = raw ? JSON.parse(raw) : { names: { a: 'Ela', b: 'Amor' }, messages: {} };
    return ContentService
      .createTextOutput(JSON.stringify(data))
      .setMimeType(ContentService.MimeType.JSON);
  } catch (err) {
    return ContentService
      .createTextOutput(JSON.stringify({ error: String(err) }))
      .setMimeType(ContentService.MimeType.JSON);
  }
}

function doPost(e) {
  try {
    var body = e.postData ? e.postData.contents : '';
    if (!body) {
      return ContentService.createTextOutput(JSON.stringify({ ok: false, error: 'sem corpo' }))
        .setMimeType(ContentService.MimeType.JSON);
    }
    var incoming = JSON.parse(body);
    var sheet = getSheet();

    var existingRaw = sheet.getRange(CELL).getValue();
    var existing = existingRaw ? JSON.parse(existingRaw) : { names: {}, messages: {} };

    if (incoming.names) {
      if (incoming.names.a) existing.names.a = incoming.names.a;
      if (incoming.names.b) existing.names.b = incoming.names.b;
    }
    if (!existing.messages) existing.messages = {};
    if (incoming.messages) {
      Object.keys(incoming.messages).forEach(function(key) {
        if (!existing.messages[key]) existing.messages[key] = {};
        SIDES.forEach(function(s) {
          var inc = incoming.messages[key][s];
          if (inc && inc.text) {
            var cur = existing.messages[key][s];
            if (!cur || !cur.ts || (inc.ts && inc.ts > (cur.ts || 0))) {
              existing.messages[key][s] = { text: inc.text, ts: inc.ts || Date.now() };
            }
          }
        });
      });
    }

    sheet.getRange(CELL).setValue(JSON.stringify(existing));

    return ContentService.createTextOutput(JSON.stringify({ ok: true }))
      .setMimeType(ContentService.MimeType.JSON);
  } catch (err) {
    return ContentService.createTextOutput(JSON.stringify({ ok: false, error: String(err) }))
      .setMimeType(ContentService.MimeType.JSON);
  }
}

function getSheet() {
  var ss = SpreadsheetApp.getActiveSpreadsheet();
  var sheet = ss.getSheetByName(SHEET_NAME);
  if (!sheet) {
    sheet = ss.insertSheet(SHEET_NAME);
    sheet.getRange(CELL).setValue(JSON.stringify({ names: { a: 'Ela', b: 'Amor' }, messages: {} }));
  }
  return sheet;
}

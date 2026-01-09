// Code.gs trên Google Apps Script

function doPost(e) {
  var lock = LockService.getScriptLock();
  lock.tryLock(10000); // Đợi tối đa 10 giây để tránh xung đột ghi dữ liệu

  try {
    // 1. Mở Sheet đang hoạt động
    var doc = SpreadsheetApp.getActiveSpreadsheet();
    var sheet = doc.getActiveSheet(); // Hoặc dùng doc.getSheetByName('Tên Sheet');

    // 2. Lấy dữ liệu gửi từ web về
    // Dữ liệu được gửi dưới dạng chuỗi JSON
    var data = JSON.parse(e.postData.contents);

    // 3. Chuẩn bị dữ liệu theo thứ tự cột
    // Cột A: Thời gian
    var timestamp = new Date();
    
    // Cột B: Tên
    var name = data.fullName;
    
    // Cột C: Email (Nếu rỗng thì để chuỗi rỗng)
    var email = data.email ? data.email : "";
    
    // Cột D: Number/Phone (Nếu rỗng thì để chuỗi rỗng)
    var phone = data.phone ? data.phone : "";
    
    // Cột E: Nội dung
    var message = data.message;

    // 4. Ghi vào dòng tiếp theo
    sheet.appendRow([timestamp, name, email, phone, message]);

    // 5. Trả về kết quả thành công
    return ContentService.createTextOutput(JSON.stringify({ "result": "success" }))
      .setMimeType(ContentService.MimeType.JSON);

  } catch (e) {
    // Trả về lỗi nếu có
    return ContentService.createTextOutput(JSON.stringify({ "result": "error", "error": e.toString() }))
      .setMimeType(ContentService.MimeType.JSON);
  } finally {
    lock.releaseLock();
  }
}

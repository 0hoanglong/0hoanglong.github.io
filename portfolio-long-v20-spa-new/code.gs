function doPost(e) {
  try {
    // 1. Mở Sheet hiện tại
    var sheet = SpreadsheetApp.getActiveSpreadsheet().getActiveSheet();
    
    // 2. Lấy dữ liệu từ PHP gửi lên
    var name = e.parameter.name;
    var contact = e.parameter.contact;
    var message = e.parameter.message;
    
    // Tạo mốc thời gian hiện tại cho Cột A
    var timestamp = new Date();
    
    // 3. Chèn một dòng mới vào cuối bảng tính đúng thứ tự cột
    sheet.appendRow([timestamp, name, contact, message]);
    
    // 4. Trả về phản hồi cho bên PHP nhận biết
    return ContentService.createTextOutput("Success");
    
  } catch (error) {
    // Nếu lỗi, trả về thông báo lỗi
    return ContentService.createTextOutput("Error: " + error.toString());
  }
}
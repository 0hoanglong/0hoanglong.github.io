<?php
// 1. ĐẶT ĐOẠN PHP XỬ LÝ NÀY LÊN ĐẦU FILE INDEX.PHP
$notification = ""; // Biến để lưu trạng thái thông báo ra màn hình

if ($_SERVER["REQUEST_METHOD"] == "POST") {
    // Nhận dữ liệu từ Form
    $name = isset($_POST['name']) ? trim($_POST['name']) : '';
    $phone = isset($_POST['phone']) ? trim($_POST['phone']) : '';
    $email = isset($_POST['email']) ? trim($_POST['email']) : '';
    $message = isset($_POST['message']) ? trim($_POST['message']) : '';

    // Gộp Số điện thoại và Email thành chuỗi cho Cột C
    $contact_info = "";
    if (!empty($phone) && !empty($email)) {
        $contact_info = $phone . " / " . $email;
    } else {
        $contact_info = !empty($phone) ? $phone : $email;
    }

    // URL của Google Apps Script (Thay URL Web App của bạn vào đây)
    $script_url = "TẠI_ĐÂY_DÁN_URL_WEB_APP_CỦA_GOOGLE_SCRIPT";

    // Chuẩn bị data gửi đi
    $post_data = array(
        "name" => $name,
        "contact" => $contact_info,
        "message" => $message
    );

    // Gửi data qua Google Script bằng cURL
    $ch = curl_init($script_url);
    curl_setopt($ch, CURLOPT_RETURNTRANSFER, true);
    curl_setopt($ch, CURLOPT_FOLLOWLOCATION, true); 
    curl_setopt($ch, CURLOPT_POSTFIELDS, http_build_query($post_data));
    
    $response = curl_exec($ch);
    curl_close($ch);

    // Kiểm tra kết quả phản hồi để hiển thị thông báo
    if ($response === "Success") {
        $notification = "<div style='color: green; margin-bottom: 15px;'>Gửi tin nhắn thành công!</div>";
    } else {
        $notification = "<div style='color: red; margin-bottom: 15px;'>Có lỗi xảy ra khi gửi dữ liệu lên Google Sheet.</div>";
    }
}
?>

<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>Trần Hoàng Long | Portfolio</title>
    <link rel="shortcut icon" href="icon.ico" type="image/x-icon">
    
    <!-- Chỉ giữ lại FontAwesome và các thư viện icon cần thiết từ đầu -->
    <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.0.0/css/all.min.css" />
</head>
<body>

    <!-- Nơi SPA đúc giao diện -->
    <div id="root"></div>

    <!-- Gọi file quản lý nạp tài nguyên chính -->
    <script type="module" src="./import.js"></script>

</body>
</html>
// --- CÁC HÀM QUẢN LÝ GIỎ HÀNG THEO TỪNG TÀI KHOẢN (UID) ---

// Lấy mã UID của user đang đăng nhập hiện tại từ Firebase/LocalStorage
function getCurrentUserUid() {
    const user = JSON.parse(localStorage.getItem("user"));
    return user ? user.uid : "guest"; // Nếu chưa đăng nhập thì dùng tạm key "guest"
}

// Lấy giỏ hàng riêng biệt của tài khoản đang đăng nhập
function getCart() {
    const uid = getCurrentUserUid();
    return JSON.parse(localStorage.getItem("cart_" + uid)) || [];
}

// Lưu giỏ hàng riêng biệt cho tài khoản đang đăng nhập
function saveCart(cart) {
    const uid = getCurrentUserUid();
    localStorage.setItem("cart_" + uid, JSON.stringify(cart));
}
const products = [
    {
        id: 1,
        name: "Thực phẩm bảo vệ sức khỏe Multivitamin",
        price: "150.000 đ",
        image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTO5Ab_I8X3D8TWoQxytkuro0sVt9w66fLAf1u5YQt8xvU5CbbPzC_4rPU&s=10",
        description: "Bổ sung các vitamin và khoáng chất thiết yếu cho cơ thể, giúp tăng cường sức đề kháng và nâng cao sức khỏe tổng thể."
    },
    {
        id: 2,
        name: "Khẩu trang Y tế 4 lớp cao cấp",
        price: "45.000 đ",
        image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTO5Ab_I8X3D8TWoQxytkuro0sVt9w66fLAf1u5YQt8xvU5CbbPzC_4rPU&s=10",
        description: "Khẩu trang 4 lớp lọc bụi mịn, kháng khuẩn, dây đeo co giãn thoải mái không đau tai."
    },
    {
        id: 3,
        name: "Dung dịch sát khuẩn Y tế 70 độ",
        price: "25.000 đ",
        image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTO5Ab_I8X3D8TWoQxytkuro0sVt9w66fLAf1u5YQt8xvU5CbbPzC_4rPU&s=10",
        description: "Dung dịch cồn sát khuẩn nhanh, diệt 99.9% vi khuẩn, an toàn cho da tay."
    },
    {
        id: 4,
        name: "Vitamin C Tăng sức đề kháng",
        price: "85.000 đ",
        image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTO5Ab_I8X3D8TWoQxytkuro0sVt9w66fLAf1u5YQt8xvU5CbbPzC_4rPU&s=10",
        description: "Sủi Vitamin C giúp thanh nhiệt, giảm mệt mỏi, hỗ trợ miễn dịch hiệu quả."
    },
];


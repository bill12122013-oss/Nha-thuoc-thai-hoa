// ==========================================
// 1. DANH SÁCH SẢN PHẨM
// ==========================================
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
    }
];

// ==========================================
// 2. CÁC HÀM QUẢN LÝ GIỎ HÀNG THEO UID USER
// ==========================================

// Lấy UID/Email của user đang đăng nhập từ LocalStorage
function getCurrentUserUid() {
    const userStr = localStorage.getItem("currentUser");
    if (!userStr) return "guest"; // Chưa đăng nhập thì dùng key "guest"
    
    try {
        const user = JSON.parse(userStr);
        // Ưu tiên lấy uid > id > email > guest
        return user.uid || user.id || user.email || "guest";
    } catch (e) {
        return "guest";
    }
}

// Lấy giỏ hàng riêng của tài khoản đang đăng nhập
function getCart() {
    const uid = getCurrentUserUid();
    return JSON.parse(localStorage.getItem("cart_" + uid)) || [];
}

// Lưu giỏ hàng riêng cho tài khoản đang đăng nhập
function saveCart(cart) {
    const uid = getCurrentUserUid();
    localStorage.setItem("cart_" + uid, JSON.stringify(cart));
}

// Hàm thêm sản phẩm vào giỏ hàng của user hiện tại
function addToCart(productId) {
    const product = products.find(p => p.id === productId);
    if (!product) return;

    let cart = getCart();
    const existingIndex = cart.findIndex(item => item.id === productId);

    if (existingIndex > -1) {
        cart[existingIndex].quantity += 1;
    } else {
        cart.push({
            id: product.id,
            name: product.name,
            price: product.price,
            image: product.image,
            quantity: 1
        });
    }

    saveCart(cart);
    alert("Đã thêm sản phẩm vào giỏ hàng!");
}

// Hàm xử lý đăng xuất chuẩn hóa dùng key "currentUser"
function logout() {
    localStorage.removeItem("currentUser");
    window.location.href = "login.html";
}
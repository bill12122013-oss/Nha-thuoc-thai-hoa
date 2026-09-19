document.addEventListener("DOMContentLoaded", function () {
    const userNav = document.getElementById("userNav");
    if (!userNav) return;

    const currentUser = JSON.parse(localStorage.getItem("currentUser"));

    if (currentUser) {
        userNav.innerHTML = `
            <div class="user-info" style="display: flex; align-items: center; gap: 8px;">
                <img src="${currentUser.avatar || 'https://via.placeholder.com/32'}" style="width: 32px; height: 32px; border-radius: 50%; object-fit: cover;">
                <span style="font-size: 13px;"><strong>${currentUser.fullname}</strong></span>
                <button class="btn-logout" onclick="logout()" style="background: none; border: none; color: #ef4444; font-weight: 600; cursor: pointer; font-size: 12px; margin-left: 5px;">Thoát</button>
            </div>
        `;
    } else {
        userNav.innerHTML = `
            <a href="login.html" class="btn-auth">Đăng nhập</a>
        `;
    }
});

function logout() {
    localStorage.removeItem("currentUser");
    window.location.href = "index.html";
}
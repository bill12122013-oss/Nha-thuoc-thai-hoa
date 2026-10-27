// Cấu hình API Key của bạn từ Google AI Studio (https://aistudio.google.com/)
const GEMINI_API_KEY = "ĐÁN_API_KEY_CỦA_BẠN_VÀO_ĐÂY";

const toggleBtn = document.getElementById('ai-chat-toggle');
const closeBtn = document.getElementById('ai-chat-close');
const chatBox = document.getElementById('ai-chat-box');
const sendBtn = document.getElementById('ai-chat-send');
const inputField = document.getElementById('ai-chat-input');
const messagesContainer = document.getElementById('ai-chat-messages');

// Ẩn / Hiện khung chat
toggleBtn.addEventListener('click', () => chatBox.classList.toggle('hidden'));
closeBtn.addEventListener('click', () => chatBox.classList.add('hidden'));

// Xử lý gửi tin nhắn
async function sendMessage() {
    const userText = inputField.value.trim();
    if (!userText) return;

    // Hiển thị tin nhắn người dùng
    appendMessage(userText, 'user-message');
    inputField.value = '';

    // Hiển thị trạng thái đang xử lý
    const loadingMessage = appendMessage('Dược sĩ AI đang suy nghĩ...', 'ai-message');

    try {
        // Gọi API Gemini
        const response = await fetch(`https://generativelanguage.googleapis.com/v1beta/models/gemini-2.5-flash:generateContent?key=${GEMINI_API_KEY}`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
                contents: [{
                    parts: [{
                        text: `Bạn là một dược sĩ tư vấn thân thiện cho Nhà Thuốc Thái Hòa. Hãy trả lời ngắn gọn, lịch sự và đưa ra lời khuyên an toàn cho câu hỏi sau của khách hàng: ${userText}`
                    }]
                }]
            })
        });

        const data = await response.json();
        const replyText = data.candidates[0].content.parts[0].text;
        
        // Cập nhật câu trả lời từ AI
        loadingMessage.textContent = replyText;
    } catch (error) {
        loadingMessage.textContent = "Xin lỗi, đã có lỗi kết nối. Vui lòng thử lại sau!";
    }
}

function appendMessage(text, className) {
    const msgDiv = document.createElement('div');
    msgDiv.className = `message ${className}`;
    msgDiv.textContent = text;
    messagesContainer.appendChild(msgDiv);
    messagesContainer.scrollTop = messagesContainer.scrollHeight;
    return msgDiv;
}

sendBtn.addEventListener('click', sendMessage);
inputField.addEventListener('keydown', (e) => {
    if (e.key === 'Enter') sendMessage();
});
const micButton = document.getElementById('mic');
const resultDiv = document.getElementById('result');

const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
const recognition = new SpeechRecognition();

// Cấu hình Recognition
recognition.lang = 'en-US'; // Nếu muốn tiếng Việt: 'vi-VN'
recognition.interimResults = false; // chỉ lấy kết quả cuối cùng
recognition.maxAlternatives = 1; // chỉ lấy 1 kết quả tốt nhất

micButton.addEventListener('click', () => {
    console.log('Starting recognition...');

  recognition.start();
  resultDiv.textContent = "Listening...";
});

// Khi nhận được kết quả
recognition.addEventListener('result', (event) => {
  const transcript = event.results[0][0].transcript;
  resultDiv.textContent = `You said: ${transcript}`;
});

// Nếu có lỗi
recognition.addEventListener('error', (event) => {
  resultDiv.textContent = `Error occurred: ${event.error}`;
});

// Khi kết thúc tự động
recognition.addEventListener('end', () => {
  console.log('Microphone stopped.');
});

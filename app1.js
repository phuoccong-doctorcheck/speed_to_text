const micButton = document.getElementById('mic');
const resultDiv = document.getElementById('result');

const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;

if (!SpeechRecognition) {
  resultDiv.textContent = "Speech Recognition not supported in this browser.";
} else {
  const recognition = new SpeechRecognition();
  recognition.lang = 'vi-VN'; // Hoặc 'en-US' nếu bạn muốn tiếng Anh
  recognition.interimResults = false;
  recognition.maxAlternatives = 1;

  micButton.addEventListener('click', async () => {
    try {
      await navigator.mediaDevices.getUserMedia({ audio: true }); 
      recognition.start();
      resultDiv.textContent = "Listening...";
    } catch (error) {
      resultDiv.textContent = `Microphone permission denied: ${error.message}`;
    }
  });

  recognition.addEventListener('result', (event) => {
    const transcript = event.results[0][0].transcript;
    resultDiv.textContent = `You said: ${transcript}`;
  });

  recognition.addEventListener('error', (event) => {
    resultDiv.textContent = `Error occurred: ${event.error}`;
  });

  recognition.addEventListener('end', () => {
    console.log('Microphone listening stopped.');
  });
}

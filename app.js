const micButton = document.getElementById('mic');
const resultDiv = document.getElementById('result');

const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;

if (!SpeechRecognition) {
  resultDiv.textContent = "Speech Recognition not supported in this browser.";
} else {
  const recognition = new SpeechRecognition();
  recognition.lang = 'vi-VN'; // Nếu muốn tiếng Anh thì đổi 'en-US'
  recognition.interimResults = false;
  recognition.maxAlternatives = 1;

  micButton.addEventListener('click', async () => {
    try {
      // Yêu cầu quyền micro kèm lọc noise
      await navigator.mediaDevices.getUserMedia({
        audio: {
          noiseSuppression: true,
          echoCancellation: true,
          autoGainControl: true
        }
      });

      recognition.start();
      resultDiv.textContent = "Listening...";

    } catch (error) {
      resultDiv.textContent = `Microphone permission denied: ${error.message}`;
    }
  });

  recognition.addEventListener('result', (event) => {
    const transcript = event.results[0][0].transcript.trim();

    // Lọc những câu quá ngắn hoặc noise
    if (transcript.length > 2) {
      resultDiv.textContent = `You said: ${transcript}`;
    } else {
      resultDiv.textContent = `Ignored noise...`;
    }
  });

  recognition.addEventListener('error', (event) => {
    resultDiv.textContent = `Error occurred: ${event.error}`;
  });

  recognition.addEventListener('end', () => {
    console.log('Microphone listening stopped.');
  });
}

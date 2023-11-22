const SERVER_URL = window.location.origin.includes('localhost')
	? 'http://localhost:5000'
	: 'https://holonext-ai-assistant.onrender.com';

const processAudio = async (recordingBlob) => {
  const formData = new FormData();
  formData.append("audio", recordingBlob);

  try {
    const response = await axios.post(
      `${SERVER_URL}/api/speech-to-text`,
      formData,
      {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      }
    );

    getChatGPTResponse({transcript:response.data.text;})
  } catch (error) {
    console.log("error", error);
  }
};

const getChatGPTResponse = async ({transcript}) => {
  console.log("sending transcript : ", transcript);
  try {
    const response = await axios.post(`${SERVER_URL}/api/chat`, {
      message: transcript,
    });

    const answer = response.data.answer || "How can ı help you?";
    const answerAudio = response.data.audio;

    console.log("answer", answer);

    // convert audio buffer to blob
    const buffer = new Uint8Array(answerAudio.data);
    const blob = new Blob([buffer], { type: "audio/mpeg" });
    const audioData = new File([blob], "answer.mp3", { type: "audio/mpeg" });

    const audio = new Audio(URL.createObjectURL(audioData));
    audio.play();
  } catch (error) {
    console.log("error", error);
  }
};

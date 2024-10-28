import { useState, useEffect } from 'react';

interface ChatItem {
  speaker: string;
  token: string;
  text: string;
}

const API_KEY = 'sk_70ae84d9795de35b14e2c8750ce49dbf53dd544b03f54a8b';
const API_URL = 'https://api.elevenlabs.io/v1/text-to-speech';

// You can choose different voice IDs for A and B
const VOICE_ID_B = '21m00Tcm4TlvDq8ikWAM';
const VOICE_ID_A = '6xPz2opT0y5qtoRh1U1Y';

export function useElevenLabsPlayback(chatHistory: ChatItem[]) {
  const [isPlaying, setIsPlaying] = useState(false);
  const [currentIndex, setCurrentIndex] = useState(0);

  const playMessage = async (text: string, voiceId: string) => {
    const response = await fetch(`${API_URL}/${voiceId}`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'xi-api-key': API_KEY,
      },
      body: JSON.stringify({
        text,
        model_id: 'eleven_monolingual_v1',
        voice_settings: {
          stability: 0.5,
          similarity_boost: 0.5,
        },
      }),
    });

    if (!response.ok) {
      throw new Error('Failed to generate speech');
    }

    const audioBlob = await response.blob();
    const audioUrl = URL.createObjectURL(audioBlob);
    const audio = new Audio(audioUrl);

    return new Promise<void>((resolve) => {
      audio.onended = () => {
        URL.revokeObjectURL(audioUrl);
        resolve();
      };
      audio.play();
    });
  };

  const playNextMessage = async () => {
    if (currentIndex < chatHistory.length) {
      const { speaker, text } = chatHistory[currentIndex];
      const voiceId = speaker === 'A' ? VOICE_ID_A : VOICE_ID_B;

      await playMessage(text, voiceId);
      setCurrentIndex(currentIndex + 1);
    } else {
      setIsPlaying(false);
    }
  };

  useEffect(() => {
    if (isPlaying) {
      playNextMessage();
    }
  }, [isPlaying, currentIndex]);

  const startPlayback = () => {
    setIsPlaying(true);
    setCurrentIndex(0);
  };

  const stopPlayback = () => {
    setIsPlaying(false);
  };

  return { isPlaying, startPlayback, stopPlayback };
}

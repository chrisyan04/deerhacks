import * as React from 'react';
import { AudioRecorder } from 'react-audio-voice-recorder';

export default function VoiceRecorder() {
  const addAudioElement = (blob: Blob) => {
    const url = URL.createObjectURL(blob);
    const audio = document.createElement('audio');
    audio.src = url;
    audio.controls = true;
    document.body.appendChild(audio);
  };

  return (
    <div>
      <AudioRecorder
        onRecordingComplete={addAudioElement}
        audioTrackConstraints={{
          noiseSuppression: true,
          echoCancellation: true,
          // autoGainControl,
          // channelCount,
          // deviceId,
          // groupId,
          // sampleRate,
          // sampleSize,
        }}
        onNotAllowedOrFound={(err : any) => console.table(err)}
        downloadOnSavePress={false}
        downloadFileExtension="wav"
        mediaRecorderOptions={{
          audioBitsPerSecond: 128000,
        }}
        // showVisualizer={true}
      />
      <br />
    </div>
  );
}

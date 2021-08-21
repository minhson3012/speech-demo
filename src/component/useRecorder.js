import { useEffect, useState } from "react";
import RecordRTC, { StereoAudioRecorder } from "recordrtc";

const useRecorder = () => {
  const [audioURL, setAudioURL] = useState("");
  const [audioBase64, setAudioBase64] = useState("");
  const [isRecording, setIsRecording] = useState(false);
  const [recorder, setRecorder] = useState(null);

  useEffect(() => {
    if (recorder === null) {
      if (isRecording) {
        requestRecorder().then(setRecorder, console.error);
      }
      return;
    }

    if (isRecording) {
      recorder.startRecording();
    } else {
      recorder.stopRecording(function () {
        console.log(this.sampleRate);
        this.getDataURL(function (dataURL) {
          setAudioURL(dataURL);
          let audioArray = dataURL.split(",");
          setAudioBase64(audioArray[1]);
        });
      });
    }
  }, [recorder, isRecording]);

  const resetRecord = () => {
    if (recorder) {
      recorder.reset();
    }
    setAudioURL("");
    setAudioBase64("");
  };

  const startRecord = () => {
    setIsRecording(true);
  };

  const stopRecord = () => {
    setIsRecording(false);
  };

  return [
    audioURL,
    audioBase64,
    isRecording,
    startRecord,
    stopRecord,
    resetRecord,
  ];
};

async function requestRecorder() {
  const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
  return new RecordRTC(stream, {
    type: "audio",
    mimeType: "audio/wav",
    audio: true,
    recorderType: StereoAudioRecorder,
    numberOfAudioChannels: 1,
    desiredSampRate: 24000,
  });
  // return new MediaRecorder(stream);
}

export default useRecorder;

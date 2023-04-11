import dynamic from "next/dynamic";
import { Component, Suspense, useEffect, useState } from "react";

const sendAudioToS3 = async (audio: HTMLAudioElement, blob: Blob) => {
  return new Promise((resolve, reject) => {
    fetch("/api/send", {
      body: blob,
      method: "POST",
      // headers: {
      //   "Content-Type":
      //     "multipart/form-data;boundary=----WebKitFormBoundaryyrV7KO0BoCBuDbTL",
      // },
    })
      .then((res) => res.blob())
      .then((res) => {
        const audioURL = window.URL.createObjectURL(res);
        audio.src = audioURL;
        resolve(audioURL);
      })
      .catch((err) => console.log(err));
  });
};

const setupMedia = () => {
  const record = document.querySelector(".record") as HTMLButtonElement;
  const stop = document.querySelector(".stop") as HTMLButtonElement;
  const soundClips = document.querySelector(".sound-clips") as HTMLElement;

  if (navigator.mediaDevices.getUserMedia && record) {
    console.log("getUserMedia supported.");

    const constraints = { audio: true };
    let chunks = [] as BlobPart[];

    let onSuccess = function (stream: MediaStream) {
      const mediaRecorder = new MediaRecorder(stream);

      // visualize(stream);

      record.onclick = function () {
        mediaRecorder.start();
        console.log(mediaRecorder.state);
        console.log("recorder started");
        record.style.background = "red";

        stop.disabled = false;
        record.disabled = true;
      };

      stop.onclick = function () {
        mediaRecorder.stop();
        console.log(mediaRecorder.state);
        console.log("recorder stopped");
        record.style.background = "";
        record.style.color = "";
        // mediaRecorder.requestData();

        stop.disabled = true;
        record.disabled = false;
      };

      mediaRecorder.onstop = function (e) {
        console.log("data available after MediaRecorder.stop() called.");

        const clipName = prompt(
          "Enter a name for your sound clip?",
          "My unnamed clip"
        );

        const clipContainer = document.createElement("article");
        const clipLabel = document.createElement("p");
        const audio = document.createElement("audio");
        const deleteButton = document.createElement("button") as HTMLElement;

        clipContainer.classList.add("clip");
        audio.setAttribute("controls", "");
        deleteButton.textContent = "Delete";
        deleteButton.className = "delete";

        if (clipName === null) {
          clipLabel.textContent = "My unnamed clip";
        } else {
          clipLabel.textContent = clipName;
        }

        clipContainer.appendChild(audio);
        clipContainer.appendChild(clipLabel);
        clipContainer.appendChild(deleteButton);
        soundClips.appendChild(clipContainer);

        audio.controls = true;
        const blob = new Blob(chunks, { "type": "audio/mpeg" });

        chunks = [];
        sendAudioToS3(audio, blob);

        console.log("recorder stopped");

        deleteButton.onclick = function (e) {
          if (!e.target) return;
          (e.target as HTMLElement)?.closest(".clip")?.remove();
        };

        clipLabel.onclick = function () {
          const existingName = clipLabel.textContent;
          const newClipName = prompt("Enter a new name for your sound clip?");
          if (newClipName === null) {
            clipLabel.textContent = existingName;
          } else {
            clipLabel.textContent = newClipName;
          }
        };
      };

      mediaRecorder.ondataavailable = function (e) {
        chunks.push(e.data);
      };
    };

    let onError = function (err: any) {
      console.log("The following error occured: " + err);
    };

    navigator.mediaDevices.getUserMedia(constraints).then(onSuccess, onError);
  } else {
    console.log("getUserMedia not supported on your browser!");
  }
};

export const AudioRecorder: React.FC = () => {
  useEffect(() => {
    setupMedia();
  }, []);
  return (
    <div>
      <button className="record">Record</button>
      <button className="stop">Stop</button>
      <section className="sound-clips"></section>
    </div>
  );
};

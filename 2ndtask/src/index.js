const start = document.getElementById("start");
const stop = document.getElementById("stop");
const videoElement = document.querySelector("video");
let recorder, stream;




async function startRecording() {
  stream = await navigator.mediaDevices.getDisplayMedia({
    video: { mediaSource: "screen" }
  });
  recorder = new MediaRecorder(stream);

  const chunks = [];
  recorder.ondataavailable = e => chunks.push(e.data);
  var es = recorder.onstop = e => {
    const completeBlob = new Blob(chunks, { type: 'video/mp4' });
    video.src = URL.createObjectURL(completeBlob);

  
    
  };
    
  recorder.start();
}


start.addEventListener("click",function(e) {
  start.setAttribute("disabled", true);
  stop.removeAttribute("disabled");

  startRecording();
});

stop.addEventListener("click", () => {
  
  stop.setAttribute("disabled", true);
  start.removeAttribute("disabled");

  recorder.stop();
  stream.getVideoTracks()[0].stop();
  
});

// user completed recording and stream is available

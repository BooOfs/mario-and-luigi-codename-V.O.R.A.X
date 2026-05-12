var active_html
const bg_video = document.getElementById("bg-video");
var current_active_section="start"



bg_video.addEventListener("canplay", () => {
  setTimeout(() => {
    bg_video.style.opacity = 1;
    document.body.style.setProperty("--bg-color", "#fff");
  }, 300);
    console.log(document.body.style.background)
});


document.addEventListener("DOMContentLoaded", function () {
  var buttons = ["start", "download", "news", "support", "team"];
  var fileName = window.location.pathname.split("/").pop().replace(".html", "");
  active_html = fileName
  
  if (typeof current_active_section !== "undefined" && current_active_section) {
    buttons.forEach(function(b) {
      document.getElementById(b).classList.remove("active");
    });

    document.getElementById(current_active_section).classList.add("active");
  }

  buttons.forEach(function(id) {
    var el = document.getElementById(id);

    el.addEventListener("click", function() {

      buttons.forEach(function(b) {
        document.getElementById(b).classList.remove("active");
      });

      el.classList.add("active");

      active_html = id;
       const video = document.querySelector("video");
      document.cookie = "video_time=" + video.currentTime + "; path=/";
      window.location.href = id + ".html";
    });
  });
});

function getCookie(name) {
  return document.cookie
    .split("; ")
    .find(row => row.startsWith(name + "="))
    ?.split("=")[1];
}

const savedTime = getCookie("video_time");
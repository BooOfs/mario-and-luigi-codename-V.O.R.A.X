var active_html
const bg_video_down = document.getElementById("bg-video");

bg_video_down.addEventListener("canplay", () => {
  setTimeout(() => {
    bg_video_down.style.opacity = 1;
    document.body.style.backgroundColor = "#fff";
  }, 300);
});
document.addEventListener("DOMContentLoaded", function () {
  var buttons = ["start", "download", "news", "support", "team"];
  var fileName = window.location.pathname.split("/").pop().replace(".html", "");
  active_html = fileName
  
  if (typeof active_html !== "undefined" && active_html) {
    buttons.forEach(function(b) {
      document.getElementById(b).classList.remove("active");
    });

    document.getElementById(active_html).classList.add("active");
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

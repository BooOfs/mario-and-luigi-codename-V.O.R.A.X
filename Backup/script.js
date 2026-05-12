var active_html
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

      window.location.href = id + ".html";
    });
  });
});
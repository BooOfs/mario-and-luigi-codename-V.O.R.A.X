var chapter_images = {
  "1": ["1_1.jpg", "1_2.jpg", "1_3.webp"],
  "2": ["2_1.jpg", "2_2.webp"],
  "3": [],
  "4": []
};

var chapter_available = {
  "1": true,
  "2": true,
  "3": false,
  "4": false
};

var button_link = {
  "1": "https://drive.google.com/file/d/1AbCDeFgHiJK/preview",
  "2": "https://www.wikipedia.com",
  "3": "https://www.wikipedia.com",
  "4": "https://www.wikipedia.com",
}

var current_chapter = "1";
var active_dot = 0;
var interval_id;
var current_intervall = 2000;


document.addEventListener("DOMContentLoaded", function () {

  const buttons = document.querySelectorAll(".chapter_button");

  load_description(current_chapter);

  buttons.forEach(function(btn) {

    const chapter = btn.getAttribute("data-chapter");

    if (!chapter_available[chapter]) {
      btn.classList.add("not_available");
      return;
    }

    btn.addEventListener("click", function () {
      switch_chapter(chapter, buttons);
    });
  });
    
    
  const download_button = document.querySelector(".download_box")
  download_button.addEventListener("click",function() {  
      set_download_button_link(download_button);
    });

  const forward_arrow = document.querySelector(".forward_arrow");
  const back_arrow = document.querySelector(".back_arrow");

  forward_arrow.addEventListener("click", function () {
    change_image(1);
    restart_interval();
  });

  back_arrow.addEventListener("click", function () {
    change_image(-1);
    restart_interval();
  });

  change_active_button("1", buttons);
  create_preview_dots("1");
  start_interval();
});


function change_image(direction) {
  const images = chapter_images[current_chapter];
  if (!images || images.length === 0) return;

  active_dot = (active_dot + direction + images.length) % images.length;
  set_preview(current_chapter, active_dot, true);
}


function set_preview(chapter, index, animate = false) {
  const images = chapter_images[chapter];
  const img = document.querySelector(".preview_image");

  if (!images || images.length === 0 || !img) return;

  if (animate) {
    img.classList.add("fade-out");

    setTimeout(() => {
      img.src = "Preview_Chapters/" + images[index];
      img.classList.remove("fade-out");
    }, 200);
  } else {
    img.src = "Preview_Chapters/" + images[index];
  }

  active_dot = index;
  make_active_dot(index);
}

function create_preview_dots(chapter) {

  const container = document.getElementById("preview_dots");
  container.innerHTML = "";

  if (!chapter_available[chapter]) return;

  const images = chapter_images[chapter];

  images.forEach((img, i) => {
    const dot = document.createElement("div");
    dot.classList.add("dot");
    dot.dataset.id = i;

    dot.addEventListener("click", function () {
      active_dot = i;
      set_preview(chapter, i, true);
      restart_interval();
    });

    container.appendChild(dot);
  });

  if (images.length > 0) {
    set_preview(chapter, 0);
  }
}


function start_interval() {
  clearInterval(interval_id);

  interval_id = setInterval(() => {
    const images = chapter_images[current_chapter];
    if (!images || images.length === 0) return;

    active_dot = (active_dot + 1) % images.length;
    set_preview(current_chapter, active_dot, true);

  }, current_intervall);
}

function restart_interval() {
  start_interval();
}


function switch_chapter(chapter, buttons) {

  if (!chapter_available[chapter]) return;

  current_chapter = chapter;
  active_dot = 0;

  change_active_button(chapter, buttons);
  create_preview_dots(chapter);
  load_description(chapter);
  restart_interval();
    
    
  var download_button_2 = document.querySelector("download_box")
  set_download_button_link;
}


function change_active_button(chapter, buttons) {
  buttons.forEach(b => b.classList.remove("active"));
  const active = document.querySelector(`[data-chapter="${chapter}"]`);
  if (active) active.classList.add("active");
}

function make_active_dot(index) {
  const dots = document.getElementsByClassName("dot");

  Array.from(dots).forEach(d => d.classList.remove("active"));

  const active = dots[index];
  if (active) active.classList.add("active");
}

function load_description(chapter) {
  const el = document.querySelector(".description_text");
  if (!el) return;

  fetch(`Preview_Chapters_Desc/${chapter}.txt`)
    .then(res => res.text())
    .then(text => {
      const maxLength = 755;

      const finalText =
        text.length > maxLength
          ? text.slice(0, maxLength) + "..."
          : text;

      el.setAttribute("data-text", finalText);
    });
}


const sym = document.querySelector(".middle_symbol");
if (sym) {
  const num = parseInt(sym.getAttribute("number")) || 0;
  sym.textContent = "- ".repeat(num);
}


function set_download_button_link(button) {
    var link = button_link[current_chapter];
    
    let html = `<iframe class="content_website" src="${link}"></iframe>`;
    createWindow("Download Chapter ${current_chapter} <3",500,700,html,"applepay_site",true,true,"website");
    
    
    
}
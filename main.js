var active_html
const bg_video = document.getElementById("bg-video");
var current_active_section="start"



bg_video.addEventListener("canplay", () => {
  setTimeout(() => {
    bg_video.style.opacity = 1;
    document.body.style.setProperty("--bg-color", "#000");
  }, 300);
    console.log(document.body.style.background)
});


document.addEventListener("DOMContentLoaded", function () {
    scene_manager();
    var elements = ["start", "download","news","team","support"];
    
    elements.forEach(function(id) {
        console.log("Cycling through: ", id)    
        var element = document.getElementById(id);
        element.addEventListener("click",function() {
            console.log("Click confirmed with: ", id)      
            new_id = id + "_page_id"
            console.log("New ID: ", new_id)    
            jump_to_pos(new_id);                        
                                
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
  
  
function scene_manager() {
  window.addEventListener("scroll", () => {
  
    const scrollPos = window.scrollY;
    console.log(scrollPos)
    const start = document.getElementById("start");
    const download = document.getElementById("download");
    const news = document.getElementById("news");
    const support = document.getElementById("support");
    const team = document.getElementById("team");
    var all_pages = [start,download,news,support,team];
    all_pages.forEach(function(el){
    el.classList.remove("active");
  });
  
  if (scrollPos >= 0 && scrollPos < 500) {
    start.classList.add("active");
  }
  else if (scrollPos >= 500 && scrollPos < 1200) {
      download.classList.add("active");
  }
  else if (scrollPos >= 1200 && scrollPos < 2200) {
      news.classList.add("active");
  }
  else if (scrollPos >= 2200 && scrollPos < 3000) {
      support.classList.add("active");
  }
  else if (scrollPos >= 3000 && scrollPos < 3900) {
      team.classList.add("active");
  }  
});
  
  
  
}
  
function jump_to_pos(id) {
  const element = document.getElementById(id);
  if (element) {
    let topPos = element.dataset.posMax;
    console.log("Pos Max", topPos)
    window.scrollTo({
        top: topPos,
        behavior: 'smooth'
    });
}
}
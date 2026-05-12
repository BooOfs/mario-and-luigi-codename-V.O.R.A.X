var windows_opened = 0;

function createWindow(title,w,h,contentHTML,themeClass,draggable,rezsizeable,type)
{
    document.querySelectorAll(".currently_active").forEach(w => {
        w.classList.remove("currently_active");
    });
    const temp = document.getElementById("window_template");
    const win = temp.cloneNode(true);
    windows_opened += 1;
    

    
    win.id = "";
    win.style.display = "block";
    win.style.width = w + "px";
    win.style.height = h + "px";
    win.querySelector(".window_title").textContent = title;
    win.querySelector(".window_content").innerHTML = contentHTML;
    document.body.appendChild(win);
    
    win.querySelector(".btn_close").onclick = () => {
        windows_opened -= 1;
        win.remove();
    };
    
    win.querySelector(".btn_max").onclick = () => {
        win.style.width = w + "px";
        win.style.height = h + "px";
    };
    
    win.classList.add(themeClass);
    if (draggable == true){makeDraggable(win);}
    
    const type_container = [
        win.querySelector(".type_website")
    ]
    
    if (type == "normal")
        {
         type_container.forEach(function(el) {
                el.remove();
         });   
        }
    else if (type == "website")
    {
         type_container.forEach(function(el) {
            if (el != win.querySelector(".type_website"))
             {
                el.remove(); 
             }  
             apply_type_website_scale(win)
             let url = win.querySelector(".website_url");
             let website_iframe = win.querySelector(".content_website");
             
             url.textContent = website_iframe.src;
         });   
    }
    
    const clickableElements = [
        win,
        win.querySelector(".btn_close"),
        win.querySelector(".btn_max"),  
        win.querySelector(".btn_min"),
        win.querySelector(".draggable_part"),
        win.querySelector(".window_content")      
    ];
    
    clickableElements.forEach(el => {
       el.classList.add("currently_active"); 
    });
    
    clickableElements.forEach(el => {
        if (el)
            {
                el.addEventListener("click", () => {
                    document.querySelectorAll(".currently_active").forEach(w => {
                        w.classList.remove("currently_active");
                    });
                    win.classList.add("currently_active");
                    
                    win.querySelector(".btn_close")?.classList.add("currently_active");
                    win.querySelector(".btn_max")?.classList.add("currently_active");
                    win.querySelector(".btn_min")?.classList.add("currently_active");
                });
            }
        
    });
    
    if (rezsizeable == true)
       {
       makeResizeable(win);
       }
    refresh_max_height(win)
}

function makeDraggable(win)
{
    const header = win.querySelector(".window_header");
    let pos1 = 0, pos2 = 0, pos3 = 0, pos4 = 0;
    
    header.onmousedown = (e) => {
        header.style.cursor = 'move';
        
        e.preventDefault;
        pos3 = e.clientX;
        pos4 = e.clientY;
        
        document.onmouseup = () => {
            document.onmouseup = null;
            document.onmousemove = null
            header.style.cursor = 'default'
        };
        
        document.onmousemove = (e) => {
            e.preventDefault;
            
            pos1 = pos3 - e.clientX;
            pos2 = pos4 - e.clientY;
            pos3 = e.clientX;
            pos4 = e.clientY;
            
            win.style.top = (win.offsetTop - pos2) + "px";
            win.style.left = (win.offsetLeft - pos1) + "px";     
            
        };
        document.querySelectorAll(".currently_active").forEach(w => {
             w.classList.remove("currently_active");
         });
         win.classList.add("currently_active");
                    
         win.querySelector(".btn_close")?.classList.add("currently_active");
         win.querySelector(".btn_max")?.classList.add("currently_active");
         win.querySelector(".btn_min")?.classList.add("currently_active");
        
    };
                    
    
    win.onmousedown = (e) => {
      if (e.ctrlKey) {
        console.log("Ctrl + mouse down");
        win.style.cursor = 'move';
        document.body.style.pointerEvents = "none";
        e.preventDefault;
        pos3 = e.clientX;
        pos4 = e.clientY;
        
        document.onmouseup = () => {
            document.onmouseup = null;
            document.onmousemove = null
            win.style.cursor = 'default'
            document.body.style.pointerEvents = "auto";
        };
        
        document.onmousemove = (e) => {
            e.preventDefault;
            
            pos1 = pos3 - e.clientX;
            pos2 = pos4 - e.clientY;
            pos3 = e.clientX;
            pos4 = e.clientY;
            
            win.style.top = (win.offsetTop - pos2) + "px";
            win.style.left = (win.offsetLeft - pos1) + "px";     
            
        };
        document.querySelectorAll(".currently_active").forEach(w => {
             w.classList.remove("currently_active");
         });
         win.classList.add("currently_active");
                    
         win.querySelector(".btn_close")?.classList.add("currently_active");
         win.querySelector(".btn_max")?.classList.add("currently_active");
         win.querySelector(".btn_min")?.classList.add("currently_active");
      } 
    };
}
    
function refresh_max_height(win)
{
    if (!document.body.contains(win)) {
        return;
    }
    const contentArea = win.querySelector(".window_content");
    const header = win.querySelector(".draggable_part");
    
    if (contentArea && header)
        
        {
            const availableHeight = win.offsetHeight - header.offsetHeight;
            
            contentArea.style.maxHeight = availableHeight + "px"; 
        }
    requestAnimationFrame(() => refresh_max_height(win));
}

function apply_type_website_scale(win)
{
    if (!document.body.contains(win)) {
        return;
    }
    const contentArea = win.querySelector(".window_content");
    const header = win.querySelector(".draggable_part");
    const content_website = win.querySelector(".content_website")
    if (contentArea && header)
        
        {
            const availableHeight = win.offsetHeight - (header.offsetHeight + 40);
            
            content_website.style.height = availableHeight + "px"; 
        }
    requestAnimationFrame(() => apply_type_website_scale(win));
}
                    
function makeResizeable(win)
{
   const resizers = win.querySelectorAll(".resize");
   let current_resizer;

   for (let resizer of resizers)
        {
              resizer.addEventListener("mousedown", (e) => {
                    current_resizer = e.target;
                    e.stopPropagation;
                    e.preventDefault();
                    let prevX = e.clientX;
                    let prevY = e.clientY;
                    
                    document.body.classList.add("resizing");
                    const mousemove = (e) => 
                    {
                    const width = win.offsetWidth;
                    const height = win.offsetHeight;
                    const top = win.offsetTop;
                    const left = win.offsetLeft;
                            
                    const deltaX = e.clientX - prevX;
                    const deltaY = e.clientY - prevY;
                    
                    const rect = win.getBoundingClientRect;
                    
                    if (current_resizer.classList.contains("right"))
                    {
                        win.style.width = width + (e.clientX - prevX) + "px";
                    }
                    if (current_resizer.classList.contains("bottom"))
                    {
                        win.style.height = height + (e.clientY - prevY) + "px";
                    }
                    if (current_resizer.classList.contains("left"))
                    {

                        win.style.width = (width - deltaX) + "px";
                        win.style.left = (left + deltaX) + "px";
                    }
                    if (current_resizer.classList.contains("top"))
                    {
                        win.style.height = (height - deltaY) + "px";
                        win.style.top = (top + deltaY) + "px";
                    }
                    
                    if (current_resizer.classList.contains("ne"))
                    {
                        win.style.height = (height - deltaY) + "px";
                        win.style.top = (top + deltaY) + "px";
                        win.style.width = width + (e.clientX - prevX) + "px";
                    }
                    
                    if (current_resizer.classList.contains("nw"))
                    {
                       win.style.height = (height - deltaY) + "px";
                        win.style.top = (top + deltaY) + "px";

                        win.style.width = (width - deltaX) + "px";
                        win.style.left = (left + deltaX) + "px";
                    }
                    
                    if (current_resizer.classList.contains("se"))
                    {
                        win.style.width = width + (e.clientX - prevX) + "px";
                        win.style.height = height + (e.clientY - prevY) + "px";
                    }
                    
                    if (current_resizer.classList.contains("sw"))
                    {
                        win.style.height = height + (e.clientY - prevY) + "px";
                        win.style.width = (width - deltaX) + "px";
                        win.style.left = (left + deltaX) + "px";
                    }
                    prevX = e.clientX;
                    prevY = e.clientY;
                    };
                    
                    const mouseup = () =>
                    {
                        window.removeEventListener("mousemove", mousemove);
                        window.removeEventListener("mouseup", mouseup);
                        document.body.classList.remove("resizing");
                    };
                    
                    window.addEventListener("mousemove", mousemove);
                    window.addEventListener("mouseup", mouseup);
            
                    
            });      
                    
        }
                    
 }

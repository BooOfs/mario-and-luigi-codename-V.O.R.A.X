var news_article_array = [];

var current_page = 0;
var max_pages;
var type_sort;
var amount_of_files;
var all_articles = [];
var news_nodes = [];
var news_article_array = [];
document.addEventListener("DOMContentLoaded", async () => {
   amount_of_files = await get_amount_of_files();
   console.log("Amount o files", amount_of_files);
   await make_news_order();
   max_pages = await get_max_pages();
   await load_page(current_page);
    change_page_number()
    
   var button_left = document.getElementById("News_Arrow_Left");
   
   button_left.addEventListener("click", function () {
      change_page(-1);
    });
    
   var button_right = document.getElementById("News_Arrow_Right");
   
   button_right.addEventListener("click", function () {
      change_page(-1);
    });
    
    
  
    
    

    
});

async function make_news_order()
{

 for (let i=0; i<amount_of_files; i++)
     {   
      text_data = await get_text_data(String("News_Texts/"+i+".txt"));
      if (text_data == null)
          {
              console.error("No Text found for ", "News_Text/"+i+".txt", "or its missing Contents");
              return
          }
      
      let dateMatch = text_data.match(/date="(.+?)"/);
      let dateString = dateMatch ? dateMatch[1] : "1.01.2000";
                                      
      let parts = dateString.split('.');
      let sortableDate = new Date(parts[2], parts[1] - 1, parts[0]).getTime;
         
      all_articles.push({
         content: text_data,
         time: sortableDate
          
      });
     }
 all_articles.sort((a,b) => b.time - a.time);
    
 all_articles.forEach(article => { 
     console.log("Spawning ", article,"...")
 });
}
async function get_text_data(path){
    try {
        let res = await fetch(path);
        let text = await res.text();
         
        return text;
    } catch (error) {
        console.error("Error loading text", error);
        return 0;
    }
}
async function get_amount_of_files()
{
    try {
        let res = await fetch("info.txt");
        let text = await res.text();
        
        let match = text.match(/file_count_news="(.+?)"/);
        
        if (match) {
            let amount = parseInt(match[1]);
            console.log("There are: ", amount, " Files");
            return amount;
        } else {
        console.error("Didnt find your match" );
        return 0;
        }
    } catch (error) {
        console.error("Error loading text", error);
        return 0;
    }
}

async function load_page(page) {
    await delete_existing_articles();
    await spawn_articles(page);
}

async function spawn_articles(page)
{
    let startIndex = page*4;
    
    let endIndex = Math.min(startIndex + 4, amount_of_files);
    console.log(endIndex, "End des Indexierens", startIndex);
    if (startIndex>endIndex){
        console.error("Auf dieser Seite gibt es nix. 'Page: ", page, "'!")
        return
    } 
    for (let i = startIndex; i < endIndex; i++) {
        console.log("Loading article index: ", i);
        
        console.log("File", amount_of_files)
        var template_element = document.getElementById("news_content_id");
        const cloned_element = template_element.cloneNode(true);
        cloned_element.style.display = "block";
        template_element.parentNode.appendChild(cloned_element);
        cloned_element.dataset.newsIndex = String(i);
        cloned_element.style.display = "block";
        template_element.parentNode.appendChild(cloned_element);
        let clone_element_bg = cloned_element.querySelector(".news_bg");
        let true_index = 0;
        if (i >3) {
            true_index = i - 4
        } else {
            true_index = i
        }
        let offset = true_index * -0.285
        cloned_element.style.setProperty("--offset-right", offset);
        console.log(cloned_element, " Klon")
        
        let clone_element_image = cloned_element.querySelector(".news_picture");
        let clone_element_title = cloned_element.querySelector(".news_title");
        let clone_element_date = cloned_element.querySelector(".news_date")
        
        console.log(clone_element_image, "Image");
        cloned_element.style.setProperty("--index",String(i));
        news_article_array.push(cloned_element);
        console.log(news_article_array);
        
        let text_data = await get_text_data("News_Texts/"+i+".txt");
        let target_path_image = await match_data(text_data,/preview_pic="(.+?)"/);
        clone_element_image.src = target_path_image;
        
        let target_path_titel = await match_data(text_data,/headline="([^"]*)"/);
        clone_element_title.textContent = target_path_titel
        
        let target_path_date = await match_data(text_data, /date="([^"]*)"/);
        let target_path_hour = await match_data(text_data, /hour="([^"]*)"/);
        let text = await match_data(text_data, /text="([^"]*)"/)
        
        clone_element_date.textContent = String(target_path_date+" at "+ target_path_hour+" O'Clock");
        
        clone_element_title.addEventListener("click", function () {
            
            let html = parseArticelText(text_data)
            
            createWindow(target_path_titel,900,900,html,"news_window",true,true,"normal");
        });
    }

}

function parseArticelText(text_data)
{
    let final_html = "";
    
    const regex = /(text|bild|youtube_video|header|empty)\s*=\s*"([^"]*)"/g;
    const matches = text_data.matchAll(regex);
    
    for (const match of matches) {
        const type = match[1];
        const content = match[2];
        
        // Hier kann sehr einfach ein neuer Typ hinzugefügt werden. Alles was machen muss dafür, ist oben im regex den Namen einzutragen, und unten ein else if statement mit html hinzufügen.
        
        if (type === "text") {
            final_html += `<p class="news-body">${content}</p>`;
        } else if (type === "bild"){
            final_html += `<img src="${content}" class="news_image">`;
        } else if (type === "youtube_video"){
            final_html += `<iframe class="news_video" width="400" height="300" src="${content}"></iframe>`;
        } else if (type === "header") {
            final_html += `<p class="news-body news_header">${content}</p>`;
        } else if (type === "empty") {
            final_html += `<div class="news-body news_empty">‎ </div>`;
        } else if (type === "link") {
            final_html += `<a href="url">link text</a>`;
        }
        
        
    }
    
    return final_html
}
async function match_data(data, match)
{
        let text_data = data;
        
        const match_path = text_data.match(match);
        
        if (match_path)
            {
                const target_path = match_path[1];
                console.log("Found Path ", target_path ,"in the match_data func");
                
                return target_path;
            }
        return null;
}

async function get_max_pages()
{
    return Math.ceil((amount_of_files/4)-1);
}

function change_page(direction)
{
    current_page += direction;
    
    if (current_page <0)
    {
        current_page = max_pages;
    } else if (current_page >max_pages){
        current_page = 0 
    }
    
    load_page(current_page)
    change_page_number()
}

async function delete_existing_articles()
{
    news_article_array.forEach(article=> {
        article.remove();
    })
    
}

function change_page_number()
{
    const page_number = document.getElementById("news_page_count");
    
    let current_page_number = current_page + 1;
    let current_max_page_number = max_pages + 1;
    page_number.textContent = String(current_page_number+"/"+current_max_page_number)
}
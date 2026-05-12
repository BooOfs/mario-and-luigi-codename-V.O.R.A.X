function refresh_data_lt(){
    const all_buttons = document.querySelectorAll(".button_linktree");
    add_childs(all_buttons);
}


function add_childs(all_buttons){
    all_buttons.forEach((btn) => {
        const styles = getComputedStyle(btn);
        let content = styles.getPropertyValue("--logo").trim();

        content = content.replace(/url\(["']?(.+?)["']?\)/, "$1");

        if (!content) return;

        const img = document.createElement("img");
        img.src = content;
        img.className = "img_LT";

        btn.textContent = "";
        btn.appendChild(img);
        console.log(btn, "Button")
    });
}


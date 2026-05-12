const logo_left = document.getElementById("team_logo_left");
const logo_right = document.getElementById("team_logo_right");

logo_left.addEventListener("click", function () {
    fetch("linktree.html")
        .then(res => res.text())
        .then(html => {
            const win = createWindow(
                "LinkTree",
                800,
                900,
                html,
                "link_tree",
                true,
                true,
                "normal"
            );

            // wait 1 frame so DOM settles
            requestAnimationFrame(() => {
                refresh_max_height(win);
            });
        });
});

logo_right.addEventListener("click", function () {
            let html = 
            createWindow("LinkTree",800,900,html,"link_tree",true,true,"normal");
    });
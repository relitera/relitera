    const sidebar = document.querySelector(".sidebar");
    const sidebarToggle = document.getElementById("aaaa");
    const sidebarClose = document.querySelector(".sidebar-close");
    const backdrop = document.querySelector(".sidebar-backdrop");
    const body = document.getElementById("body");

    function toggleSidebar() {
        sidebar.classList.toggle("open");
        backdrop.classList.toggle("active");
        body.classList.toggle("disable-scroll");
    }

    function closeSidebar() {
        sidebar.classList.remove("open");
        backdrop.classList.remove("active");
        body.classList.remove("disable-scroll");
    }

    sidebarToggle.addEventListener("click", toggleSidebar);
    sidebarClose.addEventListener("click", closeSidebar);
    backdrop.addEventListener("click", closeSidebar);

    document.addEventListener("keydown", (e) => {
        if (e.key === "Escape" && sidebar.classList.contains("open")) {
            closeSidebar();
        }
    });

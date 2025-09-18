document.addEventListener("DOMContentLoaded", () => {
    const sidebar = document.querySelector(".sidebar");
    const sidebarToggle = document.querySelector(".fa-bars");
    const sidebarClose = document.querySelector(".sidebar-close");

    function toggleSidebar() {
        sidebar.classList.toggle("open");
    }

    function closeSidebar() {
        sidebar.classList.remove("open");
    }

    sidebarToggle.addEventListener("click", toggleSidebar);
    sidebarClose.addEventListener("click", closeSidebar);
});

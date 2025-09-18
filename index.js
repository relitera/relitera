document.addEventListener("DOMContentLoaded", () => {
    const sidebar = document.querySelector(".sidebar");
    const sidebarToggle = document.querySelector(".fa-bars");
    const sidebarClose = document.querySelector(".sidebar-close");
    const backdrop = document.querySelector(".sidebar-backdrop");

    function toggleSidebar() {
        sidebar.classList.toggle("open");
        backdrop.classList.toggle("active");
    }

    function closeSidebar() {
        sidebar.classList.remove("open");
        backdrop.classList.remove("active");
    }

    sidebarToggle.addEventListener("click", toggleSidebar);
    sidebarClose.addEventListener("click", closeSidebar);
    backdrop.addEventListener("click", closeSidebar);
});

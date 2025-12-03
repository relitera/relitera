import { isLogged } from "../store/UserStore/UserStore.js";
import lessonsStore from "../store/LessonsStore/LessonsStore.js";

document.addEventListener("DOMContentLoaded", function () {
  if (!isLogged()) {
    localStorage.removeItem("user-token");
    localStorage.removeItem("user");
    window.location.href = "/minha-conta/login";
    return;
  }

  function goBack() {
    window.location.href = `${window.location.origin}/minha-conta/meuscursos/index.html`;
  }

  function updateLessonPage() {
    const lessonsList = document.querySelector(".lessons-list");
    lessonsList.innerHTML = "";
    lessonsStore.getLessons().forEach((lesson, index) => {
        
      if (lessonsStore.currentLessonIndex === index) {
         const iframe = document.getElementById("youtubeVideo");
      iframe.src = lesson.video_url;
        document.getElementById("courseTitle").textContent = lesson.name;
        document.getElementById("lessonDescription").textContent =
          lesson.description;
      }

      const lessonItem = document.createElement("div");
      lessonItem.className = `lesson-item ${
        lessonsStore.currentLessonIndex === index ? "active" : ""
      }`;
      lessonItem.setAttribute(
        "data-lesson",
        lessonsStore.currentLessonIndex + 1
      );
      lessonItem.onclick = async () => {
        lessonsStore.setCurrentLesson(index);
        updateLessonPage();
      };

      lessonItem.innerHTML = `
                <div class="lesson-number">${index + 1}</div>
                <div class="lesson-content">
                    <div class="lesson-title">${lesson.name}</div>
                </div>
            `;

      lessonsList.appendChild(lessonItem);
    });
  }

  // Carregar dados do curso baseado na URL
  async function loadCourseData() {
    const urlParams = new URLSearchParams(window.location.search);
    const courseId =
      urlParams.get("course_id") || "3499f75b-451c-48a6-b02c-671a063b5b39";

    const courseName = urlParams.get("course_name")

    const classesGet = await fetch(
      `https://relitera-api.onrender.com/classes/course?course_id=${courseId}`,
      {
        method: "GET",
      }
    );

    const classesRes = await classesGet.json();

    if (classesRes) {
      lessonsStore.setLessons(classesRes);
      document.getElementById("trailName").textContent = courseName;

      updateLessonPage();
    }
  }

  // Inicializar quando a página carregar
  loadCourseData();

  // Adicionar event listeners
  const lessonItems = document.querySelectorAll(".lesson-item");
  lessonItems.forEach((item) => {
    item.addEventListener("click", function () {
      // Remover active de todos
      lessonItems.forEach((li) => li.classList.remove("active"));
      // Adicionar active ao clicado
      this.classList.add("active");
    });
  });
});

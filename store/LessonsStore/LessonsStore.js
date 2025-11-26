class LessonsStore {
  constructor() {
    this.lessons = []
    this.currentLessonIndex = 0
    this.loadFromStorage();
  }

  setLessons(lessons) {
    this.lessons = lessons;
    localStorage.setItem("lessons", JSON.stringify(this.lessons));
  }

  getLessons() {
    return this.lessons;
  }

  clearLessons() {
    this.lessons = null;
    localStorage.removeItem("lessons");
  }
  
  setCurrentLesson(index) {
    this.currentLessonIndex = index
  } 

  loadFromStorage() {
    const saved = localStorage.getItem("lessons");
    if (saved) this.lessons = JSON.parse(saved);
  }
}

const lessonsStore = new LessonsStore()

export default lessonsStore
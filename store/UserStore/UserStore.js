class UserStore {
  constructor() {
    this.user = {
      name: "",
      email: "",
      id: "",
      birthdate: null
    };
    this.loadFromStorage();
  }

  setUser(user) {
    this.user = user;
    localStorage.setItem("user", JSON.stringify(user));
  }

  getUser() {
    return this.user;
  }

  clearUser() {
    this.user = null;
    localStorage.removeItem("user");
  }

  loadFromStorage() {
    const saved = localStorage.getItem("user");
    if (saved) this.user = JSON.parse(saved);
  }
}

export function isLogged() {
  const userRaw = localStorage.getItem("user");
  if (!userRaw) return false;

  try {
    const user = JSON.parse(userRaw);
    return Boolean(user?.id);
  } catch {
    localStorage.removeItem("user");
    return false;
  }
}

const userStore = new UserStore()

export default userStore

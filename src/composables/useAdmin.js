import { ref } from 'vue';

const isAdmin = ref(localStorage.getItem('isAdmin') === 'true');

export function useAdmin() {
  function login() {
    localStorage.setItem('isAdmin', 'true');
    isAdmin.value = true;
  }

  function logout() {
    localStorage.removeItem('isAdmin');
    isAdmin.value = false;
  }

  return { isAdmin, login, logout };
}

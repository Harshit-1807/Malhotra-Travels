<template>
  <div class="admin-login__container">
    <div class="admin-login__card">
      <h2 class="admin-login__title">Admin Panel</h2>

      <form @submit.prevent="loginAdmin">
        <div class="admin-login__field">
          <input
            v-model.trim="username"
            class="admin-login__input"
            placeholder="Username"
            autocomplete="username"
            aria-label="Username"
            :aria-invalid="showValidation && !username ? 'true' : 'false'"
          />
          <span
            v-if="showValidation && !username"
            class="admin-login__validation"
            >Username is required</span
          >
        </div>

        <div class="admin-login__field">
          <div class="admin-login__password-wrapper">
            <input
              v-model.trim="password"
              :type="showPassword ? 'text' : 'password'"
              class="admin-login__input"
              placeholder="Password"
              autocomplete="current-password"
              aria-label="Password"
              :aria-invalid="showValidation && !password ? 'true' : 'false'"
            />
            <span
              class="admin-login__toggle"
              @click="showPassword = !showPassword"
              role="button"
              aria-label="Toggle password visibility"
            >
              {{ showPassword ? "🙈" : "👁️" }}
            </span>
          </div>
          <span
            v-if="showValidation && !password"
            class="admin-login__validation"
            >Password is required</span
          >
        </div>

        <button
          class="admin-login__button"
          type="submit"
          :disabled="loading"
          aria-label="Login button"
        >
          <span v-if="loading">Logging in...</span>
          <span v-else>Login</span>
        </button>
      </form>

      <p
        class="admin-login__back"
        @click="goBack"
        role="button"
        aria-label="Back to website"
      >
        ← Back to Website
      </p>

      <p v-if="error" class="admin-login__error">{{ error }}</p>
    </div>
  </div>
</template>

<script setup>
import { ref } from "vue";
import { useRouter } from "vue-router";
import { db } from "../firebase/firebaseConfig";
import { doc, getDoc } from "firebase/firestore";

const router = useRouter();

const username = ref("");
const password = ref("");
const error = ref("");
const loading = ref(false);
const showPassword = ref(false);
const showValidation = ref(false);

const loginAdmin = async () => {
  error.value = "";
  showValidation.value = false;

  if (!username.value || !password.value) {
    showValidation.value = true;
    return;
  }

  loading.value = true;

  try {
    const docRef = doc(db, "Admin", "admin001");
    const docSnap = await getDoc(docRef);

    if (docSnap.exists()) {
      const admin = docSnap.data();
      if (
        username.value === admin.username &&
        password.value === admin.password
      ) {
        localStorage.setItem("isAdmin", "true");
        router.push("/admin-dashboard");
      } else {
        error.value = "Invalid username or password.";
      }
    } else {
      error.value = "Admin credentials not found.";
    }
  } catch (err) {
    error.value = "Error during login.";
    console.error(err);
  } finally {
    loading.value = false;
  }
};

const goBack = () => {
  router.push("/");
};
</script>

<style scoped>
.admin-login__container {
  min-height: 100vh;
  display: flex;
  justify-content: center;
  align-items: center;
  background: linear-gradient(to right, #ece9e6, #ffffff);
  padding: 1rem;
}

.admin-login__card {
  width: 100%;
  max-width: 400px;
  padding: 2.5rem;
  background: #ffffff;
  border-radius: 12px;
  box-shadow: 0 8px 20px rgba(0, 0, 0, 0.1);
  box-sizing: border-box;
}

.admin-login__title {
  text-align: center;
  margin-bottom: 2rem;
  font-size: 2rem;
  color: #2c3e50;
  font-weight: bold;
}

.admin-login__field {
  margin-bottom: 1rem;
}

.admin-login__input {
  width: 100%;
  padding: 12px;
  margin-bottom: 0.5rem;
  border: 1px solid #ccc;
  border-radius: 6px;
  font-size: 1rem;
  transition: 0.2s ease-in-out;
  box-sizing: border-box;
}

.admin-login__input:focus {
  border-color: #1976d2;
  outline: none;
  box-shadow: 0 0 4px rgba(25, 118, 210, 0.3);
}

.admin-login__button {
  width: 100%;
  padding: 12px;
  font-size: 1rem;
  background-color: #1976d2;
  color: white;
  border: none;
  border-radius: 6px;
  cursor: pointer;
  transition: background-color 0.3s ease;
  margin-top: 1rem;
}

.admin-login__button:disabled {
  background-color: #b0bec5;
  cursor: not-allowed;
}

.admin-login__button:hover:enabled {
  background-color: #125aa0;
}

.admin-login__error {
  margin-top: 1rem;
  color: #e53935;
  text-align: center;
  font-weight: 500;
}

.admin-login__validation {
  color: red;
  font-size: 0.9rem;
  margin-bottom: 0.5rem;
  display: block;
}

.admin-login__password-wrapper {
  position: relative;
}

.admin-login__toggle {
  position: absolute;
  right: 10px;
  top: 12px;
  cursor: pointer;
  font-size: 1.2rem;
}

.admin-login__back {
  text-align: center;
  color: #1976d2;
  cursor: pointer;
  font-size: 1rem;
  margin-top: 1rem;
}

.admin-login__back:hover {
  text-decoration: underline;
}
</style>

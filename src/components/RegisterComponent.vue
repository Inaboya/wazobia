<template>
  <div class="register">
    <div class="register-box">
      <div class="register-container">
        <form class="form" @submit="createUser">
          <div class="heading">
            <h1 class="main-heading">Create an account</h1>

            <div class="paragraph-text">
              <p class="text">
                Already have an account?
                <span @click="routeToLoginPage">Log in</span>
              </p>
            </div>
          </div>

          <div class="bio-details">
            <div class="first_name">
              <h3>First Name</h3>
              <fieldset>
                <input
                  type="text"
                  name="first-name"
                  placeholder="Type here"
                  class="input"
                  v-model="firstName"
                  required
                />
              </fieldset>
            </div>

            <div class="last_name">
              <h3>Last Name</h3>
              <fieldset>
                <input
                  type="text"
                  name="last-name"
                  v-model="lastName"
                  placeholder="Type here"
                  class="input"
                  required
                />
              </fieldset>
            </div>
          </div>

          <div class="form-control">
            <h3>Email</h3>
            <fieldset>
              <input
                type="email"
                name="email"
                v-model="email"
                placeholder="Type your email address here"
                class="input"
                required
              />
            </fieldset>
          </div>

          <div class="">
            <div class="">
              <p
                style="color: #cf6363; font-size: 0.8rem"
                v-for="(err, index) in errors"
                :key="index"
              >
                {{ err }}
              </p>
            </div>
          </div>

          <div class="form-control">
            <h3>Password</h3>

            <fieldset>
              <input
                type="password"
                name="password"
                v-model="password"
                placeholder="Type your password here"
                class="input"
                required
              />
              <i
                :class="showPassword ? 'fa fa-eye-slash' : 'fa fa-eye'"
                @click="togglePasswordState"
              ></i>
            </fieldset>
          </div>

          <div
            :class="
              validPassword ? 'password-validations-2' : 'password-validations'
            "
          >
            <div class="password-validation">
              <div
                :class="passwordContainsEightCharacters ? 'cycle' : 'circle'"
              ></div>
              <p
                :class="
                  passwordContainsEightCharacters ? 'p-text' : 'pass-text'
                "
              >
                Password must be at least 8 characters long
              </p>
            </div>
            <div class="password-validation">
              <div
                :class="passwordContainsANumber ? 'cycle-1' : 'circle-1'"
              ></div>
              <p :class="passwordContainsANumber ? 'p-text-1' : 'pass-text-1'">
                Password must contain at least one number
              </p>
            </div>
            <div class="password-validation">
              <div
                :class="passwordContainsUppercase ? 'cycle-2' : 'circle-2'"
              ></div>
              <p
                :class="passwordContainsUppercase ? 'p-text-2' : 'pass-text-2'"
              >
                Password must contain at least one uppercase letter
              </p>
            </div>
            <div class="password-validation">
              <div
                :class="passwordContainsASymbol ? 'cycle-3' : 'circle-3'"
              ></div>
              <p :class="passwordContainsASymbol ? 'p-text-3' : 'pass-text-3'">
                Password must contain a symbol
              </p>
            </div>
          </div>

          <div class="button-container">
            <button @click="createUser">Sign up</button>
          </div>
        </form>
      </div>
    </div>
  </div>
</template>

<script>
import validator from "validator";
export default {
  name: "RegisterComponent",
  data() {
    return {
      firstName: "",
      lastName: "",
      email: "",
      password: "",
      validPassword: true,
      passwordContainsUppercase: false,
      passwordContainsEightCharacters: false,
      passwordContainsANumber: false,
      passwordContainsASymbol: false,
      errors: [],
      isEmailValid: true,
      showPassword: false,
      loading: false,
    };
  },

  methods: {
    routeToLoginPage() {
      this.$router.push({
        name: "LoginComponent",
      });
    },

    togglePasswordState() {
      this.showPassword = !this.showPassword;
    },

    async createUser(e) {
      e.preventDefault();
      this.loading = true;

      if (this.errors.length > 0) {
        return;
      }

      if (!this.firstName || !this.lastName || !this.email || !this.password) {
        alert("All fields are required");
        return;
      }

      const payload = {
        first_name: this.firstName,
        last_name: this.lastName,
        email: this.email,
        password: this.password,
      };

      try {
        const data = await this.$store.dispatch("auth/createUsers", payload);

        console.log(data);


        if (data.statusCode === 201) {
          this.loading = false;
          alert(data.message);
          this.$router.push("/dashboard");
        } else {
          this.loading = false;
          alert(data.message);
          return;
        }
      } catch (error) {
        this.error = error.response.message;
      }
    },
  },

  watch: {
    password(newValue) {
      if (newValue !== "") {
        this.validPassword = true;

        if (newValue.length >= 8) {
          this.passwordContainsEightCharacters = true;
        } else {
          this.passwordContainsEightCharacters = false;
        }

        if (newValue.match(/[A-Z]/g)) {
          this.passwordContainsUppercase = true;
        } else {
          this.passwordContainsUppercase = false;
        }

        if (newValue.match(/[0-9]/g)) {
          this.passwordContainsANumber = true;
        } else {
          this.passwordContainsANumber = false;
        }

        if (newValue.match(/[!@#$%^&*()_+\-=\\[\]{};':"\\|,.<>\\/?]/g)) {
          this.passwordContainsASymbol = true;
        } else {
          this.passwordContainsASymbol = false;
        }

        if (
          this.passwordContainsEightCharacters &&
          this.passwordContainsUppercase &&
          this.passwordContainsANumber &&
          this.passwordContainsASymbol
        ) {
          this.validPassword = true;
        } else {
          this.validPassword = false;
        }
      }
    },

    email(newValue) {
      if (newValue !== "") {
        if (!validator.isEmail(newValue)) {
          this.errors = ["Wrong Email Format!"];
        } else {
          this.errors = [];
        }
      }
    },
  },
};
</script>

<style scoped>
.register {
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100vw;
  height: 100vh;
  background: #f0f0f0;
}

.form {
  margin-top: 0;
}

.register-box {
  display: flex;
  justify-content: center;
  align-items: center;
}

input {
  width: 75%;
  border: none;
}

.register-container {
  width: 720px;
  height: 565px;
  border: 1px solid #f0f0f0;
  border-radius: 8px;
  padding: 2rem;
  background: #fff;
}

.heading {
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
}

.bio-details {
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 1rem;
}

.main-heading {
  font-size: 1.3rem;
  font-weight: bold;
  margin-bottom: 0px;
}

.paragraph-text {
  font-size: 1rem;
  color: #333;
}

span {
  color: #004cbd;
  cursor: pointer;
}

.button-container {
  margin-top: 3rem;
  display: flex;
  justify-content: center;
  align-items: center;
  cursor: pointer;
}

.circle,
.circle-1,
.circle-2,
.circle-3 {
  width: 5px;
  height: 5px;
  border-radius: 50%;
  border: 1px solid #333;
  display: inline-block;
}

.cycle,
.cycle-1,
.cycle-2,
.cycle-3 {
  width: 5px;
  height: 5px;
  border-radius: 50%;
  border: 1px solid #07982f;
  background: #07982f;
  display: inline-block;
}

.password-validations {
  display: flex;
  flex-direction: column;
}

.password-validations-2 {
  display: none;
}

.password-validation {
  display: flex;
  align-items: center;
  gap: 1rem;
  color: #07982f;
}

.pass-text,
.pass-text-1,
.pass-text-2,
.pass-text-3 {
  color: #333;
}

.p-text,
.p-text-1,
.p-text-2,
.p-text-3 {
  color: #07982f;
}

button {
  width: 100%;
  height: 30px;
  border: none;
  background: #b7bcc4;
  color: #fff;
  cursor: pointer;
}
</style>

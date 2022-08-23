<template>
  <div class="login">
    <div class="login-box">
      <div class="login-container">
        <form class="form" @submit="login">
          <div class="heading">
            <h1 class="main-heading">Log in</h1>

            <div class="paragraph-text">
              <p class="text">
                If you have no account,
                <span @click="routeToRegisterPage">Sign up</span>
              </p>
            </div>
          </div>

          <div class="form-control">
            <h3>Email</h3>
            <fieldset>
              <input
                type="email"
                name="email"
                v-model="email"
                placeholder="Type here"
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
                placeholder="Type here"
                class="input"
                required
              />
            </fieldset>
          </div>

          <div class="button-container">
            <button @click="login">Log in</button>
          </div>
        </form>
      </div>
    </div>
  </div>
</template>

<script>
import validator from "validator";
export default {
  name: "LoginComponent",
  data() {
    return {
      email: "",
      password: "",
      errors: [],
    };
  },

  methods: {
    routeToRegisterPage() {
      this.$router.push({
        name: "RegisterComponent",
      });
    },

    async login(e) {
      e.preventDefault();
      this.loading = true;

      if (!this.email || !this.password) {
        alert("All fields are required");
        this.loading = false;
        return;
      }

      try {
        const data = await this.$store.dispatch("auth/login", {
          email: this.email,
          password: this.password,
        });

        console.log(data, 'first');
        if (
          data.statusCode ||
          data.statusCode === 404 ||
          data.statusCode === 500 ||
          data.statusCode === 400 ||
          data.statusCode === 401
        ) {
          alert(data.message);
          this.loading = false;
        }

        console.log(data, "data middle");

        if (data.user) {
          this.$router.push("/dashboard");
        }

        console.log(data, "data under");

        this.loading = false;
      } catch (error) {
        this.errors = error;
      }
    },
  },

  watch: {
    email(newValue) {
      console.log(newValue, "newValue");
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
.login {
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100vw;
  height: 100vh;
  background: #f0f0f0;
}

.login-box {
  display: flex;
  justify-content: center;
  align-items: center;
}

.login-container {
  width: 720px;
  height: 465px;
  border: 1 solid #f0f0f0;
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

.main-heading {
  font-size: 1.6rem;
  font-weight: bold;
  margin-bottom: 0px;
}

.button-container {
  margin-top: 3rem;
  display: flex;
  justify-content: center;
  align-items: center;
}

.paragraph-text {
  margin-top: 0px;
  font-size: 1.4rem;
  color: #333;
}
button {
  width: 100%;
  height: 40px;
  border: none;
  background: #b7bcc4;
  color: #fff;
}

input {
  width: 75%;
  border: none;
}

span {
  color: #004cbd;
  cursor: pointer;
  font-weight: 900;
}
</style>

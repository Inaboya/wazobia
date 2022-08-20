<template>
    <div class="login">
        <div class="login-box">
            <div class="login-container">
                <form class="form">
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
                            <input type="email" name="email" placeholder="Type here" class="input" required />
                        </fieldset>
                    </div>

                    <div class="form-control">
                        <h3>Password</h3>

                        <fieldset>
                            <input type="password" name="password" placeholder="Type here" class="input" required />
                        </fieldset>
                    </div>

                    <div class="button-container">
                        <button>Log in</button>
                    </div>
                </form>
            </div>
        </div>
    </div>
</template>

<script>
export default {
    name: "LoginComponent",
    data() {
        return {
            email: "",
            password: "",
        };
    },

    methods: {
        routeToRegisterPage() {
            this.$router.push({
                name: "RegisterComponent",
            });
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
    font-weight: bold;
}

.button-container {
    margin-top: 3rem;
    display: flex;
    justify-content: center;
    align-items: center;
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

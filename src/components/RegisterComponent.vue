<template>
    <div class="register">
        <div class="register-box">
            <div class="register-container">
                <form class="form">
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
                                <input type="text" name="first-name" placeholder="Type here" class="input" required />
                            </fieldset>
                        </div>

                        <div class="last_name">
                            <h3>Last Name</h3>
                            <fieldset>
                                <input type="text" name="last-name" placeholder="Type here" class="input" required />
                            </fieldset>
                        </div>
                    </div>

                    <div class="form-control">
                        <h3>Email</h3>
                        <fieldset>
                            <input type="email" name="email" placeholder="Type your email address here" class="input"
                                required />
                        </fieldset>
                    </div>

                    <div class="form-control">
                        <h3>Password</h3>

                        <fieldset>
                            <input type="password" name="password" placeholder="Type your password here" class="input"
                                required />
                        </fieldset>
                    </div>

                    <div class="button-container">
                        <button>Sign up</button>
                    </div>
                </form>
            </div>
        </div>
    </div>
</template>

<script>
export default {
    name: "RegisterComponent",
    data() {
        return {
            firstName: "",
            lastName: "",
            email: "",
            password: "",
        };
    },

    methods: {
        routeToLoginPage() {
            this.$router.push({
                name: "LoginComponent",
            });
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
    height: 465px;
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
    font-size: 1rem;
    font-weight: bold;
    margin-bottom: 0px;
}

.paragraph-text {
    margin-top: 0px;
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
}

button {
    width: 100%;
    height: 40px;
    border: none;
    background: #b7bcc4;
    color: #fff;
}
</style>

<template>
    <div class="dashboard">
        <div class="dashboard-box">
            <div class="dashboard-name">
                <h1 class="main-heading">Dashboard</h1>

                <div class="name-section">
                    <h1 class="heading-name">Johh Doe</h1>
                    <img src="../assets/dropdown.png" alt="dropdown-icon">
                </div>
            </div>


            <div class="dashboard-items">

            </div>
        </div>
    </div>
</template>

<script>
export default {
    name: "DashBoard",
};
</script>

<style scoped>
.dashboard {
    width: 100;
    height: 100vh;
    padding: 2rem;
}

.dashboard-box {
    margin: auto auto;
}

.dashboard-name {
    display: flex;
    justify-content: space-between;
    background: #fff;
    padding: auto auto;
}

.name-section {
    display: flex;
    justify-content: center;
    align-items: center;
    gap: 0.5rem;
}
</style>

<template>
  <div class="dashboard">
    <div class="verify">
      <p class="verify-text">
      You have not verified your email address.  Click <button class="verify-button" @click="sendVerify">here</button> to send a verifcation link
      </p>
    </div>
    <nav>
      <div class="dashboard-part">
        <h2>DashBoard</h2>
      </div>

      <div class="dashboard-part-2">
        <h2>{{ `${first_name} ${last_name}` }}</h2>
        <img src="../assets/dropdown.png" alt="dropdown" />
      </div>
    </nav>

    <div class="dashboard-box">
      <div class="dashboard-container">
        <div class="dashboard-boxing" v-if="itemsList.length > 0">
          <div
            class="dashboard-container-items"
            v-for="item in itemsList"
            :key="item._id"
          >
            <label class="p-text">Name</label>
            <h2 class="heading">{{ item.name }}</h2>
            <label class="p-text">Description</label>
            <p class="paragraph">
              {{ item.description }}
            </p>
          </div>

          <div class="button-container">
            <button @click="openEditModal" class="edit">Edit</button>
            <button @click="removeItem(item._id)" class="delete">Delete</button>
          </div>
        </div>

        <div class="no-data" v-else-if="loading === false">
          <h2>No item created</h2>
        </div>
      </div>

      <div class="modal" v-if="showModal">
        <div class="modal-content">
          <div class="modal-heading">
            <h2>Create Item</h2>
          </div>

          <hr />

          <div class="form-content">
            <form class="form" @submit="createItems">
              <div class="form-name">
                <h3>Name</h3>
                <fieldset>
                  <input
                    type="text"
                    v-model="name"
                    placeholder="Input item name here"
                  />
                </fieldset>
              </div>

              <div class="form-description">
                <h3>Add Note</h3>
                <textarea
                  name="description"
                  id="description"
                  v-model="description"
                  cols="30"
                  rows="10"
                  placeholder="Input item description here"
                ></textarea>
              </div>

              <div class="button-container-modal">
                <button @click="closeModal" class="cancel">Cancel</button>
                <button @click="createItems" class="event">Create Event</button>
              </div>
            </form>
          </div>
        </div>
      </div>

      <div class="modal" v-if="showEditModal">
        <div class="modal-content">
          <div class="modal-heading">
            <h2>Edit Item</h2>
          </div>

          <hr />

          <div class="form-content">
            <form class="form">
              <div class="form-name">
                <h3>Name</h3>
                <fieldset>
                  <input
                    type="text"
                    v-model="name"
                    placeholder="Input item name here"
                  />
                </fieldset>
              </div>

              <div class="form-description">
                <h3>Add Note</h3>
                <textarea
                  name="description"
                  id="description"
                  v-model="description"
                  cols="30"
                  rows="10"
                  placeholder="Input item description here"
                ></textarea>
              </div>

              <div class="button-container-modal">
                <button class="cancel">Cancel</button>
                <button class="event">Edit Event</button>
              </div>
            </form>
          </div>
        </div>
      </div>

      <div class="dashboard-symbol" @click="toggleModal">
        <img
          src="../assets/add.png"
          class="img"
          @click="toggleModal"
          alt="add"
        />
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "DashBoard",
  components: {},
  data() {
    return {
      showModal: false,
      showEditModal: false,
      first_name: "",
      last_name: "",
      loading: true,
      errors: [],
      name: "",
      description: "",
      itemsList: [],
    };
  },

  mounted() {
    this.fetchItems();
    this.fetchUserDetails();
  },
  methods: {
    toggleModal() {
      this.showModal = true;
    },

    async fetchUserDetails() {
      try {
        const response = await this.$store.dispatch("auth/fetchUser");
        console.log(response, "response");

        this.first_name = response.user.first_name;
        this.last_name = response.user.last_name;
      } catch (error) {
        return this.errors.response.data.message;
      }
    },

    closeModal() {
      this.showModal = false;
    },

    async createItems(e) {
      e.preventDefault();
      this.loading = true;

      if (!this.name || !this.description) {
        this.errors = ["Fields are required"];
      }

      const payload = {
        name: this.name,
        description: this.description,
      };
      try {
        const response = this.$store.dispatch("items/createItems", payload);

        if (response) {
          alert("Item added successfully");
        }

        this.showModal = false;

        return response;
      } catch (error) {
        this.errors = ["an error occurred"];
      }
    },

    async fetchItems() {
      this.loading = true;
      try {
        const response = await this.$store.dispatch("items/fetchAllItems");

        console.log(response, "response");

        this.itemsList = response.items;

        console.log(this.itemList, "itemssss");

        this.loading = false;
      } catch (error) {
        this.loading = false;
        this.errors = ["an error occurred"];
      }
    },

    async fetchOneItem(id) {
      this.loading = true;

      try {
        const response = await this.$store.dispatch("items/getOneItem", id);

        this.itemList = response;

        this.loading = false;
      } catch (error) {
        this.loading = false;
      }
    },

    openEditModal() {
      this.showEditModal = true;
    },

    async updateItem() {
      this.loading = true;

      const item_id = this.openEditModal();

      const payload = {
        name: this.name,
        description: this.description,
      };

      try {
        const response = await this.$store.dispatch("items/updateItem", {
          id: item_id,
          ...payload,
        });

        if (response) {
          this.loading = false;
          alert("item successfully updated");

          this.showEditModal = false;
        }
      } catch (error) {
        this.errors = ["an error occurred"];
      }
    },

    async removeItem(id) {
      try {
        const item = await this.$store.dispatch("items/deleteItem", id);

        if (item) {
          alert("Item successfully deleted");
        }
      } catch (error) {
        return error.response.data.errors;
      }
    },
  },
};
</script>

<style scoped>
.dashboard {
  width: 100;
  height: 100vh;
  padding: auto;
}

nav {
  display: flex;
  justify-content: space-between;
  align-items: center;
  font-size: 12px;
  padding-left: 1rem;
  padding-right: 1rem;
}

.dashboard-part-2 {
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 0.8rem;
}

.dashboard-box {
  background: #f0f0f0;
  width: 100;
  height: 100vh;
  padding: 2rem;
}

.dashboard-container {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  justify-content: center;
  align-items: center;
  gap: 1rem;
  padding-left: 2rem;
  padding-right: 2rem;
}

.dashboard-boxing {
  padding: 1rem;
  display: flex;
  gap: 1rem;
  flex-direction: column;
  width: 420px;
  height: 220px;
  background: #ffffff;
  border-radius: 8px;
  border: 1px solid #f0f0f0;
}
.button-container {
  display: flex;
  justify-content: flex-end;
  gap: 1rem;
}

.button-container-modal {
  display: flex;
  justify-content: flex-end;
  gap: 2rem;
  margin-top: 1rem;
}

.edit {
  width: 55px;
}

.delete {
  width: 72px;
  height: 36px;
  border: 1px solid #555658;
  border-radius: 4px;
  color: 000;
  background: #555658;
  color: #fff;
}

.dashboard-symbol {
  display: flex;
  justify-content: flex-end;
  align-items: center;
  padding-top: 3rem;
  cursor: pointer;
}

.img {
  cursor: pointer;
}

.modal {
  display: flex;
  justify-content: center;
  align-items: center;
  background: rgba(0, 0, 0, 0.5);
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  z-index: 1;
}

.modal-content {
  background: #ffffff;
  width: 500px;
  height: 370px;
  border-radius: 8px;
  padding: 2rem;
}

textarea {
  resize: none;
  width: 99%;
}

input {
  border: none;
}

.cancel {
  height: 40px;
}

.event {
  background: #999a9b;
  color: #fff;
  border-radius: 4px;
  border: 1px solid #999a9b;
}

.verify {
  background: #FFF0CB;
  display: flex;
  justify-content: center;
}

.verify-text {
  font-size: 14px;
}

.verify-button {
  border: none;
  color: #004cbd;
  text-decoration: underline;
}
</style>

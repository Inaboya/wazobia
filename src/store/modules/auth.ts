/* eslint-disable no-useless-catch */
import axios from "axios";
import { Commit } from "vuex";

//state to create user

interface User {
  users: {
    firstName: string;
    lastName: string;
    email: string;
    password: string;
  };

  token: string;
}

const state = {
  users: [],
  token: localStorage.getItem("token"),
};

interface Payload {
  firstName: string;
  lastName: string;
  email: string;
}

interface LoginPayload {
  email: string;
  password: string;
}

//getters to get users
const getters = {
  getUsers: (state: User) => state.users,
  getToken: (state: User) => state.token,
};

//mutations to update users

const mutations = {
  setUsers: (state: User, users: any) => (state.users = users),
  setToken: (state: User, token: string) => (state.token = token),
};

const actions = {
  async createUsers({ commit }: { commit: Commit }, payload: Payload) {
    try {
      const response = await axios.post(
        "https://test-api.sytbuilder.com/me",
        payload
      );
      commit("setUsers", response.data);
      return response.data;
    } catch (error: any) {
      return error.response.data;
    }
  },

  async login({ commit }: { commit: Commit }, payload: LoginPayload) {
    const { email, password } = payload;
    try {
      const response = await axios.post(
        "https://test-api.sytbuilder.com/tokens",
        { email, password }
      );

      console.log(response.data, "logged in");

      commit("setToken", response.data.token);
      localStorage.setItem("token", response.data.token);
      return response.data;
    } catch (error: any) {
      console.log(error.response.data, "data vuex");

      return error.response.data;
    }
  },
};

export default {
  namespaced: true,
  state,
  getters,
  mutations,
  actions,
};

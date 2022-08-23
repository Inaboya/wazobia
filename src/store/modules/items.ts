import axios from "axios";
import { Commit } from "vuex";

interface PayloadItems {
  items: {
    name: string;
    description: string;
  };

  item: {
    id?: string;
    name: string;
    description: string;
  };
}

interface Items {
  id?: string;
  name: string;
  description: string;
}

interface Item {
  name: string;
  description: string;
}

const state = {
  items: [],
  item: {},
};

const getters = {
  getItems: (state: PayloadItems) => state.items,
  getItem: (state: PayloadItems) => state.item,
};

const mutations = {
  setItems: (state: PayloadItems, items: Items) => (state.items = items),
  setOneItem: (state: PayloadItems, item: Item) => (state.item = item),
};

const token = localStorage.getItem("token");

const actions = {
  async createItems({ commit }: { commit: Commit }, payload: Items) {
    try {
      const response = await axios.post(
        "https://test-api.sytbuilder.com/items",
        payload,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      console.log(response.data, "data vuex");

      commit("setItems", response.data.items);

      return response.data.items;
    } catch (error: any) {
      return error.response.data;
    }
  },

  async fetchAllItems({ commit }: { commit: Commit }, page = 1, count = 10) {
    try {
      const response = await axios.get(
        `https://test-api.sytbuilder.com/items?page=${page}&count=${count}`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      console.log(response.data.items, "items");

      commit("setItems", response.data.items);
      return response.data;
    } catch (error: any) {
      return error.response.data;
    }
  },

  async getOneItem({ commit }: { commit: Commit }, id: any) {
    try {
      const response = await axios.get(
        `https://test-api.sytbuilder.com/items/${id}`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      commit("setOneItem", response.data.item);
      return response.data.item;
    } catch (error: any) {
      return error.response.data;
    }
  },

  async updateItem({ commit }: { commit: Commit }, payload: Items) {
    try {
      const response = await axios.put(
        `https://test-api.sytbuilder.com/items/${payload.id}`,
        { payload },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      if (response.data.item) {
        commit("setOneItem", response.data.item);
      }

      return response.data;
    } catch (error: any) {
      return error.response.data;
    }
  },

  async deleteItem({ commit }: { commit: Commit }, id: string) {
    try {
      const response = await axios.delete(
        `https://test-api.sytbuilder.com/items/${id}`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      return response.data.item;
    } catch (error: any) {
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

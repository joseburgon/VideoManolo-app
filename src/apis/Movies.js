import Api from "./Api";
import Csrf from "./Csrf";

export default {
  async getAll() {
    await Csrf.getCookie();

    return Api.get("/movies");
  },

  async getOne(id) {
    await Csrf.getCookie();

    return Api.get(`/movies/${id}`);
  }
};

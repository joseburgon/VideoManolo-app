import Api from "./Api";
import Csrf from "./Csrf";

export default {
    async store(form) {
        await Csrf.getCookie();

        let data = {
            "data": {
                "type": "reservations",
                "attributes": {
                    "movie_id": form.movie_id,
                    "return_date": form.return_date
                },
            }
        };

        return Api.post("/reservations", data);
    },

    async checkUserHasMovie(movie) {
        await Csrf.getCookie();

        return Api.get(`/reservations/search/${movie}`);
    }
};

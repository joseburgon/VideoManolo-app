const baseUrl = 'https://api.themoviedb.org/3';

const apiKey = '2d42e69235a69efaa787770f43e31ddd';

export default {
    async getMovieCredits(movie_id) {
        return axios.get(`${baseUrl}/movie/${movie_id}/credits`, {
            params: {
                api_key: apiKey
            }
        })
            .then(res => res.data)
    }
}



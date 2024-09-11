const API_KEY = "ea415784e10c15325b31027773f64d08";

export const requests = {
  getNeflixOrignals: `/discover/tv?api_key=${API_KEY}&with_networks=213&language=en-US&page=1`,
  getCollection: (platform, endpoint) =>
    `${platform}/${endpoint}?api_key=${API_KEY}&language=en-US&page=1`,
  getDetails: (requestValues) =>
    `${requestValues.platform}/${requestValues.id}?api_key=${API_KEY}&language=en-US&append_to_response=videos
    `,
  getGenreList: (platform) => `genre/${platform}/list?api_key=${API_KEY}`,
  getByGenre: (platform, genreId) =>
    `/discover/${platform}?api_key=${API_KEY}&with_genres=${genreId}&language=en-US&page=1`,
  getSearch: (platform, queryString) =>
    `/search/${platform}?api_key=${API_KEY}&query=${queryString}&language=en-US&page=1`,
};

export const platformType = {
  tv: "tv",
  movie: "movie",
};

export const endpoints = {
  popular: "popular",
  topRated: "top_rated",
  airingToday: "airing_today",
  onTheAir: "on_the_air",
  upcoming: "upcoming",
  nowPlaying: "now_playing",
};

import axios from "axios";

export default axios.create({
    baseURL: 'https://api.yelp.com/v3/businesses',
    headers: {
        Authorization: 'Bearer Ox1dPyMFowdC1KnQxkg5khZeHnh2CEFUatNpYxFFTcppxtOeJhcBe3QzvCUyl3vDsE_ToYeaIJgnv142pnstFlAeSs6CQ6qIv7vS9tmzPzJhNhgnSFIlgE0AdCmzYnYx'
    }
})
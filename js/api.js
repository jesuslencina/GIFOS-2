//!---------------------------------------------------------------------------
//!VARIABLES
//!---------------------------------------------------------------------------
const apiKey = "fYMf0SvPsNhyJ4JLuhntBv8yLZ7ykw0O";
const apiEndpointSearch = "https://api.giphy.com/v1/gifs/search";
const apiEndpointTrending = "https://api.giphy.com/v1/gifs/trending";
const apiEndpointTrendingTags = "https://api.giphy.com/v1/trending/searches";

//!---------------------------------------------------------------------------
//!EXECUTION
//!---------------------------------------------------------------------------
trendingTags();
trending();
//!---------------------------------------------------------------------------
//!FUNCTIONS
//!---------------------------------------------------------------------------

//!GET TRENDING TAGS
async function trendingTags() {
    await fetch(apiEndpointTrendingTags + "?api_key=" + apiKey)
        .then(response => { return (response.json()) })
        .then(json => {
            console.log(json);
            fillTrendingTags(json.data);
        })
        .catch(err => console.log(err))
    }

//!GET TRENDING GIFOS
async function trending() {
    await fetch(apiEndpointTrending + "?api_key=" + apiKey + "&limit=" + 9 + "&rating=g")
        .then(response => { return (response.json()) })
        .then(json => {
            console.log(json);
            fillTrendingGifos(json.data);
        })
        .catch(err => console.log(err))
}

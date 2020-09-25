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
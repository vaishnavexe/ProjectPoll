import axios from "axios";

async function fetchPollingData(input:number) {
    console.log("page", input);
    
    try {
        const response = await axios.get(`https://hn.algolia.com/api/v1/search_by_date?tags=story&page=${input}`);           
        return response.data;
    } catch (error) {
        if(axios.isAxiosError(error)){
            console.log("ERROR:check axios:", error.message);
            return '404';
        }else{
            console.log("ERROR: something else", error);
            return "404"
        }
    }
}

export default fetchPollingData;
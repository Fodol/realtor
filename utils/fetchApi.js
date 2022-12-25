import axios from 'axios';

export const baseUrl = 'https://bayut.p.rapidapi.com';

// headers: {
//     'X-RapidAPI-Key': '5dab0634efmsh4c274aa5d8386cbp10adbfjsn734cbf51760e',
//     'X-RapidAPI-Host': 'bayut.p.rapidapi.com'
//   }


//  make a function to make API call using the headers and the baseUrl

export const fetchApi = async (url) => {
    const {data} = await axios.get((url), {
        headers: {
            'X-RapidAPI-Key': '5dab0634efmsh4c274aa5d8386cbp10adbfjsn734cbf51760e',
            'X-RapidAPI-Host': 'bayut.p.rapidapi.com'
        }
    });

    return data;
}

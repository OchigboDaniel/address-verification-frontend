async function fetchAddress(url, token, page = 0) {


    const response = await fetch(`${url}?page=${page}&size=10&sortBy=id&direction=asc`, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          "Authorization": `Bearer ${token}`
        },
    })

    

    if (!response.ok) {
        throw new Error(`Request failed: ${response.status}`);
    }

    const data = await response.json();

    return data;
    
}


export default fetchAddress;
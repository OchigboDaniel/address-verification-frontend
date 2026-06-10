async function fetchAddress(url, token, page = 0, country = '', state = '', email = '') {

    const response = await fetch(`${url}?page=${page}&size=10&sortBy=id&direction=asc&country=${country}&state=${state}&email=${email}`, {
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
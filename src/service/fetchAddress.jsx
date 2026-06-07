async function fetchAddress(url, token) {


    const response = await fetch(url, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          "Authorization": `Bearer ${token}`
        },
    })

    console.log(`data ${response}`)

    if (!response.ok) {
        throw new Error(`Request failed: ${response.status}`);
    }

    return response.json();
    
}


export default fetchAddress;
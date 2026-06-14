async function sendBillImage(url, billFile, token) {
    const formData = new FormData()
    formData.append('bill', billFile)

    const response = await fetch(url, {
        method: 'POST',
        headers: { 'Authorization': `Bearer ${token}` },
        body: formData
    })

    return response;
}

export default sendBillImage;
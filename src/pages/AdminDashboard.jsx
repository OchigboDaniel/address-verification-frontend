import { useEffect, useState } from "react"
import fetchAddress from "../service/fetchAddress";


function AdminDashboard() {

    const [listAddress, setListaddress] = useState([]);
    const [errorMessage, setErrorMessage] = useState(null);
    const [loading, setLoading] = useState(false);

    //
    useEffect(() => {
        setLoading(true);

        async function loadAddress() {
            try {

                const token = localStorage.getItem("token");

                const response = await fetchAddress("http://localhost:8080/api/address", token);
                
                

                setListaddress(response.data)

            } catch (error) {
                setErrorMessage("Unable to retrieve data at the moment");
            } finally {
                setLoading(false)
            }
        }

        loadAddress();

    }, [])

    //export csv
    async function exportCSV() {
        const token = localStorage.getItem("token")

        const response = await fetch("http://localhost:8080/api/address?export=true", {
            method: "GET",
            headers: {
                "Authorization": `Bearer ${token}`
            }
        })

        const blob = await response.blob()
        const url = URL.createObjectURL(blob)
        const a = document.createElement('a')
        a.href = url
        a.download = 'verifications.csv'
        a.click()
    }


    if (loading) return <p>Loading...</p>
    if (errorMessage) return <p>{errorMessage}</p>

    return (
        <main>
            <div className="admin-wrapper">
                <h2>Admin Dashboard</h2>
                <button className="export-btn" onClick={exportCSV}>Export CSV</button>
                <table className="admin-table">
                    <thead>
                        <tr>
                            <th>Address</th>
                            <th>State</th>
                            <th>Country</th>
                            <th>Email</th>
                        </tr>
                    </thead>
                    <tbody>
                        {listAddress.map((record) => (
                            <tr key={record.id}>
                                <td>{record.formattedAddress}</td>
                                <td>{record.state}</td>
                                <td>{record.country}</td>
                                <td>{record.ownerEmail}</td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>

        </main>
    )
}

export default AdminDashboard
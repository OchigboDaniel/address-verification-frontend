import { useEffect, useState } from "react"
import fetchAddress from "../service/fetchAddress";
import { exportCSVFileURL, addressURL } from "../config";



function AdminDashboard() {

    const [listAddress, setListaddress] = useState([]);
    const [errorMessage, setErrorMessage] = useState(null);
    const [loading, setLoading] = useState(false);

    //Filter useState
    const [stateFilter, setStateFilter] = useState('')
    const [emailFilter, setEmailFilter] = useState('')

    //Filter Search
    const [searchTrigger, setSearchTrigger] = useState(0)

    //Pagination useState
    const [countryFilter, setCountryFilter] = useState('')
    const [currentPage, setCurrentPage] = useState(0)
    const [totalPages, setTotalPages] = useState(0)



    //
    useEffect(() => {
        setLoading(true);

        async function loadAddress() {
            try {
                const token = localStorage.getItem("token");
                const response = await fetchAddress(addressURL, token, currentPage, countryFilter, stateFilter, emailFilter);

                setListaddress(response.data.content)
                setTotalPages(response.data.page.totalPages)

            } catch (error) {
                setErrorMessage("Unable to retrieve data at the moment");
            } finally {
                setLoading(false)
            }
        }

        loadAddress();

    }, [currentPage, searchTrigger])

    //export csv
    async function exportCSV() {
        const token = localStorage.getItem("token")

        const response = await fetch(exportCSVFileURL, {
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
        

                <div className="filter-bar mb-1">
                    <input
                        placeholder="Country"
                        value={countryFilter}
                        onChange={(e) => setCountryFilter(e.target.value)}
                    />
                    <input
                        placeholder="State"
                        value={stateFilter}
                        onChange={(e) => setStateFilter(e.target.value)}
                    />
                    <input
                        placeholder="Email"
                        value={emailFilter}
                        onChange={(e) => setEmailFilter(e.target.value)}
                    />
                    <button className="filter-btn" onClick={() => {
                        setCurrentPage(0)
                        setSearchTrigger(t => t + 1)
                    }}>Search</button>
                </div>

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

                <div className="table-footer">
                    <div className="pagination">
                        <button
                            onClick={() => setCurrentPage(p => p - 1)}
                            disabled={currentPage === 0}>
                            Previous
                        </button>
                        <span>Page {currentPage + 1} of {totalPages || 1}</span>
                        <button
                            onClick={() => setCurrentPage(p => p + 1)}
                            disabled={currentPage >= totalPages - 1}>
                            Next
                        </button>
                    </div>
                    <button className="filter-btn" onClick={exportCSV}>Export CSV</button>
                </div>

            </div>
        </main>

    )
}

export default AdminDashboard
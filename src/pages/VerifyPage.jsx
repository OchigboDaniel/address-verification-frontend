import { useState } from 'react'
import Button from '../components/Button'
import { useNavigate } from 'react-router-dom'
import getGeoLocation from '../service/getGeoLocation'



function VerifyPage() {



  const [latitude, setLatitude] = useState(null)
  const [longitude, setLongitude] = useState(null)
  const [verificationStatus, setVerificationStatus] = useState(null)
  const [formattedAddress, setFormattedAddress] = useState(null)
  const [isLoading, setIsLoading] = useState(false)

  //BE base URL
  //const BE_BASE_URL = import.meta.env.BACKEND_URL

  //Function that handles verification
  async function addressVerificationHandler() {

    //Verifying indicator
    setIsLoading(true);

    //const verifyURL = BE_BASE_URL + "/api/verify-address"

    //Get Token
    const token = localStorage.getItem("token");
    console.log(token)


    //call the fuction theat gets the latitude and longitude
    const geodata = await getGeoLocation();
    const latitudeInfo = geodata.latitude;
    const longitudeInfo = geodata.longitude;

    try {

      const response = await fetch("http://localhost:8080/api/verify-address", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "Authorization": `Bearer eyJhbGciOiJIUzI1NiJ9.eyJzdWIiOiJkYW5pZWxvY2hpZ2JvLmdtYWlsLmNvbSIsImlhdCI6MTc4MDkzODY3MCwiZXhwIjoxNzgwOTQyMjcwfQ.UAV7obqD90efV3vGUBcUCMY113RgRkoodVAWi5pELvE`
        },
        body: JSON.stringify({
          latitude: geodata.latitude,
          longitude: geodata.longitude
        })
      });

      //get formatted address
      const address = await response.json();

      if (response.ok) {
        console.log("success")
        setVerificationStatus("Address Verified")
        setLatitude(latitudeInfo)
        setLongitude(longitudeInfo)
        setFormattedAddress(address.data.formattedAddress)
        setIsLoading(false)
      } else {
        setIsLoading(false)
        setVerificationStatus("Unable to verify, please try again later")

      }

    } catch (error) {
      
      setVerificationStatus("Unable to verify, please try again later")

    } finally {
      setIsLoading(false) 
    }


  }

  return (
    <main>
      <h1>Verify</h1>

      <p>{verificationStatus}</p>
      <p>{latitude}</p>
      <p>{longitude}</p>
      <p>{formattedAddress}</p>

      {isLoading ? <p>Verifing...</p> : <Button text=" Verify Address " handleSubmit={addressVerificationHandler} />}

    </main>

  )
}

export default VerifyPage

import { useState } from 'react'
import Button from '../components/Button'
import { useNavigate } from 'react-router-dom'
import getGeoLocation from '../service/getGeoLocation'
import { verifyAddressURL } from '../config'




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

    //Get Token
    const token = localStorage.getItem("token");

    //call the fuction theat gets the latitude and longitude
    const geodata = await getGeoLocation();
    const latitudeInfo = geodata.latitude;
    const longitudeInfo = geodata.longitude;

    try {

      const response = await fetch(verifyAddressURL, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "Authorization": `Bearer ${token}`
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
      <div className="wrapper">
        <h1>Verify <span className="text-gradient">Address</span></h1>

        <p className="text-center text-light-200 mt-4">
          Click the button below to confirm your physical location
        </p>

        <div className="verify-card">

          <p className="verify-status"> {verificationStatus}</p>
          <p className="verify-address">{formattedAddress}</p>
          <p className="verify-coords">
            {latitude?.toFixed(6)}, {longitude?.toFixed(6)}
          </p>

        </div>

        <br />
        <br />

        {isLoading ? <p className="verifying-text">Verifying your location...</p>
          : <Button text="Verify Address" handleSubmit={addressVerificationHandler} />
        }
      </div>

    </main>

  )
}

export default VerifyPage

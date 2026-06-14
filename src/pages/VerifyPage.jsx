import { useState } from 'react'
import Button from '../components/Button'
import { useNavigate } from 'react-router-dom'
import getGeoLocation from '../service/getGeoLocation'
import { verifyAddressURL } from '../config'
import { validateBillURL } from '../config'
import sendBillImage from '../service/sendBillImage'



function VerifyPage() {

  const [latitude, setLatitude] = useState(null)
  const [longitude, setLongitude] = useState(null)
  const [verificationStatus, setVerificationStatus] = useState(null)
  const [formattedAddress, setFormattedAddress] = useState(null)
  const [isLoading, setIsLoading] = useState(false)
  //image
  const [billFile, setBillFile] = useState(null)
  //state for bill validation
  const [isValidating, setIsValidating] = useState(false)
  const [validationStatus, setValidationStatus] = useState("")
  const [validationComment, setValidationComment] = useState("")


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

  //function to validate bill
  async function validateBill() {

    if (!billFile) {
      setValidationComment("Please select a utility bill to upload")
      return
    }
    console.log(billFile)
    setIsValidating(true)

    //Get Token
    const token = localStorage.getItem("token");

    try {

      //send image to the backend for validation
      const response = await sendBillImage(validateBillURL, billFile, token)

      //get AI response
      const validate = await response.json();

      if (response.ok) {

        setValidationStatus(validate.data.status)
        setValidationComment(validate.data.comment)
      } else {
        setValidationComment("Unable to validate bill, please try again")
      }

    } catch (error) {
      setValidationComment("Unable to validate bill, please try again")
      console.log(error)
    } finally {
      setIsValidating(false)
    }


  }

  //

  return (
    <main className="verify-main">
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
        {isLoading ? <p className="verifying-text">Verifying your location...</p>
          : <Button text="Verify Address" className="verify-btn" handleSubmit={addressVerificationHandler} />
        }
        
      </div>

      <div className="wrapper">
        <div className="verify-card">
          <h2 className="text-white text-xl font-semibold">Utility Bill Verification</h2>
          <p className="text-light-200 text-sm text-center">
            Upload a utility bill not older than 3 months
          </p>

          <label className="bill-upload">
            <input
              type="file"
              accept="image/jpeg,image/png,application/pdf"
              onChange={(e) => setBillFile(e.target.files[0])}
              className="hidden"
            />
            <span className="bill-upload-btn">
              {billFile ? billFile.name : "Choose File"}
            </span>
          </label>

          {validationStatus && (
            <div className="validation-result">
              <p className="verify-status">Status: {validationStatus}</p>
              <p className="verify-address">Comment: {validationComment}</p>
            </div>
          )}

          {isValidating
            ? <p className="verifying-text">Validating your bill...</p>
            : <Button text="Validate Utility Bill" className="verify-btn" handleSubmit={validateBill} />
          }
        </div>
      </div>



    </main>

  )
}

export default VerifyPage

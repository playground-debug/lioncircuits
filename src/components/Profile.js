import React, { useEffect, useState } from "react"
import { Card, Alert } from "react-bootstrap"
import { useAuth } from "../contexts/AuthContext"
import { Link } from "react-router-dom"

export default function Profile() {
  const [error, setError] = useState("")
  const [userInfo, setUserInfo] = useState({ 'address': '' })
  const { getUser } = useAuth()
  const addresses = []

  useEffect(() => {
    getUserInfo()
  }, []);

  async function getUserInfo() {
    const dataUser = await getUser()
    setUserInfo(JSON.parse(JSON.stringify(dataUser)));
    console.log('Current user snapshot:', userInfo);
  }

  function address() {
    var singleAddress;
    for (singleAddress in userInfo.address) {
      console.log('single address:', singleAddress);
      addresses.push(
        <>
          <Card>
            <Card.Body>
              {userInfo.address[singleAddress]}
              <br />
              <Link to={`/update/address/${singleAddress}`} className="btn btn-primary w-100 mt-2">
                Edit
          </Link>
            </Card.Body>
          </Card>
          <br />
        </>
      )
    }
  }

  return (
    <>
      <Card>
        <Card.Body>
          <h2 className="text-center mb-4">Profile</h2>
          {error && <Alert variant="danger">{error}</Alert>}
          <strong>Username:</strong> {userInfo.username}
          <Link to="/update/username" className="btn btn-primary w-100 mt-3">
            Update Username
          </Link>
          <br />
          <hr />
          <strong>Addresses:</strong>
          {address()}
          {addresses}
          <Link to="/update/address/new" className="btn btn-primary w-100 mt-2">
            Add New Address
          </Link>
          <br />
          <hr />
          <strong>Phone Number:</strong> {userInfo.phoneNumber}
          <Link to="/update/phoneNumber" className="btn btn-primary w-100 mt-3">
            Update Phone Number
          </Link>
        </Card.Body>
      </Card>
    </>
  )
}
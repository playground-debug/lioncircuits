import React, { useEffect, useRef, useState } from "react"
import { Form, Button, Card, Alert } from "react-bootstrap"
import { useAuth } from "../contexts/AuthContext"
import { Link, useHistory } from "react-router-dom"
import ValidatorUtils from "../utils/Validator.utils"

export default function UpdateProfile(props) {
  const [updateValue, setUpdateValue] = useState("Address")
  const [userInfo, setUserInfo] = useState({ 'address': '' })
  const linkValue = (props.location.pathname).substr(8);

  useEffect(() => {
    if (linkValue === 'username')
      setUpdateValue('Username')
    else if (linkValue === 'phoneNumber')
      setUpdateValue('Phone Number')
    getUserInfo()
  }, [])

  var state = {
    [linkValue]: ''
  }

  async function getUserInfo() {
    const dataUser = await getUser()
    setUserInfo(JSON.parse(JSON.stringify(dataUser)));
    console.log('Current user snapshot:', userInfo);
  }
  const { updateUser, getUser, updateUserAddress } = useAuth()
  const [error, setError] = useState("")
  const [loading, setLoading] = useState(false)
  const history = useHistory()

  function changeState(e) {
    state[linkValue] = e.target.value;
  }

  function handleSubmit(e) {
    e.preventDefault()

    const promises = []
    setLoading(true)
    setError("")
    console.log('Handle Submit:', state);
    console.log(ValidatorUtils.phoneNumberValidator(state[linkValue]));
    if (linkValue === 'phoneNumber' && !ValidatorUtils.phoneNumberValidator(state[linkValue])) {
      console.log('Throwing Error');
      promises.push(new Promise(() => {
        throw new Error("Invalid Number");
      }))
    }
    else if (linkValue === 'address/new') {
      console.log('New address');
      promises.push(updateUserAddress(state[linkValue]));
    }
    else if (state[linkValue] !== userInfo[linkValue]) {
      console.log('Update user info');
      promises.push(updateUser(linkValue, state[linkValue]))
    }

    Promise.all(promises)
      .then(() => {
        history.push("/profile")
      })
      .catch((e) => {
        console.log('Error:', e.message);
        if (e.message == 'Invalid Number')
          setError(e.message)
        else
          setError(`Failed to update ${updateValue}`)
      })
      .finally(() => {
        setLoading(false)
      })
  }

  function defaultValue(user) {
    try {
      if (user[linkValue])
        return user[linkValue];
      else
        return userInfo.address[linkValue.substr(8)]
    } catch {
      return undefined;
    }
  }

  return (
    <>
      <Card>
        <Card.Body>
          <h2 className="text-center mb-4">Update {updateValue}</h2>
          {error && <Alert variant="danger">{error}</Alert>}
          <Form onSubmit={handleSubmit}>
            <Form.Group id={linkValue}>
              <Form.Label>{updateValue}</Form.Label>
              <Form.Control
                type="text"
                onChange={changeState}
                required
                defaultValue={defaultValue(userInfo)}
              />
            </Form.Group>
            <Button disabled={loading} className="w-100" type="submit">
              Update
            </Button>
          </Form>
        </Card.Body>
      </Card>
      <div className="w-100 text-center mt-2">
        <Link to="/profile">Cancel</Link>
      </div>
    </>
  )
}
import { Button } from 'antd';
import { login } from '../../store/auth'
import { connect } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import './Login.css'

function Login({ login }) {

  const navigate = useNavigate();

  const handleSubmit = async () => {
    const loggedIn = await login('willow', 'password')
    if (loggedIn) {
      navigate("/yourlist")
    }
  }

  return (
    <div>
      <p>hello, login here</p>
      <Button onClick={handleSubmit}>Log In</Button>
    </div>
  )
}

const mapDispatchToProps = {
  login,
}

export default connect(null, mapDispatchToProps)(Login);

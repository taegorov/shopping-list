// import { Button } from 'antd';
// import { login } from '../../store/auth'
import recipesReducer from '../../store/recipes'
import { connect } from 'react-redux'
// import { useNavigate } from 'react-router-dom'
// import './Login.css'

function RecipePicker({ recipesReducer }) {

  console.log('recipes: ', recipesReducer)

  return (
    <div>
      <p>hello, this is the recipe picker</p>
      {/* <Button id="loginButton" onClick={handleSubmit}>Log In</Button> */}
    </div>
  )
}

const mapDispatchToProps = {
  recipesReducer,
}

export default connect(null, mapDispatchToProps)(RecipePicker);

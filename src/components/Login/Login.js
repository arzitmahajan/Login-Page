import React, { useState ,useReducer, useEffect} from 'react';
import Card from '../UI/Card/Card';
import classes from './Login.module.css';
import Button from '../UI/Button/Button';
import Input from './Input';
const emailReducer = (state,action)=>{
  if(action.type === 'USER_INPUT'){
    return { value:action.val, isValid: action.val.includes('@')};
  }
  if(action.type === 'INPUT_BLUR'){
    return{ value:state.value , isValid:state.value.includes('@')};
  }
  return { value:'', isValid: false};
};
const passwordReducer = (state,action)=>{
    if(action.type==='User_PASSWORD'){
      return {value:action.val,isValid:action.
        val.trim().length>6};
    }
    if(action.type==='PASSWORD_BLUR'){
      return {value:state.value,isValid:state.value.trim().length>6};
    }
    return {value:'',isValid:false};
}
const Login = (props) => {
  //const [enteredEmail, setEnteredEmail] = useState('');
  //const [emailIsValid, setEmailIsValid] = useState();
  //const [enteredPassword, setEnteredPassword] = useState('');
  //const [passwordIsValid, setPasswordIsValid] = useState();
  const [formIsValid, setFormIsValid] = useState(false);

  //Reducer is the hook which is more powerful than state hook 
  //it takes arguement that are state
  //dispacthFn(A function to dispatch a new action i.e trigger)
  //A func that is triggered automatically once an action is dipatched (it recives the latest state snapshot and should return the new, updated state). 
  // a initial state
  // an initial  function
  const [emailState, dispacthEmail] = useReducer(emailReducer,{value :'' ,isValid:undefined});
  const [passState, dispatchPass] = useReducer(passwordReducer,{value :'' ,isValid:undefined});

  const {isValid : aliasValid} = emailState;
  const {isValid : passaliasValid} = passState;

  useEffect(()=>{
    const identifier = setTimeout(()=>{
      setFormIsValid(
        aliasValid && passaliasValid
      );
    },500);

    return () =>{
      console.log('Cleanup');
      clearTimeout(identifier);
    }
  },[aliasValid,passaliasValid]);

  const emailChangeHandler = (event) => {
    //setEnteredEmail(event.target.value);
    dispacthEmail({type:'USER_INPUT', val: event.target.value});

    /*setFormIsValid(
      emailState.value.includes('@') && passState.isValid
    );*/
  };
  
  const passwordChangeHandler = (event) => {
    dispatchPass({type:'User_PASSWORD',val: event.target.value});
   // setEnteredPassword(event.target.value);

   /* setFormIsValid(
      event.target.value.trim().length > 6 && emailState.isValid
    );*/
  };

  const validateEmailHandler = () => {
    dispacthEmail({type:'INPUT_BLUR'});
    //setEmailIsValid(emailState.isValid);
  };

  const validatePasswordHandler = () => {
    dispatchPass({type:'PASSWORD_BLUR'});
    //setPasswordIsValid(passState.value.trim().length > 6);
  };

  const submitHandler = (event) => {
    event.preventDefault();
    props.onLogin(emailState.value, passState.value);
  };

  return (
    <Card className={classes.login}>
      <form onSubmit={submitHandler}>
        <Input isValid ={aliasValid} id = {"email"} type = {"email"} mail = {"E-Mail"} value = {emailState.value} onChange = {emailChangeHandler} onBlur = {validateEmailHandler}></Input>
        <Input isValid ={passaliasValid} id = {"password"} type = {"password"} mail = {"Password"} value = {passState.value} onChange = {passwordChangeHandler} onBlur = {validatePasswordHandler}></Input>

        <div className={classes.actions}>
          <Button type="submit" className={classes.btn} disabled={!formIsValid}>
            Login
          </Button>
        </div>
      </form>
    </Card>
  );
};
export default Login;

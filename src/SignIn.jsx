import {React , useState} from 'react'
import TopBar from './Component/TopBar'
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

  
function SignIn() {
    const[email,setEmail] =useState();
    const[password,setPassword] =useState();
    const navigate = useNavigate();
    const[title,setTitle]=useState("Sign in");
    const handleChangec =(e)=>
        {
            const{name,value}= e.target;
            if(name==='email')
            {
                setEmail(value);
            }
            else(name==='password')
            {
                setPassword(value);
            }
            
        }
        const handleSubmit = async () => {
            try {
            
        
                
                const response = await axios.post(`${import.meta.env.VITE_APIURL}/users/login`, { email, password });
                console.log('User Sign in:', response.data);
                sessionStorage.setItem("accessToken",response.data.data.accessToken);
                sessionStorage.setItem("refreshToken",response.data.data.refreshToken);
                setTitle("User Signed in successfully");
                const redirectAfterLogin = localStorage.getItem("redirectAfterLogin");
                 if (redirectAfterLogin) {
                    localStorage.removeItem("redirectAfterLogin");
                    navigate(redirectAfterLogin);
                 }
                 else
                 {
                    navigate(-1);
                    navigate(-1);
                 }

                
            } catch (error) {
                console.error('Error creating User:', error);
                setTitle(error.response.data.message);
                if(error.response.data.message==='user does not exist')
                {
                    navigate("/register");
                }
                setTimeout(() => {
                    setTitle("Sign in");
                }, 3000);
                
            }
        };
        
        const handleRegister=()=>
        {
            navigate("/register");
        }
  return (
    <>
        <TopBar />
        <div className='RegisterDiv'>
                <div>
                    <h1>{title}</h1>
                </div>
                <div className='EmailInputDiv'>
                    <input className='EmailInput' type='email' placeholder='Email' name='email' onChange={handleChangec}/>
                </div>
                <div  className='PasswordInputDiv'>
                    <input className='PasswordInput' type='password' placeholder='Password' name='password' onChange={handleChangec}/>
                </div>
                <div>
                    <button className='BuyButton' onClick={handleSubmit} >Sign in</button>
                </div>
                <div className='Division'>
                    <div className='DivisionDiff'></div>
                    <div className='DivisionMid' onClick={handleRegister}>Register</div>
                    <div className='DivisionDiff'></div>
                </div>
        </div>
    </>
  )
}



export default SignIn
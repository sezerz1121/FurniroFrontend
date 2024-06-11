import {React , useState} from 'react'
import TopBar from './Component/TopBar'
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

  
function Registration() {
    const navigate = useNavigate();
    const[email,setEmail] =useState();
    const[password,setPassword] =useState();
    const[confirmPassword,setConfirmPassword] =useState();
    const[title,setTitle]=useState("register");
    const handleChangec =(e)=>
        {
            const{name,value}= e.target;
            if(name==='email')
            {
                setEmail(value);
            }
            else if(name==='password')
            {
                setPassword(value);
            }
            else
            {
                setConfirmPassword(value);
            }
        }
        const handleSubmit = async () => {
            try {
                if (password !== confirmPassword) {
                    setTitle("Password does not match");
                    setTimeout(() => {
                        setTitle("Register");
                    }, 3000);
                    return;
                }
        
                
                const response = await axios.post(`${import.meta.env.VITE_APIURL}/users/register`, { email, password });
                console.log('User created:', response.data);
        
                
                setTitle("User registered successfully");
                navigate('/Signin');
                
            } catch (error) {
                console.error('Error creating User:', error);
                setTitle(error.response.data.message);
                setTimeout(() => {
                    setTitle("Register");
                }, 3000);
                
            }
        };

        const handleSignin =()=>
        {
            navigate("/Signin");
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
                <div className='PasswordInputDiv'>
                    <input className='PasswordInput' type='password' placeholder='Confirm Password' name='ConfirmPassword' onChange={handleChangec}/>
                </div>
                <div>
                    <button className='RegisterButton' onClick={handleSubmit} >Register</button>
                </div>
                <div className='Division'>
                    <div className='DivisionDiff'></div>
                    <div className='DivisionMid' onClick={handleSignin}>Sign in</div>
                    <div className='DivisionDiff'></div>
                </div>
        </div>
    </>
  )
}

export default Registration
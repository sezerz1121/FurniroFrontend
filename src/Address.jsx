import {React , useState , useEffect} from 'react'
import TopBar from './Component/TopBar'
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { IoArrowBack } from "react-icons/io5";
  
function Registration() {
    const navigate = useNavigate();
    const [user, setUser] = useState(null);
    const[country,setCountry] =useState();
    const[fullname,setFullname] =useState();
    const[mobile,setMobile] =useState();
    const[pincode,setPincode] =useState();
    const[flat,setFlat] =useState();
    const[area,setArea] =useState();
    const[landmark,setLandmark] =useState();
    const[town,setTown] =useState();
    const[state,setState] =useState();
    useEffect(() => {
        const fetchUserData = async () => {
          try {
            const accessToken = sessionStorage.getItem("accessToken");
            if(!accessToken)
            {
                navigate("/signin");
            }
            const response = await axios.post(`${import.meta.env.VITE_APIURL}/users/userinfo`, { accessToken });
            console.log('User info:', response.data);
            setUser(response.data.data.userInfo);
          } catch (error) {
            console.error('Error fetching User info:', error);
            
           
          }
        };

    
 
        fetchUserData();
      }, []); 
    
    const[title,setTitle]=useState("Address");
    const handleChangec =(e)=>
        {
            const{name,value}= e.target;
            if(name==='Country')
            {
                setCountry(value);
            }
            else if(name==='Mobile')
            {
                setMobile(value);
            }
            else if(name==='Fullname')
            {
                setFullname(value);
            }
            else if(name==='Pincode')
            {
                setPincode(value);
            }
            else if(name==='Flat')
            {
                setFlat(value);
            }
            else if(name==='Area')
            {
                setArea(value);
            }
            else if(name==='Landmark')
            {
                setLandmark(value);
            }
            else if(name==='Town')
            {
                 setTown(value);
            }
            else
            {
                setState(value);
            }
        }
        const handleSubmit = async () => {
            try {
                
                const userId = user._id;
                
                const response = await axios.post(`${import.meta.env.VITE_APIURL}/address/addresssetup`, { country, fullname,mobilenumber:mobile,pincode,flathouseno:flat,area,landmark,towncity:town,state,userId });
                console.log('User created:', response.data);
        
                
                
                navigate(-1);
                
            } catch (error) {
                console.error('Error creating User:', error);
                
                
            }
        };
        const handleBack = () => {
            navigate(-1);
          };        
        
  return (
    <>
        <TopBar />
        <div className='savedBack' onClick={handleBack}>
        <IoArrowBack />
        </div>
        <div className='RegisterDiv'>
                <div>
                    <h1>{title}</h1>
                </div>
                <div className='EmailInputDiv'>
                    <input className='EmailInput' type='text' placeholder='Country/Region' name='Country' onChange={handleChangec}/>
                </div>
                <div  className='PasswordInputDiv'>
                    <input className='PasswordInput' type='text' placeholder='Full name' name='Fullname' onChange={handleChangec}/>
                </div>
                <div className='PasswordInputDiv'>
                    <input className='PasswordInput' type='number' placeholder='Mobile' name='Mobile' onChange={handleChangec}/>
                </div>
                <div className='PasswordInputDiv'>
                    <input className='PasswordInput' type='number' placeholder='Pincode' name='Pincode' onChange={handleChangec}/>
                </div>
                <div className='PasswordInputDiv'>
                    <input className='PasswordInput' type='text' placeholder='Flat, House no.' name='Flat' onChange={handleChangec}/>
                </div>
                <div className='PasswordInputDiv'>
                    <input className='PasswordInput' type='text' placeholder='Area,Street,Sector,Village' name='Area' onChange={handleChangec}/>
                </div>
                <div className='PasswordInputDiv'>
                    <input className='PasswordInput' type='text' placeholder='Landmark' name='Landmark' onChange={handleChangec}/>
                </div>
                <div className='PasswordInputDiv'>
                    <input className='PasswordInput' type='text' placeholder='Town/City' name='Town' onChange={handleChangec}/>
                </div>
                <div className='PasswordInputDiv'>
                    <input className='PasswordInput' type='text' placeholder='State' name='State' onChange={handleChangec}/>
                </div>
                <div>
                    <button className='BuyButton' onClick={handleSubmit} >Add Address</button>
                </div>
        </div>
    </>
  )
}

export default Registration
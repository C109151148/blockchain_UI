import {auth,provide} from "./firebase";
import { signInWithPopup } from "firebase/auth";
import {useState, useEffect} from 'react';
import {get_web3,set_web3,get_Address} from './Set_web3';

function Login_page(){
    const [web3, setWeb3] = useState (null);
    const [email,setEmail]=useState(null);
    const [address,setAddress]=useState(null);
    const [state,setState]=useState(true);
    useEffect(()=>{
        try{
            check_email();
            addr();

        }
        catch (error) {
            console.error('Error:', error);
        }
    })
    function check_email(){
        let eamil_addr=auth.currentUser.email;
        console.log("eamil",eamil_addr);
        eamil_addr=eamil_addr.substring(eamil_addr.indexOf("@",0)+1,eamil_addr.length) ;
        console.log("eamil",eamil_addr);
        if(eamil_addr==="nkust.edu.tw"){
         setEmail(auth.currentUser.displayName);
         setState(false);
        }
        else{
         setState(true);
         setEmail("請登入高科EMAIL");
        }
    }
    async function login(){
        try{
           await signInWithPopup(auth,provide);
           check_email();
        }catch(error) {
            console.error('Error:', error);
        }
    }
    async function addr(){
        setWeb3(get_web3);
        const addressResult = await get_Address(web3);
        setAddress(addressResult);
        console.log("addr",address);
    }
    const handleClick = async () => {
        try {
          await set_web3();
          addr();
          
        } catch (error) {
          console.error('Error:', error);
        }
    }
    return<>
    <div>
        <button onClick={login}>登入高科email</button>
        <h1>{email}</h1>
        <button onClick={handleClick} disabled={state}>錢包連接</button>
        <h1>{address}</h1>
    </div>
    </>

}
export default Login_page;
import React,{useState,useEffect} from 'react'
import Axios from "axios";
import KeyboardDoubleArrowLeftIcon from '@mui/icons-material/KeyboardDoubleArrowLeft';
import KeyboardDoubleArrowRightIcon from '@mui/icons-material/KeyboardDoubleArrowRight';
import "./styles.css";

function Imageslider() {
    const[images,setImages]=useState([]);
    const[errorMsg,setErrorMsg]=useState(null);
    const[loading,setLoading]=useState(false);
    const[currentSlide,setCurrrentSlide]=useState(0);
    useEffect(()=>{
       
      
        try{
            Axios.get('https://picsum.photos/v2/list?limit=10').then(res=>{
                
                setLoading(true)
                setImages(res.data);
                
            })
            setLoading(false);
        }catch(e){
            setErrorMsg(e.message);
            setLoading(false);
        }   
  
        if(errorMsg!=null){
            <div>Theerror has occured!{errorMsg}</div>
        }
    })

    const handlePrevious=()=>{
        setCurrrentSlide(currentSlide===0?images.length-1:currentSlide-1)
    }
    const handleNext=()=>{
        setCurrrentSlide(currentSlide===images.length-1?0:currentSlide+1)
    }
  return (
    <>
        <div className='container'>
        
           {loading?<div>Page is Loading... please wait</div>:''}
           {errorMsg?<div>error occured</div>:""}
        
        <KeyboardDoubleArrowLeftIcon onClick={handlePrevious}/>
        {
            images.map((item,index)=>(
                <img
                key={item.id}
                alt={item.download_url}
                src={item.download_url}
                className={currentSlide===index?"currentImage":"hidecurrentImage"}
                
                />
            ))
        }
        <KeyboardDoubleArrowRightIcon onClick={handleNext}/>
        <span className='circleIndicators'>
        {
            images.map((_,index)=>
            <button
            key={index}
            className={currentSlide===index?"currentindicator":"inactiveIndicator"}

            >

            </button>

            )
        }
         </span>
        </div>
       
    </>
    
  )
}

export default Imageslider;

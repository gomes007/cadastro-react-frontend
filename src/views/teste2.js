import react, { useEffect, useState } from "react";
import  axios  from "axios";

const Unit=()=>{
 
 const[SaveUnit,SetSaveUnit]=useState({
   Id:0,
   Code:"",
   Name:"",
   ShortName:""

 })

 const{Id,Code,Name,ShortName}=SaveUnit;
 const onInputChange=e=>{
    SetSaveUnit({...SaveUnit,[e.target.name]:e.target.value})
  }
 
 
  
  
const OnSavechanges=async()=>{

   const UnitList=await axios.post("https://localhost:44312/api/unit/SaveUnits",SaveUnit);
   
    SetSaveUnit({
        Code: "",
        Name: "",
        ShortName:"",
        Id:0
      });      
}

return(


  <div className="Component">
      <div className="row   ">
      <div className="col-md-1 "></div>
          <div className="col-md-5 ">
          <div className="col-md-12 p-3"><h3>Unit </h3></div>
          <div className="row">
              <div className="col-md-4"> Code</div>
              <div className="col-md-8"><input type="text"  value={Code} name="Code" id="txtcode" onChange={e=>onInputChange(e)} className="form-control"></input> </div>
          </div>
          <div className="row mt-3">
              <div className="col-md-4">Name</div>
              <div className="col-md-8"><input type="text" value={Name} name="Name" id="txtNme" onChange={e=>onInputChange(e)} className="form-control"></input> </div>
          </div>
  
          <div className="row mt-3">
              <div className="col-md-4">Short Name</div>
              <div className="col-md-8"><input type="text" value={ShortName}  name="ShortName" id="txtshortName" onChange={e=>onInputChange(e)} className="form-control"></input> </div>
          </div>
          <div className="row mt-3">
              <div className="col-md-4"></div>
              <div className="col-md-8 text-right"><input type="button" onClick={e=>OnSavechanges()} value="Save" id="btnsave" className="btn-primary btn"></input>
              <input type="button" id="btncancel" value="Cancel"  className="btn-primary btn ml-2"></input> </div>
          </div>
  
          </div>
          
          <div className="col-md-1 "></div>
      </div>
  </div>
  
    );
  
  }
  
  export default Unit
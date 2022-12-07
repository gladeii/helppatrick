import { Paper } from "@mui/material";
import axios from "axios";
import { useCallback, useEffect, useState } from "react";
import { INotes, IUser, useRest } from "../restcall/useREST"

export default function RestExample (){
    const [newUser, sendRequest, data, loading,error,user, newNote] = useRest();

    useEffect(()=>{
        if(user!==undefined)
            sendRequest(
                {
                method:'GET',
                url:"http://hyeumine.com/mynotes.php?id="+user.id,
                }
                )
    },[user])


    if(!user) return <><h3>No user Available!</h3>
        <button onClick={()=>{
          newUser({id:-1,firstname:"Myrna",lastname:"Spurs"});  
        }}>Create new User</button>
    </>

    if(loading) return <p>Checking for data..</p>

    if(error!=="") return <p>Error</p>

    if(!data) return <h2>Data is null!</h2>
    return <div>
        <h4>{user.id} | {user.firstname} | {user.lastname}</h4>
        {
            data.notes.map((item,i)=>{
                return <Paper sx={{margin:'1rem',padding:'.5rem', fontSize:'15px', textAlign:'right'}} elevation={12} key={i}>{item[0]} : {item[1]}</Paper>
            })
        }
    </div>


}
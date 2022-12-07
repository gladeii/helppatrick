import axios, { AxiosRequestConfig } from "axios";
import { useEffect, useState } from "react";


export interface INotes{
    notes: string[][]
}
export interface IUser{
    id:number,
    firstname:string,
    lastname:string
}

export const useRest = ():[(iuser:IUser)=>void, (config: AxiosRequestConfig<any>)=>void, INotes|undefined, boolean, string, IUser|undefined,(note:string)=>void] => {
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState("");
    const [data,setData] = useState<INotes>();
    const [user,setUser] = useState<IUser>();

    function sendRequest(config: AxiosRequestConfig<any>){
        setLoading(true);

        axios(config)
        .then((response) => {
            setError('');
            setData(response.data);
            console.log(data);
        })
        .catch((error) => {
            setError(error.message);
        })
        .finally(()=>setLoading(false))
    }

    function newUser(iuser:IUser){
        // do a REST...
        setLoading(true)
        axios.post(
            "http://hyeumine.com/newuser.php",
            new URLSearchParams({
              firstname : iuser.firstname,
              lastname :  iuser.lastname 
            })
            )
            .then((response)=>{
                setUser(response.data);
            })
            .catch((error)=>{
                setError(error.message);
            })
            .finally(()=>{
                setLoading(false)
            })
    }

    function newNote(note:string){
        // Expected 'user' is set already... user.id....
        // Param: string note
        setLoading(true)
        axios.post(
            "http://hyeumine.com/noteposted.php",
            new URLSearchParams({
              notes: note
            })
            )
            .then((response)=>{
                setData(response.data);
            })
            .catch((error)=>{
                setError(error.message);
            })
            .finally(()=>{
                setLoading(false)
            })
    }

    return [newUser, sendRequest,  data, loading, error,user, newNote]
}

import { useEffect, useState } from "react";
import { User } from "./User";
import axios from "axios";

export function Page(){
  const [data, setData] = useState([]);
  const [refresh, setRefresh] = useState(false)

  useEffect(() => {
    async function getData() {
        await axios.get('https://projectbackend-md1l.onrender.com/api/v1/user/all')
          .then( (response) => {
            setData(response.data)

        })
    }
    getData();
    
  }, [refresh])


  function refetch(){
    setRefresh(!refresh)  
  }


    return  <div className="grid grid-cols-1 xl:grid-cols-4 md:grid-cols-3">
            {data.map((user) => {
                return <User
                key= {user._id}
                id= {user._id}
                name= {user.name}
                email= {user.email}
                img= {user.img}
                website= {user.website}
                phone= {user.phone}
                refetch= {refetch}
                />
            })}
        </div>
}
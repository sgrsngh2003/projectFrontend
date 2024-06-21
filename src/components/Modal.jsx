import React, { useEffect, useRef, useState } from "react";
import { LuAsterisk } from "react-icons/lu";
import axios from "axios";

export const Modal = ({ onClose, isOpen, refetch, id, userName, userEmail, userPhone, userWebsite}) => {
  const modalRef = useRef();

  const [name, setName] = useState(userName);
  const [email, setEmail] = useState(userEmail);
  const [phone, setPhone] = useState(userPhone);
  const [website, setWebsite] = useState(userWebsite)

  useEffect(() => {
    const handleClickOutside = (e) => {
      if (modalRef.current && !modalRef.current.contains(e.target) && isOpen) {
        onClose();
      }
    };

    document.addEventListener("mousedown", handleClickOutside);

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [isOpen, onClose]);

  const update = async() => {
    await axios.put('https://projectbackend-md1l.onrender.com/api/v1/user/update',{
      id: id,
      name: name,
      email: email,
      phone: phone,
      website: website
    }).then((response) => {
      if(response){
        refetch()
      }
    })
  }

  const close = () => {
    onClose()
  }

  function click(){
  if(name && email && phone && website){
    update()
    close()
  }
  }

  return (
    <>
      {isOpen && (
        <div className="transition ease-in-out delay-150 fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center">
          <div ref={modalRef} className="bg-white rounded shadow-lg relative">
            <button
              className="absolute top-2 right-2 text-2xl text-gray-500 hover:text-gray-700 "
              onClick={onClose}
            >
              &times;
            </button>

            <div className="px-4 py-4 border-b font-medium">
              Basic Modal
            </div>
            <div className="my-4 ml-24 mr-6">
              <div className="flex pt-2 justify-end pr-2">
                <div className="flex justify-center items-center">
                  <LuAsterisk className="text-red-500"/>
                </div>
                <div className="mx-1 flex justify-center items-center">
                  Name: 
                </div>
                <input type="text" defaultValue={name} 
                      className="flex justify-center items-center text-neutral-500 w-72 px-2 py-1 rounded border  border-neutral-300 outline-blue-400 hover:border-blue-400 focus:outline-blue-300 "
                      onChange={(e) =>{
                        setName(e.target.value)
                      } }
                      />
              </div>
              <div className="h-6">
              { !name &&
                <div className="ml-20 text-red-500">
                  This field is required
                </div>
              }
              </div>
              <div className="flex pt-2 justify-end pr-2">
                <div className="flex justify-center items-center">
                  <LuAsterisk className="text-red-500"/>
                </div>
                <div className="mx-1 flex justify-center items-center">
                  Email: 
                </div>
                <input type="text" defaultValue={email}
                      className="flex justify-center items-center text-neutral-500 w-72 px-2 py-1 rounded border  border-neutral-300 outline-blue-400 hover:border-blue-400 focus:outline-blue-300 "
                      onChange={ (e)=> {
                        setEmail(e.target.value)
                      }}
                      />
              </div>
              <div className="h-6">
              { !email &&
                <div className="ml-20 text-red-500">
                  This field is required
                </div>
              }
              </div>
              <div className="flex pt-2 justify-end pr-2">
                <div className="flex justify-center items-center">
                  <LuAsterisk className="text-red-500"/>
                </div>
                <div className="mx-1 flex justify-center items-center">
                  Phone: 
                </div>
                <input type="text" defaultValue={phone}
                      className="flex justify-center items-center text-neutral-500 w-72 px-2 py-1 rounded border  border-neutral-300 outline-blue-400 hover:border-blue-400 focus:outline-blue-300 "
                      onChange={ (e)=> {
                        setPhone(e.target.value)
                      }}
                      />
              </div>
              <div className="h-6">
              { !phone &&
                <div className="ml-20 text-red-500">
                  This field is required
                </div>
              }
              </div>
              <div className="flex pt-2 justify-end pr-2">
                <div className="flex justify-center items-center">
                  <LuAsterisk className="text-red-500"/>
                </div>
                <div className="mx-1 flex justify-center items-center">
                  Website: 
                </div>
                <input type="text" defaultValue={website}
                      className="flex justify-center items-center text-neutral-500 w-72 px-2 py-1 rounded border  border-neutral-300 outline-blue-400 hover:border-blue-400 focus:outline-blue-300 "
                      onChange={ (e)=> {
                        setWebsite(e.target.value)
                      }}
                      />
              </div>
              <div className="h-6">
              { !website &&
                <div className="ml-20 text-red-500">
                  This field is required
                </div>
              }
              </div>
            
            </div>
            <div className="py-2 border-t flex justify-end gap-2 pr-6"> 
              <button className=" rounded border border-neutral-300 px-4 py-1 hover:border-blue-400 hover:text-blue-500"
                onClick={onClose}
              >
                Cancel
              </button>
              <button className="rounded bg-blue-500 text-white px-4 py-1 hover:bg-opacity-80"
                      onClick={click}
                      >
                Ok
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
};


import { MdOutlineMailOutline } from "react-icons/md";
import { IoCallOutline } from "react-icons/io5";
import { TfiWorld } from "react-icons/tfi";
import { FaRegHeart } from "react-icons/fa6";
import { RiEditLine } from "react-icons/ri";
import { MdDelete } from "react-icons/md";
import { useState } from "react";
import {Modal} from './Modal'
import axios from "axios";

export function User({name, email, phone, website, img, id, refetch}){

    const [liked , setLiked] = useState(false)
    function like(){
        setLiked(!liked)
    }
    const [isOpen, setIsOpen] = useState(false);

    const openModal = () => {
        setIsOpen(true);
    };

    const closeModal = () => {
        setIsOpen(false);
    };
    
    const remove = async() => {
        await axios.delete('https://projectbackend-md1l.onrender.com/api/v1/user/remove',{
            data:{
                id: id
            }
          })
        .then((response) => {
            refetch()
        })
    }

    
    function click(){
        remove()    
    }


    return <div className="w-auto rounded-sm border border-neutral-300 mx-4 my-4">
        <div className="flex justify-center items-center bg-neutral-100">
            <img className="w-52 h-52 rounded-full mx-auto"
                src={img} alt="hii" />
        </div>
        <div className="mt-4 ml-6">
            <div className="font-medium flex items-center pb-1">
                {name}
            </div>
            <div className=" flex items-center font-light py-1">
                <MdOutlineMailOutline className="mr-2"/>
                {email}
            </div>
            <div className="flex items-center font-light pb-1">
            <IoCallOutline className="mr-2 "/>
                {phone}
            </div>
            <div className="flex items-center font-light pb-1">
            <TfiWorld className="mr-2"/>
                {website}
            </div>
        </div>
        <div className="mt-4 flex justify-around border-t border-neutral-300 py-4 items-center bg-neutral-100 px-2">
            <div className="">
                <FaRegHeart className={` text-xl cursor-pointer ${liked ? 'text-red-500' :'text-neutral-500 '}` }
                            onClick={like}
                            />
            </div>
            <div className="text-neutral-200 text-xl">
                |
            </div>
            <div>
                <RiEditLine  className=" text-neutral-500 text-xl cursor-pointer hover:text-blue-400"
                    onClick={openModal}/>
            </div>
            <div className="text-neutral-200 text-xl">
                |
            </div>
            <div>
                <MdDelete className=" text-neutral-500 text-xl cursor-pointer hover:text-blue-400"
                        onClick={click}/>
            </div>
            <Modal isOpen={isOpen} onClose={closeModal} refetch= {refetch} id={id} userName={name} userEmail={email} userPhone={phone} userWebsite={website}>
            </Modal>
        </div>
    </div>
}
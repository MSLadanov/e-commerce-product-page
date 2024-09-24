import { useState } from "react"
import { createPortal } from "react-dom"
import { AccountDropdown } from "../components/MobileDropdown/AccountDropdown"
import { MobileCartDropdown } from "../components/MobileDropdown/MobileCartDropdown"
import { CartDropdown } from "../components/Header/Dropdown/CartDropdown"

function useModal(){
    const [ openModal, setOpenModal ] = useState(false)
    const [ modalType, setModalType ] = useState(null)
    function toggleModal(type){
        console.log(type)
        setOpenModal(prev => !prev)
    }

    function ModalContent(){
        return (
            <AccountDropdown />
        // <div>
        //     <h1>Modal</h1>
        //     <button onClick={() => toggleModal()}>X</button>
        // </div>
        )
    }
    function Modal(){
        return createPortal(openModal && <ModalContent />, document.getElementById('modal'))
    }
    return { toggleModal, Modal }
}

export default useModal
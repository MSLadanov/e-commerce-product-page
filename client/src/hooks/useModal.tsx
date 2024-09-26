import { useState } from "react"
import { createPortal } from "react-dom"
import { AccountDropdown } from "../components/MobileDropdown/AccountDropdown"
import { CartDropdown } from "../components/Dropdown/CartDropdown"
import { MobileDropdown } from "../components/MobileDropdown/MobileDropdown"
import { MobileCartDropdown } from "../components/MobileDropdown/MobileCartDropdown"

function useModal(){
    const [ openModal, setOpenModal ] = useState(false)
    const [ modalType, setModalType ] = useState('')
    function toggleModal(type : string){
        setModalType(type)
        setOpenModal(prev => !prev)
    }

    function ModalContent(){
        switch (modalType) {
            case 'account':
                return <AccountDropdown />
            case 'cart':
                return <CartDropdown openCartDropdown={true} /> 
            default:
                break;
        }
        return (
            <AccountDropdown />
        // <div>
        //     <h1>Modal</h1>
        //     <button onClick={() => toggleModal()}>X</button>
        // </div>
        )
    }
    function Modal(){
        return createPortal(openModal && <ModalContent />, document.getElementById('modal')!)
    }
    return { toggleModal, Modal }
}

export default useModal
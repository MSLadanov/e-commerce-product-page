import { useState, useRef } from "react"
import { createPortal } from "react-dom"
import { useClickOutside } from "./useClickOutside"
import { Dropdown } from "../components/Dropdown/Dropdown"
import { CartDropdown } from "../components/Dropdown/CartDropdown"
import { MobileDropdown } from "../components/MobileDropdown/MobileDropdown"
import { MobileCartDropdown } from "../components/MobileDropdown/MobileCartDropdown"

function useModal(){
    const modalRef = useRef(null)
    const [ openModal, setOpenModal ] = useState(false)
    const [ modalType, setModalType ] = useState('')
    function toggleModal(){
        setOpenModal(prev => !prev)
    }
    function handleModalType(type : string){
        console.log(type)
        setModalType(type)
    }
    useClickOutside(modalRef, toggleModal)
    function ModalContent(){
        switch (modalType) {
            case 'account':
                return <Dropdown />
            case 'cart':
                return <CartDropdown /> 
            default:
                break;
        }
        return (
        <div ref={modalRef}>
            <Dropdown />
        </div>
        )
    }
    function Modal(){
        return createPortal(openModal && <ModalContent />, document.getElementById('modal')!)
    }
    return { toggleModal, handleModalType,  Modal }
}

export default useModal
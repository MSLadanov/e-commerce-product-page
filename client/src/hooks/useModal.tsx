import { useState, useEffect, useRef } from "react"
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
        !openModal && setOpenModal(true) 
        console.log(modalType)
    }
    function handleOutSideClick(e: any){
        console.log(e)
        console.log('outside')
        // setOpenModal(false)
    }
    function handleModalType(type : string){
        console.log(type)
        setModalType(type)
    }
    useClickOutside(modalRef, handleOutSideClick)
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
    useEffect(() => {
        console.log(modalRef)
    }, [modalType])
    function Modal(){
        return createPortal(openModal && <ModalContent />, document.getElementById('modal')!)
    }
    return { toggleModal, handleModalType, handleOutSideClick,  Modal }
}

export default useModal
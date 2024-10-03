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
        console.log(modalRef, 'ref')
    }
    function handleOutSideClick(e: any){
        openModal && setOpenModal(false)
    }
    function handleModalType(type : string){
        setModalType(type)
    }
    useClickOutside(modalRef, handleOutSideClick)
    function ModalContent(){
        switch (modalType) {
            case 'account':
                return <div ref={modalRef}><Dropdown /></div>
            case 'cart':
                return <div ref={modalRef}><CartDropdown /></div>
            default:
                break;
        }
        return (
        <div>
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
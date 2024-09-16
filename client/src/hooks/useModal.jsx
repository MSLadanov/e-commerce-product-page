import { useState } from "react"
import { createPortal } from "react-dom"

function useModal(){
    const [ openModal, setOpenModal ] = useState(true)
    function toggleModal(){
        setOpenModal(prev => !prev)
    }

    function ModalContent(){
        return (
        <div>
            <h1>Modal</h1>
            <button onClick={() => toggleModal()}>X</button>
        </div>
        )
    }
    function Modal(){
        return createPortal(openModal && <ModalContent />, document.getElementById('modal'))
    }
    return { toggleModal, Modal}
}

export default useModal
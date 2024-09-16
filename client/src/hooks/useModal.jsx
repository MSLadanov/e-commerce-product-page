import { useState } from "react"
import { createPortal } from "react-dom"

function useModal(){
    const [ openModal, setOpenModal ] = useState(true)
    function toggleModal(){

    }

    function Modal(){
        if (openModal){
            return createPortal(<div>Modal</div>, document.getElementById('modal'))
    }}
    return { toggleModal, Modal}
}

export default useModal
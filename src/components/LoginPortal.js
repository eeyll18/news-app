import React, { useState } from 'react'
import {createPortal} from 'react-dom';
import Modal from './Modal';

export default function LoginPortal() {
    const [showModal,setShowModal] = useState(false);
  return (
    <>
      <button onClick={()=>setShowModal(true)}>favorite button</button>
      {showModal && createPortal(
        <Modal onClose={()=>setShowModal(false)}/>
      )}
    </>
  )
}

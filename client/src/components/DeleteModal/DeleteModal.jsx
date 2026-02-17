
import { Button, Modal } from 'react-bootstrap';
import './deleteModal.css'


export const DeleteModal = ({setShowDeleteModal, deleteProfile}) => {


  return (
    <div
      className="modal show"
      style={{ display: 'block', position: 'initial' }}
    >
      <Modal.Dialog>
        <Modal.Header className='background'>
          <Modal.Title>¿Estás seguro?</Modal.Title>
        </Modal.Header>

        <Modal.Body className='background'>
          <p>¿Seguro que deseas eliminar su cuenta?</p>
        </Modal.Body>

        <Modal.Footer className='background'>
          <Button 
            className='my-btn'
            onClick={()=>setShowDeleteModal(false)}>Cancelar</Button>
          <Button 
            className='my-btn'
            onClick={deleteProfile}>Aceptar</Button>
        </Modal.Footer>
      </Modal.Dialog>
    </div>
  );
};

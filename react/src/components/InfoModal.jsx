import Modal from './Modal.jsx'

function InfoModal({ info, onClose }) {
  return (
    <Modal
      open={Boolean(info)}
      onClose={onClose}
      title={info?.title ?? ''}
      subtitle={info?.subtitle ?? ''}
      size="small"
    >
      <div className="modal-body info-body">
        {(info?.lines ?? []).map((line) => (
          <p key={line}>{line}</p>
        ))}
        {info?.action && (
          <button className="modal-primary" type="button" onClick={info.action.onClick}>
            {info.action.label}
          </button>
        )}
      </div>
    </Modal>
  )
}

export default InfoModal

export function ConfirmDialog({ isOpen, onCancel, onConfirm }) {
  if (!isOpen) {
    return null
  }

  return (
    <div className="modal fade show" style={{ display: 'block' }}>
      <div className="modal-dialog">
        <div
          className="modal-content"
          style={{ background: '#223840', color: '#fff' }}
        >
          <div className="modal-header">
            <h5 className="modal-title">Confirmação</h5>
            <button
              type="button"
              className="close"
              onClick={onCancel}
              style={{ color: '#fff' }}
            >
              <span>&times;</span>
            </button>
          </div>
          <div className="modal-body">
            <p>Você realmente deseja deletar este cartão?</p>
          </div>
          <div className="modal-footer">
            <button
              type="button"
              className="btn btn-secondary"
              onClick={onCancel}
            >
              Cancelar
            </button>
            <button
              type="button"
              className="btn btn-danger"
              onClick={onConfirm}
            >
              Confirmar
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}

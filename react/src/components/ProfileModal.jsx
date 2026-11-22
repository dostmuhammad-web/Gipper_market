import { LogOut, Mail, MapPin, Package, Phone, UserRound } from 'lucide-react'
import Modal from './Modal.jsx'
import { formatPrice } from '../data/products.js'

function ProfileModal({ open, onClose, profile, orders, onLogout, onEditAddress }) {
  const spent = orders.reduce((sum, order) => sum + order.total, 0)

  return (
    <Modal open={open} onClose={onClose} title="Mening hisobim" subtitle="Shaxsiy ma’lumotlaringiz" size="small">
      <div className="modal-body">
        <div className="profile-card">
          <span className="profile-avatar"><UserRound size={28} /></span>
          <div>
            <strong>{profile.name}</strong>
            <span>Tizimga kiritilgan</span>
          </div>
        </div>

        <div className="profile-stats">
          <div><strong>{orders.length}</strong><span>buyurtma</span></div>
          <div><strong>{formatPrice(spent)}</strong><span>jami sarflangan</span></div>
        </div>

        <div className="profile-list">
          <div><Phone size={16} /><span>{profile.phone}</span></div>
          <div><Mail size={16} /><span>{profile.email}</span></div>
          <div><MapPin size={16} /><span>{profile.address}</span></div>
        </div>

        {orders.length > 0 && (
          <div className="profile-orders">
            <h4><Package size={16} /> Oxirgi buyurtmalar</h4>
            {orders.slice(0, 3).map((order) => (
              <div className="profile-order" key={order.id}>
                <span>#{order.id}</span>
                <span>{order.items} ta mahsulot</span>
                <strong>{formatPrice(order.total)}</strong>
              </div>
            ))}
          </div>
        )}

        <div className="profile-actions">
          <button className="modal-secondary" type="button" onClick={onEditAddress}>Manzilni tahrirlash</button>
          <button className="modal-danger" type="button" onClick={onLogout}><LogOut size={16} /> Chiqish</button>
        </div>
      </div>
    </Modal>
  )
}

export default ProfileModal

import { useEffect, useState } from 'react'
import { MapPin, Save } from 'lucide-react'
import Modal from './Modal.jsx'

function AddressModal({ open, onClose, onSave, profile }) {
  const [form, setForm] = useState({ city: '', district: '', street: '', phone: profile.phone })

  useEffect(() => {
    if (!open) return
    const parts = profile.address.split(',')
    setForm({
      city: (parts[0] ?? '').trim(),
      district: (parts[1] ?? '').trim(),
      street: (parts[2] ?? '').trim(),
      phone: profile.phone,
    })
  }, [open, profile])

  const update = (field) => (event) => setForm((current) => ({ ...current, [field]: event.target.value }))

  const submit = (event) => {
    event.preventDefault()
    const address = [form.city, form.district, form.street].filter(Boolean).join(', ')
    onSave({ address, phone: form.phone })
  }

  return (
    <Modal
      open={open}
      onClose={onClose}
      title="Yetkazib berish manzili"
      subtitle="Buyurtmangizni mana shu manzilga yetkazamiz"
      size="small"
    >
      <form className="modal-body modal-form" onSubmit={submit}>
        <label>
          Shahar
          <input value={form.city} onChange={update('city')} placeholder="Namangan shahari" required />
        </label>
        <label>
          Tuman
          <input value={form.district} onChange={update('district')} placeholder="Uchqurgon tumani" required />
        </label>
        <label>
          Qishloq / ko‘cha / uy
          <input value={form.street} onChange={update('street')} placeholder="Elatan qishlog'i" required />
        </label>
        <label>
          Telefon raqami
          <input value={form.phone} onChange={update('phone')} placeholder="+998 33 267 12 11" required />
        </label>
        <p className="form-hint with-icon"><MapPin size={14} /> Manzil o‘zgarishi saqlanadi.</p>
        <button className="modal-primary" type="submit">
          <Save size={17} /> Manzilni saqlash
        </button>
      </form>
    </Modal>
  )
}

export default AddressModal

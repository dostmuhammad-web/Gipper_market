import { useEffect, useState } from 'react'
import { ArrowRight, KeyRound, ShieldCheck, Smartphone } from 'lucide-react'
import Modal from './Modal.jsx'

function LoginModal({ open, onClose, onLogin, profile }) {
  const [step, setStep] = useState('phone')
  const [identifier, setIdentifier] = useState(profile.phone)
  const [code, setCode] = useState('')
  const [sentCode, setSentCode] = useState('')
  const [error, setError] = useState('')

  useEffect(() => {
    if (!open) return
    setStep('phone')
    setIdentifier(profile.phone)
    setCode('')
    setSentCode('')
    setError('')
  }, [open, profile.phone])

  const sendCode = (event) => {
    event.preventDefault()
    if (identifier.trim().length < 5) {
      setError('Telefon raqami yoki elektron pochtani to‘g‘ri kiriting.')
      return
    }
    setSentCode(String(Math.floor(1000 + Math.random() * 9000)))
    setStep('code')
    setError('')
  }

  const confirmCode = (event) => {
    event.preventDefault()
    if (code !== sentCode) {
      setError('Kod noto‘g‘ri. Qaytadan tekshirib ko‘ring.')
      return
    }
    onLogin()
  }

  return (
    <Modal
      open={open}
      onClose={onClose}
      title="Hisobga kirish"
      subtitle="Buyurtmalaringiz va sevimlilaringiz bir joyda saqlanadi"
      size="small"
    >
      <div className="modal-body">
        <div className="login-illustration">
          <span><ShieldCheck size={30} /></span>
          <p>Xavfsiz kirish · SMS tasdiqlash</p>
        </div>

        {step === 'phone' ? (
          <form onSubmit={sendCode} className="modal-form">
            <label>
              Telefon yoki elektron pochta
              <span className="input-with-icon">
                <Smartphone size={17} />
                <input
                  type="text"
                  value={identifier}
                  onChange={(event) => setIdentifier(event.target.value)}
                  placeholder="+998 99 123 45 67"
                  autoFocus
                />
              </span>
            </label>
            <p className="form-hint">Demo hisob ma’lumotlari allaqachon kiritilgan.</p>
            {error && <p className="form-error">{error}</p>}
            <button className="modal-primary" type="submit">
              Kod olish <ArrowRight size={18} />
            </button>
          </form>
        ) : (
          <form onSubmit={confirmCode} className="modal-form">
            <p className="code-sent">
              <span>{identifier}</span> raqamiga yuborilgan 4 xonali kodni kiriting.
            </p>
            <div className="demo-code">Demo tasdiqlash kodi: <strong>{sentCode}</strong></div>
            <label>
              Tasdiqlash kodi
              <span className="input-with-icon">
                <KeyRound size={17} />
                <input
                  type="text"
                  inputMode="numeric"
                  maxLength={4}
                  value={code}
                  onChange={(event) => setCode(event.target.value.replace(/\D/g, ''))}
                  placeholder="0000"
                  autoFocus
                />
              </span>
            </label>
            {error && <p className="form-error">{error}</p>}
            <button className="modal-primary" type="submit">
              Tasdiqlash <ArrowRight size={18} />
            </button>
            <button className="modal-secondary" type="button" onClick={() => setStep('phone')}>
              Ma’lumotlarni o‘zgartirish
            </button>
          </form>
        )}
      </div>
    </Modal>
  )
}

export default LoginModal

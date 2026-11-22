import { Clock3, Facebook, Instagram, Mail, MapPin, Phone, Send } from 'lucide-react'

const columns = [
  {
    title: 'Bozor haqida',
    links: [
      { id: 'about', label: 'Biz haqimizda' },
      { id: 'new', label: 'Yangi mahsulotlar' },
      { id: 'sales', label: 'Aksiyalar' },
      { id: 'partners', label: 'Hamkorlik' },
    ],
  },
  {
    title: 'Mijozlarga',
    links: [
      { id: 'delivery', label: 'Yetkazib berish' },
      { id: 'payment', label: 'To‘lov usullari' },
      { id: 'returns', label: 'Qaytarish shartlari' },
      { id: 'help', label: 'Tez-tez so‘raladi' },
    ],
  },
  {
    title: 'Kategoriyalar',
    links: [
      { id: 'cat-meva', label: 'Meva va sabzavot' },
      { id: 'cat-sut', label: 'Sut mahsulotlari' },
      { id: 'cat-ichimlik', label: 'Ichimliklar' },
      { id: 'cat-uy', label: "Uy-ro'zg'or" },
    ],
  },
]

function Footer({ onInfo, onAddress, onHelp }) {
  return (
    <footer className="site-footer">
      <div className="container footer-top">
        <div className="footer-brand">
          <a className="brand" href="#top">
            <span className="brand-mark">B</span>
            <span className="brand-text">bozor<span>.market</span></span>
          </a>
          <p>Kundalik ehtiyojlaringiz uchun ishonchli onlayn bozor. Sifatli mahsulot, adolatli narx va o‘z vaqtida yetkazib berish.</p>
          <div className="socials">
            <button type="button" onClick={onHelp} aria-label="Facebook"><Facebook size={16} /></button>
            <button type="button" onClick={onHelp} aria-label="Instagram"><Instagram size={16} /></button>
            <button type="button" onClick={onHelp} aria-label="Telegram"><Send size={16} /></button>
          </div>
        </div>

        {columns.map((column) => (
          <div className="footer-column" key={column.title}>
            <h4>{column.title}</h4>
            {column.links.map((link) => (
              <button type="button" key={link.id} onClick={() => onInfo(link.id)}>{link.label}</button>
            ))}
          </div>
        ))}

        <div className="footer-column">
          <h4>Bog‘lanish</h4>
          <a href="tel:1006"><Phone size={14} /> 1006</a>
          <a href="mailto:dostmuhammad_dev@gmail.com"><Mail size={14} /> dostmuhammad_dev@gmail.com</a>
          <button type="button" onClick={onAddress}><MapPin size={14} /> Namangan, Uchqurgon</button>
          <span><Clock3 size={14} /> Har kuni 08:00 – 23:00</span>
        </div>
      </div>
      <div className="container footer-bottom">
        <span>© 2026 Bozor Market. Barcha huquqlar himoyalangan.</span>
        <span>Namangan, O‘zbekiston</span>
      </div>
    </footer>
  )
}

export default Footer

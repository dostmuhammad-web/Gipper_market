import { ArrowRight, Clock3, Star, Truck } from 'lucide-react'

function Hero({ onShopClick }) {
  return (
    <section className="hero container" aria-label="Reklama bannerlari">
      <div className="hero-main">
        <div className="hero-content">
          <span className="hero-eyebrow">Bozor Market · Har kuni yangi mahsulotlar</span>
          <h1>
            Bozordagi yangiliklar <em>uingizgacha</em>
          </h1>
          <p>
            Yangi meva-sabzavot, sut mahsulotlari va kundalik ehtiyojlaringizni
            bir joydan buyurtma bering — sifatli, arzon va o‘z vaqtida yetkaziladi.
          </p>
          <div className="hero-actions">
            <button className="hero-cta" type="button" onClick={onShopClick}>
              Xarid qilishni boshlash <ArrowRight size={18} />
            </button>
            <span className="hero-rating"><Star size={15} fill="currentColor" /> 4.9 · 2 400+ mijoz</span>
          </div>
        </div>
        <div className="hero-badge"><Truck size={18} /> Bugun yetkazib berish</div>
      </div>

      <div className="hero-side">
        <button className="side-banner side-sale" type="button" onClick={onShopClick}>
          <span className="side-tag">Aksiya haftasi</span>
          <strong>50% gacha<small>tanlangan mahsulotlarga chegirma</small></strong>
          <span className="side-link">Ko‘rish <ArrowRight size={15} /></span>
        </button>
        <button className="side-banner side-fast" type="button" onClick={onShopClick}>
          <span className="side-tag"><Clock3 size={14} /> Tez yetkazib berish</span>
          <strong>60 daqiqa<small>ichida uyingizda</small></strong>
          <span className="side-link">Buyurtma berish <ArrowRight size={15} /></span>
        </button>
      </div>
    </section>
  )
}

export default Hero

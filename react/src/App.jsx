import { useEffect, useMemo, useState } from 'react'
import { BadgePercent, ChevronRight, Headphones, Leaf, PackageCheck, SearchX, Truck } from 'lucide-react'
import AddressModal from './components/AddressModal.jsx'
import CartDrawer from './components/CartDrawer.jsx'
import Footer from './components/Footer.jsx'
import Header from './components/Header.jsx'
import Hero from './components/Hero.jsx'
import InfoModal from './components/InfoModal.jsx'
import LoginModal from './components/LoginModal.jsx'
import ProductCard from './components/ProductCard.jsx'
import ProfileModal from './components/ProfileModal.jsx'
import { categories, demoProfile, products } from './data/products.js'
import { loadStorage, saveStorage } from './utils/storage.js'

const benefits = [
  { icon: Truck, title: 'Tez yetkazib berish', text: 'Buyurtma 60 daqiqada yetadi' },
  { icon: Leaf, title: 'Yangi va sifatli', text: 'Har kuni yangi mahsulotlar' },
  { icon: BadgePercent, title: 'Adolatli narxlar', text: 'Kundalik chegirmalar' },
  { icon: Headphones, title: 'Doimiy yordam', text: 'Har kuni 08:00 – 23:00' },
]

const infoContent = {
  about: {
    title: 'Bozor Market haqida',
    subtitle: 'Mahalliy onlayn bozor',
    lines: [
      'Bozor Market — kundalik oziq-ovqat va uy ehtiyojlarini bir joydan buyurtma qilish imkonini beruvchi xizmat.',
      'Biz Namangan shahrida faoliyat yuritamiz va buyurtmalarni shahar bo‘yicha 60 daqiqa ichida yetkazib beramiz.',
    ],
  },
  new: {
    title: 'Yangi mahsulotlar',
    subtitle: 'Doimiy yangilanib turadi',
    lines: [
      'Katalogimizga har hafta yangi mahsulotlar qo‘shiladi. “Yangi” belgisi bilan ularni osongina topasiz.',
    ],
  },
  sales: {
    title: 'Aksiyalar va chegirmalar',
    subtitle: 'Foydali takliflar',
    lines: [
      'Aksiya haftasida tanlangan mahsulotlarga 50% gacha chegirma qo‘llaniladi.',
      'Birinchi buyurtmangiz uchun BOZOR20 promokodidan foydalaning — 20% chegirma.',
    ],
  },
  partners: {
    title: 'Hamkorlik',
    subtitle: 'Biz bilan ishlash',
    lines: [
      'Mahsulot yetkazib beruvchilar va do‘konlar uchun hamkorlik dasturimiz mavjud.',
      'Bog‘lanish: +998 33 267 12 11 · dostmuhammad_dev@gmail.com',
    ],
  },
  delivery: {
    title: 'Yetkazib berish shartlari',
    subtitle: 'Namangan shahri bo‘yicha',
    lines: [
      'Buyurtmalar har kuni 08:00 dan 23:00 gacha qabul qilinadi va 60 daqiqa ichida yetkaziladi.',
      '200 000 so‘mdan boshlab yetkazib berish bepul. Undan past summalarda 15 000 so‘m to‘lov qo‘llaniladi.',
    ],
  },
  payment: {
    title: 'To‘lov usullari',
    subtitle: 'Qulay to‘lov',
    lines: [
      'Yetkazib berish vaqtida naqd pul yoki karta orqali to‘lov qilishingiz mumkin.',
      'Onlayn karta orqali oldindan to‘lov ham mavjud.',
    ],
  },
  returns: {
    title: 'Qaytarish shartlari',
    subtitle: 'Siz uchun qulay',
    lines: [
      'Sifatiga e’tiroz bildirgan mahsulotni yetkazib berish vaqtida qaytarishingiz mumkin.',
      'Oziq-ovqat mahsulotlari ochilgandan keyin qaytarilmaydi.',
    ],
  },
  help: {
    title: 'Yordam markazi',
    subtitle: 'Har kuni 08:00 – 23:00',
    lines: [
      'Telefon: 1006 · +998 33 267 12 11',
      'Elektron pochta: dostmuhammad_dev@gmail.com',
      'Manzil: Namangan shahari, Uchqurgon tumani, Elatan qishlog‘i',
    ],
  },
}

function App() {
  const [cart, setCart] = useState(() => loadStorage('bozor.cart', {}))
  const [favorites, setFavorites] = useState(() => loadStorage('bozor.favorites', []))
  const [profile, setProfile] = useState(() => loadStorage('bozor.profile', demoProfile))
  const [loggedIn, setLoggedIn] = useState(() => loadStorage('bozor.loggedIn', false))
  const [orders, setOrders] = useState(() => loadStorage('bozor.orders', []))

  const [search, setSearch] = useState('')
  const [category, setCategory] = useState('all')
  const [sort, setSort] = useState('popular')
  const [showFavorites, setShowFavorites] = useState(false)
  const [cartOpen, setCartOpen] = useState(false)
  const [loginOpen, setLoginOpen] = useState(false)
  const [addressOpen, setAddressOpen] = useState(false)
  const [profileOpen, setProfileOpen] = useState(false)
  const [catalogOpen, setCatalogOpen] = useState(false)
  const [info, setInfo] = useState(null)
  const [orderSuccess, setOrderSuccess] = useState(null)
  const [pendingCheckout, setPendingCheckout] = useState(false)

  const [promoInput, setPromoInput] = useState('')
  const [promoApplied, setPromoApplied] = useState(false)
  const [promoMessage, setPromoMessage] = useState('')
  const [newsletterEmail, setNewsletterEmail] = useState('')
  const [toast, setToast] = useState('')

  useEffect(() => saveStorage('bozor.cart', cart), [cart])
  useEffect(() => saveStorage('bozor.favorites', favorites), [favorites])
  useEffect(() => saveStorage('bozor.profile', profile), [profile])
  useEffect(() => saveStorage('bozor.loggedIn', loggedIn), [loggedIn])
  useEffect(() => saveStorage('bozor.orders', orders), [orders])

  useEffect(() => {
    if (!toast) return undefined
    const timer = window.setTimeout(() => setToast(''), 2600)
    return () => window.clearTimeout(timer)
  }, [toast])

  useEffect(() => {
    const locked = cartOpen || loginOpen || addressOpen || profileOpen || Boolean(info)
    document.body.style.overflow = locked ? 'hidden' : ''
    return () => {
      document.body.style.overflow = ''
    }
  }, [cartOpen, loginOpen, addressOpen, profileOpen, info])

  const addToCart = (id) => {
    setCart((current) => ({ ...current, [id]: (current[id] ?? 0) + 1 }))
    const product = products.find((item) => item.id === id)
    setToast(`${product?.name ?? 'Mahsulot'} savatga qo‘shildi`)
  }

  const decreaseFromCart = (id) => {
    setCart((current) => {
      const next = { ...current }
      if (!next[id]) return next
      if (next[id] === 1) delete next[id]
      else next[id] -= 1
      return next
    })
  }

  const removeFromCart = (id) => {
    setCart((current) => {
      const next = { ...current }
      delete next[id]
      return next
    })
  }

  const toggleFavorite = (id) => {
    setFavorites((current) =>
      current.includes(id) ? current.filter((item) => item !== id) : [...current, id],
    )
  }

  const scrollToProducts = () => {
    document.getElementById('products')?.scrollIntoView({ behavior: 'smooth', block: 'start' })
  }

  const selectCategory = (id) => {
    setCategory(id)
    setShowFavorites(false)
    setCatalogOpen(false)
    setInfo(null)
    scrollToProducts()
  }

  const handleAccountClick = () => {
    if (loggedIn) setProfileOpen(true)
    else setLoginOpen(true)
  }

  const handleLogin = () => {
    setLoggedIn(true)
    setLoginOpen(false)
    setToast(`Xush kelibsiz, ${profile.name}!`)
    if (pendingCheckout) {
      setPendingCheckout(false)
      window.setTimeout(() => setCartOpen(true), 200)
    }
  }

  const handleLogout = () => {
    setLoggedIn(false)
    setProfileOpen(false)
    setToast('Hisobdan chiqdingiz')
  }

  const handleAddressSave = ({ address, phone }) => {
    setProfile((current) => ({ ...current, address, phone }))
    setAddressOpen(false)
    setToast('Manzil saqlandi')
  }

  const applyPromo = (event) => {
    event.preventDefault()
    if (promoInput.trim().toUpperCase() === 'BOZOR20') {
      setPromoApplied(true)
      setPromoMessage('Promokod qo‘llandi: 20% chegirma')
    } else {
      setPromoApplied(false)
      setPromoMessage('Bunday promokod topilmadi. BOZOR20 ni sinab ko‘ring.')
    }
  }

  const handleCheckout = () => {
    if (!loggedIn) {
      setPendingCheckout(true)
      setCartOpen(false)
      setLoginOpen(true)
      setToast('Buyurtma berish uchun hisobga kiring')
      return
    }
    const subtotalNow = cartItems.reduce((sum, item) => sum + item.product.price * item.quantity, 0)
    const discountNow = promoApplied ? Math.round(subtotalNow * 0.2) : 0
    const deliveryNow = subtotalNow - discountNow >= 200000 ? 0 : 15000
    const order = {
      id: String(Date.now()).slice(-6),
      date: new Intl.DateTimeFormat('uz-UZ', { day: 'numeric', month: 'short', hour: '2-digit', minute: '2-digit' }).format(new Date()),
      items: cartCount,
      total: subtotalNow - discountNow + deliveryNow,
      address: profile.address,
    }
    setOrders((current) => [order, ...current])
    setOrderSuccess(order)
    setCart({})
    setPromoApplied(false)
    setPromoInput('')
    setPromoMessage('')
    setToast('Buyurtmangiz qabul qilindi')
  }

  const handleInfo = (id) => {
    if (id.startsWith('cat-')) {
      selectCategory(id.slice(4))
      return
    }
    const content = infoContent[id] ?? infoContent.help
    setInfo({
      ...content,
      action: id === 'sales' ? { label: 'Promokodni olish', onClick: takePromo } : undefined,
    })
  }

  const takePromo = () => {
    setPromoInput('BOZOR20')
    setInfo(null)
    setCartOpen(true)
    setToast('BOZOR20 promokodi kiritildi')
  }

  const visibleProducts = useMemo(() => {
    const query = search.trim().toLowerCase()
    const filtered = products.filter((product) => {
      const matchesSearch = !query || product.name.toLowerCase().includes(query)
      const matchesCategory = category === 'all' || product.category === category
      const matchesFavorite = !showFavorites || favorites.includes(product.id)
      return matchesSearch && matchesCategory && matchesFavorite
    })
    return [...filtered].sort((a, b) => {
      if (sort === 'cheap') return a.price - b.price
      if (sort === 'expensive') return b.price - a.price
      if (sort === 'rating') return b.rating - a.rating
      return a.id - b.id
    })
  }, [search, category, showFavorites, favorites, sort])

  const cartItems = useMemo(
    () =>
      Object.entries(cart)
        .map(([id, quantity]) => ({
          product: products.find((item) => item.id === Number(id)),
          quantity,
        }))
        .filter((item) => item.product),
    [cart],
  )

  const cartCount = cartItems.reduce((sum, item) => sum + item.quantity, 0)
  const subtotal = cartItems.reduce((sum, item) => sum + item.product.price * item.quantity, 0)
  const discount = promoApplied ? Math.round(subtotal * 0.2) : 0
  const delivery = subtotal - discount >= 200000 || subtotal === 0 ? 0 : 15000
  const total = subtotal - discount + delivery

  return (
    <div className="app" id="top">
      <Header
        cartCount={cartCount}
        favoriteCount={favorites.length}
        onCartOpen={() => { setOrderSuccess(null); setCartOpen(true) }}
        onFavoritesClick={() => { setShowFavorites((current) => !current); scrollToProducts() }}
        showFavorites={showFavorites}
        search={search}
        onSearchChange={setSearch}
        user={loggedIn ? profile : null}
        onAccountClick={handleAccountClick}
        address={profile.address}
        onAddressClick={() => setAddressOpen(true)}
        onHelpClick={() => handleInfo('help')}
        catalogOpen={catalogOpen}
        onCatalogToggle={() => setCatalogOpen((current) => !current)}
        onCategorySelect={selectCategory}
      />

      <main>
        <Hero onShopClick={scrollToProducts} />

        <section className="container benefits" aria-label="Xizmatlarimiz">
          {benefits.map((benefit) => (
            <div className="benefit" key={benefit.title}>
              <span className="benefit-icon"><benefit.icon size={21} /></span>
              <div>
                <strong>{benefit.title}</strong>
                <p>{benefit.text}</p>
              </div>
            </div>
          ))}
        </section>

        <section className="container categories-section" aria-label="Kategoriyalar">
          <div className="section-heading">
            <h2>Kategoriyalar</h2>
            <button type="button" onClick={() => selectCategory('all')}>
              Hammasini ko‘rish <ChevronRight size={16} />
            </button>
          </div>
          <div className="category-list">
            {categories.map((item) => (
              <button
                className={`category-card${category === item.id ? ' is-selected' : ''}`}
                type="button"
                key={item.id}
                onClick={() => selectCategory(item.id)}
              >
                <span className="category-image"><img src={item.image} alt="" loading="lazy" /></span>
                <span>{item.name}</span>
              </button>
            ))}
          </div>
        </section>

        <section className="container products-section" id="products">
          <div className="section-heading products-heading">
            <div>
              <h2>
                {showFavorites
                  ? 'Sevimli mahsulotlaringiz'
                  : search
                    ? `“${search}” uchun natijalar`
                    : 'Eng ko‘p sotiladigan mahsulotlar'}
              </h2>
              <p>{visibleProducts.length} ta mahsulot topildi</p>
            </div>
            <label className="sort-select">
              <span>Saralash:</span>
              <select value={sort} onChange={(event) => setSort(event.target.value)}>
                <option value="popular">Eng mashhur</option>
                <option value="cheap">Arzonidan</option>
                <option value="expensive">Qimmatidan</option>
                <option value="rating">Reyting bo‘yicha</option>
              </select>
            </label>
          </div>

          {visibleProducts.length > 0 ? (
            <div className="product-grid">
              {visibleProducts.map((product) => (
                <ProductCard
                  key={product.id}
                  product={product}
                  quantity={cart[product.id] ?? 0}
                  isFavorite={favorites.includes(product.id)}
                  onAdd={addToCart}
                  onDecrease={decreaseFromCart}
                  onToggleFavorite={toggleFavorite}
                />
              ))}
            </div>
          ) : (
            <div className="empty-state">
              <SearchX size={42} strokeWidth={1.5} />
              <h3>Hech narsa topilmadi</h3>
              <p>Boshqa mahsulot nomi yoki kategoriyani sinab ko‘ring.</p>
              <button className="primary-button" type="button" onClick={() => { setSearch(''); setCategory('all'); setShowFavorites(false) }}>
                Filtrlarni tozalash
              </button>
            </div>
          )}
        </section>

        <section className="container promo-banner">
          <div className="promo-content">
            <span className="promo-tag"><PackageCheck size={14} /> Faqat bugun</span>
            <h2>Birinchi buyurtmangizga <em>20% chegirma</em></h2>
            <p>BOZOR20 promokodini qo‘llang va birinchi xaridingizdan foyda oling.</p>
            <button type="button" onClick={takePromo}>Promokodni olish <ChevronRight size={16} /></button>
          </div>
        </section>

        <section className="container newsletter">
          <div>
            <h2>Yangiliklardan xabardor bo‘ling</h2>
            <p>Aksiyalar va yangi mahsulotlar haqida birinchi bo‘lib bilib oling.</p>
          </div>
          <form
            className="newsletter-form"
            onSubmit={(event) => {
              event.preventDefault()
              saveStorage('bozor.subscriber', newsletterEmail)
              setToast('Obunangiz tasdiqlandi!')
              setNewsletterEmail('')
            }}
          >
            <input
              type="email"
              placeholder="Elektron pochta manzilingiz"
              aria-label="Elektron pochta"
              value={newsletterEmail}
              onChange={(event) => setNewsletterEmail(event.target.value)}
              required
            />
            <button type="submit">Obuna bo‘lish</button>
          </form>
        </section>
      </main>

      <Footer
        onInfo={handleInfo}
        onAddress={() => setAddressOpen(true)}
        onHelp={() => handleInfo('help')}
      />

      <CartDrawer
        open={cartOpen}
        onClose={() => setCartOpen(false)}
        items={cartItems}
        onIncrease={addToCart}
        onDecrease={decreaseFromCart}
        onRemove={removeFromCart}
        onClear={() => setCart({})}
        promoInput={promoInput}
        onPromoInput={setPromoInput}
        onApplyPromo={applyPromo}
        promoApplied={promoApplied}
        promoMessage={promoMessage}
        subtotal={subtotal}
        discount={discount}
        delivery={delivery}
        total={total}
        onCheckout={handleCheckout}
        orderSuccess={orderSuccess}
      />

      <LoginModal
        open={loginOpen}
        onClose={() => { setLoginOpen(false); setPendingCheckout(false) }}
        onLogin={handleLogin}
        profile={profile}
      />
      <AddressModal
        open={addressOpen}
        onClose={() => setAddressOpen(false)}
        onSave={handleAddressSave}
        profile={profile}
      />
      <ProfileModal
        open={profileOpen}
        onClose={() => setProfileOpen(false)}
        profile={profile}
        orders={orders}
        onLogout={handleLogout}
        onEditAddress={() => { setProfileOpen(false); setAddressOpen(true) }}
      />
      <InfoModal info={info} onClose={() => setInfo(null)} />

      {toast && <div className="toast" role="status">{toast}</div>}
    </div>
  )
}

export default App

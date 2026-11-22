import { ChevronDown, Heart, MapPin, Menu, Phone, Search, ShoppingBasket, ShoppingCart, UserRound, X } from 'lucide-react'
import { categories } from '../data/products.js'

function Header({
  cartCount,
  favoriteCount,
  onCartOpen,
  onFavoritesClick,
  showFavorites,
  search,
  onSearchChange,
  user,
  onAccountClick,
  address,
  onAddressClick,
  onHelpClick,
  catalogOpen,
  onCatalogToggle,
  onCategorySelect,
}) {
  return (
    <header className="site-header">
      <div className="announcement">
        <div className="container announcement-inner">
          <span>200 000 so‘mdan boshlab bepul yetkazib berish · Har kuni 08:00–23:00</span>
          <button type="button" onClick={onHelpClick}>Yordam markazi · 1006</button>
        </div>
      </div>

      <div className="container header-main">
        <a className="brand" href="#top" aria-label="Bozor Market bosh sahifasi">
          <span className="brand-mark"><ShoppingBasket size={24} strokeWidth={2.2} /></span>
          <span className="brand-text">bozor<span>.market</span></span>
        </a>

        <div className="catalog-wrap">
          <button className="catalog-button" type="button" onClick={onCatalogToggle} aria-expanded={catalogOpen}>
            <Menu size={18} strokeWidth={2.2} />
            Katalog
            <ChevronDown size={15} className={catalogOpen ? 'rotated' : ''} />
          </button>
          {catalogOpen && (
            <div className="catalog-menu">
              <p>Kategoriyalar</p>
              {categories.map((category) => (
                <button
                  type="button"
                  key={category.id}
                  onClick={() => onCategorySelect(category.id)}
                >
                  <img src={category.image} alt="" loading="lazy" />
                  <span>{category.name}</span>
                </button>
              ))}
            </div>
          )}
        </div>

        <label className="search-box">
          <Search size={19} className="search-icon" />
          <input
            type="search"
            placeholder="Mahsulot nomi bo‘yicha qidirish..."
            value={search}
            onChange={(event) => onSearchChange(event.target.value)}
            aria-label="Mahsulot qidirish"
          />
          {search && (
            <button
              className="search-clear"
              type="button"
              onClick={() => onSearchChange('')}
              aria-label="Qidiruvni tozalash"
            >
              <X size={15} />
            </button>
          )}
        </label>

        <div className="header-actions">
          <a className="header-action header-phone" href="tel:1006">
            <Phone size={18} />
            <span><small>Mijozlarga xizmat</small>1006</span>
          </a>

          <button
            className={`header-action${showFavorites ? ' is-active' : ''}`}
            type="button"
            onClick={onFavoritesClick}
            aria-label="Sevimlilar"
          >
            <span className="icon-wrap">
              <Heart size={21} fill={showFavorites ? 'currentColor' : 'none'} />
              {favoriteCount > 0 && <span className="badge-count">{favoriteCount}</span>}
            </span>
            <small>Sevimli</small>
          </button>

          <button className="header-action" type="button" onClick={onAccountClick} aria-label="Hisob">
            <span className="icon-wrap"><UserRound size={21} /></span>
            <small>{user ? user.name.split(' ')[0] : 'Kirish'}</small>
          </button>

          <button className="header-action cart-action" type="button" onClick={onCartOpen} aria-label="Savat">
            <span className="icon-wrap">
              <ShoppingCart size={21} />
              {cartCount > 0 && <span className="badge-count">{cartCount}</span>}
            </span>
            <small>Savat</small>
          </button>
        </div>
      </div>

      <div className="header-location">
        <div className="container location-inner">
          <span className="location-label"><MapPin size={14} /> Yetkazib berish manzili:</span>
          <button className="location-button" type="button" onClick={onAddressClick}>{address}</button>
          <span className="location-note">Bugun yetkazib beramiz</span>
        </div>
      </div>
    </header>
  )
}

export default Header

import { Heart, Minus, Plus, Star } from 'lucide-react'
import { formatPrice } from '../data/products.js'

function ProductCard({ product, quantity, isFavorite, onAdd, onDecrease, onToggleFavorite }) {
  return (
    <article className="product-card">
      <div className="product-image">
        <img src={product.image} alt={product.name} loading="lazy" />
        {product.badge && <span className="product-badge">{product.badge}</span>}
        <button
          className={`favorite-button${isFavorite ? ' is-favorite' : ''}`}
          type="button"
          onClick={() => onToggleFavorite(product.id)}
          aria-label={isFavorite ? 'Sevimlilardan olib tashlash' : 'Sevimlilarga qo‘shish'}
        >
          <Heart size={18} fill={isFavorite ? 'currentColor' : 'none'} />
        </button>
      </div>

      <div className="product-info">
        <div className="product-rating">
          <Star size={13} fill="currentColor" /> {product.rating}
          <span>· {product.unit}</span>
        </div>
        <h3 className="product-name">{product.name}</h3>

        <div className="product-bottom">
          <div className="product-prices">
            <strong>{formatPrice(product.price)}</strong>
            {product.oldPrice && <s>{formatPrice(product.oldPrice)}</s>}
          </div>

          {quantity > 0 ? (
            <div className="quantity-stepper">
              <button type="button" onClick={() => onDecrease(product.id)} aria-label="Kamaytirish">
                <Minus size={16} />
              </button>
              <span>{quantity}</span>
              <button type="button" onClick={() => onAdd(product.id)} aria-label="Ko‘paytirish">
                <Plus size={16} />
              </button>
            </div>
          ) : (
            <button className="add-button" type="button" onClick={() => onAdd(product.id)} aria-label="Savatga qo‘shish">
              <Plus size={17} /> Savatga
            </button>
          )}
        </div>
      </div>
    </article>
  )
}

export default ProductCard

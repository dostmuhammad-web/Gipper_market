import { ArrowRight, Check, Minus, Plus, ShoppingBasket, Tag, Trash2, X } from 'lucide-react'
import { formatPrice } from '../data/products.js'

function CartDrawer({
  open,
  onClose,
  items,
  onIncrease,
  onDecrease,
  onRemove,
  onClear,
  promoInput,
  onPromoInput,
  onApplyPromo,
  promoApplied,
  promoMessage,
  subtotal,
  discount,
  delivery,
  total,
  onCheckout,
  orderSuccess,
}) {
  const count = items.reduce((sum, item) => sum + item.quantity, 0)

  return (
    <div className={`drawer-root${open ? ' is-open' : ''}`} aria-hidden={!open}>
      <button className="drawer-overlay" type="button" onClick={onClose} aria-label="Savatni yopish" />
      <aside className="cart-drawer" role="dialog" aria-modal="true" aria-label="Xarid savati">
        <div className="drawer-header">
          <div>
            <h2>{orderSuccess ? 'Buyurtma tasdiqlandi' : 'Xarid savati'}</h2>
            <p>{orderSuccess ? `#${orderSuccess.id} · ${orderSuccess.date}` : `${count} ta mahsulot`}</p>
          </div>
          <button className="icon-button" type="button" onClick={onClose} aria-label="Yopish">
            <X size={21} />
          </button>
        </div>

        {orderSuccess ? (
          <div className="order-success">
            <span className="success-icon"><Check size={42} /></span>
            <h3>Rahmat, buyurtmangiz qabul qilindi!</h3>
            <p>Buyurtma raqami <strong>#{orderSuccess.id}</strong>. Yetkazib berish manzilingizga 60 daqiqa ichida yetib boradi.</p>
            <div className="success-summary">
              <span>Mahsulotlar</span><strong>{orderSuccess.items} ta</strong>
              <span>Jami</span><strong>{formatPrice(orderSuccess.total)}</strong>
              <span>Manzil</span><strong>{orderSuccess.address}</strong>
            </div>
            <button className="checkout-button" type="button" onClick={onClose}>Davom etish</button>
          </div>
        ) : items.length === 0 ? (
          <div className="cart-empty">
            <span className="cart-empty-icon"><ShoppingBasket size={42} strokeWidth={1.5} /></span>
            <h3>Savat hozircha bo‘sh</h3>
            <p>Katalogdan o‘zingizga yoqqan mahsulotlarni qo‘shing va buyurtma bering.</p>
            <button className="primary-button" type="button" onClick={onClose}>Xarid qilishni boshlash</button>
          </div>
        ) : (
          <>
            <div className="cart-items">
              {items.map(({ product, quantity }) => (
                <div className="cart-item" key={product.id}>
                  <img className="cart-item-image" src={product.image} alt={product.name} />
                  <div className="cart-item-details">
                    <h4>{product.name}</h4>
                    <span className="cart-item-unit">{product.unit}</span>
                    <strong>{formatPrice(product.price * quantity)}</strong>
                  </div>
                  <div className="cart-item-controls">
                    <button type="button" onClick={() => onRemove(product.id)} aria-label="O‘chirish">
                      <Trash2 size={16} />
                    </button>
                    <div className="quantity-stepper small">
                      <button type="button" onClick={() => onDecrease(product.id)} aria-label="Kamaytirish">
                        <Minus size={14} />
                      </button>
                      <span>{quantity}</span>
                      <button type="button" onClick={() => onIncrease(product.id)} aria-label="Ko‘paytirish">
                        <Plus size={14} />
                      </button>
                    </div>
                  </div>
                </div>
              ))}
              <button className="clear-cart" type="button" onClick={onClear}>
                <Trash2 size={14} /> Savatni tozalash
              </button>
            </div>

            <div className="cart-summary">
              <form className="promo-row" onSubmit={onApplyPromo}>
                <span className="input-with-icon">
                  <Tag size={16} />
                  <input
                    value={promoInput}
                    onChange={(event) => onPromoInput(event.target.value)}
                    placeholder="Promokod (BOZOR20)"
                    aria-label="Promokod"
                    disabled={promoApplied}
                  />
                </span>
                <button type="submit" disabled={promoApplied}>
                  {promoApplied ? <Check size={17} /> : 'Qo‘llash'}
                </button>
              </form>
              {promoMessage && <p className={`promo-message${promoApplied ? ' ok' : ''}`}>{promoMessage}</p>}

              <div className="summary-row"><span>Mahsulotlar ({count})</span><strong>{formatPrice(subtotal)}</strong></div>
              {discount > 0 && (
                <div className="summary-row savings"><span>Chegirma (20%)</span><strong>−{formatPrice(discount)}</strong></div>
              )}
              <div className="summary-row">
                <span>Yetkazib berish</span>
                <strong className={delivery === 0 ? 'free' : ''}>{delivery === 0 ? 'Bepul' : formatPrice(delivery)}</strong>
              </div>
              <div className="summary-row total"><span>Jami</span><strong>{formatPrice(total)}</strong></div>
              <button className="checkout-button" type="button" onClick={onCheckout}>
                Buyurtma berish <ArrowRight size={19} />
              </button>
              <p className="cart-note">Buyurtmani tasdiqlashdan oldin ma’lumotlaringizni tekshirasiz.</p>
            </div>
          </>
        )}
      </aside>
    </div>
  )
}

export default CartDrawer

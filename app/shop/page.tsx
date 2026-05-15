import AuthNav from '@/app/components/auth/AuthNav'
import ShopProductCard from '@/app/components/shop/ShopProductCard'
import { shopProducts } from '@/app/shop/products'

export default function ShopPage() {
  return (
    <section>
      <AuthNav path="/" />
    <main className="bg-off-white">
      <div className="relative overflow-hidden border-b border-light-grey bg-gradient-to-b from-brand-blue/[0.08] via-light-blue/30 to-off-white">
        <div className="mx-auto max-w-5xl px-6 py-12 md:px-8 md:py-16">
          <p className="inter text-xs font-semibold uppercase tracking-[0.2em] text-brand-blue">Shop</p>
          <h1 className="inter mt-3 text-3xl font-bold tracking-tight text-black-russian md:text-4xl">
            Guides &amp; resources
          </h1>
          <p className="inter mt-4 max-w-2xl text-base leading-relaxed text-dark-grey">
            Downloadable PDFs to support your assessment, training, and functional strength.
          </p>
        </div>
      </div>

      <div className="mx-auto max-w-5xl px-6 py-12 md:px-8 md:py-16">
        <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
          {shopProducts.map((product) => (
            <ShopProductCard key={product.id} product={product} />
          ))}
        </div>
      </div>
    </main>
    </section>
  )
}

import CustomButton from '@/app/ui/CustomButton'
import type { ShopProduct } from '@/app/shop/products'

type Props = {
  product: ShopProduct
}

export default function ShopProductCard({ product }: Props) {
  return (
    <article className="flex h-full flex-col overflow-hidden rounded-xl border border-brand-blue/15 bg-bright-white shadow-md shadow-brand-blue/[0.07] ring-1 ring-black/[0.04] transition hover:border-brand-blue/30 hover:shadow-lg hover:shadow-brand-blue/10">
      <div className="border-b border-brand-blue/10 bg-gradient-to-r from-light-blue/40 to-bright-white px-5 py-5 md:px-6">
        <p className="inter text-xs font-semibold uppercase tracking-[0.15em] text-brand-blue">
          {product.format}
        </p>
        <h2 className="inter mt-2 text-xl font-semibold leading-snug text-black-russian">
          {product.title}
        </h2>
        <p className="inter mt-3 text-2xl font-bold text-black-russian">{product.priceLabel}</p>
      </div>
      <div className="flex flex-1 flex-col px-5 py-5 md:px-6">
        <p className="inter flex-1 text-sm leading-relaxed text-dark-grey">{product.description}</p>
        <ul className="inter mt-5 list-disc space-y-1.5 pl-5 text-sm text-dark-grey">
          {product.highlights.map((item) => (
            <li key={item}>{item}</li>
          ))}
        </ul>
        <div className="mt-6 w-full">
          <CustomButton
            label="Get Guide"
            classes="bg-brand-blue h-10 opacity-60 pointer-events-none"
            textClasses="font-semibold text-sm text-white"
          />
        </div>
      </div>
    </article>
  )
}

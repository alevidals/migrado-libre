import type { Product } from "@/lib/types";

export function ProductsList({ products }: { products: Product[] }) {
  return (
    <div className="grid grid-cols-4 gap-4">
      {products.map((product) => {
        const price = product.price.toLocaleString("es-AR", {
          style: "currency",
          currency: product.currencyId,
        });

        return (
          <a
            key={product.id}
            className="flex transform items-center justify-between gap-x-3 rounded-lg bg-black p-4 transition hover:scale-105"
            href={product.permalink}
            rel="noopener noreferrer"
            target="_blank"
          >
            <div className="flex h-full flex-col justify-between">
              <h3 className="text-sm">{product.title}</h3>
              <h4 className="text-lg font-bold">{price}</h4>
            </div>
            <img alt={product.title} className="h-32 w-32 object-contain" src={product.thumbnail} />
          </a>
        );
      })}
    </div>
  );
}

import { formatNaira } from "@/lib/utils";
import type { Quote } from "@/types";

export function QuoteSummary({ quote }: { quote: Quote }) {
  return (
    <div className="overflow-hidden rounded-xl border border-border">
      <table className="w-full text-sm">
        <caption className="sr-only">Repair quote</caption>
        <thead className="bg-muted/50 text-xs text-muted-foreground">
          <tr>
            <th scope="col" className="px-4 py-2 text-left font-medium">Item</th>
            <th scope="col" className="px-4 py-2 text-right font-medium">Price</th>
          </tr>
        </thead>
        <tbody className="divide-y divide-border">
          {quote.parts.map((part) => (
            <tr key={part.name}>
              <th scope="row" className="px-4 py-2.5 text-left font-normal">{part.name}</th>
              <td className="px-4 py-2.5 text-right tabular-nums">{formatNaira(part.price)}</td>
            </tr>
          ))}
          <tr>
            <th scope="row" className="px-4 py-2.5 text-left font-normal">Labour</th>
            <td className="px-4 py-2.5 text-right tabular-nums">{formatNaira(quote.labour)}</td>
          </tr>
        </tbody>
        <tfoot className="border-t border-border bg-accent/60">
          <tr>
            <th scope="row" className="px-4 py-3 text-left font-semibold">Total</th>
            <td className="px-4 py-3 text-right text-base font-semibold tabular-nums">{formatNaira(quote.total)}</td>
          </tr>
        </tfoot>
      </table>
      {quote.note ? <p className="border-t border-border px-4 py-3 text-xs text-muted-foreground">{quote.note}</p> : null}
    </div>
  );
}

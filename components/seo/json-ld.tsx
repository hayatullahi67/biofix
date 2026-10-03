type JsonValue = string | number | boolean | null | JsonValue[] | { [key: string]: JsonValue };

interface JsonLdProps {
  data: { [key: string]: JsonValue };
}

export function JsonLd({ data }: JsonLdProps) {
  const json = JSON.stringify({ "@context": "https://schema.org", ...data }).replace(/</g, "\\u003c");
  return <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: json }} />;
}

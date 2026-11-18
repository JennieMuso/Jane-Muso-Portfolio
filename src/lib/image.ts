/** Request a display-sized image from Sanity while leaving local assets untouched. */
export function imageUrl(source: string, width: number): string {
  if (!source.startsWith('https://cdn.sanity.io/images/')) return source;
  const url = new URL(source);
  url.searchParams.set('w', String(width));
  url.searchParams.set('q', '75');
  url.searchParams.set('auto', 'format');
  return url.toString();
}

export function imageSrcSet(source: string, widths: number[]): string | undefined {
  if (!source.startsWith('https://cdn.sanity.io/images/')) return undefined;
  return widths.map((width) => `${imageUrl(source, width)} ${width}w`).join(', ');
}

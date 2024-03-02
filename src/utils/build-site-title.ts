export function buildSiteTitle(value: string) {
  return `${value} | ${process.env.NEXT_PUBLIC_APP_SITE_NAME}`;
}

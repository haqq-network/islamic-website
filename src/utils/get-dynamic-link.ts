export function getDynamicLink(
  link: string,
  posthogId: string,
  forwardTo?: string,
) {
  const linkIrl = new URL(link);
  linkIrl.searchParams.append('posthog_id', posthogId);

  if (forwardTo) {
    linkIrl.searchParams.append('go_to', forwardTo);
  }

  return (
    'https://haqq.page.link/' +
    `?link=${encodeURIComponent(linkIrl.toString())}` +
    '&apn=com.haqq.wallet&isi=6443843352&ibi=com.haqq.wallet'
  );
}

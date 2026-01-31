import { cookies } from 'next/headers';
import NotFoundPage from '../(site)/_components/NotFoundPage';
import { normalizeLocale } from '@/lib/i18n';

export default function NotFound() {
  const locale = normalizeLocale(cookies().get('locale')?.value);
  return <NotFoundPage locale={locale} />;
}

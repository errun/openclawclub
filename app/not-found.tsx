import NotFoundPage from './(site)/_components/NotFoundPage';
import { DEFAULT_LOCALE } from '@/lib/i18n';

export default function NotFound() {
  return <NotFoundPage locale={DEFAULT_LOCALE} />;
}

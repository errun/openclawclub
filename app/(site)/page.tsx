import HomePageView from './_components/HomePage';
import { DEFAULT_LOCALE } from '@/lib/i18n';

export default function Page() {
  return <HomePageView locale={DEFAULT_LOCALE} />;
}

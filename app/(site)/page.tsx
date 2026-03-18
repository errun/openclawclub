import type { Metadata } from 'next';
import HomePageView from './_components/HomePage';
import { DEFAULT_LOCALE, LOCALE_OG } from '@/lib/i18n';
import { SITE_URL } from '@/lib/site';

const HOME_TITLE = 'Openclaw: Install Best Practices, Best Skills & Cheap Tokens';
const HOME_DESCRIPTION =
  'Master Openclaw with our guide. Discover install best practices, explore the best skills, read in-depth security reviews, and learn where to get cheap tokens.';

export const metadata: Metadata = {
  title: {
    absolute: HOME_TITLE
  },
  description: HOME_DESCRIPTION,
  openGraph: {
    title: HOME_TITLE,
    description: HOME_DESCRIPTION,
    url: SITE_URL,
    locale: LOCALE_OG[DEFAULT_LOCALE],
    type: 'website'
  },
  twitter: {
    card: 'summary_large_image',
    title: HOME_TITLE,
    description: HOME_DESCRIPTION
  }
};

export default function Page() {
  return <HomePageView locale={DEFAULT_LOCALE} />;
}

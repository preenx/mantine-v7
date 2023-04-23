import { MdxPagesGroup } from '@/types';
import { MDX_DATA } from './mdx-data';

export const MDX_PAGES_GROUPS: MdxPagesGroup[] = [
  { group: 'theming', pages: [MDX_DATA.ThemeObject, MDX_DATA.MantineProvider] },
  { group: 'guides', pages: [MDX_DATA.Polymorphic] },
  { group: 'mantine-core', pages: [{ category: 'feedback', pages: [MDX_DATA.Loader] }] },
];
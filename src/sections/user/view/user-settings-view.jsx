import { SettingsDrawer } from 'src/components/settings';

export default function UserSettingsView() {
  // {
  //   title: t('language'),
  //   icon: 'ion:language',
  //   path: paths.user.profile,
  // },
  // {
  //   title: t('theme'),
  //   icon: 'fluent:dark-theme-20-filled',
  //   path: paths.user.profile,
  // },
  return (
    <div>
      <SettingsDrawer />
    </div>
  );
}

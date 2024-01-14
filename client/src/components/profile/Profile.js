import useLanguage from 'helper/getLabel';
import ProfileLayout from 'layout/profile/ProfileLayout';

export default function Profile() {
  const entity = 'profile';
  const translate = useLanguage();

  const Labels = {
    PANEL_TITLE: translate('profile'),
    ENTITY_NAME: translate('profile'),
  };

  const config = {
    entity,
    ...Labels,
  };
  return <ProfileLayout config={config} />;
}

import { capitalize } from '@/utils';

const REDIRECT_PARAM = 'redirect';
const REDIRECT_KEY = 'login_redirect';

const SOCIAL_LOGIN_PROVIDERS = ['kakao', 'google', 'naver'] as const;
const CAPITALIZED_SOCIAL_LOGIN_PROVIDERS = SOCIAL_LOGIN_PROVIDERS.map(
  provider => capitalize(provider),
);

type CapitalizedSocialLoginProvider = Capitalize<SocialLoginProvider>;
type SocialLoginProvider = (typeof SOCIAL_LOGIN_PROVIDERS)[number];

export {
  CAPITALIZED_SOCIAL_LOGIN_PROVIDERS,
  type CapitalizedSocialLoginProvider,
  REDIRECT_KEY,
  REDIRECT_PARAM,
  SOCIAL_LOGIN_PROVIDERS,
  type SocialLoginProvider,
};

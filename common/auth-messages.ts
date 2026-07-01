export const REGISTER_ERROR = {
  EMAIL_LINKED_TO_OAUTH:
    'This email is already linked to Google or Facebook. Sign in with Google or Facebook first. After signing in, you can set a password in Account Details if you want.',
  EMAIL_ALREADY_EXISTS:
    'An account with this email already exists. Please log in.',
} as const

export const SIGN_IN_ERROR = {
  INVALID_CREDENTIALS: 'Invalid email or password.',
  OAUTH_ONLY:
    'This email is linked to Google or Facebook. Sign in with Google or Facebook, or set a password in Account Details after signing in.',
} as const

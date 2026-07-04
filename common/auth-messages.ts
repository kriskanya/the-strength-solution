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

export const FORGOT_PASSWORD_MESSAGE = {
  SUCCESS:
    'If an account exists with that email, we sent a password reset link.',
  SUCCESS_TITLE: 'Check your email',
  SUCCESS_HINT: "The link expires in 1 hour. Check your spam folder if you don't see it.",
} as const

export const RESET_PASSWORD_ERROR = {
  INVALID_OR_EXPIRED: 'This reset link is invalid or has expired. Please request a new one.',
  UNABLE_TO_RESET: 'Unable to reset password. Please try again.',
} as const

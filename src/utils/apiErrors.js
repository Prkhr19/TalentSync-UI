export const getApiErrorMessage = (requestError, fallbackMessage) => {
  if (!requestError?.response || requestError.code === 'ERR_NETWORK') {
    return 'Cannot reach the server. Check your internet connection and try again.'
  }

  const status = requestError.response?.status
  const serverMessage =
    requestError.response?.data?.error ||
    requestError.response?.data?.message ||
    requestError.message

  if (status === 401) {
    return serverMessage || 'Your session has expired. Please log out and sign in again as admin.'
  }

  if (status === 403) {
    return serverMessage || 'You do not have permission to perform this action.'
  }

  if (status >= 500) {
    return serverMessage || 'Server is temporarily unavailable. Please try again later.'
  }

  return serverMessage || fallbackMessage
}

export const getLoginErrorMessage = (requestError) => {
  if (!requestError?.response || requestError.code === 'ERR_NETWORK') {
    return 'Cannot reach the server. Check your internet connection and try again.'
  }

  const status = requestError.response.status
  const serverMessage =
    requestError.response?.data?.error ||
    requestError.response?.data?.message

  if (status === 401) {
    return serverMessage || 'Invalid email or password'
  }

  if (status === 403) {
    return serverMessage || 'You do not have access to log in with this account.'
  }

  if (status >= 500) {
    return serverMessage || 'Server is temporarily unavailable. Please try again later.'
  }

  if (requestError.message === 'Login response did not contain token or role') {
    return 'Login succeeded but the response was incomplete. Please try again.'
  }

  return serverMessage || requestError.message || 'Login failed. Please try again.'
}

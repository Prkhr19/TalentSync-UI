export const getApiErrorMessage = (requestError, fallbackMessage) => {
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

  return serverMessage || fallbackMessage
}

export function setAuthTokens(tokens: { access?: string; refresh?: string }) {
  if (tokens.access) localStorage.setItem("fab4_access", tokens.access);
  if (tokens.refresh) localStorage.setItem("fab4_refresh", tokens.refresh);
}

export function getAccessToken() {
  return localStorage.getItem("fab4_access");
}

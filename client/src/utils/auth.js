export function getToken() {
  return localStorage.getItem("token");
}

export function decodeToken() {
  const token = getToken();

  if (!token) {
    return null;
  }

  try {
    const base64Url = token.split(".")[1];
    const base64 = base64Url.replace(/-/g, "+").replace(/_/g, "/");
    const jsonPayload = decodeURIComponent(
      atob(base64)
        .split("")
        .map((c) => {
          return "%" + ("00" + c.charCodeAt(0).toString(16)).slice(-2);
        })
        .join(""),
    );

    return JSON.parse(jsonPayload);
  } catch (error) {
    return null;
  }
}

export function isLogin() {
  return !!getToken();
}

export function getUserId() {
  const user = decodeToken();
  return user ? user.id : null;
}

export function getRole() {
  const user = decodeToken();
  return user ? user.role : null;
}

export function isAdmin() {
  return getRole() === "admin";
}

export function logout() {
  localStorage.removeItem("token");
}

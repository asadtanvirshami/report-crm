import Cookies from "js-cookie";

const storeInformation = (userCache: any) => {
  const userCookie = Cookies.set("user", JSON.stringify(userCache), {
    expires: 1,
  });
  return userCookie;
  // Cookies.set("token", token, { expires: 1 });
};

const verifySession = (token: any) => {
  const userCookie = Cookies.set("user", JSON.stringify(token), {
    expires: 1,
  });
  return userCookie;
  // Cookies.set("token", token, { expires: 1 });
};

export { storeInformation };

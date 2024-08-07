const userSigninRequest = async (email: string, password: string) => {
  const response = await fetch(
    process.env.NEXT_PUBLIC_AUTH_USER_SIGNIN as string,
    {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ email, password }),
    }
  );
  console.log(response);

  return response;
};

const userSignupRequest = async (
  email: string,
  password: string,
  firstName: string,
  lastName: string
) => {
  const response = await fetch(
    process.env.NEXT_PUBLIC_AUTH_USER_SIGNUP as string,
    {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ firstName, lastName, email, password }),
    }
  );
  console.log(response);

  return response;
};

const userVerification = async (email: string) => {

};

export { userSigninRequest, userSignupRequest };

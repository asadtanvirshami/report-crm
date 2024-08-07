const mailSendRequest = async (
  email: string,
  subject: string,
  message: string
) => {
  const response = await fetch(process.env.NEXT_PUBLIC_MAIL_SEND as string, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ email, subject, message }),
  });
  console.log(response);

  return response;
};

export { mailSendRequest };

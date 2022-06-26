
function runMiddleware(req, res, fn) {
  return new Promise((resolve, reject) => {
    if (req.method !== 'POST') {
      return res.status(404).send({ code: "not_found", message: "Route not found" })
    }
    const { email, password, } = req.body;
    if (email === '' || !email) {
      return res.status(404).send({ code: "email_not_found", message: "Email not found" })
    }
    if (password === '' || !password) {
      return res.status(404).send({ code: "password_not_found", message: "Password not found" })
    }
    return resolve(200);
  })
}



async function handler(req, res) {
  await runMiddleware(req, res)

  const { email, password, } = req.body;
  const result = await fetch("https://api.nobitex.ir/auth/login/", {
    body: JSON.stringify({ username: email, password: password, captcha: "api", remember: "yes" }),
    headers: { "Content-Type": "application/json" },
    method: "POST"
  })
  const data = await result.json();


  if (result.status == 200) {
    return res.status(200).json({
      ok: true,
      addAccount: {
        token: data.key,
        device: data.device
      }
    })
  }
  return res.status(401).json({
    code: "added_failed",
    message: data
  })

}

export default handler

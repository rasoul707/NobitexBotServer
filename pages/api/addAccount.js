
function runMiddleware(req, res, fn) {
  return new Promise((resolve, reject) => {
    if (req.method !== 'POST') {
      res.status(404).send({ code: "not_found", message: "Route not found" })
      return;
    }
    return resolve(200);
  })
}



async function handler(req, res) {
  await runMiddleware(req, res)

  const { email, password, } = req.body;
  console.log(email, password)
  const result = await fetch("https://api.nobitex.ir/auth/login/", {
    body: JSON.stringify({ username: email, password: password, captcha: "api", remember: "yes" }),
    headers: { "Content-Type": "application/json" },
    method: "POST"
  })
  const data = await result.json();
  console.log(data)

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
    message: "Can't add"
  })

}

export default handler

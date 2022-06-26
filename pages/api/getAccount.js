
function runMiddleware(req, res, fn) {
  return new Promise((resolve, reject) => {
    if (req.method !== 'GET') {
      res.status(404).send({ code: "not_found", message: "Route not found" })
      return;
    }
    return resolve(200);
  })
}



async function handler(req, res) {
  await runMiddleware(req, res)

  const { token } = req.headers;

  let profileName = '';
  let balance = 0;
  let properties = {};


  const _user = await fetch("https://api.nobitex.ir/users/profile", {
    headers: { Authorization: "Token " + token },
    method: "GET"
  })
  if (_user.status !== 200) {
    return res.status(400).json({
      code: "EXPIRE_SESSION",
      message: ":(("
    })
  }
  const _user_data = await _user.json();

  const _wallets = await fetch("https://api.nobitex.ir/users/wallets/list", {
    headers: { Authorization: "Token " + token },
    method: "POST"
  })
  let _wallets_data = await _wallets.json();

  profileName = _user_data.profile.firstName + " " + _user_data.profile.lastName;

  _wallets_data.wallets.map(({ rialBalance, balance, currency }) => {
    balance += rialBalance;
  });

  return res.status(200).json({
    ok: true,
    account: {
      profileName,
      balance: Math.random().toFixed(3) * 1000,
    },
  })


}

export default handler

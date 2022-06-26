
function runMiddleware(req, res, fn) {
    return new Promise((resolve, reject) => {
        if (req.method !== 'GET') {
            return res.status(404).send({ code: "method_not_allowed", message: "Method not allowed" })
        }
        return resolve(200);
    })
}



async function handler(req, res) {
    await runMiddleware(req, res)

    const pairs = [
        'BTC/IRT',
        'ETH/IRT',
        'LTC/IRT',
        'XRP/IRT',
        'BCH/IRT',
        'BNB/IRT',
        'EOS/IRT',
        'XLM/IRT',
        'ETC/IRT',
        'TRX/IRT',
        'DOGE/IRT',
        'UNI/IRT',
        'DAI/IRT',
        'LINK/IRT',
        'DOT/IRT',
        'AAVE/IRT',
        'ADA/IRT',
        'SHIB/IRT',
        'USDT/IRT',
        'BTC/USDT',
        'ETH/USDT',
        'LTC/USDT',
        'XRP/USDT',
        'BCH/USDT',
        'BNB/USDT',
        'EOS/USDT',
        'XLM/USDT',
        'ETC/USDT',
        'TRX/USDT',
        'PMN/USDT',
        'DOGE/USDT',
        'UNI/USDT',
        'DAI/USDT',
        'LINK/USDT',
        'DOT/USDT',
        'AAVE/USDT',
        'ADA/USDT',
        'SHIB/USDT',
    ]

    return res.json({
        ok: true,
        pairs,
    })

}

export default handler

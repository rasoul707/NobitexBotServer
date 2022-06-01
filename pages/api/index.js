

async function handler(req, res) {
    res.status(200).json({ code: "ready", message: "Everything is ready!" })
}

export default handler

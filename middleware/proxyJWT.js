import { jwtVerify} from "jose";

export const validateToken = async (req, res, next) => {
    const { authorization } = req.headers;
    if (!authorization) return res.status(401).send({ token: "Error. Token :c" });
    try {
        const encoder = new TextEncoder();
        req.data = await jwtVerify(
        authorization,
        encoder.encode(process.env.JWT_PRIVATE_KEY)
        );
        next();
    } catch (error) {
        res.status(401).send({ token: "Algo salio mal en el token, genere uno nuevo" });
    }
};
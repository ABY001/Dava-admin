import jwt from "jsonwebtoken";

const authMiddleware = (req, res, next) => {
    const JWT_SECRET = process.env.JWT_SECRET
    const token = req.header("Authorization")?.split(" ")[1];

    if (!token) {
        return res.status(401).json({ message: "Access denied. No token provided." });
    }

    try {
        const decoded = jwt.verify(token, JWT_SECRET);

        if (decoded.role !== "admin") {
            return res.status(403).json({ message: "Access denied. Admins only." });
        }

        req.user = decoded; // Attach user details to request object
        next(); // Proceed to next middleware or route
    } catch (error) {
        return res.status(400).json({ message: "Invalid token." });
    }
};

export default authMiddleware;

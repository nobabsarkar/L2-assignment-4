import { catchAsync } from "../utils/catchAsync";
import { jwtUtils } from "../utils/jwt";
import config from "../config";
import { prisma } from "../lib/prisma";
export const auth = (...requiredRoles) => {
    return catchAsync(async (req, res, next) => {
        const token = req.cookies.accessToken
            ? req.cookies.accessToken
            : req.headers.authorization?.startsWith("Bearer ")
                ? req.headers.authorization?.split(" ")[1]
                : req.headers.authorization;
        // const token = req.headers.authorization?.startsWith("Bearer")
        //   ? req.headers.authorization?.split(" ")[1]
        //   : req.headers.authorization;
        if (!token) {
            throw new Error("You are not logged in. Please log in access resource.");
        }
        const verifiedToken = jwtUtils.verifyToken(token, config.jwt_access_secret);
        // const verifiedToken = jwtUtils.verifyToken(
        //   token,
        //   config.jwt_access_expires_in as string,
        // );
        if (!verifiedToken.success) {
            throw new Error(verifiedToken.error);
        }
        const { email, name, id, role } = verifiedToken.data;
        if (requiredRoles && !requiredRoles.includes(role)) {
            throw new Error("Forbidden. You don't have permission to access this resource.");
        }
        // const user = await prisma.tanant.findUnique({
        //   where: { id, email, name, role },
        // });
        const user = await prisma.user.findUnique({
            where: { id, email, name, role },
        });
        if (!user) {
            throw new Error("User not found. Please login again");
        }
        req.user = {
            email,
            name,
            id,
            role,
        };
        next();
    });
};
//# sourceMappingURL=auth.js.map
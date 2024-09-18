import { NextRequest } from "next/server";
import jwt from "jsonwebtoken";

export const getDataFromToken = async (request: NextRequest) => {
    const token = request.cookies.get("token")?.value || "";

    if (!token) {
        console.error("No token found");
        return null; // Token not found
    }

    try {
        const decodedToken: any = jwt.verify(token, process.env.TOKEN_SECRET!);
        return decodedToken.id; // Assuming your token has an "id" field
    } catch (error: any) {
        console.error("Token verification failed:", error.message);
        return null; // Return null for invalid tokens
    }
};

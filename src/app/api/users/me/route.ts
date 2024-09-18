import { connect } from "@/dbConfig/dbConfig";
import User from "@/models/userModel";
import { NextResponse, NextRequest } from "next/server";
import { getDataFromToken } from "@/helpers/getDataFromToken";

connect();

export async function POST(request: NextRequest) {
    const userId = await getDataFromToken(request);

    if (!userId) {
        return NextResponse.json({ error: "Invalid token" }, { status: 401 });
    }

    try {
        const user = await User.findOne({ _id: userId }).select("-password");

        if (!user) {
            return NextResponse.json({ error: "User not found" }, { status: 404 });
        }

        return NextResponse.json({
            message: "User fetched successfully",
            success: true,
            data: user,
        });
    } catch (error) {
        console.error("Error fetching user data:", error);
        return NextResponse.json({ error: "Server error" }, { status: 500 });
    }
}

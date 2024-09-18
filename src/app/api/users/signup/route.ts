import { connect } from "@/dbConfig/dbConfig";
import User from "@/models/userModel";
import { NextResponse, NextRequest } from "next/server";
import bcryptjs from "bcryptjs";
import { sendEmail } from "@/helpers/mailer";

connect();
console.log("db connected");


export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { username, email, password } = body;
    console.log(body);

    // Check if user already exists
    const user = await User.findOne({ email });
    if (user) {
      return NextResponse.json({ error: "User already exists" }, { status: 400 });
    }

    // Hash the password
    const salt = await bcryptjs.genSalt(10);
    const hashedPassword = await bcryptjs.hash(password, salt);

    // Create the user
    const newUser = await User.create({ username, email, password: hashedPassword });

    // Send verification email
    await sendEmail({ email, emailType: "verifyEmail", userId: newUser._id });

    // Return success response
    return NextResponse.json(
      {
        message: "User created successfully",
        user: newUser,
        success: true
      },
      { status: 200 }
    );
  } catch (error) {
    console.error(error);
    return NextResponse.json({ error: "Something went wrong" }, { status: 500 });
  }
}

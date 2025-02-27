import {connect} from "@/dbConfig/dbConfig";
import User from "@/models/userModel";
import { NextResponse, NextRequest } from "next/server";
import bcryptjs from "bcryptjs";
import jwt from "jsonwebtoken";

connect()

export async function POST(request:NextRequest){
    try {
        const body=await request.json()
        const {email,password}=body
        console.log(body);

        const user=await User.findOne({email})
        if(!user){
            return NextResponse.json({error:"User not found"}, {status: 400})
        }
        console.log("user exists",user);

        const validPassword=await bcryptjs.compare(password,user.password)
        if(!validPassword){
            return NextResponse.json({error:"Invalid password"}, {status: 400})
        }

        const tokenData={
            id:user._id,
            username:user.username,
            email:user.email
        }

        const token=await jwt.sign(tokenData, process.env.TOKEN_SECRET!,{expiresIn:"1d"})
        console.log(token);

        const response=NextResponse.json({
            message:"User logged in successfully",
            success:true,
        })

        response.cookies.set("token",token,{
            httpOnly:true,
        })
        return response
    } catch (error:any) {
        return NextResponse.json({error:error.message}, {status: 500})
    }
}
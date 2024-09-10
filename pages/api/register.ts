import client from "@/lib/prisma.db";
import bcrypt from "bcrypt"

import { NextApiResponse, NextApiRequest } from "next"


export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== "POST") {
    return res.status(405).json({ message: "Method not allowed" });
  }
  
  try {
    const { email, password, name } = req.body;

    const existingUser = await client.user.findUnique({
      where: {
        email,
      },
    });

    if (existingUser) {
      return res.status(400).json({ message: "User already exists" });
    }

    const hashedPassword = await bcrypt.hash(password, 12);

    const user = await client.user.create({
      data: {
        email,
        hashedPassword,
        name,
      },
    });

    return res.status(201).json({ message: "User created successfully", user });
    
  }catch(error) {
    return res.status(500).json({ message: "Internal server error" });
  }
 }
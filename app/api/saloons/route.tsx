import { NextRequest, NextResponse } from "next/server";
import {z} from 'zod';
import prisma from "@/prisma/client";

const createSaloonSchema = z.object({
    title: z.string().min(1, 'Title is Required').max(255),
    description: z.string().min(1, 'Description is Required'),
})

export async function POST(request: NextRequest) {
    const body = await request.json();
    const validation = createSaloonSchema.safeParse(body);
    
    if (!validation.success) {
        return NextResponse.json(validation.error.format(), {status: 400})
    }

    const newSaloon = await prisma.saloon.create({
        data: {title: body.title, description: body.description}
    })

    return NextResponse.json(newSaloon, {status: 201})
}
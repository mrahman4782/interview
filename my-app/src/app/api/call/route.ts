
import { NextRequest, NextResponse } from 'next/server'
import axios from 'axios'
import { VapiClient } from "@vapi-ai/server-sdk";



export async function POST(request: NextRequest){

        const body = await request.json()
        console.log(body)

    try {

        if (!body.number || !body.name){
            return NextResponse.json({error: "Missing fields"}, {status: 400})
        }
        
        const reqBody = {
            phoneNumberId: "c56750bc-733d-4179-ae3b-7caaa6b2ba3c",
            customer: {number: body.number},
            assistantId: "30a86254-372d-405b-827d-4192e1b2723f"
        }
        const vapi = new VapiClient({
            token: process.env.VAPI_PRIV_KEY as string
        });

        const call = await vapi.calls.create(reqBody);

        return NextResponse.json({message: call}, {status: 200})


    } catch (error) {
        return NextResponse.json(error, {status: 400})
    }
}

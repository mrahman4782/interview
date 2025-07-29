
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
            phoneNumberId: "fca84e1e-2b84-4ac1-b53c-a5e8df8b97f8",
            customer: {number: body.number},
            assistantId: "0489a3ae-048c-4e9f-958d-69ca20e4f8af",
            //webhook: "https://59d499bde303.ngrok-free.app/api/vapi-webhook"
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

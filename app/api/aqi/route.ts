import axios from "axios";
import { NextResponse } from "next/server";
const apiKey = process.env.RAPID_API_KEY;

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const { place } = body;

    const options = {
      method: "GET",
      url: "https://air-quality-by-api-ninjas.p.rapidapi.com/v1/airquality",
      params: { city: place },
      headers: {
        "X-RapidAPI-Key": apiKey,
        "X-RapidAPI-Host": "air-quality-by-api-ninjas.p.rapidapi.com",
      },
    };

    const response = await axios.request(options);

    return NextResponse.json(response.data);
  } catch (err) {
    console.log(err);
  }
}

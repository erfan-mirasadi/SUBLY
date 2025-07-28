import { NextResponse } from "next/server";
import { getApiCompanies } from "@/src/services/ApiCompanies";

export async function GET() {
  try {
    const data = await getApiCompanies();
    return NextResponse.json(data || []);
  } catch (error) {
    console.error("API Companies error:", error);
    return NextResponse.json([], { status: 500 });
  }
}

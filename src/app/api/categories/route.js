import { NextResponse } from "next/server";
import { getApiCategories } from "@/src/services/ApiCategories";

export async function GET() {
  try {
    const data = await getApiCategories();
    return NextResponse.json(data || []);
  } catch (error) {
    console.error("API Categories error:", error);
    return NextResponse.json([], { status: 500 });
  }
}

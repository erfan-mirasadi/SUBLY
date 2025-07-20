import { NextResponse } from "next/server";
import { getApiCategories } from "@/src/services/ApiCategories";

export async function GET() {
  try {
    const data = await getApiCategories();
    console.log("API Categories response:", data);
    return NextResponse.json(data || []);
  } catch (error) {
    console.error("API Categories error:", error);
    return NextResponse.json([], { status: 500 });
  }
}

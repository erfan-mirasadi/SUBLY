import { NextResponse } from "next/server";
import { getApiProducts } from "@/src/services/ApiProduct";

export async function POST(request) {
  try {
    const body = await request.json();
    const { productIds } = body;

    if (!productIds || !Array.isArray(productIds)) {
      return NextResponse.json(
        { error: "Product IDs array is required" },
        { status: 400 }
      );
    }

    // Fetch all products and filter by the requested IDs
    const allProducts = await getApiProducts();
    const requestedProducts = allProducts.filter((product) =>
      productIds.includes(product.id)
    );

    return NextResponse.json(requestedProducts || []);
  } catch (error) {
    console.error("API Products Batch error:", error);
    return NextResponse.json([], { status: 500 });
  }
}

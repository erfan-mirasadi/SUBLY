import { NextResponse } from "next/server";
import {
  getCartItems,
  addToCart,
  removeCartItems,
} from "@/src/services/ApiCartItmes";

export async function GET(request) {
  try {
    const { searchParams } = new URL(request.url);
    const user_id = searchParams.get("user_id");

    if (!user_id) {
      return NextResponse.json(
        { error: "User ID is required" },
        { status: 400 }
      );
    }

    const cartItems = await getCartItems(user_id);
    return NextResponse.json(cartItems || []);
  } catch (error) {
    console.error("API Cart error:", error);
    return NextResponse.json([], { status: 500 });
  }
}

export async function POST(request) {
  try {
    const body = await request.json();
    // Extract the fields needed by addToCart
    const { user_id, plan_id, quantity } = body;
    // Ignore other fields if present

    if (!user_id || !plan_id) {
      return NextResponse.json(
        { error: "User ID and Plan ID are required" },
        { status: 400 }
      );
    }

    await addToCart(user_id, plan_id, quantity || 1);
    return NextResponse.json({ success: true });
  } catch (error) {
    console.error("API Cart POST error:", error);
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}

export async function DELETE(request) {
  try {
    const { searchParams } = new URL(request.url);
    const cart_item_id = searchParams.get("cart_item_id");

    if (!cart_item_id) {
      return NextResponse.json(
        { error: "Cart item ID is required" },
        { status: 400 }
      );
    }

    await removeCartItems(cart_item_id);
    return NextResponse.json({ success: true });
  } catch (error) {
    console.error("API Cart DELETE error:", error);
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}

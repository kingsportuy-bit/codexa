import { NextResponse } from "next/server";
import { supabase } from "@/lib/supabase";

export async function POST(request: Request) {
    try {
        const body = await request.json();
        const { mensaje, telefono, email, nombre, nombre_empresa } = body;

        if (!mensaje && !telefono && !email && !nombre) {
            return NextResponse.json({ error: "No data provided" }, { status: 400 });
        }

        const row = {
            nombre,
            mensaje,
            telefono,
            email,
            nombre_empresa: nombre_empresa || "Delta",
            id_empresa: "c24b8906-5cf5-44ef-a2a0-12c432879f68",
        };

        const { data, error } = await supabase
            .from("contacto_empresa")
            .insert([row])
            .select();

        if (error) {
            console.error("Supabase insert error:", error);
            return NextResponse.json({ error: error.message }, { status: 500 });
        }

        return NextResponse.json({ success: true, data });
    } catch (err) {
        console.error("API error:", err);
        return NextResponse.json({ error: "Internal server error" }, { status: 500 });
    }
}



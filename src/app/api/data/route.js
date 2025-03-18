import { NextResponse } from "next/server";
import mysql from "mysql2/promise";

export async function GET() {
    console.log("NODE_ENV:", process.env.NODE_ENV); 
    console.log("Veritabanı bağlantısı başlatılıyor...");

    if (process.env.NODE_ENV === "development") {
        return NextResponse.json({ error: "Local environment is not allowed" }, { status: 403 });
    }

    const connection = await mysql.createConnection({
        host: process.env.DB_HOST,
        user: process.env.DB_USER,
        password: process.env.DB_PASSWORD,
        database: process.env.DB_NAME,
    });

    const [rows] = await connection.execute("SELECT * FROM reddit_data.country_posts");
    await connection.end();

    return NextResponse.json(rows);
}

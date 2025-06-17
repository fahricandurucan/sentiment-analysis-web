import { NextResponse } from 'next/server';
import pool from '@/lib/db';

export async function GET() {
  try {
    console.log('Attempting to connect to database...');
    const [rows] = await pool.query('SELECT * FROM country_sentiments');
    console.log('Query successful, rows:', rows.length);
    return NextResponse.json(rows);
  } catch (error) {
    console.error('Database error:', error);
    return NextResponse.json(
      { 
        error: 'Internal Server Error',
        details: error.message,
        code: error.code
      }, 
      { status: 500 }
    );
  }
} 
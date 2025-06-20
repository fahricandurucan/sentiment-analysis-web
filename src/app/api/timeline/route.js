import { NextResponse } from 'next/server';
import pool from '@/lib/db';

export async function GET(request) {
  try {
    const { searchParams } = new URL(request.url);
    const type = searchParams.get('type'); 

    let query;
    switch (type) {
      case 'country':
        query = 'SELECT * FROM country_posts';
        break;
      case 'gender':
        query = 'SELECT * FROM gender_posts';
        break;
      case 'generation':
        query = 'SELECT * FROM generation_posts';
        break;
      default:
        return NextResponse.json({ error: 'Invalid type parameter' }, { status: 400 });
    }

    const [rows] = await pool.query(query);
    return NextResponse.json(rows);
  } catch (error) {
    console.error('Database error:', error);
    return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
  }
} 
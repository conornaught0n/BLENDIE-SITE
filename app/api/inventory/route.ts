import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';

export async function GET() {
  try {
    const inventory = await prisma.inventoryItem.findMany({
        orderBy: { name: 'asc' }
    });
    return NextResponse.json(inventory);
  } catch (error) {
    console.error('Inventory GET error:', error);
    return NextResponse.json({ error: 'Failed to fetch inventory' }, { status: 500 });
  }
}

export async function POST(req: NextRequest) {
    try {
        const body = await req.json();
        const { name, origin, stockLevel, alertLevel } = body;

        const item = await prisma.inventoryItem.create({
            data: {
                name,
                origin,
                stockLevel,
                alertLevel
            }
        });
        return NextResponse.json(item);
    } catch (error) {
        console.error('Inventory POST error:', error);
        return NextResponse.json({ error: 'Failed to create inventory item' }, { status: 500 });
    }
}

export async function PUT(req: NextRequest) {
    try {
        const body = await req.json();
        const { id, stockLevel } = body;

        const item = await prisma.inventoryItem.update({
            where: { id },
            data: { stockLevel }
        });
        return NextResponse.json(item);
    } catch (error) {
        console.error('Inventory PUT error:', error);
        return NextResponse.json({ error: 'Failed to update inventory' }, { status: 500 });
    }
}

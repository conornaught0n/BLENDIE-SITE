import { NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';

export async function GET() {
  try {
    // 1. Fetch orders from external Commerce Plugin (Mock)
    const mockOrders = [
      {
        externalId: 'ORD-001',
        customerName: 'Alice Coffee',
        customerEmail: 'alice@example.com',
        items: [{ sku: 'ETH-YIRG', quantity: 2 }, { sku: 'COL-SUP', quantity: 1 }],
        status: 'PENDING'
      },
      {
        externalId: 'ORD-002',
        customerName: 'Bob Roaster',
        customerEmail: 'bob@example.com',
        items: [{ sku: 'BRA-SAN', quantity: 5 }],
        status: 'PENDING'
      }
    ];

    // 2. Upsert into database
    const results = await Promise.all(
      mockOrders.map(async (order) => {
        return prisma.order.upsert({
          where: { externalOrderId: order.externalId },
          update: {
            status: order.status,
            updatedAt: new Date(),
          },
          create: {
            externalOrderId: order.externalId,
            customerName: order.customerName,
            customerEmail: order.customerEmail,
            items: order.items,
            status: order.status,
          },
        });
      })
    );

    return NextResponse.json({ success: true, count: results.length });
  } catch (error) {
    console.error('Sync error:', error);
    return NextResponse.json({ success: false, error: 'Failed to sync orders' }, { status: 500 });
  }
}

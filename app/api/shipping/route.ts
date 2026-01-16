import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';

export async function POST(req: NextRequest) {
    try {
        const body = await req.json();
        const { orderId } = body;

        const order = await prisma.order.findUnique({
            where: { id: orderId }
        });

        if (!order) {
            return NextResponse.json({ error: 'Order not found' }, { status: 404 });
        }

        // Mock generating a shipping label
        const trackingNumber = `TRK-${Math.floor(Math.random() * 1000000)}`;
        const carrier = 'DHL Express';
        const labelUrl = `https://api.shipping.com/labels/${trackingNumber}.pdf`;

        const shipment = await prisma.shipment.create({
            data: {
                orderId: order.id,
                trackingNumber,
                carrier,
                labelUrl,
                status: 'CREATED'
            }
        });

        // Update order status
        await prisma.order.update({
            where: { id: orderId },
            data: { status: 'SHIPPED' }
        });

        return NextResponse.json(shipment);
    } catch (error) {
        console.error('Shipping error:', error);
        return NextResponse.json({ error: 'Failed to create shipment' }, { status: 500 });
    }
}

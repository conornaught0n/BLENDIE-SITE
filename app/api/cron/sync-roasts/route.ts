import { NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';

export async function GET() {
  try {
    // Mock scraping Firescope
    const mockRoasts = [
      {
        batchId: 'BATCH-2026-001',
        beanType: 'Ethiopia Yirgacheffe',
        weightIn: 12.0,
        weightOut: 10.2,
        totalRoastTime: 720, // 12 mins
        developmentTime: 90,
        date: new Date().toISOString(),
      },
      {
        batchId: 'BATCH-2026-002',
        beanType: 'Brazil Santos',
        weightIn: 15.0,
        weightOut: 12.9,
        totalRoastTime: 800,
        developmentTime: 110,
        date: new Date().toISOString(),
      }
    ];

    const results = await Promise.all(
      mockRoasts.map(async (roast) => {
        // Calculate derived metrics
        const weightLoss = ((roast.weightIn - roast.weightOut) / roast.weightIn) * 100;
        const devRatio = (roast.developmentTime / roast.totalRoastTime) * 100;

        const savedRoast = await prisma.roastProfile.upsert({
          where: { batchId: roast.batchId },
          update: {},
          create: {
            batchId: roast.batchId,
            beanType: roast.beanType,
            weightIn: roast.weightIn,
            weightOut: roast.weightOut,
            weightLossPct: weightLoss,
            totalRoastTime: roast.totalRoastTime,
            developmentTime: roast.developmentTime,
            devTimeRatio: devRatio,
            date: new Date(roast.date),
          },
        });
        
        // Inventory Bridge: Deduct inventory (Simplified logic)
        // Find inventory item by name (fuzzy match or exact)
        const inventoryItem = await prisma.inventoryItem.findFirst({
            where: { name: { contains: roast.beanType, mode: 'insensitive' } }
        });

        if (inventoryItem) {
            await prisma.inventoryItem.update({
                where: { id: inventoryItem.id },
                data: {
                    stockLevel: { decrement: roast.weightIn }
                }
            });
        }

        return savedRoast;
      })
    );

    return NextResponse.json({ success: true, count: results.length });
  } catch (error) {
    console.error('Roast sync error:', error);
    return NextResponse.json({ success: false, error: 'Failed to sync roasts' }, { status: 500 });
  }
}

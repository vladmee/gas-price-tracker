import React from "react";
import { Card, CardContent, CardHeader, CardTitle } from "~/components/ui/card";
import { Skeleton } from "./ui/skeleton";

interface GasPriceCardProps {
  type: "low" | "average" | "high";
  price?: string;
  base?: string;
  isLoading: boolean;
}

export default function GasPriceCard({
  type,
  price,
  base,
  isLoading,
}: GasPriceCardProps) {
  const priceNumber = price ? parseFloat(price) : 0;
  const baseNumber = base ? parseFloat(base) : 0;
  const priority = price && base ? priceNumber - baseNumber : 0;

  const baseRounded = base ? baseNumber.toFixed(2) : "0.00";
  const priorityRounded = price && base ? priority.toFixed(2) : "0.00";

  return (
    <Card x-chunk={`gas-price-${type}`}>
      {!isLoading ? (
        <>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">
              {type.charAt(0).toUpperCase() + type.slice(1)} Price
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{price} Gwei</div>
            <p className="text-muted-foreground text-xs">
              Base Fee: {baseRounded} Gwei
            </p>
            <p className="text-muted-foreground text-xs">
              Priority: {priorityRounded} Gwei
            </p>
          </CardContent>
        </>
      ) : (
        <SkeletonCard />
      )}
    </Card>
  );
}

export function SkeletonCard() {
  return (
    <div className="flex items-center space-x-4 p-4">
      <Skeleton className="h-12 w-12 rounded-full" />
      <div className="space-y-2">
        <Skeleton className="h-4 w-[250px]" />
        <Skeleton className="h-4 w-[200px]" />
      </div>
    </div>
  );
}

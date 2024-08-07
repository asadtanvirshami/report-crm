import { ComponentProps } from "react";
import { formatDistanceToNow } from "date-fns";
import { cn } from "@/lib/utils";
import { Badge } from "../badge";
import { ScrollArea } from "../scroll-area";
import { trucks } from "@/utils/truck-arrays";

interface Truck {
  id: number;
  name: string;
  type: string;
  manufacturer: string;
  year: number;
  color: string;
  engine: string;
  horsepower: number;
  towingCapacity: string;
  price: string;
}

interface TruckListProps {
  items: Truck[];
}

function TruckList({ items }: TruckListProps) {
  return (
    <ScrollArea className="h-screen">
      <div className="flex flex-col gap-2 p-4 pt-0">
        {trucks.map((item: any) => (
          <button
            key={item.id}
            className={cn(
              "flex flex-col items-start gap-2 rounded-lg border p-3 text-left text-sm transition-all hover:bg-accent"
            )}
          >
            <div className="flex w-full flex-col gap-1">
              <div className="flex items-center">
                <div className="flex items-center gap-2">
                  <div className="font-semibold">{item.name}</div>
                  <span className="text-sm text-muted-foreground">
                    ({item.manufacturer})
                  </span>
                </div>
                <div
                  className={cn(
                    "ml-auto text-xs"
                  )}
                >
                  {formatDistanceToNow(new Date(item.year), {
                    addSuffix: true,
                  })}
                </div>
              </div>
              <div className="text-xs font-medium">
                {item.type} - {item.color}
              </div>
            </div>
            <div className="line-clamp-2 text-xs text-muted-foreground">
              Engine: {item.engine}, Horsepower: {item.horsepower}, Towing
              Capacity: {item.towingCapacity}, Price: {item.price}
            </div>
          </button>
        ))}
      </div>
    </ScrollArea>
  );
}

export default TruckList;
function getBadgeVariantFromLabel(
  label: string
): ComponentProps<typeof Badge>["variant"] {
  if (["work"].includes(label.toLowerCase())) {
    return "default";
  }

  if (["personal"].includes(label.toLowerCase())) {
    return "outline";
  }

  return "secondary";
}

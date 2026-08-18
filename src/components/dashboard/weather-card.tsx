import { CloudSun } from "lucide-react";
import { Card, CardLink } from "@/components/ui/card";

export function WeatherCard() {
  return (
    <Card
      title="Weather Forecast"
      action={<CardLink href="/settings/weather">Setup weather</CardLink>}
    >
      <div className="flex items-center gap-3 text-zinc-500">
        <CloudSun className="h-5 w-5 shrink-0" />
        <p className="text-sm">Weather information is not available</p>
      </div>
    </Card>
  );
}

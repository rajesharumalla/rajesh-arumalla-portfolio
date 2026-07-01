import { headers } from "next/headers";
import { NextResponse } from "next/server";

type MetricItem = {
  label: string;
  value: number;
};

type RedisResult<T> = {
  result?: T;
  error?: string;
};

const demoAnalytics = {
  monthViews: 5,
  totalViews: 977,
  countries: [
    { label: "India", value: 42 },
    { label: "United States", value: 8 },
    { label: "Bangladesh", value: 6 },
    { label: "Pakistan", value: 5 },
    { label: "Nigeria", value: 3 },
  ],
  devices: [
    { label: "Windows", value: 63 },
    { label: "Mac", value: 17 },
    { label: "Android", value: 10 },
    { label: "GNU/Linux", value: 5 },
    { label: "iOS", value: 4 },
    { label: "Ubuntu", value: 1 },
  ],
  isDemo: true,
};

const countryNames = new Intl.DisplayNames(["en"], { type: "region" });

function redisConfig() {
  const url = process.env.UPSTASH_REDIS_REST_URL ?? process.env.KV_REST_API_URL;
  const token = process.env.UPSTASH_REDIS_REST_TOKEN ?? process.env.KV_REST_API_TOKEN;

  if (!url || !token) {
    return null;
  }

  return { url, token };
}

async function redisPipeline(commands: string[][]) {
  const config = redisConfig();

  if (!config) {
    return null;
  }

  const response = await fetch(`${config.url}/pipeline`, {
    method: "POST",
    headers: {
      authorization: `Bearer ${config.token}`,
      "content-type": "application/json",
    },
    body: JSON.stringify(commands),
    cache: "no-store",
  });

  if (!response.ok) {
    throw new Error("Redis request failed");
  }

  return (await response.json()) as RedisResult<unknown>[];
}

function currentMonthKey() {
  return new Date().toISOString().slice(0, 7);
}

function hashToItems(value: unknown): MetricItem[] {
  if (!value) {
    return [];
  }

  if (Array.isArray(value)) {
    const items: MetricItem[] = [];

    for (let index = 0; index < value.length; index += 2) {
      items.push({
        label: String(value[index]),
        value: Number(value[index + 1] ?? 0),
      });
    }

    return sortItems(items);
  }

  if (typeof value === "object") {
    return sortItems(
      Object.entries(value).map(([label, count]) => ({
        label,
        value: Number(count),
      })),
    );
  }

  return [];
}

function sortItems(items: MetricItem[]) {
  return items
    .filter((item) => item.label && Number.isFinite(item.value))
    .sort((first, second) => second.value - first.value);
}

async function readAnalytics(isDemo = false) {
  if (isDemo || !redisConfig()) {
    return demoAnalytics;
  }

  const month = currentMonthKey();
  const results = await redisPipeline([
    ["GET", "analytics:views:total"],
    ["GET", `analytics:views:${month}`],
    ["HGETALL", "analytics:countries"],
    ["HGETALL", "analytics:devices"],
  ]);

  if (!results) {
    return demoAnalytics;
  }

  return {
    monthViews: Number(results[1]?.result ?? 0),
    totalViews: Number(results[0]?.result ?? 0),
    countries: hashToItems(results[2]?.result),
    devices: hashToItems(results[3]?.result),
    isDemo: false,
  };
}

async function requestCountry() {
  const requestHeaders = await headers();
  const countryCode = requestHeaders.get("x-vercel-ip-country") ?? "IN";

  try {
    return countryNames.of(countryCode) ?? "Unknown";
  } catch {
    return "Unknown";
  }
}

export async function GET() {
  try {
    return NextResponse.json(await readAnalytics());
  } catch {
    return NextResponse.json(demoAnalytics);
  }
}

export async function POST(request: Request) {
  const config = redisConfig();

  if (!config) {
    return NextResponse.json(demoAnalytics);
  }

  try {
    const month = currentMonthKey();
    const body = (await request.json().catch(() => ({}))) as { device?: string };
    const country = await requestCountry();
    const device = body.device?.slice(0, 40) || "Unknown";

    await redisPipeline([
      ["INCR", "analytics:views:total"],
      ["INCR", `analytics:views:${month}`],
      ["HINCRBY", "analytics:countries", country, "1"],
      ["HINCRBY", "analytics:devices", device, "1"],
    ]);

    return NextResponse.json(await readAnalytics());
  } catch {
    return NextResponse.json(demoAnalytics);
  }
}

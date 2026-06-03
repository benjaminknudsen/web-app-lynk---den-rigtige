const danishMonths = {
  jan: 0,
  januar: 0,
  feb: 1,
  februar: 1,
  mar: 2,
  marts: 2,
  apr: 3,
  april: 3,
  maj: 4,
  jun: 5,
  juni: 5,
  jul: 6,
  juli: 6,
  aug: 7,
  august: 7,
  sep: 8,
  sept: 8,
  september: 8,
  okt: 9,
  oktober: 9,
  nov: 10,
  november: 10,
  dec: 11,
  december: 11,
};

function parseTime(value = "") {
  const match = String(value).match(/(\d{1,2})[:.](\d{2})/);

  if (!match) {
    return { hours: 23, minutes: 59 };
  }

  return {
    hours: Number(match[1]),
    minutes: Number(match[2]),
  };
}

function startOfToday() {
  const now = new Date();
  return new Date(now.getFullYear(), now.getMonth(), now.getDate());
}

function parseDatePart(datePart = "") {
  const normalized = String(datePart).trim().toLowerCase();
  const today = startOfToday();

  if (!normalized) {
    return null;
  }

  if (normalized === "i dag") {
    return today;
  }

  if (normalized === "i morgen") {
    const tomorrow = new Date(today);
    tomorrow.setDate(tomorrow.getDate() + 1);
    return tomorrow;
  }

  const isoMatch = normalized.match(/^(\d{4})-(\d{1,2})-(\d{1,2})$/);
  if (isoMatch) {
    return new Date(
      Number(isoMatch[1]),
      Number(isoMatch[2]) - 1,
      Number(isoMatch[3]),
    );
  }

  const numericMatch = normalized.match(/^(\d{1,2})[./-](\d{1,2})(?:[./-](\d{2,4}))?$/);
  if (numericMatch) {
    const year = numericMatch[3]
      ? Number(String(numericMatch[3]).padStart(4, "20"))
      : today.getFullYear();
    const parsedDate = new Date(
      year,
      Number(numericMatch[2]) - 1,
      Number(numericMatch[1]),
    );

    if (!numericMatch[3] && parsedDate < today) {
      parsedDate.setFullYear(parsedDate.getFullYear() + 1);
    }

    return parsedDate;
  }

  const parts = normalized.split(/\s+/).filter(Boolean);
  const day = Number(parts.find((part) => /^\d{1,2}$/.test(part)));
  const monthKey = parts.find((part) => danishMonths[part] !== undefined);

  if (day && monthKey) {
    const parsedDate = new Date(today.getFullYear(), danishMonths[monthKey], day);

    if (parsedDate < today) {
      parsedDate.setFullYear(parsedDate.getFullYear() + 1);
    }

    return parsedDate;
  }

  return null;
}

export function getEventStartDate(event) {
  const rawDate = event?.date || "";
  const [datePart = "", timePart = ""] = String(rawDate)
    .split("·")
    .map((part) => part.trim());
  const parsedDate = parseDatePart(datePart);
  const { hours, minutes } = parseTime(timePart || rawDate);

  if (!parsedDate) {
    return new Date(8640000000000000);
  }

  parsedDate.setHours(hours, minutes, 0, 0);
  return parsedDate;
}

export function sortEventsByStartDate(events) {
  return [...events].sort(
    (a, b) => getEventStartDate(a).getTime() - getEventStartDate(b).getTime(),
  );
}

import activityPhoto from "../assets/image-28.png";

const fallbackImages = {
  fodbold:
    "https://images.unsplash.com/photo-1508098682722-e99c43a406b2?auto=format&fit=crop&w=900&q=80",
  "løb":
    "https://images.unsplash.com/photo-1483721310020-03333e577078?auto=format&fit=crop&w=900&q=80",
  lob:
    "https://images.unsplash.com/photo-1483721310020-03333e577078?auto=format&fit=crop&w=900&q=80",
  padel:
    "https://images.unsplash.com/photo-1626224583764-f87db24ac4ea?auto=format&fit=crop&w=900&q=80",
  basket:
    "https://images.unsplash.com/photo-1546519638-68e109498ffc?auto=format&fit=crop&w=900&q=80",
  basketball:
    "https://images.unsplash.com/photo-1546519638-68e109498ffc?auto=format&fit=crop&w=900&q=80",
};

export function normalizeTag(tag) {
  return String(tag ?? "").trim().toLowerCase();
}

export function getEventImage(item) {
  const tag = normalizeTag(item?.activity_type || item?.tag);
  return item?.image || fallbackImages[tag] || activityPhoto;
}

export function getEventSpots(item) {
  if (item?.spots) {
    return item.spots;
  }

  const participants = item?.participants ?? item?.attendees ?? item?.joined_count;

  if (item?.capacity) {
    return `${Math.max(Number(participants ?? 1), 1)}/${item.capacity}`;
  }

  if (participants) {
    return `${Math.max(Number(participants), 1)}/22`;
  }

  return "1/22";
}

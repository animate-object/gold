import { Decks, Season } from "../types";

export function cardSeasonStyles(season: Season | "empty"): string {
  switch (season) {
    case "spring":
      return "bg-green-50 border-green-800";
    case "summer":
      return "bg-yellow-50 border-yellow-500";
    case "fall":
      return "bg-orange-50 border-orange-600";
    case "winter":
      return "bg-blue-50 border-blue-800";
    default:
      return "bg-slate-100 border-slate-700";
  }
}

export function seasonTextStyles(season: Season): string {
  switch (season) {
    case Season.Spring:
      return "text-green-800";
    case Season.Summer:
      return "text-yellow-800";
    case Season.Fall:
      return "text-orange-800";
    case Season.Winter:
      return "text-blue-800";
  }
}

export function seasonBorderStyles(season: Season): string {
  switch (season) {
    case Season.Spring:
      return "border-green-800";
    case Season.Summer:
      return "border-yellow-500";
    case Season.Fall:
      return "border-orange-600";
    case Season.Winter:
      return "border-blue-800";
  }
}

export function seasonBgLightStyles(season: Season): string {
  switch (season) {
    case Season.Spring:
      return "bg-green-100";
    case Season.Summer:
      return "bg-yellow-100";
    case Season.Fall:
      return "bg-orange-100";
    case Season.Winter:
      return "bg-blue-100";
  }
}

export function seasonBgCardFaceStyles(
  season: Season,
  beginningCard: boolean = false,
  misfortuneCard: boolean = false
): string {
  if (beginningCard) {
    return "bg-purple-50";
  }
  if (misfortuneCard) {
    return "bg-red-50";
  }
  switch (season) {
    case Season.Spring:
      return "bg-green-50";
    case Season.Summer:
      return "bg-yellow-50";
    case Season.Fall:
      return "bg-orange-50";
    case Season.Winter:
      return "bg-blue-50";
  }
}

export function seasonBgDeckStyles(season: Decks): string {
  switch (season) {
    case Season.Spring:
      return "bg-green-200";
    case Season.Summer:
      return "bg-yellow-200";
    case Season.Fall:
      return "bg-orange-200";
    case Season.Winter:
      return "bg-blue-200";
    case "beginnings":
      return "bg-purple-200";
    case "fortunes":
      return "bg-red-200";
  }
}

export function seasonBgBoldStyles(season: Season): string {
  switch (season) {
    case Season.Spring:
      return "bg-green-400";
    case Season.Summer:
      return "bg-yellow-400";
    case Season.Fall:
      return "bg-orange-400";
    case Season.Winter:
      return "bg-blue-400";
  }
}

export function seasonShadowStyles(season: Decks): string {
  switch (season) {
    case Season.Spring:
      return "shadow-md shadow-green-500/50";
    case Season.Summer:
      return "shadow-md shadow-yellow-500/50";
    case Season.Fall:
      return "shadow-md shadow-orange-500/50";
    case Season.Winter:
      return "shadow-md shadow-blue-500/50";
    case "beginnings":
      return "shadow-md shadow-purple-300/50";
    case "fortunes":
      return "shadow-md shadow-red-300/50";
  }
}

export function seasonShadowSubtleStyles(season: Season): string {
  switch (season) {
    case Season.Spring:
      return "shadow-md shadow-green-300/50";
    case Season.Summer:
      return "shadow-md shadow-yellow-300/50";
    case Season.Fall:
      return "shadow-md shadow-orange-300/50";
    case Season.Winter:
      return "shadow-md shadow-blue-300/50";
  }
}

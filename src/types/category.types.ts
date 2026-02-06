export type Gender = "MEN" | "WOMEN" | "UNISEX";
export type Season = "SUMMER" | "WINTER" | "ALL";

export interface ICategory {
  name: string;
  gender: Gender;
  season: Season;
}

export interface ThemeColor {
  name: string
  year: number
  primary: string
  secondary: string
  accent: string
  muted: string
}

export const PANTONE_COLORS: ThemeColor[] = [
  {
    name: "Peach Fuzz",
    year: 2024,
    primary: "hsl(11,73%,77%)",
    secondary: "hsl(24,54%,87%)",
    accent: "hsl(11,40%,60%)",
    muted: "hsl(24,30%,90%)"
  },
  {
    name: "Viva Magenta",
    year: 2023,
    primary: "hsl(348,76%,51%)",
    secondary: "hsl(348,40%,80%)",
    accent: "hsl(348,60%,40%)",
    muted: "hsl(348,20%,90%)"
  },
  {
    name: "Very Peri",
    year: 2022,
    primary: "hsl(255,85%,65%)",
    secondary: "hsl(255,40%,80%)",
    accent: "hsl(255,60%,50%)",
    muted: "hsl(255,20%,90%)"
  },
  {
    name: "Ultimate Gray & Illuminating",
    year: 2021,
    primary: "hsl(52,97%,58%)",
    secondary: "hsl(0,0%,63%)",
    accent: "hsl(52,80%,45%)",
    muted: "hsl(0,0%,90%)"
  },
  {
    name: "Classic Blue",
    year: 2020,
    primary: "hsl(212,73%,45%)",
    secondary: "hsl(212,40%,80%)",
    accent: "hsl(212,60%,35%)",
    muted: "hsl(212,20%,90%)"
  },
  {
    name: "Living Coral",
    year: 2019,
    primary: "hsl(5,84%,73%)",
    secondary: "hsl(5,40%,80%)",
    accent: "hsl(5,60%,60%)",
    muted: "hsl(5,20%,90%)"
  },
  {
    name: "Ultra Violet",
    year: 2018,
    primary: "hsl(270,50%,40%)",
    secondary: "hsl(270,30%,80%)",
    accent: "hsl(270,40%,30%)",
    muted: "hsl(270,20%,90%)"
  },
  {
    name: "Greenery",
    year: 2017,
    primary: "hsl(87,67%,52%)",
    secondary: "hsl(87,40%,80%)",
    accent: "hsl(87,50%,40%)",
    muted: "hsl(87,20%,90%)"
  },
  {
    name: "Rose Quartz & Serenity",
    year: 2016,
    primary: "hsl(351,100%,86%)",
    secondary: "hsl(228,100%,86%)",
    accent: "hsl(351,60%,70%)",
    muted: "hsl(228,30%,90%)"
  },
  {
    name: "Marsala",
    year: 2015,
    primary: "hsl(9,47%,44%)",
    secondary: "hsl(9,30%,80%)",
    accent: "hsl(9,40%,35%)",
    muted: "hsl(9,20%,90%)"
  },
  {
    name: "Radiant Orchid",
    year: 2014,
    primary: "hsl(302,59%,65%)",
    secondary: "hsl(302,40%,80%)",
    accent: "hsl(302,50%,50%)",
    muted: "hsl(302,20%,90%)"
  }
] 
import { StaticImageData } from "next/image";

import logo_carbonlink from "./img/carbonlink.png";
import logo_hatchet from "./img/hatchet.png";
import logo_hostai from "./img/hostai.png";
import logo_koop from "./img/koop.png";
import logo_schej from "./img/schej.png";
import logo_sift from "./img/sift.png";
import logo_verci from "./img/verci.png";
import logo_wren from "./img/wren.png";

export interface AlumniSpotlightItem {
  founders: string;
  name: string;
  logo: StaticImageData;
  description: string;
  metrics: string;
}

const alumniSpotlightItems: AlumniSpotlightItem[] = [
  {
    founders: "Alex Forgosh, Dylan Lewis, Russel Tan",
    name: "Hatchet",
    logo: logo_hatchet,
    description:
      "Mission critical tracking technology. Used across 5 continents.",
    metrics: "450k+ monthly users",
  },
  {
    founders: "Jonathan Liu, Lesley Moon",
    name: "schej",
    logo: logo_schej,
    description: "Scheduling made simple.",
    metrics: "450k+ monthly users",
  },
  {
    founders: "Jared Levine",
    name: "HostAI",
    logo: logo_hostai,
    description: "AI support inbox for housing and hospitality.",
    metrics: "$500k pre-seed round",
  },
  {
    founders: "Mitchell Morrison",
    name: "Carbonlink",
    logo: logo_carbonlink,
    description: "Marketplace for on-chain carbon offsets.",
    metrics: "$350k pre-seed round",
  },
  {
    founders: "Anant Vasudevan",
    name: "VERCI",
    logo: logo_verci,
    description: "A creative campus in NYC.",
    metrics: "32k followers",
  },
  {
    founders: "Natalia Murillo, Conner Chyung, Ivy Tsang",
    name: "Koop",
    logo: logo_koop,
    description: "NFT-based membership passes.",
    metrics: "$5m seed round.",
  },
  {
    founders: "Landon Brand, Benjamin Stanfield, Mimi Tran Zambetti",
    name: "Wren",
    logo: logo_wren,
    description: "Offsetting CO2 emissions.",
    metrics: "$1.5m seed round.",
  },
  {
    founders: "Austin Spiegel",
    name: "Sift",
    logo: logo_sift,
    description: "Unified observability for hardware data.",
    metrics: "$17.5m series A.",
  },
];

export default alumniSpotlightItems;

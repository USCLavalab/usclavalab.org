import { StaticImageData } from "next/image";

import logo_altro from "./img/altro.png";
import logo_deeptune from "./img/deeptune.png";
import logo_forgepoint from "./img/forgepoint.png";
import logo_hatchet from "./img/hatchet.png";
import logo_lemma from "./img/lemma.png";
import logo_paperinstruments from "./img/paperinstruments.png";
import logo_sift from "./img/sift.png";
import logo_soshe from "./img/soshe.png";
import logo_symbolica from "./img/symbolica.png";
import logo_timeful from "./img/timeful.png";
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
    founders: "Jonathan Liu, Lesley Moon",
    name: "timeful",
    logo: logo_timeful,
    description: "Scheduling made simple.",
    metrics: "450k+ monthly users",
  },
  {
    founders: "Anant Vasudevan",
    name: "VERCI",
    logo: logo_verci,
    description: "A creative campus in NYC.",
    metrics: "48k followers",
  },
  {
    founders: "Jerry Zhang, Cole Gawin",
    name: "Lemma",
    logo: logo_lemma,
    description:
      "Production monitoring for AI agents.",
    metrics: "YC, $2.3M pre-seed",
  },
  {
    founders: "Landon Brand, Benjamin Stanfield, Mimi Tran Zambetti",
    name: "Wren",
    logo: logo_wren,
    description: "Offsetting CO2 emissions.",
    metrics: "$8M raised",
  },
  {
    founders: "Austin Spiegel",
    name: "Sift",
    logo: logo_sift,
    description: "Unified observability for hardware data.",
    metrics: "$42m series B",
  },
  {
    founders: "Tim Lupo",
    name: "Deeptune",
    logo: logo_deeptune,
    description: "RL training environments for AI agents.",
    metrics: "$43M series A, acquired by Mercor",
  },
  {
    founders: "Sahar Rohani, Junyi Wu, Aidan Maddox",
    name: "Soshe",
    logo: logo_soshe,
    description: "World-class makeup and beauty brand.",
    metrics: "$1.1M ARR (3x YoY), bootstrapped",
  },
  {
    founders: "Alex Pareto",
    name: "Forgepoint",
    logo: logo_forgepoint,
    description: "AI quoting agent for manufacturers.",
    metrics: "$9.8M seed (a16z)",
  },
  {
    founders: "Ayush Jain",
    name: "Altro",
    logo: logo_altro,
    description: "Credit building via recurring payments.",
    metrics: "$18M series A",
  },
  {
    founders: "Gavin Bains",
    name: "Paper Instruments",
    logo: logo_paperinstruments,
    description:
      "Frontier-level open-source models.",
    metrics: "Y Combinator",
  },
  {
    founders: "Drake Rehfeld",
    name: "Symbolica",
    logo: logo_symbolica,
    description:
      "Neurosymbolic AI reasoning models.",
    metrics: "$33M raised",
  },
];

export default alumniSpotlightItems;

import BonfireImg from "./img/bonfire.jpeg";
import DemoNightImg from "./img/demo-night.jpeg";
import FiresideChatsImg from "./img/fireside-chats.jpeg";
import HackNightImg from "./img/hack-night.png";
import LavaLabFormalImg from "./img/lavalab-formal.jpeg";
import PitchNightImg from "./img/pitch-night.jpeg";
import RetreatImg from "./img/retreat.jpeg";
import WorkshopsImg from "./img/workshops.png";

export const patterns = [
  [
    [1, 1, 1],
    [1, 0, 1],
    [1, 1, 1],
  ],
  [
    [1, 1, 1],
    [1, 1, 0],
    [1, 0, 0],
  ],
  [
    [0, 1, 1],
    [1, 0, 1],
    [1, 1, 0],
  ],
  [
    [1, 0, 0],
    [1, 1, 1],
    [1, 0, 1],
  ],
  [
    [1, 1, 1],
    [1, 0, 1],
    [1, 0, 0],
  ],
  [
    [1, 0, 1],
    [0, 1, 1],
    [1, 0, 1],
  ],
  [
    [1, 1, 0],
    [1, 0, 1],
    [1, 1, 0],
  ],
  [
    [0, 1, 0],
    [1, 0, 1],
    [1, 0, 1],
  ],
];

export const events = [
  {
    title: "Fireside Chats",
    description:
      "Each semester, LavaLab invites the industry’s top pioneers and entrepreneurs to share their experiences and engage with our members.",
    img: FiresideChatsImg,
  },
  {
    title: "Beach Bonfire",
    description:
      "The first social event of the new cohort. Bond with your fellow cohort members and LavaLab alumni over roasted marshmallows.",
    img: BonfireImg,
  },
  {
    title: "Alumni Workshops",
    description:
      "LavaLum know best. Learn insights and skills from alumni-led workshops on anything from React Native, to Figma shortcuts, to giving the best pitch.",
    img: WorkshopsImg,
  },
  {
    title: "Community Retreat",
    description:
      "Who doesn’t love a weekend getaway? Join fellow cohort members and LavaLab alumni for a trip off campus. Get to know your future co-founders on a whole ‘nother level.",
    img: RetreatImg,
  },
  {
    title: "Pitch Night",
    description:
      "Two weeks before the final showcase, run through your pitch with no judgement. Get feedback from LavaLum on how to perfect your product and pitch for Demo Night.",
    img: PitchNightImg,
  },
  {
    title: "Hack Night",
    description:
      "It’s the final stretch. Join your fellow devs and designers to grind out the finishing touches of your product. Fuel up with free food and encouragement from our Eboard.",
    img: HackNightImg,
  },
  {
    title: "Demo Night",
    description:
      "The Oscars of LavaLab. Demo and pitch your product to investor judges and showcase your team’s hard work.",
    img: DemoNightImg,
  },
  {
    title: "LavaLab Formal",
    description:
      "A celebration of hard work, new friends, and the graduation of another accomplished cohort. Cheers!",
    img: LavaLabFormalImg,
  },
];

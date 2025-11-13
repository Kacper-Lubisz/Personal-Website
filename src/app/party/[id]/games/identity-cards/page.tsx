import { notFound } from "next/navigation";
import partiesData from "@/data/menus.json";
import { IdentificationCard } from "@phosphor-icons/react/dist/ssr";
import OverrideTitle from "@/components/OverrideTitle";
import PreserveParamsLink from "@/components/PreserveParamsLink";

type Party = {
  id: string;
  title: string;
  date: string;
  releaseDate: string;
};

export async function generateStaticParams() {
  return partiesData.parties.map((party) => ({
    id: party.id,
  }));
}

export const metadata = {
  robots: {
    index: false,
    follow: false,
  },
};

function isContentAvailable(releaseDate: string, override?: string): boolean {
  if (override === "true") return true;

  const today = new Date();
  today.setHours(0, 0, 0, 0);

  const release = new Date(releaseDate);
  release.setHours(0, 0, 0, 0);

  return today >= release;
}

type Role = {
  code: string;
  name: string;
  description: string;
  tasks: string[];
};

type Envelope = {
  id: number;
  roles: Role[];
};

const envelopes: Envelope[] = [
  {
    id: 1,
    roles: [
      {
        code: "1A",
        name: "The Subtle Insulter",
        description: "Master of backhanded compliments and polite devastation.",
        tasks: [
          'Get someone to agree something in the flat is "quirky".',
          "Make someone defend a food they don't even like.",
          "Make someone apologise unnecessarily.",
        ],
      },
      {
        code: "1B",
        name: "The Minimalist",
        description: "Less is more. Actually, even less than that.",
        tasks: [
          "Convince someone a common item is unnecessary.",
          "Get someone to justify why they own something expensive.",
          'Redirect a conversation back to "simplicity".',
        ],
      },
      {
        code: "1C",
        name: "The Matchmaker",
        description: "Cupid's slightly intrusive cousin.",
        tasks: [
          'Claim two guests have "compatible energy".',
          "Get one guest to compliment another.",
          "Engineer a short one-to-one conversation between two people.",
        ],
      },
    ],
  },
  {
    id: 2,
    roles: [
      {
        code: "2A",
        name: "The Gossip Collector",
        description: "Information broker with questionable ethics.",
        tasks: [
          "Get someone to whisper with you.",
          "Extract a secret (real or trivial).",
          "Make someone confirm a rumour you invented.",
        ],
      },
      {
        code: "2B",
        name: "The Cryptic Poet",
        description: "Speaks exclusively in confusing metaphors.",
        tasks: [
          "Describe a normal object in a poetic way.",
          'Make someone ask "what do you mean?"',
          "Get someone to repeat your strange metaphor.",
        ],
      },
      {
        code: "2C",
        name: "The Flat Inspector",
        description: "Unsolicited interior design critic.",
        tasks: [
          "Comment on a detail in the host's flat.",
          'Ask someone if a piece of décor is "intentional".',
          "Claim there’s a rumour about an object in the flat having a backstory.",
        ],
      },
    ],
  },
  {
    id: 3,
    roles: [
      {
        code: "3A",
        name: "The Conversation Diverter",
        description: "Professional topic-changer and derailment expert.",
        tasks: [
          "Change the topic three times unnoticed.",
          "Interrupt with irrelevant info.",
          'Make someone ask "where were we?"',
        ],
      },
      {
        code: "3B",
        name: "The Life Coach",
        description: "Unlicensed motivational speaker.",
        tasks: [
          "Suggest a tiny habit improvement.",
          "Get someone to set a goal for next week.",
          'Tell someone they\'re in their "growth era".',
        ],
      },
      {
        code: "3C",
        name: "The Conspiracy Theorist",
        description: "Connecting dots that don't exist since 2015.",
        tasks: [
          "Get someone to support a ridiculous theory.",
          'Make someone say "no way".',
          "Convince someone to Google something.",
        ],
      },
    ],
  },
  {
    id: 4,
    roles: [
      {
        code: "4A",
        name: "The Historian",
        description: "Will relate everything back to Ancient Rome.",
        tasks: [
          "Make someone guess a historical date.",
          'Spark a debate about which civilisation was "better".',
          "Slip a real historical fact unnoticed.",
        ],
      },
      {
        code: "4B",
        name: "The Time Traveller",
        description: "Confused about which reality they're in.",
        tasks: [
          'Refer to "this timeline" vs "the other timeline".',
          "Claim someone misremembers something earlier tonight.",
          'Ask seriously: "Which version of you is this?"',
        ],
      },
      {
        code: "4C",
        name: "The Temperature Critic",
        description: "Always too hot or too cold, never just right.",
        tasks: [
          "Get someone to agree the room is warm or cold.",
          "Claim you sense a draft.",
          'Ask someone about a "weird airflow pattern".',
        ],
      },
    ],
  },
  {
    id: 5,
    roles: [
      {
        code: "5A",
        name: "The Body Language Expert",
        description: "Read one article, now an expert.",
        tasks: [
          'Announce you can "read micro-expressions".',
          "Predict someone's reaction.",
          'Diagnose stress based on something you "noticed".',
        ],
      },
      {
        code: "5B",
        name: "The Amateur Anthropologist",
        description: "Treating the dinner party like a field study.",
        tasks: [
          "Analyse the group dynamic out loud.",
          "Ask someone to justify a behaviour.",
          'Discuss "rituals" or "traditions".',
        ],
      },
      {
        code: "5C",
        name: "The Stirrer",
        description: "Chaos agent in human form.",
        tasks: [
          'Tell two guests "I heard you don\'t agree on X".',
          "Create a fake rumour.",
          'Make someone say "that can\'t be true".',
        ],
      },
    ],
  },
  {
    id: 6,
    roles: [
      {
        code: "6A",
        name: "The Picky Gourmet",
        description: "Critique everything like it's MasterChef.",
        tasks: [
          'Call a dish "conceptually interesting".',
          'Describe something as "assertive".',
          "Get someone else to praise a dish.",
        ],
      },
      {
        code: "6B",
        name: "The Amateur Detective",
        description: "Columbo energy with none of the charm.",
        tasks: [
          "Ask at least four investigative questions.",
          "Catch a contradiction and call it out.",
          "Get someone to reveal a pet peeve.",
        ],
      },
      {
        code: "6C",
        name: "The Secret Traditionalist",
        description: "Back in my day... and that day was better.",
        tasks: [
          "Defend an old-fashioned belief.",
          'Ask whether others miss "the old way".',
          "Get someone nostalgic.",
        ],
      },
    ],
  },
  {
    id: 7,
    roles: [
      {
        code: "7A",
        name: "The Hypeman",
        description: "Overly enthusiastic about literally everything.",
        tasks: [
          "Exaggerate someone's achievement loudly.",
          "Get the table to applaud something trivial.",
          'Tell someone they\'re "on fire tonight".',
        ],
      },
      {
        code: "7B",
        name: "The Calm Disruptor",
        description: "Gaslighting but make it subtle.",
        tasks: [
          "Make someone second-guess a memory.",
          'Ask someone "are you sure?" repeatedly.',
          "Get someone to repeat themselves.",
        ],
      },
      {
        code: "7C",
        name: "The Amateur Sommelier",
        description: "Pretending to know wine since last Tuesday.",
        tasks: [
          "Describe your drink using professional terminology.",
          "Suggest a pairing.",
          'Get someone to nod at your "notes of something".',
        ],
      },
    ],
  },
  {
    id: 8,
    roles: [
      {
        code: "8A",
        name: "The Existentialist",
        description: "Philosophy major at every party ever.",
        tasks: [
          "Turn a normal comment into a question about meaning.",
          "Ask someone if they're satisfied with their choices tonight.",
          'Make someone say "you\'ve lost me".',
        ],
      },
      {
        code: "8B",
        name: "The Logistics Expert",
        description: "Everything could be 12% more efficient.",
        tasks: [
          "Ask about someone's route, travel time, or planning.",
          "Suggest a more efficient method.",
          "Start a debate about optimisation.",
        ],
      },
      {
        code: "8C",
        name: "The Archivist",
        description: "Human version of 'remember when'.",
        tasks: [
          "Ask for a full retelling of a past event.",
          "Correct someone's timeline.",
          "Bring up an old shared story.",
        ],
      },
    ],
  },
  {
    id: 9,
    roles: [
      {
        code: "9A",
        name: "The Compliment Fisher",
        description: "Needs constant validation, will make it awkward.",
        tasks: [
          "Make someone reassure you about your outfit.",
          "Casually mention a tiny insecurity.",
          "Get someone to praise something trivial about you.",
        ],
      },
      {
        code: "9B",
        name: "The Food Scientist",
        description: "Watched one Alton Brown video.",
        tasks: [
          "Debate texture, not flavour.",
          "Use technical cooking language incorrectly.",
          "Convince someone to smell something twice.",
        ],
      },
      {
        code: "9C",
        name: "The Soft Interrogator",
        description: "Therapist without the license or boundaries.",
        tasks: [
          "Ask gentle, probing questions.",
          "Repeat someone's answer back to them.",
          "Get someone to tell a long personal story.",
        ],
      },
    ],
  },
  {
    id: 10,
    roles: [
      {
        code: "10A",
        name: "The Efficiency Consultant",
        description: "LinkedIn productivity bro incarnate.",
        tasks: [
          "Suggest a faster way the hosts could have prepped.",
          "Talk about workflow.",
          "Get someone to defend how they do something.",
        ],
      },
      {
        code: "10B",
        name: "The Aspiring Influencer",
        description: "Living for the content, dying for engagement.",
        tasks: [
          "Ask someone to take a candid photo of you.",
          "Float a made-up collab.",
          'Get someone to say "you should post that."',
        ],
      },
      {
        code: "10C",
        name: "The Amateur Game Theorist",
        description: "Thinks everyone is playing 4D chess.",
        tasks: [
          "Interpret someone's choice tactically.",
          'Suggest someone is "playing a long strategy".',
          "Get someone to question your motives.",
        ],
      },
    ],
  },
];

export default async function IdentityCardsPage({
  params,
  searchParams,
}: {
  params: Promise<{ id: string }>;
  searchParams: Promise<{ [key: string]: string | string[] | undefined }>;
}) {
  const { id } = await params;
  const { override } = await searchParams;

  const party = partiesData.parties.find((p) => p.id === id);

  if (!party) {
    notFound();
  }

  const isAvailable = isContentAvailable(
    party.releaseDate,
    override as string | undefined
  );

  if (!isAvailable) {
    return (
      <div className="min-h-screen md:flex md:items-center md:justify-center p-4 md:p-8">
        <div className="w-full md:max-w-2xl">
          <div className="flex flex-col p-8 md:p-12">
            <header className="text-center mb-8 border-b-2 border-current pb-6">
              <OverrideTitle className="flex items-center justify-center gap-3 mb-2">
                <IdentificationCard size={40} weight="regular" />
                <h1 className="text-4xl md:text-5xl font-bold">
                  {party.title}
                </h1>
              </OverrideTitle>
              <p className="text-lg md:text-xl opacity-70">{party.date}</p>
              <p className="text-base mt-2 uppercase tracking-wider opacity-60">
                Identity Cards
              </p>
            </header>

            <div className="text-center space-y-6">
              <div className="border-2 border-current p-12">
                <IdentificationCard
                  size={64}
                  weight="regular"
                  className="mx-auto mb-4"
                />
                <h2 className="text-3xl font-bold mb-4">Not Available Yet</h2>
                <p className="text-lg opacity-70 mb-6">
                  The identity cards will be available on{" "}
                  {new Date(party.releaseDate).toLocaleDateString("en-US", {
                    year: "numeric",
                    month: "long",
                    day: "numeric",
                  })}
                </p>
                <PreserveParamsLink
                  href={`/party/${id}/games`}
                  className="inline-block py-3 px-8 border border-current hover:opacity-60 transition-opacity"
                >
                  Back to Games
                </PreserveParamsLink>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen p-4 md:p-8 print:p-8">
      <div className="flex flex-col items-center gap-6 w-full">
        <div className="w-full max-w-6xl">
          {/* Header - hidden when printing */}
          <header className="text-center mb-8 pb-6 border-b-2 border-current print:hidden">
            <OverrideTitle className="flex items-center justify-center gap-3 mb-2">
              <IdentificationCard size={40} weight="regular" />
              <h1 className="text-4xl md:text-5xl font-bold">{party.title}</h1>
            </OverrideTitle>
            <p className="text-lg md:text-xl opacity-70">{party.date}</p>
            <p className="text-base mt-2 uppercase tracking-wider opacity-60">
              Identity Cards - Print and Cut
            </p>
          </header>

          {/* Cards Grid */}
          <div className="space-y-8 print:space-y-6">
            {envelopes.map((envelope) => (
              <div key={envelope.id} className="space-y-4">
                <h2 className="text-2xl font-bold text-center border-2 border-current p-4 print:hidden">
                  Envelope {envelope.id}
                </h2>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4 print:grid-cols-3 print:gap-4 auto-rows-fr">
                  {envelope.roles.map((role) => (
                    <div
                      key={role.code}
                      className="border-2 border-current p-4 print:p-2 print:break-inside-avoid flex flex-col min-h-[320px]"
                    >
                      <div className="text-center mb-3 pb-3 border-b border-current">
                        <p className="text-xs uppercase tracking-widest opacity-60 mb-1">
                          {role.code}
                        </p>
                        <h3 className="text-lg font-bold print:text-base mb-1">
                          {role.name}
                        </h3>
                        <p className="text-xs italic opacity-70 print:text-[10px]">
                          {role.description}
                        </p>
                      </div>
                      <div className="space-y-2 text-sm print:text-xs flex-1">
                        <p className="font-bold uppercase tracking-wider text-xs opacity-60">
                          Tasks:
                        </p>
                        <ul className="space-y-2 list-none">
                          {role.tasks.map((task, idx) => (
                            <li
                              key={idx}
                              className="leading-tight flex items-start gap-2"
                            >
                              <span className="text-base print:text-sm flex-shrink-0 mt-0.5">
                                ☐
                              </span>
                              <span className="flex-1">{task}</span>
                            </li>
                          ))}
                        </ul>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>

          {/* Footer text */}
          <footer className="mt-8 pt-6 border-t border-current text-center print:hidden">
            <p className="text-sm opacity-50">
              Print this page and cut along the borders
            </p>
          </footer>
        </div>

        {/* Back button outside container */}
        <div className="print:hidden">
          <PreserveParamsLink
            href={`/party/${id}/games`}
            className="inline-block py-2 px-6 border border-current hover:opacity-60 transition-opacity"
          >
            Back to Games
          </PreserveParamsLink>
        </div>
      </div>
    </div>
  );
}

import { NextRequest, NextResponse } from "next/server";
import { ChatRequestBody, ChatResponseBody, ChatMessage } from "@/types/types";
import ollama from "ollama";

// export async function GET(req: NextRequest, res: NextResponse) {
//   const response = await ollama.chat({
//     model: "llama3",
//     messages: [
//       { role: "user", content: "Tell me about the chicken and egg problem." },
//       {
//         role: "assistant",
//         content:
//           'The classic "chicken or the egg" dilemma!\n\nThe question of which came first, the chicken or the egg, is a timeless paradox that has puzzled philosophers, scientists, and laypeople alike for centuries. It\'s a classic example of a causality dilemma, where it\'s unclear what the cause-and-effect relationship is between two events.\n\nFrom a biological perspective, birds evolved from reptiles during the Jurassic period, around 150 million years ago. The earliest known bird-like species, such as Archaeopteryx, had characteristics of both birds and reptiles. These early birds likely laid eggs that hatched into creatures that looked like small, feathered dinosaurs.\n\nAs these early birds evolved, they developed more advanced characteristics, including the ability to lay eggs with shells and membranes similar to those of modern chickens. However, it\'s unlikely that these early birds were exactly like modern chickens, as they would have undergone significant changes over millions of years.\n\nSo, in a sense, you could argue that the egg came before the chicken. The first birds probably laid eggs that hatched into creatures that looked more like reptiles than chickens. Over time, these birds evolved and became more bird-like, eventually giving rise to the modern chicken we know today.\n\nHowever, this approach doesn\'t fully resolve the paradox, as it\'s unclear what exactly constitutes a "chicken" or an "egg." If we define a chicken as a modern domesticated species with specific characteristics, then it\'s true that chickens didn\'t exist until thousands of years ago. But if we broaden our definition to include earlier bird-like species that laid eggs, then the question becomes even more complicated.\n\nSome scientists have proposed various solutions to this paradox, such as:\n\n1. The "gradualist" approach: suggesting that birds evolved gradually over millions of years, with each generation laying eggs that hatched into slightly more bird-like creatures.\n2. The "fuzzy" approach: proposing that the distinction between chickens and non-chickens is arbitrary, and that there\'s a continuum of bird-like species that can\'t be neatly categorized as either "chicken" or "non-chicken."\n3. The "pluralist" approach: arguing that there may have been multiple, independent evolutionary paths leading to the modern chicken, rather than a single, direct line from early birds to modern chickens.\n\nUltimately, the question of which came first, the chicken or the egg, is more of a thought experiment than a scientific inquiry. It\'s a reminder that our understanding of evolution and biology is complex, nuanced, and still subject to ongoing research and debate.\n\nSo, feel free to choose your favorite solution (or propose your own!), but don\'t worry too much about which one is "right." The paradox remains a delightful curiosity, a reminder of the wonders and complexities of the natural world!',
//       },
//       { role: "user", content: "Does it apply to beef and cow?" },
//     ],
//   });

//   return NextResponse.json({ response: response }, { status: 200 });
// }

export async function POST(req: NextRequest): Promise<NextResponse> {
  try {
    const request: ChatRequestBody = await req.json();

    console.log(request);

    const response = await ollama.chat({
      model: "llama3",
      messages: request.messages,
    });

    const responseBody: ChatResponseBody = {
      model: "llama3",
      total_duration: response.total_duration,
      message: response.message as ChatMessage,
    };

    return NextResponse.json(responseBody, { status: 200 });
  } catch (error) {
    return NextResponse.json({ error: "Internal error" }, { status: 500 });
  }
}

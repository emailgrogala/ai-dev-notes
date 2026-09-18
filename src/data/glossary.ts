export type GlossaryLang = "pl" | "en";

export type GlossaryEntry = {
  id: string;
  term: string;
  definition: Record<GlossaryLang, string>;
  article?: string;
};

export const glossaryEntries: GlossaryEntry[] = [
  {
    id: "ai",
    term: "AI",
    definition: {
      pl: "Sztuczna inteligencja to szerokie pojęcie obejmujące systemy wykonujące zadania wymagające analizy, przewidywania, rozpoznawania wzorców lub generowania treści. LLM są tylko jedną z klas systemów AI.",
      en: "Artificial intelligence is a broad term for systems that perform tasks involving analysis, prediction, pattern recognition, or content generation. LLMs are only one class of AI systems.",
    },
    article: "ai-without-hype",
  },
  {
    id: "llm",
    term: "LLM",
    definition: {
      pl: "Large Language Model, czyli duży model językowy. Przetwarza tekst jako tokeny i przewiduje kolejne elementy sekwencji na podstawie kontekstu.",
      en: "Large Language Model. It processes text as tokens and predicts subsequent elements of a sequence using the available context.",
    },
    article: "how-llm-predicts-next-token",
  },
  {
    id: "token",
    term: "Token",
    definition: {
      pl: "Jednostka tekstu przetwarzana przez model. Token nie musi odpowiadać całemu słowu — może być fragmentem słowa, znakiem lub krótką sekwencją znaków.",
      en: "A unit of text processed by a model. A token does not have to be a whole word — it may be part of a word, a character, or a short character sequence.",
    },
    article: "how-llm-predicts-next-token",
  },
  {
    id: "context-window",
    term: "Context window",
    definition: {
      pl: "Limit liczby tokenów, które model może obsłużyć w jednym przebiegu. Obejmuje przekazany kontekst, a zależnie od modelu także budżet na generowaną odpowiedź.",
      en: "The token limit a model can handle in a single run. It includes the supplied context and, depending on the model, may also include the output budget.",
    },
    article: "context-embeddings-rag",
  },
  {
    id: "embedding",
    term: "Embedding",
    definition: {
      pl: "Wyuczona numeryczna reprezentacja treści w postaci wektora. Umożliwia porównywanie podobieństwa semantycznego i jest często używana w wyszukiwaniu wektorowym.",
      en: "A learned numerical representation of content as a vector. It makes semantic similarity measurable and is commonly used in vector search.",
    },
    article: "context-embeddings-rag",
  },
  {
    id: "rag",
    term: "RAG",
    definition: {
      pl: "Retrieval-Augmented Generation. System najpierw wyszukuje istotne informacje, a następnie przekazuje je modelowi jako dodatkowy kontekst przed wygenerowaniem odpowiedzi. RAG nie zmienia wag głównego modelu językowego.",
      en: "Retrieval-Augmented Generation. The system first retrieves relevant information and then supplies it to the model as additional context before generation. RAG does not change the main language model's weights.",
    },
    article: "what-model-training-really-means",
  },
  {
    id: "agent",
    term: "Agent",
    definition: {
      pl: "System AI, który może wykonywać wiele kroków prowadzących do celu i korzystać z narzędzi lub środowiska. Nie istnieje jedna powszechnie obowiązująca definicja agenta.",
      en: "An AI system that can carry out multiple steps toward a goal and use tools or an environment. There is no single universally accepted definition of an agent.",
    },
    article: "agents-tools-mcp-workflows",
  },
  {
    id: "tool",
    term: "Tool",
    definition: {
      pl: "Funkcja lub zewnętrzna możliwość udostępniona modelowi, np. odczyt pliku, wyszukiwanie, wywołanie API lub uruchomienie testów.",
      en: "A function or external capability made available to a model, such as reading a file, searching, calling an API, or running tests.",
    },
    article: "agents-tools-mcp-workflows",
  },
  {
    id: "workflow",
    term: "Workflow",
    definition: {
      pl: "Z góry zdefiniowana sekwencja kroków wykonywanych przez system. Workflow może wykorzystywać AI, ale kolejność i logika procesu są zwykle określone wcześniej.",
      en: "A predefined sequence of steps executed by a system. A workflow may use AI, but the process order and logic are usually specified in advance.",
    },
    article: "agents-tools-mcp-workflows",
  },
  {
    id: "mcp",
    term: "MCP",
    definition: {
      pl: "Model Context Protocol — protokół komunikacyjny pomiędzy aplikacją AI a zewnętrznymi systemami. Ujednolica m.in. udostępnianie tools, resources i prompts.",
      en: "Model Context Protocol — a communication protocol between an AI application and external systems. It standardizes capabilities such as tools, resources, and prompts.",
    },
    article: "agents-tools-mcp-workflows",
  },
  {
    id: "prompt",
    term: "Prompt",
    definition: {
      pl: "Instrukcja lub dane wejściowe przekazywane modelowi podczas inference. Prompt może zmienić odpowiedź, ale sam w sobie nie jest treningiem i nie aktualizuje parametrów modelu.",
      en: "An instruction or input supplied to a model during inference. A prompt can change the response, but it is not training by itself and does not update model parameters.",
    },
    article: "what-model-training-really-means",
  },
  {
    id: "system-prompt",
    term: "System prompt",
    definition: {
      pl: "Instrukcja o wysokim priorytecie dostarczana modelowi jako część kontekstu runtime. Może silnie wpływać na zachowanie odpowiedzi, ale sama nie jest treningiem.",
      en: "A high-priority instruction supplied to the model as part of runtime context. It can strongly influence behavior, but it is not training by itself.",
    },
    article: "what-model-training-really-means",
  },
  {
    id: "sampling",
    term: "Sampling",
    definition: {
      pl: "Sposób wyboru kolejnego tokenu przez losowanie z rozkładu prawdopodobieństwa zamiast zawsze wybierać token o najwyższym wyniku.",
      en: "A way of selecting the next token by sampling from a probability distribution instead of always taking the highest-probability token.",
    },
    article: "how-llm-predicts-next-token",
  },
  {
    id: "temperature",
    term: "Temperature",
    definition: {
      pl: "Parametr wpływający na rozkład prawdopodobieństwa używany podczas sampling. Niższa temperatura zwykle wyostrza rozkład, a wyższa go spłaszcza.",
      en: "A parameter that affects the probability distribution used during sampling. Lower temperature usually sharpens the distribution, while higher temperature flattens it.",
    },
    article: "how-llm-predicts-next-token",
  },
  {
    id: "training",
    term: "Training",
    definition: {
      pl: "Proces uczenia modelu, w którym jego parametry są aktualizowane na podstawie danych i sygnału optymalizacyjnego, np. funkcji straty.",
      en: "The process of learning in which model parameters are updated using data and an optimization signal such as a loss function.",
    },
    article: "what-model-training-really-means",
  },
  {
    id: "parameters",
    term: "Parameters / weights",
    definition: {
      pl: "Liczby wewnątrz modelu, które określają sposób przetwarzania wejścia. Trening zmienia te wartości, a inference korzysta z już ustalonych parametrów.",
      en: "Numerical values inside the model that determine how input is processed. Training updates them, while inference uses already learned parameters.",
    },
    article: "what-model-training-really-means",
  },
  {
    id: "loss-function",
    term: "Loss function",
    definition: {
      pl: "Funkcja mierząca, jak bardzo wynik modelu odbiega od celu treningowego. Jej wartość dostarcza sygnału używanego do aktualizacji parametrów.",
      en: "A function that measures how far the model's output is from the training objective. Its value provides the signal used to update parameters.",
    },
    article: "what-model-training-really-means",
  },
  {
    id: "pretraining",
    term: "Pretraining",
    definition: {
      pl: "Wstępny, zwykle bardzo duży etap treningu, w którym model uczy się ogólnych wzorców z dużych zbiorów danych, np. przez przewidywanie kolejnych tokenów.",
      en: "The initial, usually very large training stage where a model learns broad patterns from large datasets, for example through next-token prediction.",
    },
    article: "what-model-training-really-means",
  },
  {
    id: "base-model",
    term: "Base model",
    definition: {
      pl: "Model po podstawowym pretrainingu, przed dalszym dostrajaniem do roli asystenta, konkretnych instrukcji lub preferencji.",
      en: "A model after foundational pretraining and before further tuning for assistant behavior, instructions, or preferences.",
    },
    article: "what-model-training-really-means",
  },
  {
    id: "instruction-tuning",
    term: "Instruction tuning",
    definition: {
      pl: "Dalszy trening modelu na parach instrukcja–odpowiedź, aby lepiej wykonywał polecenia użytkownika. Ten proces aktualizuje parametry modelu.",
      en: "Further training on instruction–response examples so the model follows user instructions more effectively. This process updates model parameters.",
    },
    article: "what-model-training-really-means",
  },
  {
    id: "preference-tuning",
    term: "Preference tuning",
    definition: {
      pl: "Dostrajanie modelu na podstawie informacji o tym, które odpowiedzi są preferowane. Może wykorzystywać różne metody, w tym RLHF.",
      en: "Tuning a model using information about which responses are preferred. It can use different methods, including RLHF.",
    },
    article: "what-model-training-really-means",
  },
  {
    id: "rlhf",
    term: "RLHF",
    definition: {
      pl: "Reinforcement Learning from Human Feedback — jedna z metod preference tuning wykorzystująca oceny lub preferencje ludzi do dalszego dostrajania zachowania modelu.",
      en: "Reinforcement Learning from Human Feedback — one method of preference tuning that uses human ratings or preferences to further tune model behavior.",
    },
    article: "what-model-training-really-means",
  },
  {
    id: "fine-tuning",
    term: "Fine-tuning",
    definition: {
      pl: "Dalsze trenowanie istniejącego modelu na dodatkowym zbiorze danych w celu zmiany lub utrwalenia określonego zachowania. W przeciwieństwie do RAG fine-tuning aktualizuje parametry modelu.",
      en: "Further training of an existing model on an additional dataset to adapt or reinforce behavior. Unlike RAG, fine-tuning updates model parameters.",
    },
    article: "what-model-training-really-means",
  },
  {
    id: "continued-pretraining",
    term: "Continued pretraining",
    definition: {
      pl: "Kontynuacja treningu podobnego do pretrainingu na dodatkowym korpusie, często domenowym. Różni się od typowego instruction fine-tuning celem i rodzajem danych.",
      en: "Continuation of pretraining-like learning on an additional corpus, often domain-specific. It differs from typical instruction fine-tuning in objective and data type.",
    },
    article: "what-model-training-really-means",
  },
  {
    id: "inference",
    term: "Inference",
    definition: {
      pl: "Etap używania już wytrenowanego modelu do wygenerowania przewidywania lub odpowiedzi. Inference korzysta z istniejących parametrów zamiast je trenować.",
      en: "The stage of using an already trained model to produce a prediction or response. Inference uses existing parameters instead of training them.",
    },
    article: "what-model-training-really-means",
  },
  {
    id: "memory",
    term: "Memory",
    definition: {
      pl: "Mechanizm przechowywania informacji, które mogą zostać dołączone do przyszłego kontekstu modelu. Pamięć może zmienić odpowiedź bez aktualizacji wag modelu.",
      en: "A mechanism for storing information that can be added to future model context. Memory can change responses without updating model weights.",
    },
    article: "what-model-training-really-means",
  },
  {
    id: "quantization",
    term: "Quantization",
    definition: {
      pl: "Technika zmniejszania precyzji reprezentacji parametrów modelu, zwykle w celu ograniczenia zużycia pamięci lub przyspieszenia inference. Nie jest treningiem i nie uczy modelu nowych przykładów.",
      en: "A technique that reduces the numerical precision of model parameters, usually to reduce memory use or speed up inference. It is not training and does not teach the model new examples.",
    },
    article: "what-model-training-really-means",
  },
  {
    id: "hallucination",
    term: "Hallucination",
    definition: {
      pl: "Odpowiedź modelu zawierająca informacje niepoprawne, zmyślone lub niepoparte dostępnymi źródłami, mimo że może brzmieć wiarygodnie.",
      en: "A model response containing incorrect, fabricated, or unsupported information even though it may sound plausible.",
    },
    article: "verify-ai-answers",
  },
];

export function articleHref(lang: GlossaryLang, slug: string) {
  return `/${lang}/articles/${slug}/`;
}

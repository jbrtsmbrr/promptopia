import Prompt from "@models/prompt";
import { connectToDatabase } from "@utils/database";

export const GET = async () => {
  try {
    await connectToDatabase();
    const prompts = await Prompt.find({}).populate("creator");

    return new Response(JSON.stringify(prompts), { status: 200 });
  } catch (err) {
    return new Response("Failed to fetch all prompts", { status: 500 });
  }
};

export const POST = async (req) => {
  const { keyword } = await req.json();
  console.log(keyword);
  const regexKeyword = new RegExp(keyword, "i");
  try {
    await connectToDatabase();
    const prompts = await Prompt.find({
      // $or: [
      //   { prompt: regexKeyword },
      //   { tag: regexKeyword },
      //   { "creator.username": regexKeyword }
      // ],
    }).populate("creator");

    const filteredPrompts = prompts.filter((prompt) => {
      return (
        regexKeyword.test(prompt.creator.username) ||
        regexKeyword.test(prompt.tag) ||
        regexKeyword.test(prompt.prompt)
      );
    });

    return new Response(JSON.stringify(filteredPrompts), { status: 200 });
  } catch (err) {
    return new Response("Failed to fetch all prompts", { status: 500 });
  }
};

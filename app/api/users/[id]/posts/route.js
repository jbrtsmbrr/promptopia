import Prompt from "@models/prompt";
import { connectToDatabase } from "@utils/database";

export const GET = async (req, { params }) => {
  try {
    await connectToDatabase();
    const prompts = await Prompt.find({
      creator: params.id,
    }).populate("creator");

    console.log("0-----0")
    console.log(prompts)
    console.log("0-----0")

    return new Response(JSON.stringify(prompts), { status: 200 });
  } catch (err) {
    return new Response("Failed to fetch user prompts", { status: 500 });
  }
};

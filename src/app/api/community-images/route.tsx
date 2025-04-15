import fs from "fs";
import path from "path";

export async function GET() {
  const dir = path.join(process.cwd(), "public/community");
  const files = fs.readdirSync(dir);
  const imagePaths = files.filter((file) =>
    /\.(png|jpe?g|gif|webp|svg)$/i.test(file),
  );

  return Response.json({ imagePaths });
}

import fs from "fs";
import path from "path";
import CommunityImagesGrid from "./images-grid";

export default async function Community() {
  const dir = path.join(process.cwd(), "public/community");
  const files = fs.readdirSync(dir);
  const imagePaths = files.filter((file) =>
    /\.(png|jpe?g|gif|webp|svg)$/i.test(file),
  );

  return <CommunityImagesGrid imagePaths={imagePaths} />;
}

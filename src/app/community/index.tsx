import CommunityImagesGrid from "./images-grid";

export default async function Community() {
  const { imagePaths } = await fetch(
    process.env.API_URL + "/api/community-images",
  ).then((v) => v.json());

  return <CommunityImagesGrid imagePaths={imagePaths} />;
}

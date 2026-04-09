// image upload helper using ImageKit
const ImageKit = require("@imagekit/nodejs");
const { toFile } = require("@imagekit/nodejs");

// console.log("PRIVATE:", process.env.IMAGEKIT_PRIVATE_KEY);
// console.log("PUBLIC:", process.env.IMAGEKIT_PUBLIC_KEY);
// console.log("URL:", process.env.IMAGEKIT_URL_ENDPOINT);

const hasImageKitCreds =
  !!process.env.IMAGEKIT_PRIVATE_KEY &&
  !!process.env.IMAGEKIT_PUBLIC_KEY &&
  !!process.env.IMAGEKIT_URL_ENDPOINT;

let imagekit;
if (hasImageKitCreds) {
  imagekit = new ImageKit({
    publicKey: process.env.IMAGEKIT_PUBLIC_KEY,
    privateKey: process.env.IMAGEKIT_PRIVATE_KEY,
    urlEndpoint: process.env.IMAGEKIT_URL_ENDPOINT,
  });
} else {
  if (process.env.NODE_ENV === "production") {
    throw new Error(
      "Missing ImageKit credentials: set IMAGEKIT_PRIVATE_KEY, IMAGEKIT_PUBLIC_KEY and IMAGEKIT_URL_ENDPOINT.",
    );
  } else {
    console.warn(
      "ImageKit credentials not found — using development mock uploader. To enable real uploads, set IMAGEKIT_PRIVATE_KEY, IMAGEKIT_PUBLIC_KEY and IMAGEKIT_URL_ENDPOINT in .env.",
    );
  }
}

async function uploadFile(buffer) {
  if (!imagekit) {
    // Development fallback: return a placeholder URL so server can run without real ImageKit credentials
    return { url: `https://placehold.co/600x400?text=dev-image-${Date.now()}` };
  }

  try {
    const file = await toFile(Buffer.from(buffer), `image_${Date.now()}.jpg`);

    const result = await imagekit.files.upload({
      file,
      fileName: `image_${Date.now()}.jpg`,
    });

    return result;
  } catch (err) {
    console.error("Image upload failed:", err);
    throw err;
  }
}

module.exports = uploadFile;

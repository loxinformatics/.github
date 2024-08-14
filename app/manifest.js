export default function manifest() {
  return {
    name: process.env.NEXT_PUBLIC_FULL_NAME, // ensure this variable is in the .env file
    short_name: process.env.NEXT_PUBLIC_SHORT_NAME, // ensure this variable is in the .env file
    description: "",
    theme_color: process.env.NEXT_PUBLIC_THEME_COLOR,
    background_color: "#fff",
    start_url: "/",
    display: "standalone",
    icons: [
      {
        src: "/img/logo.png", // add the correct path to the icon image.
        sizes: "any",
        type: "image/png",
      },
    ],
  };
}

import "./globals.css";
import ToasterProvider from "./providers/ToasterProvider";
import "react-loading-skeleton/dist/skeleton.css";
export const metadata = {
  title: "Pixel Lab",
  description:
    "Integrating the PixLab NSFW API into a Go application to filter image uploads based on their NSFW score.",
};

export default async function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>
        <ToasterProvider />
        {children}
      </body>
    </html>
  );
}

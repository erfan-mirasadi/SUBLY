// // ASSETS

// import Heading from "@/src/components/ui/Heading";

// // NEXT
// import Gradient from "@/src/components/ui/Gradient";
// import ProductSwiper from "@/src/components/ui/ProductSwiper";
// import ProductCard from "./ProductCard";

// // COMPONENTS
// export const product = [
//   {
//     id: "0",
//     title: "APPLE MUSIC",
//     text: "Voice Commands",
//     status: "outlet",
//     imageUrl: "/hero/logos/apple-music-1.png",
//     colorful: true,
//     price: "$19.97",
//     oldPrice: "$29.99",
//   },
//   {
//     id: "1",
//     title: "SPOTIFY",
//     text: "Voice Commands",
//     status: "progress",
//     imageUrl: "/hero/spotify.png",
//     price: "$14.99",
//   },
//   {
//     id: "2",
//     title: "chatGPT",
//     text: "OPENAI",
//     imageUrl: "/hero/openai.webp",
//     price: "$9.99",
//   },
//   {
//     id: "3",
//     title: "APPLE BOOKS",
//     text: "External Data",
//     imageUrl: "/hero/adobe1.png",
//     price: "$11.99",
//   },
//   {
//     id: "5",
//     title: "Nuke",
//     text: "Foundry product",
//     status: "outlet",
//     imageUrl: "/hero/Nuke.png",
//     colorful: true,
//     price: "$19.99",
//     oldPrice: "$29.99",
//   },
//   {
//     id: "6",
//     title: "APPLE BOOKS",
//     text: "API Integration",
//     status: "progress",
//     imageUrl: "/hero/logos/Apple-books-01.png",
//     price: "$11.99",
//   },
//   {
//     id: "7",
//     title: "YouTube",
//     text: "Customizable Chatbot",
//     imageUrl: "/hero/youtube.png",
//     price: "$9.99",
//   },
//   {
//     id: "8",
//     title: "ICLOUD",
//     text: "Leaderboard System",
//     status: "outlet",
//     imageUrl: "/hero/logos/iCloud-iPhone.png",
//     colorful: true,
//     price: "$19.99",
//     oldPrice: "$29.99",
//   },
//   {
//     id: "9",
//     title: "APPLE MUSIC",
//     text: "Voice Interaction",
//     status: "outlet",
//     imageUrl: "/hero/adobe1.png",
//     colorful: true,
//     price: "$19.99",
//     oldPrice: "$29.99",
//   },
//   {
//     id: "10",
//     title: "ICLOUD",
//     text: "Leaderboard System",
//     status: "outlet",
//     imageUrl: "/hero/logos/iCloud-iPhone.png",
//     colorful: true,
//     price: "$19.99",
//     oldPrice: "$29.99",
//   },
//   {
//     id: "11",
//     title: "APPLE BOOKS",
//     text: "External Data",
//     imageUrl: "/hero/adobe1.png",
//     price: "$11.99",
//   },
//   {
//     id: "12",
//     title: "APPLE MUSIC",
//     text: "Voice Commands",
//     status: "outlet",
//     imageUrl: "/hero/logos/apple-music-1.png",
//     colorful: true,
//     price: "$19.97",
//     oldPrice: "$29.99",
//   },
//   {
//     id: "13",
//     title: "SPOTIFY",
//     text: "Voice Commands",
//     status: "progress",
//     imageUrl: "/hero/spotify.png",
//     price: "$14.99",
//   },
//   {
//     id: "14",
//     title: "chatGPT",
//     text: "OPENAI",
//     imageUrl: "/hero/openai.webp",
//     price: "$9.99",
//   },
//   {
//     id: "15",
//     title: "APPLE BOOKS",
//     text: "External Data",
//     imageUrl: "/hero/adobe1.png",
//     price: "$11.99",
//   },
//   {
//     id: "16",
//     title: "Nuke",
//     text: "Foundry product",
//     status: "outlet",
//     imageUrl: "/hero/Nuke.png",
//     colorful: true,
//     price: "$19.99",
//     oldPrice: "$29.99",
//   },
//   {
//     id: "17",
//     title: "APPLE BOOKS",
//     text: "API Integration",
//     status: "progress",
//     imageUrl: "/hero/logos/Apple-books-01.png",
//     price: "$11.99",
//   },
//   {
//     id: "18",
//     title: "YouTube",
//     text: "Customizable Chatbot",
//     imageUrl: "/hero/youtube.png",
//     price: "$9.99",
//   },
//   {
//     id: "19",
//     title: "ICLOUD",
//     text: "Leaderboard System",
//     status: "outlet",
//     imageUrl: "/hero/logos/iCloud-iPhone.png",
//     colorful: true,
//     price: "$19.99",
//     oldPrice: "$29.99",
//   },
//   {
//     id: "20",
//     title: "APPLE MUSIC",
//     text: "Voice Interaction",
//     status: "outlet",
//     imageUrl: "/hero/adobe1.png",
//     colorful: true,
//     price: "$19.99",
//     oldPrice: "$29.99",
//   },
//   {
//     id: "21",
//     title: "ICLOUD",
//     text: "Leaderboard System",
//     status: "outlet",
//     imageUrl: "/hero/logos/iCloud-iPhone.png",
//     colorful: true,
//     price: "$19.99",
//     oldPrice: "$29.99",
//   },
//   {
//     id: "22",
//     title: "APPLE BOOKS",
//     text: "External Data",
//     imageUrl: "/hero/adobe1.png",
//     price: "$11.99",
//   },
// ];

// function AllProducts() {
//   return (
//     <div className="max-w-[1240px] mx-auto px-4 md:px-10 lg:px-15 xl:max-w-[1400px] md:pb-10">
//       <Heading tag="Ready to get started" title="AI Programs" />
//       <ProductSwiper items={product} />
//       <Heading tag="Ready to get started" title="MEDIA" />
//       <ProductSwiper items={product} />
//       <Heading tag="Ready to get started" title="Social Media" />
//       <ProductSwiper items={product} />

//       <Heading tag="Ready to get started" title="ALL PRODUCTS" />
//       <div className="grid gap-6 sm:gap-8 grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5">
//         {product.map((item) => (
//           <div
//             key={item.id}
//             className="relative group opacity-75 hover:opacity-100 transition-opacity duration-300"
//           >
//             <ProductCard item={item} />
//           </div>
//         ))}
//       </div>
//       <Gradient />
//     </div>
//   );
// }

// export default AllProducts;

// app/components/AllProducts.jsx یا هر جایی تو App Router

import Gradient from "@/src/components/ui/Gradient";
import Heading from "@/src/components/ui/Heading";
import ProductCard from "./ProductCard";
import ProductSwiper from "@/src/components/ui/ProductSwiper";
import { getApiProducts } from "@/src/services/ApiProduct";

async function AllProducts() {
  const products = await getApiProducts();

  return (
    <div className="max-w-[1240px] mx-auto px-4 md:px-10 lg:px-15 xl:max-w-[1400px] md:pb-10">
      <Heading tag="Ready to get started" title="AI Programs" />
      <ProductSwiper items={products} />

      <Heading tag="Ready to get started" title="MEDIA" />
      <ProductSwiper items={products} />

      <Heading tag="Ready to get started" title="Social Media" />
      <ProductSwiper items={products} />

      <Heading tag="Ready to get started" title="ALL PRODUCTS" />
      <div className="grid gap-6 sm:gap-8 grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5">
        {products?.map((item) => (
          <div
            key={item.id}
            className="relative group opacity-75 hover:opacity-100 transition-opacity duration-300"
          >
            <ProductCard item={item} />
          </div>
        ))}
      </div>

      <Gradient />
    </div>
  );
}

export default AllProducts;

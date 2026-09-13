import BestSeller from "../components/home/BestSeller";
import ContentCarousel from "../components/home/ContentCarousel";
import NewProduct from "../components/home/NewProduct";

const Home = () => {
  return (
    <div>
      <ContentCarousel />
      <BestSeller />
      <NewProduct />
    </div>
  );
};

export default Home;

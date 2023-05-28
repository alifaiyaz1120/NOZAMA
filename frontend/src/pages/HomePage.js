import "../styles/App.scss";
import ItemContainer from "../components/ItemContainer";
import Footer from "../components/Footer";
import HeaderSlider from "../components/HeaderSlider";
import SliderContainer from "../components/SliderContainer";
import QuickLinkContainer from "../components/QuickLinkContainer";


function HomePage() {
  return (
    <div className="App">
      {/* <HeaderSlider></HeaderSlider> */}
      <SliderContainer></SliderContainer>
      <QuickLinkContainer></QuickLinkContainer>
      <ItemContainer></ItemContainer>
    </div>

  );
}

export default HomePage;

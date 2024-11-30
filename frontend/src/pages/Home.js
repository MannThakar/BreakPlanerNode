import { useState } from "react";
import Card from "../components/Card";
import Modal from "../components/Modal";
import { CARD_DATA } from "../utils/constant";

const Home = () => {
  const [activeModalIndex, setActiveModalIndex] = useState(null);

  const openModal = (index) => {
    setActiveModalIndex(index);
  };

  const closeModal = () => {
    setActiveModalIndex(null);
  };

  return (
    <div className=" p-4">
      {/* Cards Section */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 mt-8 justify-items-center">
        {CARD_DATA.map((card, index) => (
          <Card
            key={index}
            title={card.title}
            image={card.image}
            description={card.description}
            openModal={() => openModal(index)}
          />
        ))}
      </div>

      {/* Modals Section */}
      {CARD_DATA.map((card, index) => (
        <Modal
          key={index}
          isVisible={activeModalIndex === index}
          closeModal={closeModal}
          data={card}
        />
      ))}
    </div>
  );
};

export default Home;

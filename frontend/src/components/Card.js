const Card = ({ title, image, description, openModal }) => {
  return (
    <>
      <div className="card bg-base-100 lg:w-96 shadow-xl xs:w-11/12">
        <figure className="px-10 pt-10">
          <img src={image} alt="Hero-Card" className="rounded-xl sm:w-11/12" />
        </figure>
        <div className="card-body ">
          <h2 className="card-title text-leftW">{title}</h2>
          <p className=" text-left">{description}</p>
          <div className="card-actions flex justify-end">
            <button className="btn btn-primary" onClick={openModal}>
              View More
            </button>
          </div>
        </div>
      </div>
    </>
  );
};

export default Card;

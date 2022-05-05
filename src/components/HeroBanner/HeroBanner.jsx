import "./HeroBanner.css";

const HeroBanner = () => {
  return (
    <section
      className="heroBanner"
      style={{backgroundImage: "url(/nextrip.jpeg)"}}
    >
      <div className="container">
        <h1>NexTrip</h1>
      </div>
    </section>
  );
};

export default HeroBanner;

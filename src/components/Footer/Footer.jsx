import "./Footer.css";

const Footer = () => {
  return (
    <footer className="footer">
      <div className="container">
        <div className="copyright">
          <p>
            Metro Transit is a service of the{" "}
            <a href="/" target="_blank" rel="noreferrer">
              Metropolitan Council.
            </a>
          </p>
          <p>Minneapolis/St. Paul, MN</p>
          <p>&copy; 2021 Metro Transit</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;

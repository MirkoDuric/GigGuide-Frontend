import Image from "react-bootstrap/Image";
import "../Profilepage.css";
const FanProfilepage = () => {
  return (
    <main className="profile-container">
      <section className="image-container">
        <Image className="banner-img" src alt="Banner Image" />
        <Image className="profile-img" alt="Profile Image" />
      </section>
      <section className="name-country-city">
        <p className="name-field">Mirko Duric</p>
        <p className="city-country-field">Munich, Germany</p>
      </section>
      <section className="saved-events">
        <div>
          <p className="saved-events-title">Saved/Upcoming events:</p>
        </div>
        <div className="article-component">
          <article>
            <p>OK Fest:</p>
            <p>Date: 25/07/2023</p>
            <p>Location: Foca/Tjentise</p>
          </article>
          <article>
            <p>OK Fest:</p>
            <p>Date: 25/07/2023</p>
            <p>Location: Foca/Tjentise</p>
          </article>
          <article>
            <p>OK Fest:</p>
            <p>Date: 25/07/2023</p>
            <p>Location: Foca/Tjentise</p>
          </article>
          <article>
            <p>OK Fest:</p>
            <p>Date: 25/07/2023</p>
            <p>Location: Foca/Tjentise</p>
          </article>
          <article>
            <p>OK Fest:</p>
            <p>Date: 25/07/2023</p>
            <p>Location: Foca/Tjentise</p>
          </article>
          <article>
            <p>OK Fest:</p>
            <p>Date: 25/07/2023</p>
            <p>Location: Foca/Tjentise</p>
          </article>
          <article>
            <p>OK Fest:</p>
            <p>Date: 25/07/2023</p>
            <p>Location: Foca/Tjentise</p>
          </article>
          <article>
            <p>OK Fest:</p>
            <p>Date: 25/07/2023</p>
            <p>Location: Foca/Tjentise</p>
          </article>
        </div>
      </section>
    </main>
  );
};

export default FanProfilepage;

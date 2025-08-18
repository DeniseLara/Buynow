import { FaGem, FaLock, FaHeadset } from 'react-icons/fa'; 


function Benefits() {
  return (
    <section className="benefits" aria-labelledby="benefits-title">
      <h2 id="benefits-title" className="benefits-title">
        Why choose us?
      </h2>

      <div className="benefit-cards">
        <article className="benefit-card">
          <FaGem className="benefit-icon" />
          <h3 className="benefits-subtitle">Quality Products</h3>
          <p className="benefits-description">
            We only offer the best products for you, ensuring quality and durability.
          </p>
        </article>

        <article className="benefit-card">
          <FaLock className="benefit-icon" />
          <h3 className="benefits-subtitle">Fast and Secure Purchase</h3>
          <p className="benefits-description">
            Enjoy a simple and secure shopping process with multiple payment methods.
          </p>
        </article>

        <article className="benefit-card">
          <FaHeadset className="benefit-icon" />
          <h3 className="benefits-subtitle">24/7 Support</h3>
          <p className="benefits-description">
            We’re always here to help you anytime, your satisfaction is our top priority!
          </p>
        </article>
      </div>
    </section>
    );
  }
  
  export default Benefits;
  
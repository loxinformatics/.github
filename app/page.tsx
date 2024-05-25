'use client';

import AOS from 'aos';
import Image from 'next/image';
import Link from 'next/link';
import { useEffect } from 'react';
import 'aos/dist/aos.css';
import '@/app/page.css';

import ContactForm from '@/app/components/ContactForm/ContactForm';

function Home() {
  useEffect(() => {
    AOS.init({
      duration: 1000,
      easing: "ease-in-out",
      once: true,
      mirror: false
    });
  }, []);

  return (
    <main id="main">

      {/* ======= About Section ======= */}
      <section id="about" className="about">
        <div className="container" data-aos="fade-up">

          <div className="section-title">
            <h2>About</h2>

          </div>

          <div className="row">
            <div className="col-lg-6 order-1 order-lg-2" data-aos="fade-left" data-aos-delay="100">
              <Image src="/images/tech11.jpg" className="img-fluid" alt="" width={500} height={500} />
            </div>
            <div className="col-lg-6 pt-4 pt-lg-0 order-2 order-lg-1 content" data-aos="fade-right"
              data-aos-delay="100">
              <h3>Why you should choose to work with us</h3>
              <p className="fst-italic">
                At Lox Informatics, our mission is to empower retail and e-commerce businesses to harness
                the
                full potential of their online presence through comprehensive data analysis and tailored Web
                solutions.
              </p>
              <p className="fst-italic">
                Our Company bridges the gap between data and impact. Helping businesses connect with their
                audience on
                a deeper level and guiding them in transforming their data into tangible value through:
              </p>
              <ul>
                <li><i className="ri-check-double-line"></i> personalized content </li>
                <li><i className="ri-check-double-line"></i> informed design and optimized websites</li>
                <li><i className="ri-check-double-line"></i> Actionable insights and measurable results.</li>
              </ul>
              <p className="fst-italic">
                Our company brings together a unique blend of skills and experience to
                provide cutting edge solutions in the digital realm and offer a comprehensive suite of
                services
                that focus on delivering results.
              </p>
            </div>
          </div>

        </div>
      </section>{/* End About Section */}

      {/* ======= Services Section ======= */}
      <section id="services" className="services">
        <div className="container" data-aos="fade-up">

          <div className="section-title">
            <h2>Services</h2>
            <p>Check our Services</p>
          </div>

          <div className="row">
            <div className="col-lg-4 col-md-6 d-flex align-items-stretch mt-4" data-aos="zoom-in"
              data-aos-delay="200">
              <div className="icon-box">
                <div className="icon"><i className="bx bx-laptop"></i></div>
                <h4>Custom Software Solutions</h4>
                <p>We tailor our services to meet the specific needs and goals of each client. </p>
              </div>
            </div>

            <div className="col-lg-4 col-md-6 d-flex align-items-stretch mt-4" data-aos="zoom-in"
              data-aos-delay="100">
              <div className="icon-box">
                <div className="icon"><i className="bx bx-code-alt"></i></div>
                <h4>Web design and development</h4>
                <p>We use data insights to optmisze user experiences and website functionality</p>
              </div>
            </div>

            <div className="col-lg-4 col-md-6 d-flex align-items-stretch mt-4" data-aos="zoom-in"
              data-aos-delay="200">
              <div className="icon-box">
                <div className="icon"><i className="bx bx-bar-chart"></i></div>
                <h4>Website analytics & user behaviour analysis</h4>
                <p>We focus on understanding user behaviour and website performance through data analytics.
                </p>
              </div>
            </div>

            <div className="col-lg-4 col-md-6 d-flex align-items-stretch mt-4" data-aos="zoom-in"
              data-aos-delay="300">
              <div className="icon-box">
                <div className="icon"><i className="bx bx-line-chart"></i></div>
                <h4>Dashboard development and reporting</h4>
                <p>We offer custom dashboard development for live
                  reporting to suit any business needs together with data visualization services</p>
              </div>
            </div>

            <div className="col-lg-4 col-md-6 d-flex align-items-stretch mt-4" data-aos="zoom-in"
              data-aos-delay="100">
              <div className="icon-box">
                <div className="icon"><i className="bx bx-data"></i></div>
                <h4>Data analytics and statistical modelling</h4>
                <p>Our team leverages advanced analytics tools and methodologies to dissect website data,
                  uncover trends,
                  and extract valuable insights.</p>
              </div>
            </div>


            <div className="col-lg-4 col-md-6 d-flex align-items-stretch mt-4" data-aos="zoom-in"
              data-aos-delay="300">
              <div className="icon-box">
                <div className="icon"><i className="bx bx-support"></i></div>
                <h4>Support and maintenance</h4>
                <p> We will also offer post-project support, updates and maintenance services for software
                  created and
                  other data solutions.</p>
              </div>
            </div>

          </div>

        </div>
      </section>{/* End Services Section */}

      {/* ======= Cta Section ======= */}
      <section id="cta" className="cta">
        <div className="container" data-aos="zoom-in">

          <div className="text-center">
            <h3>Call To Action</h3>
            <p> Contact us now for a free consultation</p>
            <Link className="cta-btn" href="#">Call To Action</Link>
          </div>

        </div>
      </section>{/* End Cta Section */}

      {/* ======= Contact Section ======= */}
      <section id="contact" className="contact">
        <div className="container" data-aos="fade-up">

          <div className="section-title">
            <h2>Contact</h2>
            <p>Contact Us</p>
          </div>

          <div className="row mt-5">

            <div className="col-lg-4">
              <div className="info">
                <div className="address">
                  <i className="bi bi-geo-alt"></i>
                  <h4>Location:</h4>
                  <p>Nairobi</p>
                </div>

                <div className="email">
                  <i className="bi bi-envelope"></i>
                  <h4>Email:</h4>
                  <Link href="mailto:info@loxinformatics.com">
                    <p>info@loxinformatics.com</p>
                  </Link>
                </div>

                <div className="phone">
                  <i className="bi bi-phone"></i>
                  <h4>Call:</h4>
                  <Link href="tel:+254710289954">
                    <p>+254710289954</p>
                  </Link>
                  <Link href="tel:+254706965904">
                    <p>+254706965904</p>
                  </Link>
                </div>

              </div>

            </div>

            <div className="col-lg-8 mt-5 mt-lg-0">
              <ContactForm></ContactForm>
            </div>

          </div>

        </div>
      </section>{/* End Contact Section */}

    </main>
  )
}

export default Home;
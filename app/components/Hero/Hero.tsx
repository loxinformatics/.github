'use client';

import Link from 'next/link';
import '@/app/components/Hero/Hero.css';


function Hero() {
  return (
    <section id="hero" className="d-flex align-items-center justify-content-center">
      <div className="container" data-aos="fade-up">

        <div className="row justify-content-center" data-aos="fade-up" data-aos-delay="150">
          <div className="col-xl-6 col-lg-8">
            <h1 className="smaller-heading">Transforming Retail & E-Commerce Landscapes<span>:</span> Innovative
              Solutions and
              Insights for Success</h1>
            <h2>We are a team of talented software developers and analysts dedicated to revolutionizing the way
              retail and
              e-commerce businesses thrive.</h2>
          </div>
        </div>

        <div className="row gy-4 mt-5 justify-content-center" data-aos="zoom-in" data-aos-delay="250">
          <div className="col-xl-2 col-md-4">
            <div className="icon-box">
              <i className="ri-code-line"></i>
              <h3><Link href="">Software Development</Link></h3>
            </div>
          </div>
          <div className="col-xl-2 col-md-4">
            <div className="icon-box">
              <i className="ri-bar-chart-box-line"></i>
              <h3><Link href="">Business Analysis</Link></h3>
            </div>
          </div>
          <div className="col-xl-2 col-md-4">
            <div className="icon-box">
              <i className="ri-cpu-line"></i>
              <h3><Link href=""> Automated Systems</Link></h3>
            </div>
          </div>
          <div className="col-xl-2 col-md-4">
            <div className="icon-box">
              <i className="ri-database-2-line"></i>
              <h3><Link href="">Statistical Analysis</Link></h3>
            </div>
          </div>
          <div className="col-xl-2 col-md-4">
            <div className="icon-box">
              <i className="ri-global-line"></i>
              <h3><Link href="">Website Optimization</Link></h3>
            </div>
          </div>
        </div>

      </div>
    </section>
  )
}

export default Hero;

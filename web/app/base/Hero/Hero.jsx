"use client";

import "./Hero.css";
import Link from "next/link";
import {
  RiCodeBoxLine,
  RiBarChartBoxLine,
  RiCpuLine,
  RiDatabase2Line,
  RiGlobalLine,
} from "react-icons/ri";

export default function Hero({ heroInMain }) {
  return (
    <section
      id="hero"
      className={`${heroInMain} d-flex align-items-center justify-content-center`}>
      <div className="container" data-aos="fade-up">
        <div
          className="row justify-content-center"
          data-aos="fade-up"
          data-aos-delay="150"
        >
          <div className="col-xl-6 col-lg-8">
            <h1 className="smaller-heading">
              Transforming Retail & E-Commerce Landscapes<span>:</span>{" "}
              Innovative Solutions and Insights for Success
            </h1>
            <h2>
              We are a team of talented software developers and analysts
              dedicated to revolutionizing the way retail and e-commerce
              businesses thrive.
            </h2>
          </div>
        </div>

        <div
          className="row gy-4 mt-5 justify-content-center"
          data-aos="zoom-in"
          data-aos-delay="250"
        >
          <div className="col-xl-2 col-md-4">
            <div className="icon-box">
              <RiCodeBoxLine />
              <h3>
                <Link className="pe-none" href="">
                  Software Development
                </Link>
              </h3>
            </div>
          </div>
          <div className="col-xl-2 col-md-4">
            <div className="icon-box">
              <RiBarChartBoxLine />
              <h3>
                <Link className="pe-none" href="">
                  Business Analysis
                </Link>
              </h3>
            </div>
          </div>
          <div className="col-xl-2 col-md-4">
            <div className="icon-box">
              <RiCpuLine />
              <h3>
                <Link className="pe-none" href="">
                  {" "}
                  Automated Systems
                </Link>
              </h3>
            </div>
          </div>
          <div className="col-xl-2 col-md-4">
            <div className="icon-box">
              <RiDatabase2Line />
              <h3>
                <Link className="pe-none" href="">
                  Statistical Analysis
                </Link>
              </h3>
            </div>
          </div>
          <div className="col-xl-2 col-md-4">
            <div className="icon-box">
              <RiGlobalLine />
              <h3>
                <Link className="pe-none" href="">
                  Website Optimization
                </Link>
              </h3>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

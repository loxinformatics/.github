
import { BiLaptop, BiCodeAlt, BiBarChart, BiLineChart, BiData, BiSupport } from "react-icons/bi";
import "./Services.css"

import Title from "@/components/widgets/Title/Title";

export default function Services() {
    return (
        <section id="services" className="services">
            <div className="container" data-aos="fade-up">

                <Title heading="Services" paragraph="Check our Services" />

                <div className="row">
                    <div className="col-lg-4 col-md-6 d-flex align-items-stretch mt-4" data-aos="zoom-in"
                        data-aos-delay="200">
                        <div className="icon-box">
                            <div className="icon"><BiLaptop /></div>
                            <h4>Custom Software Solutions</h4>
                            <p>We tailor our services to meet the specific needs and goals of each client. </p>
                        </div>
                    </div>

                    <div className="col-lg-4 col-md-6 d-flex align-items-stretch mt-4" data-aos="zoom-in"
                        data-aos-delay="100">
                        <div className="icon-box">
                            <div className="icon"><BiCodeAlt /></div>
                            <h4>Web design and development</h4>
                            <p>We use data insights to optmisze user experiences and website functionality</p>
                        </div>
                    </div>

                    <div className="col-lg-4 col-md-6 d-flex align-items-stretch mt-4" data-aos="zoom-in"
                        data-aos-delay="200">
                        <div className="icon-box">
                            <div className="icon"><BiBarChart /></div>
                            <h4>Website analytics & user behaviour analysis</h4>
                            <p>We focus on understanding user behaviour and website performance through data analytics.
                            </p>
                        </div>
                    </div>

                    <div className="col-lg-4 col-md-6 d-flex align-items-stretch mt-4" data-aos="zoom-in"
                        data-aos-delay="300">
                        <div className="icon-box">
                            <div className="icon"><BiLineChart /></div>
                            <h4>Dashboard development and reporting</h4>
                            <p>We offer custom dashboard development for live
                                reporting to suit any business needs together with data visualization services</p>
                        </div>
                    </div>

                    <div className="col-lg-4 col-md-6 d-flex align-items-stretch mt-4" data-aos="zoom-in"
                        data-aos-delay="100">
                        <div className="icon-box">
                            <div className="icon"><BiData /></div>
                            <h4>Data analytics and statistical modelling</h4>
                            <p>Our team leverages advanced analytics tools and methodologies to dissect website data,
                                uncover trends,
                                and extract valuable insights.</p>
                        </div>
                    </div>


                    <div className="col-lg-4 col-md-6 d-flex align-items-stretch mt-4" data-aos="zoom-in"
                        data-aos-delay="300">
                        <div className="icon-box">
                            <div className="icon"><BiSupport /></div>
                            <h4>Support and maintenance</h4>
                            <p> We will also offer post-project support, updates and maintenance services for software
                                created and
                                other data solutions.</p>
                        </div>
                    </div>

                </div>

            </div>
        </section>
    );
}
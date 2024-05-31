import Image from "next/image";
import { RiCheckDoubleLine } from "react-icons/ri";
import "./About.css"

import Title from "@/components/widgets/Title/Title";

export default function About() {
    return (
        <section id="about" className="about">
            <div className="container" data-aos="fade-up">

                <Title heading="About" paragraph="About Us" />

                <div className="row">
                    <div className="col-lg-6 order-1 order-lg-2" data-aos="fade-left" data-aos-delay="100">
                        <Image src="/images/tech11.jpg" className="img-fluid" alt="" width={500} height={355} />
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
                            <li><RiCheckDoubleLine /> personalized content </li>
                            <li><RiCheckDoubleLine /> informed design and optimized websites</li>
                            <li><RiCheckDoubleLine /> Actionable insights and measurable results.</li>
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
        </section>
    );
}
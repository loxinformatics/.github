'use client';

import Link from 'next/link';
import '@/app/components/Footer/Footer.css';

function Footer() {
    return (
        <footer id="footer">
            <div className="footer-top">
                <div className="container">
                    <div className="row">

                        <div className="col-lg-3 col-md-6">
                            <div className="footer-info">
                                <h3>Lox Informatics<span>.</span></h3>
                                <div>
                                    <strong>Call:</strong><br />
                                    <div>+254710289954</div>
                                    <div>+254706965904</div><br />
                                    <strong>Email:</strong><br />
                                    <div>info@loxinformatics.com</div>
                                </div>
                                <div className="social-links mt-3">
                                    <Link href="#" className="twitter"><i className="bx bxl-twitter"></i></Link>
                                    <Link href="#" className="facebook"><i className="bx bxl-facebook"></i></Link>
                                    <Link href="#" className="google-plus"><i className="bx bxl-skype"></i></Link>
                                    <Link href="#" className="linkedin"><i className="bx bxl-linkedin"></i></Link>
                                </div>
                            </div>
                        </div>

                        <div className="col-lg-2 col-md-6 footer-links">
                            <h4>Useful Links</h4>
                            <ul>
                                <li><i className="bx bx-chevron-right"></i> <Link href="#">Home</Link></li>
                                <li><i className="bx bx-chevron-right"></i> <Link href="#">About us</Link></li>
                                <li><i className="bx bx-chevron-right"></i> <Link href="#">Services</Link></li>
                                <li><i className="bx bx-chevron-right"></i> <Link href="#">Terms of service</Link></li>
                                <li><i className="bx bx-chevron-right"></i> <Link href="#">Privacy policy</Link></li>
                            </ul>
                        </div>

                        <div className="col-lg-3 col-md-6 footer-links">
                            <h4>Our Services</h4>
                            <ul>
                                <li><i className="bx bx-chevron-right"></i> <Link href="#">Custom Software Solutions</Link></li>
                                <li><i className="bx bx-chevron-right"></i> <Link href="#">Web Design & Development</Link></li>
                                <li><i className="bx bx-chevron-right"></i> <Link href="#">Website Analytics</Link></li>
                                <li><i className="bx bx-chevron-right"></i> <Link href="#">Dashboard Development</Link></li>
                                <li><i className="bx bx-chevron-right"></i> <Link href="#">Data Analysis</Link></li>
                                <li><i className="bx bx-chevron-right"></i> <Link href="#">Support & Maintenance</Link></li>
                            </ul>
                        </div>


                    </div>
                </div>
            </div>

            <div className="container">
                <div className="copyright">
                    &copy; Copyright <strong><span>Lox Informatics</span></strong>. All Rights Reserved
                </div>
            </div>
        </footer>
    )
}

export default Footer
import styles from "./styles.module.css"
import Header from "@/app/ui/Header/Header";
import { AuthRoute } from "@/app/auth/context";

export default function Layout({ children }) {

    return (
        <AuthRoute>
            <div className="vh-100 d-flex flex-column">
                <main id="auth" className={`${styles.auth} flex-grow-1 position-relative container-fluid d-flex flex-column`}>
                    <Header />
                    <section className={`row flex-grow-1 d-flex align-items-center justify-content-center py-3`} data-aos="fade-in">

                        <div className="col-12 col-sm-10 col-md-8 col-lg-6">
                            <div className="card">
                                <div className="card-body py-4">
                                    {children}
                                </div>
                            </div>
                        </div>

                    </section>
                </main>
            </div>
        </AuthRoute>
    );
}

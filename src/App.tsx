import {Header, HeroSection, Form, Principles, Footer} from "./components";

  function App() {
    return (
        <>
            <Header/>
            <main className="min-h-screen text-ink px-4 pt-6 sm:pt-8">
                <div className="mx-auto md:max-w-[760px] lg:max-w-[1120px] xl:max-w-[1280px]">
                    <HeroSection/>
                    <Form/>
                    <Principles/>
                </div>
            </main>
            <Footer/>

        </>
    );
  }

export default App;
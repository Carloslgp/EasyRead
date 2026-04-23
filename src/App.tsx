import {Header, HeroSection, Form} from "./components";

  function App() {
    return (
        <>
            <Header/>
            <main className="min-h-screen bg-paper text-ink px-4 lg:px-28 pt-6 sm:pt-8">
            <HeroSection/>

            <Form/>

            </main>

        </>
    );
  }

export default App;
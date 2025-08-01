import Head from 'next/head';

export default function Home() {
    return (
        <>
            <Head>
                <title>Frevi</title>
                <meta name="description" content="Your platform for services" />
                <link rel="icon" href="/favicon.ico" />
                {/* Додайте посилання на ваші CSS файли з Firebase backup */}
                <link rel="stylesheet" href="/css/main-style.css" />
                <link rel="stylesheet" href="/css/components.css" />
                <link rel="stylesheet" href="/css/responsive.css" />
            </Head>

            {/* Вставте сюди вміст з index.html */}
            <div dangerouslySetInnerHTML={{
                __html: `
        <div class="min-h-screen flex flex-col">
          <header class="header-bg">
            <nav>
              <div class="container mx-auto py-3 px-3 lg:flex items-center justify-between border-b hidden">
                <div class="flex items-center">
                  <div><img alt="logo" loading="lazy" width="60" height="50" decoding="async" data-nimg="1" class="cursor-pointer" style="color:transparent" src="/images/logo.png"/></div>
                  <ul class="flex 2xl:space-x-12 xl:space-x-9 space-x-6 2xl:ml-14 xl:ml-11 ml-6">
                    <li><a class="cursor-pointer flex items-center text-[1.03rem] font-semibold hover:text-cyan-700 text-zinc-700">Find Talent<svg stroke="currentColor" fill="currentColor" stroke-width="0" viewBox="0 0 320 512" class="mt-1 xl:ml-1 ml-[1px] transition rotate-0" height="1em" width="1em" xmlns="http://www.w3.org/2000/svg"><path d="M31.3 192h257.3c17.8 0 26.7 21.5 14.1 34.1L174.1 354.8c-7.8 7.8-20.5 7.8-28.3 0L17.2 226.1C4.6 213.5 13.5 192 31.3 192z"></path></svg></a></li>
                    <li><a class="cursor-pointer flex items-center text-[1.03rem] font-semibold hover:text-cyan-700 text-zinc-700">Find Jobs<svg stroke="currentColor" fill="currentColor" stroke-width="0" viewBox="0 0 320 512" class="mt-1 xl:ml-1 ml-[1px] transition rotate-0" height="1em" width="1em" xmlns="http://www.w3.org/2000/svg"><path d="M31.3 192h257.3c17.8 0 26.7 21.5 14.1 34.1L174.1 354.8c-7.8 7.8-20.5 7.8-28.3 0L17.2 226.1C4.6 213.5 13.5 192 31.3 192z"></path></svg></a></li>
                    <li><a class="cursor-pointer flex items-center text-[1.03rem] font-semibold hover:text-cyan-700 text-zinc-700">Why Frevi<svg stroke="currentColor" fill="currentColor" stroke-width="0" viewBox="0 0 320 512" class="mt-1 xl:ml-1 ml-[1px] transition rotate-0" height="1em" width="1em" xmlns="http://www.w3.org/2000/svg"><path d="M31.3 192h257.3c17.8 0 26.7 21.5 14.1 34.1L174.1 354.8c-7.8 7.8-20.5 7.8-28.3 0L17.2 226.1C4.6 213.5 13.5 192 31.3 192z"></path></svg></a></li>
                    <li class="text-zinc-700 text-[1.03rem] font-semibold hover:text-cyan-700"><a href="/enterprise/">Enterprise</a></li>
                  </ul>
                </div>
                <div class="flex items-center">
                  <form class="flex flex-grow border border-gray-300 rounded-full max-w-3xl items-center xl:px-6 px-4 py-2 hover:bg-[#F3FFFC] relative">
                    <svg stroke="currentColor" fill="currentColor" stroke-width="0" viewBox="0 0 448 512" class="rotate-0 transition h-3 text-zinc-700 cursor-pointer hover:text-zinc-500" height="1em" width="1em" xmlns="http://www.w3.org/2000/svg"><path d="M207.029 381.476L12.686 187.132c-9.373-9.373-9.373-24.569 0-33.941l22.667-22.667c9.357-9.357 24.522-9.375 33.901-.04L224 284.505l154.745-154.021c9.379-9.335 24.544-9.317 33.901.04l22.667 22.667c9.373 9.373 9.373 24.569 0 33.941L240.971 381.476c-9.373 9.372-24.569 9.372-33.942 0z"></path></svg>
                    <input type="text" class="flex-grow xl:w-full w-40 focus:outline-none bg-transparent mx-2 text-zinc-700" placeholder="search" value=""/>
                    <svg stroke="currentColor" fill="currentColor" stroke-width="0" viewBox="0 0 512 512" class="xl:h-5 h-3 text-zinc-700 cursor-pointer hover:text-zinc-500" height="1em" width="1em" xmlns="http://www.w3.org/2000/svg"><path d="M505 442.7L405.3 343c-4.5-4.5-10.6-7-17-7H372c27.6-35.3 44-79.7 44-128C416 93.1 322.9 0 208 0S0 93.1 0 208s93.1 208 208 208c48.3 0 92.7-16.4 128-44v16.3c0 6.4 2.5 12.5 7 17l99.7 99.7c9.4 9.4 24.6 9.4 33.9 0l28.3-28.3c9.4-9.4 9.4-24.6.1-34zM208 336c-70.7 0-128-57.2-128-128 0-70.7 57.2-128 128-128 70.7 0 128 57.2 128 128 0 70.7-57.2 128-128 128z"></path></svg>
                  </form>
                  <button class="xl:mx-7 mx-3 text-zinc-700 text-[1.03rem] font-semibold hover:text-cyan-700">LogIn</button>
                  <button class="font-semibold bg-gradient-to-tr from-sky-200 to-cyan-200 py-2 px-3 rounded-xl text-gray-800 hover:from-cyan-300 hover:to-sky-200">SignUp</button>
                </div>
              </div>
              
              <div class="container mx-auto py-3 px-3 hidden lg:block">
                <ul class="flex items-center 2xl:space-x-20 xl:space-x-12 space-x-9">
                  <li class="text-zinc-600 font-semibold hover:text-cyan-700"><a href="/cat/dev-it/">Development and It</a></li>
                  <li class="text-zinc-600 font-semibold hover:text-cyan-700"><a href="/cat/design-creative/">Design & Creative</a></li>
                  <li class="text-zinc-600 font-semibold hover:text-cyan-700"><a href="/cat/sales-marketing/">Sales & Marketing</a></li>
                  <li class="text-zinc-600 font-semibold hover:text-cyan-700"><a href="/cat/writing-translation/">Writing & Translation</a></li>
                  <li class="text-zinc-600 font-semibold hover:text-cyan-700"><a href="/cat/admin-customer-support/">Admin & Custom Support</a></li>
                  <li class="relative">
                    <button class="font-semibold flex items-center hover:text-cyan-700 text-zinc-600">More
                      <span class="ml-1 transition rotate-0">
                        <svg stroke="currentColor" fill="currentColor" stroke-width="0" viewBox="0 0 320 512" height="1em" width="1em" xmlns="http://www.w3.org/2000/svg">
                          <path d="M143 352.3L7 216.3c-9.4-9.4-9.4-24.6 0-33.9l22.6-22.6c9.4-9.4 24.6-9.4 33.9 0l96.4 96.4 96.4-96.4c9.4-9.4 24.6-9.4 33.9 0l22.6 22.6c9.4 9.4 9.4 24.6 0 33.9l-136 136c-9.2 9.4-24.4 9.4-33.8 0z"></path>
                        </svg>
                      </span>
                    </button>
                  </li>
                </ul>
              </div>
            </nav>
            
            <div class="container mx-auto py-3 md:px-5 sm:px-7 px-3">
              <section class="mt-7 flex items-center justify-between">
                <div class="flex flex-col space-y-5">
                  <h1 class="xl:text-7xl lg:text-6xl text-4xl font-bold text-[#0C4A6E]">How Work <br/> Should Work</h1>
                  <h6 class="text-zinc-500 xl:text-3xl lg:text-xl text-lg font-semibold">Forget the old rules. You can have the best people. <br class="lg:block md:hidden block"/>Right now. Right here.</h6>
                </div>
                <div class="relative">
                  <div class="mr-10 mt-5 md:block hidden">
                    <img alt="header-img" loading="lazy" width="450" height="350" decoding="async" data-nimg="1" style="color:transparent" src="/images/headerimg.png"/>
                  </div>
                </div>
              </section>
            </div>
          </header>
          
          <main>
            <section class="container mx-auto mt-3 py-3 md:px-5 sm:px-7 px-3 space-y-3">
              <h3 class="text-zinc-500 font-semibold lg:text-2xl text-xl">Trusted by</h3>
              <div class="flex md:flex-row flex-col md:space-x-7 md:space-y-0 space-y-2 md:items-center">
                <div class="flex 2xl:space-x-10 xl:space-x-7 sm:space-x-6 space-x-3">
                  <span><img alt="paypal-img" loading="lazy" width="90" height="30" decoding="async" data-nimg="1" style="color:transparent" src="/images/paypal.png"/></span>
                  <span><img alt="adobe-img" loading="lazy" width="90" height="30" decoding="async" data-nimg="1" style="color:transparent" src="/images/adobe.png"/></span>
                  <span><img alt="oracle-img" loading="lazy" width="90" height="30" decoding="async" data-nimg="1" style="color:transparent" src="/images/oracle.png"/></span>
                  <span><img alt="google-img" loading="lazy" width="90" height="30" decoding="async" data-nimg="1" style="color:transparent" src="/images/google.png"/></span>
                </div>
                <div class="flex 2xl:space-x-10 xl:space-x-7 sm:space-x-6 space-x-4">
                  <span><img alt="microsoft-img" loading="lazy" width="110" height="30" decoding="async" data-nimg="1" style="color:transparent" src="/images/microsoft.png"/></span>
                  <span><img alt="airbnb-img" loading="lazy" width="90" height="30" decoding="async" data-nimg="1" style="color:transparent" src="/images/airnob.png"/></span>
                  <span><img alt="netflix-img" loading="lazy" width="90" height="30" decoding="async" data-nimg="1" style="color:transparent" src="/images/netflix.png"/></span>
                </div>
              </div>
            </section>
            
            <section class="container mx-auto mt-3 md:mt-7 py-3 md:px-5 sm:px-7 px-3">
              <h2 class="text-[#0C4A6E] lg:text-4xl text-3xl font-bold mb-3">Browse talent by category</h2>
              <span class="text-zinc-600 font-semibold lg:text-lg text-md">Looking for work?
                <a class="ml-2 text-cyan-700 cursor-pointer hover:underline" href="/jobs/all-jobs/">Browse Job</a>
              </span>
              
              <div class="grid xl:grid-cols-4 md:grid-cols-2 grid-cols-1 2xl:gap-x-20 gap-x-10 xl:gap-y-7 sm:gap-y-4 gap-y-3 lg:mt-10 mt-7 md:px-0 sm:px-7">
                <a href="/cat/dev-it/">
                  <div class="bg-gradient-to-tr from-[#CCFBF1] to-[#CFFAFE] xl:px-7 px-5 xl:py-7 py-3 xl:space-y-7 space-y-4 rounded-xl cursor-pointer transition hover:from-cyan-200 hover:to-[#CCFBF1] hover:scale-105">
                    <h5 class="xl:text-center text-start text-xl text-zinc-700 font-semibold">Development & It</h5>
                    <div class="flex justify-between 2xl:pb-7 xl:pb-5 pb-1">
                      <div class="flex items-center space-x-2">
                        <svg stroke="currentColor" fill="currentColor" stroke-width="0" viewBox="0 0 576 512" class="text-green-600" height="1em" width="1em" xmlns="http://www.w3.org/2000/svg">
                          <path d="M259.3 17.8L194 150.2 47.9 171.5c-26.2 3.8-36.7 36.1-17.7 54.6l105.7 103-25 145.5c-4.5 26.3 23.2 46 46.4 33.7L288 439.6l130.7 68.7c23.2 12.2 50.9-7.4 46.4-33.7l-25-145.5 105.7-103c19-18.5 8.5-50.8-17.7-54.6L382 150.2 316.7 17.8c-11.7-23.6-45.6-23.9-57.4 0z"></path>
                        </svg>
                        <span class="text-zinc-700 font-semibold">4.85/5</span>
                      </div>
                      <span class="text-zinc-700 font-semibold">1,853 skills</span>
                    </div>
                  </div>
                </a>
                <!-- Повторіть структуру для інших категорій -->
              </div>
            </section>
          </main>
        </div>
        `
            }} />
        </>
    );
}
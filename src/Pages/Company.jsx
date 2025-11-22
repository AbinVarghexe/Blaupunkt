import React from 'react'
import { Link } from 'react-router-dom'
import { companyPageImgs } from '../Data/assets.js'
import Breadcrumb from '../Components/Common/Breadcrumb'
import { createSimpleBreadcrumbs } from '../Data/Common/utilities'
import SEO from '../Components/Common/SEO'

const Company = () => {
  const breadcrumbItems = createSimpleBreadcrumbs('Company')
  const timelineData = [
    {
      year: "1923",
      description:
        '"Ideal", a radio manufacturer was first founded in Berlin when radio was still in its infancy. Every unit was carefully tested and labeled with a seal of quality, the blue dot. It did not take long before customers simply asked for the "mit dern Blaupunkt" products. The blue dot quickly became known as a symbol of outstanding quality.',
      image: companyPageImgs.picture2,
      position: "right",
    },
    {
      year: "1932",
      description:
        "The first car radio in the world was launched by BLAUPUNKT.",
      image: companyPageImgs.picture1,
      position: "left",
    },
    {
      year: "1938",
      description: "The dot became the new company name: BLAUPUNKT.",
      position: "right",
    },
  ];

  const eraData = [
    {
      period: "1923 - 1940's",
      title: "It all started with the blue dot.",
      description:
        "Blaupunkt began its journey with iconic products like headphones, car radios, and world receivers—marking the start of a legacy defined by quality, innovation, and precision.",
      image: companyPageImgs.picture6,
    },
    {
      period: "1950s - 1997",
      title: "Decades of innovation and expansion followed.",
      description:
        "The brand evolved into a global name in consumer electronics, pioneering advancements in TV, video, audio, video recording, and professional studio equipment. Blaupunkt also became a leader in car audio, navigation, and telematic systems, shaping the future of in-vehicle entertainment.",
    },
    {
      period: "1997 - 2008",
      title: "The advantage in your car.",
      description:
        "Over time, Blaupunkt refined its focus on automotive excellence—specializing in in-vehicle entertainment, GPS solutions, and premium systems for professional coaches and trucks. This dedication set new benchmarks for performance and reliability on the road.",
      images: [companyPageImgs.picture13, companyPageImgs.picture7],
    },
    {
      period: "Since 2009",
      title: "Enjoy it. The Blaupunkt global brand community.",
      description:
        'Today, "The advantage in your car" has grown into "The advantage in your life." Blaupunkt now offers a diverse range of consumer electronics, home appliances, security solutions, and wellness products—bringing trusted innovation to every aspect of modern living.',
      image: companyPageImgs.picture12,
    },
  ];

  return (
    <>
      <SEO 
        title="About Blaupunkt - Company History & Legacy Since 1923"
        description="Discover Blaupunkt's rich history from 1923 to today. From pioneering radio technology to leading EV charging solutions, explore our legacy of innovation and quality."
        keywords="Blaupunkt history, company legacy, EV charging company, about Blaupunkt, brand heritage, innovation"
        canonical="/company"
      />
      <div className="bg-white min-h-screen w-full">
      {/* Mobile Layout */}
      <div className="block lg:hidden bg-white w-full relative">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-8">
          <Breadcrumb items={breadcrumbItems} />

          {/* Main Header Section */}
          <header className="mb-8">
            <div className="text-center mb-8">
              <h1 className="text-[32px] font-semibold text-blaupunkt-dark mb-4 leading-normal">
                Quality Is In The Name
              </h1>
              <p className="text-xs font-light text-blaupunkt-secondary">
                Blaupunkt's History In a Nutshell
              </p>
            </div>

            {/* Hero Images */}
            <div className="flex justify-between items-center mb-8">
              <img
                className="w-[97px] h-[125px]"
                alt="T t"
                src={companyPageImgs.t2T2}
                loading='lazy'
                width='97'
                height='125'
              />
              <img
                className="w-28 h-[125px]"
                alt="Picture"
                src={companyPageImgs.picture2}
                loading='lazy'
                width='112'
                height='125'
              />
            </div>

            {/* 1923 Timeline Section */}
            <section className="flex flex-col w-full items-start gap-[29px] mb-8">
              <h2 className="text-2xl font-medium text-blaupunkt-primary">
                {timelineData[0].year}
              </h2>
              <p className="text-sm font-light text-blaupunkt-dark leading-relaxed">
                {timelineData[0].description}
              </p>
            </section>

            <div className="w-full flex justify-center mb-8">
              <img
                className="w-full max-w-[320px] h-[275px] object-cover"
                alt="Historical image"
                loading='lazy'
                width='320'
                height='275'
                src={companyPageImgs.picture3}
              />
            </div>
          </header>

          {/* Main Timeline Sections */}
          <main className="px-4 sm:px-6 lg:px-8">
            {/* 1932 & 1938 Timeline Events */}
            {timelineData.slice(1, 3).map((item, index) => (
              <section
                key={index}
                className="flex flex-col w-full items-start gap-[29px] mb-8"
              >
                <h2 className="text-2xl font-medium text-blaupunkt-primary">
                  {item.year}
                </h2>
                <p className="text-sm font-light text-blaupunkt-dark leading-relaxed">
                  {item.description}
                </p>
                {index === 0 && (
                  <img
                    className="w-full h-36 object-cover"
                    alt="Picture"
                    src={companyPageImgs.picture1}
                    loading='lazy'
                    width='320'
                    height='144'
                  />
                )}
              </section>
            ))}

            {/* Era Sections */}
            {eraData.map((era, index) => (
              <section
                key={index}
                className="flex flex-col w-full items-start gap-[29px] mb-12"
              >
                <h2 className="text-2xl font-medium text-blaupunkt-primary">
                  {era.period}
                </h2>
                <div className="text-sm font-light text-blaupunkt-dark leading-relaxed">
                  <span className="font-medium">{era.title}</span>
                  <br />
                  <br />
                  {era.description}
                </div>

                {index === 0 && (
                  <div className="flex gap-4 w-full justify-center">
                    <img
                      className="w-[137px] h-[185px] object-cover"
                      alt="Picture"
                      src={companyPageImgs.picture7}
                      loading='lazy'
                      width='137'
                      height='185'
                    />
                    <img
                      className="w-[137px] h-[185px] object-cover"
                      alt="Picture"
                      loading='lazy'
                      width='137'
                      height='185'
                      src={companyPageImgs.picture6}
                    />
                  </div>
                )}

                {index === 3 && (
                  <div
                    className="w-full h-[123px] bg-cover bg-center"
                    style={{
                      backgroundImage: `url(${companyPageImgs.picture12})`,
                    }}
                  />
                )}
              </section>
            ))}

            {/* Modern Era Description */}
            <section className="flex flex-col w-full items-start gap-[29px] mb-8">
              <p className="text-sm font-light text-blaupunkt-dark leading-relaxed">
                Blaupunkt began its journey into electric mobility in 2018,
                expanding its legacy of innovation into the EV charging space
                with a focus on quality, safety, and user-centric design.
                Strengthening its global footprint, Blaupunkt established a
                dedicated UAE presence in 2025, bringing its advanced EV
                solutions to the heart of the Middle East's growing electric
                vehicle market.
              </p>
            </section>

            {/* Contact Button - centered */}
            <div className="flex justify-center mb-8 pb-8">
              <Link
                to="/contact"
                className="inline-flex flex-col items-center justify-center gap-2.5 px-[27px] py-[11px] rounded-[15px] border-2 border-solid border-blaupunkt-primary text-blaupunkt-primary font-medium hover:bg-blaupunkt-primary hover:text-white transition-colors duration-200"
              >
                Contact Us
              </Link>
            </div>
          </main>
        </div>
      </div>

      <div className="hidden lg:block bg-white w-full">
        <div className="bg-white max-w-[1440px] w-full h-[2700px] relative mx-auto px-4 lg:px-8 xl:px-0 pt-24 lg:pt-28 pb-8">
          <div className="absolute w-full top-[32px] lg:top-[40px] left-0 flex justify-center">
            <Breadcrumb items={breadcrumbItems} />
          </div>

          {/* Main Heading */}
          <h1 className="absolute w-full max-w-[1023px] h-12 top-[82px] lg:top-[90px] left-1/2 transform -translate-x-1/2 text-blaupunkt-dark text-5xl font-semibold text-center">
            Quality Is In The Name
          </h1>

          {/* Subtitle */}
          <p className="absolute w-full max-w-[1023px] h-[19px] top-[140px] lg:top-[148px] left-1/2 transform -translate-x-1/2 text-blaupunkt-secondary text-lg text-center">
            Blaupunkt's History In a Nutshell
          </p>

          {/* Historical Images */}
          <img
            className="absolute w-[397px] h-[507px] top-[241px] lg:top-[249px] left-4 lg:left-8 xl:left-[209px]"
            alt="Historical Blaupunkt image"
            src={companyPageImgs.t2T2}
            loading='lazy'
            width='397'
            height='507'
          />

          <img
            className="absolute w-[513px] h-[477px] top-[587px] lg:top-[595px] right-4 lg:right-8 xl:right-[209px]"
            alt="Historical image"
            src={companyPageImgs.picture3}
            loading='lazy'
            width='513'
            height='477'
          />

          {/* Timeline Section - 1923 */}
          <div className="absolute w-[519px] h-[299px] top-[243px] lg:top-[251px] right-4 lg:right-8 xl:right-[209px]">
            <img
              className="absolute w-[97px] h-[108px] top-0 left-[373px]"
              alt="Picture"
              src={companyPageImgs.picture2}
              loading='lazy'
              width='97'
              height='108'
            />

            <div className="absolute w-[519px] h-[202px] top-[97px] left-0">
              <div className="w-[113px] whitespace-nowrap absolute top-0 left-0 text-blaupunkt-primary text-3xl font-semibold">
                1923
              </div>

              <p className="absolute w-[511px] top-[58px] left-0 text-blaupunkt-dark text-base leading-relaxed">
                "Ideal", a radio manufacturer was first founded in Berlin when
                radio was still in its infancy. Every unit was carefully tested
                and labeled with a seal of quality, the blue dot. It did not
                take long before customers simply asked for the "mit dern
                Blaupunkt" products. The blue dot quickly became known as a
                symbol of outstanding quality.
              </p>
            </div>
          </div>

          {/* Timeline Events */}
          <div className="absolute w-[396px] h-[106px] top-[1030px] lg:top-[1038px] left-4 lg:left-8 xl:left-[205px]">
            <div className="w-[86px] absolute top-0 left-0 text-blaupunkt-primary text-3xl font-semibold">
              1932
            </div>

            <p className="absolute w-[388px] top-[58px] left-0 text-blaupunkt-dark text-base leading-relaxed">
              The first car radio in the world was launched by BLAUPUNKT.
            </p>
          </div>

          <div className="absolute w-[396px] h-[106px] top-[1109px] lg:top-[1117px] right-4 lg:right-16 xl:right-[239px]">
            <div className="w-[86px] absolute top-0 left-0 text-blaupunkt-primary text-3xl font-semibold">
              1938
            </div>

            <p className="absolute w-[388px] top-[58px] left-0 text-blaupunkt-dark text-base leading-relaxed">
              The dot became the new company name: BLAUPUNKT.
            </p>
          </div>

          {/* Era Sections */}
          <section className="absolute w-[425px] h-[202px] top-[1260px] lg:top-[1268px] right-4 lg:right-8 xl:right-[209px]">
            <h2 className="absolute top-0 left-0 text-blaupunkt-primary text-2xl font-semibold whitespace-nowrap">
              1923 - 1940's
            </h2>

            <p className="absolute w-[417px] top-[58px] left-0 text-blaupunkt-dark text-base leading-relaxed">
              It all started with the blue dot.
              <br />
              <br /> Blaupunkt began its journey with iconic products like
              headphones, car radios, and world receivers—marking the start of a
              legacy defined by quality, innovation, and precision.
            </p>
          </section>

          <section className="absolute w-[425px] h-[250px] top-[1507px] lg:top-[1515px] right-4 lg:right-8 xl:right-[209px]">
            <h2 className="absolute top-0 left-0 text-blaupunkt-primary text-2xl font-semibold whitespace-nowrap">
              1950s - 1997
            </h2>

            <p className="absolute w-[417px] top-[58px] left-0 text-blaupunkt-dark text-base leading-relaxed">
              Decades of innovation and expansion followed.
              <br />
              <br /> The brand evolved into a global name in consumer
              electronics, pioneering advancements in TV, video, audio, video
              recording, and professional studio equipment. Blaupunkt also
              became a leader in car audio, navigation, and telematic systems,
              shaping the future of in-vehicle entertainment.
            </p>
          </section>

          <section className="absolute w-[425px] h-[250px] top-[1802px] lg:top-[1810px] right-4 lg:right-8 xl:right-[209px]">
            <h2 className="absolute top-0 left-0 text-blaupunkt-primary text-2xl font-semibold whitespace-nowrap">
              1997 - 2008
            </h2>

            <p className="absolute w-[417px] top-[58px] left-0 text-blaupunkt-dark text-base leading-relaxed">
              The advantage in your car.
              <br />
              <br /> Over time, Blaupunkt refined its focus on automotive
              excellence—specializing in in-vehicle entertainment, GPS
              solutions, and premium systems for professional coaches and
              trucks. This dedication set new benchmarks for performance and
              reliability on the road.
            </p>
          </section>

          {/* Additional Historical Images */}
          <img
            className="absolute w-[397px] h-[537px] top-[1181px] lg:top-[1189px] left-4 lg:left-8 xl:left-[209px]"
            alt="Historical Blaupunkt picture"
            src={companyPageImgs.picture6}
            loading='lazy'
            width='397'
            height='537'
          />

          <img
            className="absolute w-[395px] h-48 top-[793px] lg:top-[801px] left-4 lg:left-8 xl:left-[211px]"
            alt="Historical picture"
            src={companyPageImgs.picture1}
            loading='lazy'
            width='395'
            height='192'
          />

          {/* Since 2009 Section */}
          <section className="absolute w-full max-w-[1030px] h-[298px] top-[2097px] lg:top-[2105px] left-1/2 transform -translate-x-1/2 px-4 lg:px-8 xl:px-0">
            <div className="absolute w-[331px] h-[298px] top-0 ">
              <h2 className="absolute top-0 left-0 text-blaupunkt-primary text-2xl font-semibold whitespace-nowrap">
                Since 2009
              </h2>

              <p className="absolute w-[323px] top-[58px] left-0 text-blaupunkt-dark text-base leading-relaxed ">
                Enjoy it. The Blaupunkt global brand community.
                <br />
                <br /> Today, "The advantage in your car" has grown into "The
                advantage in your life." Blaupunkt now offers a diverse range of
                consumer electronics, home appliances, security solutions, and
                wellness products—bringing trusted innovation to every aspect of
                modern living.
              </p>
            </div>

            <img
              className="absolute w-[609px] h-64 top-[42px] right-0 lg:right-8 xl:right-0 xl:left-[421px]"
              alt="Modern Blaupunkt products"
              loading='lazy'
              width='609'
              height='256'
              src={companyPageImgs.picture12}
            />
          </section>

          {/* Additional Product Images */}
          <img
            className="absolute w-[177px] h-[271px] top-[1763px] lg:top-[1771px] left-4 lg:left-8 xl:left-[217px]"
            alt="Product picture"
            src={companyPageImgs.picture13}
            loading='lazy'
            width='177'
            height='271'
          />

          <img
            className="absolute w-[149px] h-[216px] top-[1818px] lg:top-[1826px] left-[220px] lg:left-[280px] xl:left-[457px]"
            alt="Product picture"
            src={companyPageImgs.picture7}
            loading='lazy'
            width='149'
            height='216'
          />

          {/* Modern Era Description */}
          <p className="absolute w-full max-w-[1022px] top-[2439px] lg:top-[2447px] left-1/2 transform -translate-x-1/2 text-blaupunkt-dark text-base leading-relaxed px-4 lg:px-8 xl:px-0">
            Blaupunkt began its journey into electric mobility in 2018,
            expanding its legacy of innovation into the EV charging space with a
            focus on quality, safety, and user-centric design. Strengthening its
            global footprint, Blaupunkt established a dedicated UAE presence in
            2025, bringing its advanced EV solutions to the heart of the Middle
            East's growing electric vehicle market.
          </p>

          {/* Contact Button */}
          <div className="absolute top-[2542px] lg:top-[2550px] left-1/2 transform -translate-x-1/2 pb-16">
            <Link
              to="/contact"
              className="inline-flex flex-col items-center justify-center gap-2.5 px-[27px] py-[11px] rounded-[15px] border-2 border-solid border-blaupunkt-primary  font-semibold hover:bg-blaupunkt-primary hover:text-white transition-colors duration-200"
            >
              Contact Us
            </Link>
          </div>
        </div>
      </div>
    </div>
    </>
  );
};

export default Company;
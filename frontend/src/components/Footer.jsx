const Footer = () => {
  const SocialMedias = [
    { id: "twitter", icons: "/images/bi_twitter-x.png", href: "/" },
    {
      id: "linkedin",
      icons: "/images/akar-icons_linkedinv2-fill.png",
      href: "/",
    },
    { id: "telegram", icons: "/images/ic_sharp-telegram.png", href: "/" },
    { id: "instagram", icons: "/images/mdi_instagram.png", href: "/" },
    { id: "whatsapp", icons: "/images/ic_baseline-whatsapp.png", href: "/" },
  ];

  const Explores = [
    { id: "home", text: "Home", href: "/" },
    { id: "launchpad", text: "Launchpad", href: "/" },
    { id: "blog", text: "Blog", href: "/" },
  ];

  return (
    <footer className="bg-[#00477E] px-8 py-14 md:px-16 md:py-13 lg:px-24 lg:py-12 text-(--color-light)">
      <div className="w-full max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-2 lg:grid-cols-[auto_1fr_auto] gap-x-16 gap-y-10 md:gap-y-28 items-start justify-between">
        <div className=" flex flex-col gap-3 md:max-w-md">
          <div className="flex gap-1 items-center">
            <p className="font-semibold text-xl md:text-2xl font-[Poppins]">
              Techy
              <span className="font-normal">Jaunt</span>
            </p>

            <img
              src="/images/image 2-footer.png"
              alt="Logo"
              className="scale-75 brightness-100 w-14"
            />
          </div>

          <div className="flex flex-col gap-4">
            <p className=" text-sm md:text-base leading-6">
              We are a community that educates and trains tech enthusiasts in emerging technologies, guiding Africans into tech and creating products to improve the world.
            </p>

            <p className="text-sm md:text-base flex flex-col">
              Email:{" "}
              <a
                href="mailto:support@techyjaunt.com"
                className=" focus:text-(--color-normal-active) hover:text-(--color-normal-hover)"
              >
                support@techyjaunt.com
              </a>
            </p>

            <div className="flex items-center gap-2 ">
              <p className="text-sm md:text-base ">Connect with us on:</p>
              {SocialMedias.map((socials) => (
                <a href={socials.href} key={socials.id}>
                  <img
                    src={socials.icons}
                    alt={socials.id}
                    className="object-cover brightness-200 w-4.5 h-auto hover:brightness-95 focus:brightness-75"
                  />
                </a>
              ))}
            </div>
          </div>
        </div>

        <div className=" flex flex-col gap-4 md:justify-self-center ">
          <h1 className="text-xl md:text-2xl font-bold">Explore</h1>
          <div className="flex flex-col gap-3 self-start">
            {Explores.map((explore) => (
              <a
                href={explore.href}
                key={explore.id}
                className="text-sm md:text-base  focus:text-(--color-normal-active) hover:text-(--color-normal-hover)"
              >
                {" "}
                {explore.text}{" "}
              </a>
            ))}
          </div>
        </div>

        <div className="flex flex-col gap-4 w-full max-w-xs">
          <h1 className="text-xl  md:text-2xl font-bold">Subscribe</h1>
          <p className="text-sm md:text-base">
            Stay informed about the happenings in African tech space
          </p>

          <form className="flex flex-col">
            <label className="mb-2">Email Address</label>
            <input
              type="email"
              name="email"
              id="email"
              placeholder="Email Address"
              className="h-12 pl-3 border border-(--color-light) rounded-lg outline-none placeholder:text-light"
            />
            <button
              type="submit"
              className="text-sm md:text-base text-(--color-primary-950) bg-(--color-light) font-medium py-2 px-4 mt-4 rounded-lg w-fit focus:bg-(--color-normal-active) hover:bg-(--color-normal-hover) cursor-pointer"
            >
              Subscribe Now
            </button>
          </form>
        </div>
      </div>
    </footer>
  );
};

export default Footer;

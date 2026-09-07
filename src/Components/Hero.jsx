import { motion as Motion } from "framer-motion";

import { styles } from "../styles";
import { profile } from "../constants";
import { ComputersCanvas } from "./canvas";

const Hero = () => {
  return (
    <section className="relative w-full h-screen mx-auto">
      <div
        className={`${styles.paddingX} absolute inset-0 top-[120px] max-w-7xl mx-auto flex flex-row items-start gap-5`}
      >
        <div className="flex flex-col justify-center items-center mt-5">
          <div className="w-5 h-5 rounded-full bg-[#915eff]" />
          <div className="w-1 sm:h-80 h-40 violet-gradient" />
        </div>

        <div>
          <h1 className={`${styles.heroHeadText} text-white`}>
            Hi, I'm <span className="text-[#915eff]">Pawan</span>
          </h1>
          <p className={`${styles.heroSubText} mt-2 text-white-100`}>
            {" "}
            I build full-stack web and mobile{" "}
            <br className="sm:block hidden" /> applications — frontend to API.
          </p>

          <div className="mt-6 flex flex-wrap items-center gap-4">
            <a
              href={profile.resume}
              download
              className="bg-tertiary py-3 px-6 rounded-xl text-white font-bold shadow-md shadow-primary outline-none hover:bg-[#232631] transition-colors"
            >
              Download CV
            </a>
            <a
              href={profile.github}
              target="_blank"
              rel="noreferrer"
              className="py-3 px-6 rounded-xl text-secondary font-bold border border-secondary hover:text-white hover:border-white transition-colors"
            >
              GitHub
            </a>
          </div>
        </div>
      </div>

      <ComputersCanvas />

      <div className="absolute xs:bottom-3 bottom-32 w-full flex justify-center items-center">
        <a href="#about">
          <div className="w-[35px] h-[64px] rounded-3xl border-4 border-secondary flex justify-center items-start p-2">
            <Motion.div
              animate={{ y: [0, 24, 0] }}
              transition={{
                duration: 1.5,
                repeat: Infinity,
                repeatType: "loop",
              }}
              className="w-3 h-3 rounded-full bg-secondary mb-1"
            />
          </div>
        </a>
      </div>
    </section>
  );
};

export default Hero;

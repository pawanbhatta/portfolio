import { motion as Motion } from "framer-motion";
import { SectionWrapper } from "../hoc";
import { useRef, useState } from "react";
import { slideIn } from "../utils/motion";
import { styles } from "../styles";
import { EarthCanvas } from "./canvas";
import { profile } from "../constants";
import emailjs from "@emailjs/browser";

// EmailJS credentials are publishable by design, but these three defaults are
// inherited from the tutorial this site was built from and belong to someone
// else's EmailJS account, so form submissions do not reach Pawan. Create an
// EmailJS service and set VITE_EMAILJS_SERVICE_ID, VITE_EMAILJS_TEMPLATE_ID
// and VITE_EMAILJS_PUBLIC_KEY to take over delivery. Until then the form
// reports the failure and points the visitor at the direct contact links.
const EMAILJS_SERVICE_ID = import.meta.env.VITE_EMAILJS_SERVICE_ID;
const EMAILJS_TEMPLATE_ID = import.meta.env.VITE_EMAILJS_TEMPLATE_ID;
const EMAILJS_PUBLIC_KEY = import.meta.env.VITE_EMAILJS_PUBLIC_KEY;
const emailjsConfigured = Boolean(
  EMAILJS_SERVICE_ID && EMAILJS_TEMPLATE_ID && EMAILJS_PUBLIC_KEY
);

const Contact = () => {
  const formRef = useRef();
  const [form, setForm] = useState({
    name: "",
    email: "",
    message: "",
  });
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    const { target } = e;
    const { name, value } = target;

    setForm({
      ...form,
      [name]: value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!emailjsConfigured) {
      alert(
        `The contact form is not connected yet. Please email me directly at ${profile.email}.`
      );
      return;
    }

    setLoading(true);

    emailjs
      .send(
        EMAILJS_SERVICE_ID,
        EMAILJS_TEMPLATE_ID,
        {
          from_name: form.name,
          to_name: profile.name,
          from_email: form.email,
          to_email: profile.email,
          message: form.message,
        },
        EMAILJS_PUBLIC_KEY
      )
      .then(
        () => {
          setLoading(false);
          alert("Thank you. I will get back to you as soon as possible.");

          setForm({
            name: "",
            email: "",
            message: "",
          });
        },
        (error) => {
          setLoading(false);
          console.error(error);

          alert(
            `Something went wrong sending that. Please email me directly at ${profile.email}.`
          );
        }
      );
  };

  return (
    <div className="xl:mt-12 xl:flex-row flex-col-reverse flex gap-10 overflow-hidden">
      <Motion.div
        variants={slideIn("left", "tween", 0.2, 1)}
        className="flex-[0.75] bg-black-100 p-8 rounded-2xl"
      >
        <p className={`${styles.sectionSubText}`}>Get in touch</p>
        <h2 className={`${styles.sectionHeadText}`}>Contact.</h2>

        <form
          ref={formRef}
          onSubmit={handleSubmit}
          className="mt-12 flex flex-col gap-8"
        >
          <label className="flex flex-col">
            <span className="text-white font-medium mb-4">Your Name</span>
            <input
              type="text"
              name="name"
              value={form.name}
              onChange={handleChange}
              placeholder="What's your name?"
              className="bg-tertiary py-4 px-6 placeholder:text-secondary text-white rounded-lg outlined-none border-none font-medium
              "
            />
          </label>
          <label className="flex flex-col">
            <span className="text-white font-medium mb-4">Your Email</span>
            <input
              type="email"
              name="email"
              value={form.email}
              onChange={handleChange}
              placeholder="What's your email?"
              className="bg-tertiary py-4 px-6 placeholder:text-secondary text-white rounded-lg outlined-none border-none font-medium
              "
            />
          </label>
          <label className="flex flex-col">
            <span className="text-white font-medium mb-4">Your Message</span>
            <textarea
              rows={7}
              name="message"
              value={form.message}
              onChange={handleChange}
              placeholder="What do you want to say  ?"
              className="bg-tertiary py-4 px-6 placeholder:text-secondary text-white rounded-lg outlined-none border-none font-medium
              "
            />
          </label>

          <button
            type="submit"
            className="bg-tertiary py-3 px-8 outline-none w-fit text-white font-bold shadow-md shadow-primary rounded-xl hover:bg-[#232631] transition-colors"
          >
            {loading ? "Sending..." : "Send"}
          </button>
        </form>

        <div className="mt-10 flex flex-col gap-2 text-secondary text-[14px]">
          <a
            href={`mailto:${profile.email}`}
            className="hover:text-white transition-colors"
          >
            {profile.email}
          </a>
          <a
            href={`tel:${profile.phone.replace(/\s+/g, "")}`}
            className="hover:text-white transition-colors"
          >
            {profile.phone}
          </a>
          <a
            href={profile.github}
            target="_blank"
            rel="noreferrer"
            className="hover:text-white transition-colors"
          >
            github.com/pawanbhatta
          </a>
          <p>{profile.location}</p>
        </div>
      </Motion.div>

      <Motion.div
        variants={slideIn("right", "tween", 0.2, 1)}
        className="xl:flex-1 xl:h-auto md:h-[550px] h-[350px]"
      >
        <EarthCanvas />
      </Motion.div>
    </div>
  );
};

export default SectionWrapper(Contact, "contact");

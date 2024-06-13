import Link from "next/link";
import { FaMapMarkedAlt, FaPhone } from "react-icons/fa";
import { IoMdMail } from "react-icons/io";
import { IoLogoWhatsapp } from "react-icons/io5";

export default function Contact() {
  return (
    <div>
      <div className="flex flex-wrap justify-center items-stretch gap-5">

        <a href="https://wa.me/3755586849" target="_blank">
          <div className="flex flex-col justify-center items-center w-[250px] h-[200px] mt-1 border border-celeste hover:bg-gris cursor-pointer transition-all duration-300 text-text2">
            <IoLogoWhatsapp size={30} className="text-celeste" />
            <div className="flex flex-col justify-center items-center mt-5">
              <p>WhatsApp</p>
              <p>3755-586849</p>
            </div>
          </div>
        </a>

        <a href="tel:3755586849" target="_blank">
          <div className="flex flex-col justify-center items-center w-[250px] h-[200px] mt-1 border border-celeste hover:bg-gris cursor-pointer transition-all duration-300 text-text2">
            <FaPhone size={30} className="text-celeste" />
            <div className="flex flex-col justify-center items-center mt-5">
              <p>Teléfono</p>
              <p>3755-586849</p>
            </div>
          </div>
        </a>
        {/* https://mail.google.com/mail/?view=cm&to=maximilianoalegre@gmail.com */}
        <a href="https://mail.google.com/mail/?view=cm&to=maximilianoalegre@gmail.com" target="_blank">
          <div className="flex flex-col justify-center items-center w-[250px] h-[200px] mt-1 border border-celeste hover:bg-gris cursor-pointer transition-all duration-300 text-text2">
            <IoMdMail size={30} className="text-celeste" />
            <div className="flex flex-col justify-center items-center mt-5">
              <p>Email</p>
              <p>maximilianoalegre@gmail.com</p>
            </div>
          </div>
        </a>
        <a href={"https://maps.app.goo.gl/11PJZfqCR6DdxYjE9"} target="_blank">
          <div className="flex flex-col justify-center items-center w-[250px] h-[200px] mt-1 border border-celeste hover:bg-gris cursor-pointer transition-all duration-300 text-text2">
            <FaMapMarkedAlt size={30} className="text-celeste" />
            <div className="flex flex-col justify-center items-center mt-5">
              <p>Dirección</p>
              <p>Picada Argentina 2325</p>
            </div>
          </div>
        </a>
      </div>
    </div>
  );
}
